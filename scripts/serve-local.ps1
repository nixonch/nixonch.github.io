<#
.SYNOPSIS
Starts a local HTTP server for previewing the static CV website.

.DESCRIPTION
Serves the website from the repository root by default. Directory URLs such as
/en/ and /es/casos/ are resolved to their index.html files. Responses are sent
with caching disabled so local changes become visible after a browser refresh.

Run the script from the repository root with:

    powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\scripts\serve-local.ps1

Then open http://127.0.0.1:8000/ in a browser. Press Ctrl+C in the terminal to
stop the server.

.PARAMETER Port
TCP port used by the local server. The default is 8000.

.PARAMETER SiteRoot
Directory to serve. By default, this is the repository root located one level
above this script.

.EXAMPLE
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\scripts\serve-local.ps1

Starts the server for the current repository at http://127.0.0.1:8000/.

.EXAMPLE
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\scripts\serve-local.ps1 -Port 8080

Starts the server on port 8080.

.EXAMPLE
Get-Help .\scripts\serve-local.ps1 -Detailed

Displays this documentation in PowerShell.
#>

[CmdletBinding()]
param(
    [ValidateRange(1, 65535)]
    [int]$Port = 8000,

    [string]$SiteRoot
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($SiteRoot)) {
    $SiteRoot = Join-Path $PSScriptRoot '..'
}

$resolvedRoot = [System.IO.Path]::GetFullPath($SiteRoot)
if (-not (Test-Path -LiteralPath $resolvedRoot -PathType Container)) {
    throw "Site root does not exist: $resolvedRoot"
}

$rootPrefix = $resolvedRoot.TrimEnd(
    [System.IO.Path]::DirectorySeparatorChar,
    [System.IO.Path]::AltDirectorySeparatorChar
) + [System.IO.Path]::DirectorySeparatorChar

$contentTypes = @{
    '.css'   = 'text/css; charset=utf-8'
    '.gif'   = 'image/gif'
    '.html'  = 'text/html; charset=utf-8'
    '.ico'   = 'image/x-icon'
    '.jpeg'  = 'image/jpeg'
    '.jpg'   = 'image/jpeg'
    '.js'    = 'text/javascript; charset=utf-8'
    '.json'  = 'application/json; charset=utf-8'
    '.map'   = 'application/json; charset=utf-8'
    '.pdf'   = 'application/pdf'
    '.png'   = 'image/png'
    '.svg'   = 'image/svg+xml; charset=utf-8'
    '.txt'   = 'text/plain; charset=utf-8'
    '.webp'  = 'image/webp'
    '.woff'  = 'font/woff'
    '.woff2' = 'font/woff2'
    '.xml'   = 'application/xml; charset=utf-8'
}

function Write-HttpResponse {
    param(
        [Parameter(Mandatory)]
        [System.Net.Sockets.NetworkStream]$Stream,

        [Parameter(Mandatory)]
        [int]$StatusCode,

        [Parameter(Mandatory)]
        [string]$StatusText,

        [Parameter(Mandatory)]
        [string]$ContentType,

        [Parameter(Mandatory)]
        [byte[]]$Body,

        [switch]$HeadersOnly
    )

    $header = @(
        "HTTP/1.1 $StatusCode $StatusText"
        "Content-Type: $ContentType"
        "Content-Length: $($Body.Length)"
        'Cache-Control: no-store'
        'Connection: close'
        ''
        ''
    ) -join "`r`n"

    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
    $Stream.Write($headerBytes, 0, $headerBytes.Length)

    if (-not $HeadersOnly -and $Body.Length -gt 0) {
        $Stream.Write($Body, 0, $Body.Length)
    }
}

function Write-TextResponse {
    param(
        [Parameter(Mandatory)]
        [System.Net.Sockets.NetworkStream]$Stream,

        [Parameter(Mandatory)]
        [int]$StatusCode,

        [Parameter(Mandatory)]
        [string]$StatusText,

        [Parameter(Mandatory)]
        [string]$Message,

        [switch]$HeadersOnly
    )

    $body = [System.Text.Encoding]::UTF8.GetBytes($Message)
    Write-HttpResponse `
        -Stream $Stream `
        -StatusCode $StatusCode `
        -StatusText $StatusText `
        -ContentType 'text/plain; charset=utf-8' `
        -Body $body `
        -HeadersOnly:$HeadersOnly
}

function Invoke-StaticRequest {
    param(
        [Parameter(Mandatory)]
        [System.Net.Sockets.TcpClient]$Client
    )

    $stream = $Client.GetStream()
    $reader = New-Object System.IO.StreamReader(
        $stream,
        [System.Text.Encoding]::ASCII,
        $false,
        1024,
        $true
    )

    try {
        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrWhiteSpace($requestLine)) {
            return
        }

        while ($true) {
            $headerLine = $reader.ReadLine()
            if ([string]::IsNullOrEmpty($headerLine)) {
                break
            }
        }

        $requestParts = $requestLine.Split(' ')
        if ($requestParts.Length -lt 3) {
            Write-TextResponse -Stream $stream -StatusCode 400 -StatusText 'Bad Request' -Message 'Bad request.'
            return
        }

        $method = $requestParts[0].ToUpperInvariant()
        $headersOnly = $method -eq 'HEAD'
        if ($method -ne 'GET' -and -not $headersOnly) {
            Write-TextResponse -Stream $stream -StatusCode 405 -StatusText 'Method Not Allowed' -Message 'Only GET and HEAD are supported.'
            return
        }

        $requestPath = $requestParts[1].Split('?')[0]
        try {
            $decodedPath = [System.Uri]::UnescapeDataString($requestPath)
        }
        catch {
            Write-TextResponse -Stream $stream -StatusCode 400 -StatusText 'Bad Request' -Message 'Invalid URL.' -HeadersOnly:$headersOnly
            return
        }

        $relativePath = $decodedPath.TrimStart('/').Replace(
            '/',
            [System.IO.Path]::DirectorySeparatorChar
        )

        try {
            $candidate = [System.IO.Path]::GetFullPath((Join-Path $resolvedRoot $relativePath))
        }
        catch {
            Write-TextResponse -Stream $stream -StatusCode 400 -StatusText 'Bad Request' -Message 'Invalid path.' -HeadersOnly:$headersOnly
            return
        }

        $insideRoot = $candidate.Equals(
            $resolvedRoot,
            [System.StringComparison]::OrdinalIgnoreCase
        ) -or $candidate.StartsWith(
            $rootPrefix,
            [System.StringComparison]::OrdinalIgnoreCase
        )

        if (-not $insideRoot) {
            Write-TextResponse -Stream $stream -StatusCode 403 -StatusText 'Forbidden' -Message 'Forbidden.' -HeadersOnly:$headersOnly
            return
        }

        if (Test-Path -LiteralPath $candidate -PathType Container) {
            $candidate = Join-Path $candidate 'index.html'
        }

        if (-not (Test-Path -LiteralPath $candidate -PathType Leaf)) {
            Write-TextResponse -Stream $stream -StatusCode 404 -StatusText 'Not Found' -Message 'Not found.' -HeadersOnly:$headersOnly
            return
        }

        $body = [System.IO.File]::ReadAllBytes($candidate)
        $extension = [System.IO.Path]::GetExtension($candidate).ToLowerInvariant()
        $contentType = $contentTypes[$extension]
        if ([string]::IsNullOrWhiteSpace($contentType)) {
            $contentType = 'application/octet-stream'
        }

        Write-HttpResponse `
            -Stream $stream `
            -StatusCode 200 `
            -StatusText 'OK' `
            -ContentType $contentType `
            -Body $body `
            -HeadersOnly:$headersOnly

        Write-Host "$method $decodedPath -> 200"
    }
    catch {
        if ($stream.CanWrite) {
            Write-TextResponse -Stream $stream -StatusCode 500 -StatusText 'Internal Server Error' -Message 'Internal server error.'
        }
        Write-Warning $_.Exception.Message
    }
    finally {
        $reader.Dispose()
    }
}

$listener = [System.Net.Sockets.TcpListener]::new(
    [System.Net.IPAddress]::Any,
    $Port
)

try {
    try {
        $listener.Start()
    }
    catch {
        throw "Could not start the preview server on port $Port. The port may already be in use. $($_.Exception.Message)"
    }

    Write-Host "Serving $resolvedRoot"
    Write-Host "Local: http://127.0.0.1:$Port/"

    $lanAddresses = [System.Net.Dns]::GetHostAddresses(
        [System.Net.Dns]::GetHostName()
    ) | Where-Object {
        $_.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork -and
        -not [System.Net.IPAddress]::IsLoopback($_)
    }

    foreach ($address in $lanAddresses) {
        Write-Host "LAN:   http://$($address.IPAddressToString):$Port/"
    }

    Write-Host 'Press Ctrl+C to stop.'

    while ($true) {
        $client = $listener.AcceptTcpClient()
        try {
            Invoke-StaticRequest -Client $client
        }
        finally {
            $client.Dispose()
        }
    }
}
finally {
    $listener.Stop()
}
