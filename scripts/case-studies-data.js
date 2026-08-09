"use strict";

const localeMeta = {
  en: {
    directory: "en",
    section: "case-studies",
    label: "Technical case study",
    backLabel: "Back to CV",
    cvLinkLabel: "Go to CV",
    previousPageLabel: "Back",
    technologiesLabel: "Technologies and concepts",
    relatedLabel: "Related case studies"
  },
  de: {
    directory: "de",
    section: "fallstudien",
    label: "Technische Fallstudie",
    backLabel: "Zurück zum Lebenslauf",
    cvLinkLabel: "Zum Lebenslauf",
    previousPageLabel: "Zurück",
    technologiesLabel: "Technologien und Konzepte",
    relatedLabel: "Weitere Fallstudien"
  },
  es: {
    directory: "es",
    section: "casos",
    label: "Caso técnico",
    backLabel: "Volver al CV",
    cvLinkLabel: "Ir al CV",
    previousPageLabel: "Volver",
    technologiesLabel: "Tecnologías y conceptos",
    relatedLabel: "Otros casos prácticos"
  }
};

const caseStudies = [
  {
    id: "wwks2",
    technologies: [
      "PHP",
      "ReactPHP",
      "WWKS2",
      "BD Rowa",
      "TCP/IP",
      "XML",
      "Asynchronous programming",
      "Message correlation",
      "Backpressure",
      "Linux",
      "systemd",
      "PHPUnit"
    ],
    locales: {
      en: {
        slug: "wwks2-pharmacy-warehouse-integration",
        title: "WWKS2 integration with automated medication storage",
        description: "An asynchronous service connecting medication-management and blister-production software with BD Rowa storage systems through WWKS2, TCP, XML, and recoverable message processing.",
        sections: [
          {
            heading: "Context",
            paragraphs: [
              "Software used by pharmacies and blister centers must coordinate goods receipt, storage and retrieval, dispensing or production supply, returns, stock control, and operational tasks with automated storage systems. The integration is part of daily operations, so connection failures and delayed responses cannot be treated as exceptional edge cases.",
              "The warehouse interface used WWKS2 messages over a persistent TCP connection. Several requests could be in flight while responses arrived asynchronously, which made reliable message correlation and controlled buffering essential."
            ]
          },
          {
            heading: "Engineering approach",
            paragraphs: [
              "I built an asynchronous PHP service that separates medication and production workflows from the device connection. It sends and receives XML messages, correlates responses with their originating requests, and maintains explicit queues instead of relying on synchronous request-response assumptions.",
              "Buffering and backpressure prevent producers from overwhelming the connection. Retry rules and connection recovery handle transient failures while keeping the state of individual operations observable."
            ]
          },
          {
            heading: "Reliability and operations",
            paragraphs: [
              "The integration includes structured logging for message flow and failure analysis. Unit and integration tests use fixtures and mocked external behavior so that correlation, retries, and recovery paths can be exercised without requiring a physical warehouse system.",
              "The service runs as a Linux-managed process with systemd, making startup, restart behavior, logs, and production troubleshooting part of the implementation rather than an afterthought."
            ]
          },
          {
            heading: "Result",
            paragraphs: [
              "The service provides a durable boundary between business workflows and warehouse automation. Applications used by pharmacies and blister centers can initiate operational actions without embedding device-connection complexity throughout the application code."
            ]
          }
        ]
      },
      de: {
        slug: "wwks2-apothekenlager-integration",
        title: "WWKS2-Integration mit automatisierter Arzneimittellagerung",
        description: "Ein asynchroner Dienst verbindet Software für Medikationsmanagement und Blisterproduktion über WWKS2, TCP, XML und wiederanlauffähige Nachrichtenverarbeitung mit BD-Rowa-Lagersystemen.",
        sections: [
          {
            heading: "Ausgangssituation",
            paragraphs: [
              "Software in Apotheken und Blisterzentren muss Wareneingang, Ein- und Auslagerung, Abgabe beziehungsweise Produktionsbereitstellung, Rückgaben, Bestandskontrolle und operative Aufgaben mit automatisierten Lagersystemen koordinieren. Die Integration ist Teil des täglichen Betriebs; Verbindungsabbrüche und verzögerte Antworten dürfen deshalb nicht wie seltene Ausnahmefälle behandelt werden.",
              "Die Lagerschnittstelle verwendet WWKS2-Nachrichten über eine dauerhafte TCP-Verbindung. Mehrere Anfragen können gleichzeitig aktiv sein, während Antworten asynchron eintreffen. Eine zuverlässige Nachrichtenkorrelation und kontrollierte Pufferung sind daher entscheidend."
            ]
          },
          {
            heading: "Technischer Ansatz",
            paragraphs: [
              "Ich entwickelte einen asynchronen PHP-Dienst, der Medikations- und Produktionsabläufe von der Geräteverbindung trennt. Er sendet und empfängt XML-Nachrichten, ordnet Antworten den ursprünglichen Anfragen zu und verwaltet explizite Warteschlangen anstelle synchroner Request-Response-Annahmen.",
              "Pufferung und Backpressure verhindern, dass Produzenten die Verbindung überlasten. Wiederholungsregeln und Verbindungswiederherstellung behandeln vorübergehende Fehler und halten gleichzeitig den Zustand einzelner Vorgänge nachvollziehbar."
            ]
          },
          {
            heading: "Zuverlässigkeit und Betrieb",
            paragraphs: [
              "Die Integration verwendet strukturierte Logs für Nachrichtenfluss und Fehleranalyse. Unit- und Integrationstests arbeiten mit Fixtures und simuliertem Verhalten externer Systeme, sodass Korrelation, Wiederholungen und Recovery-Pfade ohne physisches Lagersystem getestet werden können.",
              "Der Dienst läuft als von systemd verwalteter Linux-Prozess. Start, Neustartverhalten, Protokollierung und Fehleranalyse im Produktivbetrieb sind damit Bestandteil der Lösung."
            ]
          },
          {
            heading: "Ergebnis",
            paragraphs: [
              "Der Dienst bildet eine belastbare Grenze zwischen Geschäftsprozessen und Lagerautomatisierung. Anwendungen in Apotheken und Blisterzentren können operative Aktionen auslösen, ohne die Komplexität der Geräteverbindung im gesamten Anwendungscode zu verteilen."
            ]
          }
        ]
      },
      es: {
        slug: "integracion-wwks2-almacen-farmacia",
        title: "Integración WWKS2 con almacenamiento automatizado de medicamentos",
        description: "Un servicio asíncrono conecta software de gestión de la medicación y producción de blísteres personalizados con sistemas de almacenamiento BD Rowa mediante WWKS2, TCP, XML y procesamiento recuperable de mensajes.",
        sections: [
          {
            heading: "Contexto",
            paragraphs: [
              "El software utilizado en farmacias y centros de producción de blísteres debe coordinar la recepción, el almacenamiento y la salida de medicamentos, la dispensación o el suministro a producción, las devoluciones, el control de existencias y las tareas operativas con sistemas de almacenamiento automatizado. La integración forma parte del trabajo diario, por lo que los fallos de conexión y las respuestas tardías no pueden tratarse como casos excepcionales.",
              "La interfaz del almacén utilizaba mensajes WWKS2 sobre una conexión TCP persistente. Podía haber varias solicitudes en curso mientras las respuestas llegaban de forma asíncrona, lo que hacía imprescindibles la correlación fiable de mensajes y un buffering controlado."
            ]
          },
          {
            heading: "Enfoque técnico",
            paragraphs: [
              "Desarrollé un servicio PHP asíncrono que separa los flujos de medicación y producción de la conexión con el dispositivo. Envía y recibe mensajes XML, relaciona cada respuesta con su solicitud original y mantiene colas explícitas en lugar de asumir un intercambio síncrono.",
              "El buffering y la contrapresión evitan que los productores saturen la conexión. Las reglas de reintento y la recuperación de conexión resuelven fallos transitorios y mantienen observable el estado de cada operación."
            ]
          },
          {
            heading: "Fiabilidad y operación",
            paragraphs: [
              "La integración incorpora logs estructurados para seguir el flujo de mensajes y analizar errores. Las pruebas unitarias y de integración emplean fixtures y comportamiento externo simulado para comprobar correlación, reintentos y recuperación sin necesitar un sistema físico de almacén.",
              "El servicio funciona como un proceso Linux gestionado por systemd, por lo que el arranque, los reinicios, los logs y el diagnóstico en producción forman parte de la solución."
            ]
          },
          {
            heading: "Resultado",
            paragraphs: [
              "El servicio crea una frontera robusta entre los procesos de negocio y la automatización del almacén. Las aplicaciones utilizadas en farmacias y centros de producción de blísteres pueden iniciar operaciones sin distribuir la complejidad de conexión con el dispositivo por todo el código."
            ]
          }
        ]
      }
    }
  },
  {
    id: "nmvs",
    technologies: [
      "securPharm",
      "NMVS",
      "EMVS",
      "JSON-RPC",
      "HTTP",
      "cURL",
      "HMAC",
      "GS1 DataMatrix",
      "GTIN",
      "PPN",
      "Structured logging",
      "Fallback workflows"
    ],
    locales: {
      en: {
        slug: "securpharm-nmvs-medication-verification",
        title: "securPharm/NMVS medication verification integration",
        description: "Integration of medication-handling workflows with the German NMVS for verification, decommissioning, undo operations, and resilient error handling.",
        sections: [
          {
            heading: "Context",
            paragraphs: [
              "Prescription medicine packs in the legal supply chain are verified against a national repository. In software used by pharmacies and blister centers, this check must fit into goods-receipt, dispensing, and blister-production workflows without hiding repository errors or leaving pack state ambiguous.",
              "The implemented integration targeted the German securPharm/NMVS environment. It needed to read GS1 DataMatrix information, support different product identifiers, authenticate requests, and represent repository responses clearly to the surrounding application."
            ]
          },
          {
            heading: "Integration design",
            paragraphs: [
              "I built a JSON-RPC integration over HTTP/cURL with HMAC-signed requests. It processes GS1/DataMatrix data with GTIN and PPN identifiers and supports medication verification, dispensing or decommissioning, and undo actions.",
              "The integration keeps transport failures, repository responses, and business-level outcomes distinct. This allows the surrounding pharmacy or blister-production workflow to decide whether to continue, retry, use an approved fallback, or require operator attention."
            ]
          },
          {
            heading: "Error handling and traceability",
            paragraphs: [
              "Structured logging records the relevant request context and result without spreading protocol details through the business application. Explicit error handling and fallback workflows make degraded operation visible and diagnosable.",
              "Unit and integration tests cover successful operations, rejected requests, communication failures, and mocked repository responses."
            ]
          },
          {
            heading: "European relevance",
            paragraphs: [
              "The production work was performed against Germany’s securPharm/NMVS. The underlying concepts—EMVS integration, unique identifiers, verification, decommissioning, undo operations, authenticated communication, and alert-aware workflows—are directly relevant to software connected to other national systems, including Spain’s SEVeM, without claiming direct production experience with SEVeM."
            ]
          }
        ]
      },
      de: {
        slug: "securpharm-nmvs-arzneimittelverifikation",
        title: "securPharm/NMVS-Integration zur Arzneimittelverifikation",
        description: "Integration von Abläufen der Arzneimittelhandhabung mit dem deutschen NMVS für Verifikation, Ausbuchung, Rückbuchung und robuste Fehlerbehandlung.",
        sections: [
          {
            heading: "Ausgangssituation",
            paragraphs: [
              "Verschreibungspflichtige Arzneimittelpackungen in der legalen Lieferkette werden gegen ein nationales Repository geprüft. In Software für Apotheken und Blisterzentren muss diese Prüfung in bestehende Wareneingangs-, Abgabe- und Blisterproduktionsprozesse passen, ohne Fehler des Repositories zu verbergen oder den Packungsstatus unklar zu lassen.",
              "Die implementierte Integration war für die deutsche securPharm/NMVS-Umgebung bestimmt. Sie musste GS1-DataMatrix-Daten lesen, unterschiedliche Produktkennungen unterstützen, Anfragen authentifizieren und Antworten des Repositories für die umgebende Anwendung eindeutig darstellen."
            ]
          },
          {
            heading: "Integrationsdesign",
            paragraphs: [
              "Ich entwickelte eine JSON-RPC-Integration über HTTP/cURL mit HMAC-signierten Anfragen. Sie verarbeitet GS1/DataMatrix-Daten mit GTIN- und PPN-Kennungen und unterstützt Verifikation, Ausbuchung bei der Abgabe sowie Rücknahmeaktionen.",
              "Transportfehler, Repository-Antworten und fachliche Ergebnisse werden getrennt behandelt. Dadurch kann der jeweilige Apotheken- oder Blisterproduktionsprozess entscheiden, ob er fortfährt, einen erneuten Versuch startet, einen freigegebenen Fallback verwendet oder eine manuelle Prüfung verlangt."
            ]
          },
          {
            heading: "Fehlerbehandlung und Nachvollziehbarkeit",
            paragraphs: [
              "Strukturierte Logs erfassen den relevanten Anfragekontext und das Ergebnis, ohne Protokolldetails in der gesamten Geschäftsanwendung zu verteilen. Explizite Fehlerbehandlung und Fallback-Abläufe machen einen eingeschränkten Betrieb sichtbar und analysierbar.",
              "Unit- und Integrationstests decken erfolgreiche Vorgänge, abgewiesene Anfragen, Kommunikationsfehler und simulierte Repository-Antworten ab."
            ]
          },
          {
            heading: "Europäische Übertragbarkeit",
            paragraphs: [
              "Die produktive Implementierung erfolgte gegen das deutsche securPharm/NMVS. Die zugrunde liegenden Konzepte—EMVS-Anbindung, eindeutige Identifikatoren, Verifikation, Ausbuchung, Rücknahme, authentifizierte Kommunikation und alarmbewusste Abläufe—sind auch für Software relevant, die mit anderen nationalen Systemen wie dem spanischen SEVeM verbunden wird."
            ]
          }
        ]
      },
      es: {
        slug: "securpharm-nmvs-verificacion-medicamentos",
        title: "Integración securPharm/NMVS: experiencia transferible a SEVeM",
        description: "Integración productiva de flujos de gestión y manipulación de medicamentos con el NMVS alemán para verificación, desactivación, reversión y gestión robusta de errores, con patrones técnicos transferibles al entorno español SEVeM.",
        additionalTechnologies: [
          "SEVeM"
        ],
        sections: [
          {
            heading: "Contexto",
            paragraphs: [
              "Los envases de medicamentos con receta de la cadena legal se verifican contra un repositorio nacional. En el software utilizado por farmacias y centros de producción de blísteres, esta comprobación debe integrarse en los procesos de recepción, dispensación y producción de blísteres sin ocultar errores del repositorio ni dejar ambiguo el estado del envase.",
              "La integración se implementó en producción para el entorno alemán securPharm/NMVS. El diseño se apoya en el marco europeo EMVS, por lo que sus patrones de lectura de GS1 DataMatrix, identificación de producto, autenticación y tratamiento de respuestas son reutilizables al adaptar una solución para SEVeM."
            ]
          },
          {
            heading: "Diseño de la integración",
            paragraphs: [
              "Desarrollé una integración JSON-RPC sobre HTTP/cURL con solicitudes firmadas mediante HMAC. Procesa datos GS1/DataMatrix con identificadores GTIN y PPN y admite verificación, dispensación o desactivación y operaciones de reversión.",
              "La integración diferencia los fallos de transporte, las respuestas del repositorio y los resultados de negocio. Así, el flujo de farmacia o producción de blísteres puede decidir si continúa, reintenta, utiliza un procedimiento alternativo aprobado o requiere intervención del operador."
            ]
          },
          {
            heading: "Errores y trazabilidad",
            paragraphs: [
              "Los logs estructurados registran el contexto relevante y el resultado sin repartir los detalles del protocolo por toda la aplicación. La gestión explícita de errores y los flujos alternativos hacen visible y diagnosticable cualquier funcionamiento degradado.",
              "Las pruebas unitarias y de integración cubren operaciones correctas, solicitudes rechazadas, fallos de comunicación y respuestas simuladas del repositorio."
            ]
          },
          {
            heading: "Relevancia para España",
            paragraphs: [
              "La experiencia productiva se obtuvo con securPharm/NMVS en Alemania. Como SEVeM forma parte de la misma arquitectura europea EMVS y utiliza los mismos conceptos operativos—identificadores únicos, verificación, desactivación, reversión, comunicación autenticada y gestión de alertas—este patrón de integración puede adaptarse al entorno español sin partir de cero."
            ]
          }
        ]
      }
    }
  },
  {
    id: "legacy",
    technologies: [
      "PHP",
      "CakePHP",
      "MySQL/MariaDB",
      "Incremental modernization",
      "External API integration",
      "PHPUnit",
      "Fixtures",
      "Mocked integrations",
      "Structured logging",
      "Linux",
      "systemd"
    ],
    locales: {
      en: {
        slug: "legacy-php-healthcare-modernization",
        title: "Modernizing legacy PHP software for medication management and blister production",
        description: "Incremental modernization of medication-management and blister-production applications through controlled integration boundaries, automated tests, logging, and production-focused operations.",
        sections: [
          {
            heading: "Context",
            paragraphs: [
              "Business-critical pharmaceutical workflow software often combines long-lived application code, newer framework components, database-backed workflows, and external integrations that cannot all be replaced at once. The primary risk is not age by itself, but changing interconnected behavior without enough observability or regression protection.",
              "In this case, modern and legacy CakePHP patterns—including Table and Entity models—coexisted within the same applications and supported daily medication and stock workflows."
            ]
          },
          {
            heading: "Modernization approach",
            paragraphs: [
              "I use incremental changes around clear integration boundaries instead of a disruptive rewrite. External services are isolated behind explicit interfaces, error handling is made visible, and new behavior is introduced in small units that can be reviewed and tested.",
              "Where old and new application structures coexist, the implementation respects the existing data model while moving new logic toward clearer responsibilities."
            ]
          },
          {
            heading: "Regression protection",
            paragraphs: [
              "PHPUnit tests, database fixtures, and mocked external integrations protect business workflows and failure paths. Integration tests verify behavior across application and service boundaries, while structured logs provide evidence when production behavior differs from a test environment.",
              "This combination is particularly important in healthcare and pharmaceutical operations software, where a technically successful request may still represent a business-level rejection that must be handled explicitly."
            ]
          },
          {
            heading: "Production ownership",
            paragraphs: [
              "Modernization also includes the Linux services that support the application. systemd configuration, restart behavior, operational logs, and production troubleshooting are treated as part of the delivered software.",
              "The result is a safer path for extending established systems: new integrations and workflows can be added without requiring a high-risk replacement of the complete application."
            ]
          }
        ]
      },
      de: {
        slug: "legacy-php-gesundheits-it-modernisierung",
        title: "Modernisierung von Legacy-PHP-Software für Medikationsmanagement und Blisterproduktion",
        description: "Schrittweise Modernisierung von Anwendungen für Medikationsmanagement und Blisterproduktion durch kontrollierte Integrationsgrenzen, automatisierte Tests, Logging und produktionsnahen Betrieb.",
        sections: [
          {
            heading: "Ausgangssituation",
            paragraphs: [
              "Geschäftskritische Software für pharmazeutische Abläufe verbindet häufig langlebigen Anwendungscode, neuere Framework-Komponenten, datenbankgestützte Abläufe und externe Integrationen, die nicht gleichzeitig ersetzt werden können. Das Hauptrisiko ist nicht das Alter allein, sondern die Änderung vernetzter Abläufe ohne ausreichende Beobachtbarkeit und Regressionstests.",
              "In diesem Fall bestanden moderne und ältere CakePHP-Strukturen, darunter Table- und Entity-Modelle, innerhalb derselben Anwendungen nebeneinander und unterstützten tägliche Arzneimittel- und Bestandsprozesse."
            ]
          },
          {
            heading: "Modernisierungsansatz",
            paragraphs: [
              "Ich setze auf schrittweise Änderungen entlang klarer Integrationsgrenzen statt auf eine disruptive Komplettneuentwicklung. Externe Dienste werden hinter eindeutigen Schnittstellen isoliert, Fehlerzustände sichtbar gemacht und neue Funktionen in kleinen, prüf- und testbaren Einheiten eingeführt.",
              "Wenn alte und neue Anwendungsstrukturen nebeneinander bestehen, respektiert die Implementierung das vorhandene Datenmodell und verschiebt neue Logik gleichzeitig in Bereiche mit klareren Verantwortlichkeiten."
            ]
          },
          {
            heading: "Schutz vor Regressionen",
            paragraphs: [
              "PHPUnit-Tests, Datenbank-Fixtures und simulierte externe Integrationen schützen Geschäftsabläufe und Fehlerpfade. Integrationstests prüfen das Verhalten über Anwendungs- und Servicegrenzen hinweg; strukturierte Logs liefern Hinweise, wenn sich das Produktivverhalten von der Testumgebung unterscheidet.",
              "Diese Kombination ist bei Software für das Gesundheitswesen und pharmazeutische Abläufe besonders wichtig, weil eine technisch erfolgreiche Anfrage dennoch eine fachliche Ablehnung darstellen kann, die explizit behandelt werden muss."
            ]
          },
          {
            heading: "Verantwortung im Produktivbetrieb",
            paragraphs: [
              "Die Modernisierung umfasst auch die Linux-Dienste, die die Anwendung unterstützen. systemd-Konfiguration, Neustartverhalten, Betriebsprotokolle und Fehleranalyse in Produktion werden als Bestandteil der ausgelieferten Software behandelt.",
              "So entsteht ein sicherer Weg zur Weiterentwicklung etablierter Systeme: Neue Integrationen und Abläufe können ergänzt werden, ohne die gesamte Anwendung mit hohem Risiko ersetzen zu müssen."
            ]
          }
        ]
      },
      es: {
        slug: "modernizacion-php-legacy-software-sanitario",
        title: "Modernización de software PHP legacy para gestión de la medicación y producción de blísteres",
        description: "Modernización incremental de aplicaciones para gestión de la medicación y producción de blísteres mediante límites de integración controlados, pruebas automatizadas, logs y operación orientada a producción.",
        sections: [
          {
            heading: "Contexto",
            paragraphs: [
              "El software crítico para procesos farmacéuticos suele combinar código de larga vida, componentes más recientes del framework, procesos respaldados por base de datos e integraciones externas que no pueden sustituirse todas a la vez. El principal riesgo no es la antigüedad por sí sola, sino cambiar comportamientos interconectados sin suficiente observabilidad ni protección contra regresiones.",
              "En este caso coexistían patrones modernos y legacy de CakePHP, entre ellos los modelos Table y Entity, dentro de las mismas aplicaciones, que daban soporte a procesos diarios de medicamentos y existencias."
            ]
          },
          {
            heading: "Enfoque de modernización",
            paragraphs: [
              "Aplico cambios incrementales alrededor de límites de integración claros en lugar de una reescritura disruptiva. Los servicios externos se aíslan tras interfaces explícitas, los errores se hacen visibles y el nuevo comportamiento se introduce en unidades pequeñas que pueden revisarse y probarse.",
              "Cuando conviven estructuras antiguas y nuevas, la implementación respeta el modelo de datos existente y desplaza la lógica nueva hacia responsabilidades más claras."
            ]
          },
          {
            heading: "Protección contra regresiones",
            paragraphs: [
              "Las pruebas PHPUnit, los fixtures de base de datos y las integraciones externas simuladas protegen los procesos de negocio y las rutas de error. Las pruebas de integración verifican el comportamiento entre la aplicación y los servicios, mientras que los logs estructurados aportan evidencia cuando producción difiere del entorno de pruebas.",
              "Esta combinación es especialmente importante en software sanitario y de operaciones farmacéuticas, donde una solicitud técnicamente correcta puede representar un rechazo de negocio que debe gestionarse de forma explícita."
            ]
          },
          {
            heading: "Responsabilidad en producción",
            paragraphs: [
              "La modernización incluye también los servicios Linux que soportan la aplicación. La configuración de systemd, los reinicios, los logs operativos y el diagnóstico en producción se tratan como parte del software entregado.",
              "El resultado es una vía más segura para ampliar sistemas establecidos: se pueden añadir integraciones y flujos sin asumir el riesgo de sustituir toda la aplicación."
            ]
          }
        ]
      }
    }
  },
  {
    id: "totp",
    datePublished: "2026-08-09",
    technologies: [
      "PHP",
      "CakePHP",
      "2FA",
      "TOTP",
      "HOTP",
      "RFC 6238",
      "RFC 4226",
      "Google Authenticator",
      "Authentication middleware",
      "Session security",
      "Trusted devices",
      "RBAC",
      "Database migrations",
      "PHPUnit",
      "Security testing",
      "Responsive UI",
      "Accessibility"
    ],
    locales: {
      en: {
        slug: "totp-2fa-patient-data-security",
        title: "TOTP-based 2FA for patient-data protection in TABChat",
        description: "Standards-based two-factor authentication for a medical web application, with authenticator-app provisioning, CakePHP integration, RBAC-controlled flows, trusted devices, migrations, and security testing.",
        sections: [
          {
            heading: "Context",
            paragraphs: [
              "TABChat is a cloud medical web application used with patient data. In the context of Germany's Digital-Gesetz (DigiG), the project ticket called for two-factor authentication to strengthen access protection for cloud systems that handle this data.",
              "The implementation had to fit the application's existing authentication flow, roles, and access rights. It also needed practical user and administrator workflows across different browsers and terminals rather than a standalone code-checking screen."
            ]
          },
          {
            heading: "Standards and provisioning",
            paragraphs: [
              "I implemented TOTP as specified in RFC 6238, which builds on HOTP as defined by RFC 4226. The solution works with Google Authenticator and compatible authenticator applications.",
              "The setup flow generates and manages a TOTP secret for each user, provides QR-based provisioning, and validates one-time codes before 2FA is activated for the account."
            ]
          },
          {
            heading: "Authentication and session security",
            paragraphs: [
              "I integrated 2FA into the existing CakePHP application through Middleware, Controllers, Helpers, and ORM-backed state. The implementation handles cookies, session state, login and logout behavior, and security-sensitive transitions explicitly.",
              "Trusted sessions are kept separately for each browser or terminal. A successful second factor can establish trust for 24 hours, while an administrator can revoke that state and force the user through 2FA again."
            ]
          },
          {
            heading: "Authorization, migrations, and testing",
            paragraphs: [
              "Role and access-right checks govern user and administrative actions for enabling, disabling, and enforcing 2FA. Database migrations introduced the required security fields and permissions while accounting for compatibility issues in the existing system.",
              "PHPUnit tests cover authentication middleware, controllers, and negative scenarios. Functional testing checks different roles, browsers, and terminals; the responsive setup interface also accounts for accessibility requirements around images and QR codes."
            ]
          }
        ]
      },
      de: {
        slug: "totp-2fa-patientendaten-sicherheit",
        title: "TOTP-basierte 2FA zum Schutz von Patientendaten in TABChat",
        description: "Standardbasierte Zwei-Faktor-Authentifizierung für eine medizinische Webanwendung mit Einrichtung per Authenticator-App, CakePHP-Integration, rollen- und rechtegesteuerten Abläufen, vertrauenswürdigen Geräten, Migrationen und Sicherheitstests.",
        sections: [
          {
            heading: "Ausgangssituation",
            paragraphs: [
              "TABChat ist eine medizinische Cloud-Webanwendung, die mit Patientendaten arbeitet. Im Kontext des deutschen Digital-Gesetzes (DigiG) verlangte das Projektticket eine Zwei-Faktor-Authentifizierung, um den Zugang zu Cloud-Systemen mit solchen Daten besser zu schützen.",
              "Die Implementierung musste sich in den bestehenden Authentifizierungsablauf sowie in Rollen und Zugriffsrechte einfügen. Außerdem waren praxistaugliche Benutzer- und Administrationsabläufe für unterschiedliche Browser und Terminals erforderlich, nicht nur eine isolierte Codeprüfung."
            ]
          },
          {
            heading: "Standards und Einrichtung",
            paragraphs: [
              "Ich implementierte TOTP gemäß RFC 6238, das auf dem in RFC 4226 definierten HOTP basiert. Die Lösung funktioniert mit Google Authenticator und kompatiblen Authenticator-Apps.",
              "Der Einrichtungsablauf erzeugt und verwaltet für jeden Benutzer ein TOTP-Secret, stellt die Konfiguration per QR-Code bereit und prüft Einmalcodes, bevor 2FA für das Konto aktiviert wird."
            ]
          },
          {
            heading: "Authentifizierungs- und Sitzungssicherheit",
            paragraphs: [
              "Ich integrierte 2FA über Middleware, Controller, Helper und ORM-gestützte Zustände in die bestehende CakePHP-Anwendung. Cookies, Session-Zustand, Login und Logout sowie sicherheitskritische Zustandswechsel werden dabei explizit behandelt.",
              "Vertrauenswürdige Sitzungen werden für jeden Browser beziehungsweise jedes Terminal getrennt geführt. Nach erfolgreichem zweiten Faktor kann ein Gerät für 24 Stunden als vertrauenswürdig gelten; ein Administrator kann diesen Zustand widerrufen und eine erneute 2FA erzwingen."
            ]
          },
          {
            heading: "Berechtigungen, Migrationen und Tests",
            paragraphs: [
              "Rollen- und Zugriffsprüfungen steuern die Benutzer- und Administrationsaktionen zum Aktivieren, Deaktivieren und Erzwingen von 2FA. Datenbankmigrationen führten die notwendigen Sicherheitsfelder und Rechte ein und berücksichtigten dabei Kompatibilitätsprobleme des bestehenden Systems.",
              "PHPUnit-Tests decken Authentifizierungs-Middleware, Controller und Negativszenarien ab. Funktionale Tests prüfen unterschiedliche Rollen, Browser und Terminals; die responsive Einrichtungsoberfläche berücksichtigt außerdem Anforderungen an die Barrierefreiheit von Bildern und QR-Codes."
            ]
          }
        ]
      },
      es: {
        slug: "totp-2fa-seguridad-datos-pacientes",
        title: "2FA basada en TOTP para proteger datos de pacientes en TABChat",
        description: "Autenticación de dos factores basada en estándares para una aplicación web sanitaria, con configuración mediante aplicaciones de autenticación, integración con CakePHP, flujos sujetos a roles y permisos, dispositivos de confianza, migraciones y pruebas de seguridad.",
        sections: [
          {
            heading: "Contexto",
            paragraphs: [
              "TABChat es una aplicación web sanitaria en la nube que trabaja con datos de pacientes. En el contexto de la ley alemana Digital-Gesetz (DigiG), el ticket del proyecto exigía autenticación de dos factores para reforzar el acceso a sistemas en la nube que tratan estos datos.",
              "La implementación debía integrarse en el flujo de autenticación, los roles y los permisos existentes. También tenía que ofrecer procesos prácticos para usuarios y administradores en distintos navegadores y terminales, no limitarse a una pantalla aislada para comprobar códigos."
            ]
          },
          {
            heading: "Estándares y configuración",
            paragraphs: [
              "Implementé TOTP conforme a RFC 6238, basado en HOTP según RFC 4226. La solución funciona con Google Authenticator y otras aplicaciones de autenticación compatibles.",
              "El proceso genera y gestiona un secreto TOTP para cada usuario, facilita la configuración mediante código QR y valida los códigos de un solo uso antes de activar la 2FA en la cuenta."
            ]
          },
          {
            heading: "Seguridad de autenticación y sesiones",
            paragraphs: [
              "Integré la 2FA en la aplicación CakePHP existente mediante Middleware, Controllers, Helpers y estado persistido con ORM. La implementación gestiona de forma explícita las cookies, el estado de sesión, el inicio y cierre de sesión y las transiciones de estado sensibles para la seguridad.",
              "Las sesiones de confianza se mantienen por separado para cada navegador o terminal. Tras superar el segundo factor, un dispositivo puede conservar la confianza durante 24 horas; un administrador puede revocarla y obligar al usuario a repetir la 2FA."
            ]
          },
          {
            heading: "Permisos, migraciones y pruebas",
            paragraphs: [
              "Las comprobaciones de roles y permisos controlan las acciones de usuarios y administradores para activar, desactivar y exigir la 2FA. Las migraciones de base de datos añadieron los campos de seguridad y permisos necesarios, teniendo en cuenta problemas de compatibilidad con el sistema existente.",
              "Las pruebas con PHPUnit cubren el middleware de autenticación, los controladores y los escenarios negativos. Las pruebas funcionales verifican distintos roles, navegadores y terminales; la interfaz responsive de configuración también contempla requisitos de accesibilidad para imágenes y códigos QR."
            ]
          }
        ]
      }
    }
  }
];

module.exports = {
  caseStudies,
  localeMeta
};
