"use strict";

const localeMeta = {
  en: {
    directory: "en",
    section: "case-studies",
    label: "Technical case study",
    backLabel: "Back to CV",
    technologiesLabel: "Technologies and concepts",
    relatedLabel: "Related case studies"
  },
  de: {
    directory: "de",
    section: "fallstudien",
    label: "Technische Fallstudie",
    backLabel: "Zurück zum Lebenslauf",
    technologiesLabel: "Technologien und Konzepte",
    relatedLabel: "Weitere Fallstudien"
  },
  es: {
    directory: "es",
    section: "casos",
    label: "Caso técnico",
    backLabel: "Volver al CV",
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
        title: "WWKS2 integration with an automated pharmacy warehouse",
        description: "An asynchronous service connecting pharmacy software with BD Rowa storage systems through WWKS2, TCP, XML, and recoverable message processing.",
        sections: [
          {
            heading: "Context",
            paragraphs: [
              "Pharmacy software must coordinate medication intake, storage, dispensing, returns, stock control, and operational tasks with an automated warehouse. The integration is part of daily pharmacy work, so connection failures and delayed responses cannot be treated as exceptional edge cases.",
              "The warehouse interface used WWKS2 messages over a persistent TCP connection. Several requests could be in flight while responses arrived asynchronously, which made reliable message correlation and controlled buffering essential."
            ]
          },
          {
            heading: "Engineering approach",
            paragraphs: [
              "I built an asynchronous PHP service that separates pharmacy workflows from the device connection. It sends and receives XML messages, correlates responses with their originating requests, and maintains explicit queues instead of relying on synchronous request-response assumptions.",
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
              "The service provides a durable boundary between business workflows and warehouse automation. Pharmacy applications can initiate operational actions without embedding device-connection complexity throughout the application code."
            ]
          }
        ]
      },
      de: {
        slug: "wwks2-apothekenlager-integration",
        title: "WWKS2-Integration mit einem automatisierten Apothekenlager",
        description: "Ein asynchroner Dienst verbindet Apothekensoftware über WWKS2, TCP, XML und wiederanlauffähige Nachrichtenverarbeitung mit BD-Rowa-Lagersystemen.",
        sections: [
          {
            heading: "Ausgangssituation",
            paragraphs: [
              "Apothekensoftware muss Wareneingang, Einlagerung, Abgabe, Rückgaben, Bestandskontrolle und operative Aufgaben mit einem automatisierten Lager koordinieren. Die Integration ist Teil des täglichen Apothekenbetriebs; Verbindungsabbrüche und verzögerte Antworten dürfen deshalb nicht wie seltene Ausnahmefälle behandelt werden.",
              "Die Lagerschnittstelle verwendet WWKS2-Nachrichten über eine dauerhafte TCP-Verbindung. Mehrere Anfragen können gleichzeitig aktiv sein, während Antworten asynchron eintreffen. Eine zuverlässige Nachrichtenkorrelation und kontrollierte Pufferung sind daher entscheidend."
            ]
          },
          {
            heading: "Technischer Ansatz",
            paragraphs: [
              "Ich entwickelte einen asynchronen PHP-Dienst, der die Geschäftsabläufe der Apotheke von der Geräteverbindung trennt. Er sendet und empfängt XML-Nachrichten, ordnet Antworten den ursprünglichen Anfragen zu und verwaltet explizite Warteschlangen anstelle synchroner Request-Response-Annahmen.",
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
              "Der Dienst bildet eine belastbare Grenze zwischen Geschäftsprozessen und Lagerautomatisierung. Apothekenanwendungen können operative Aktionen auslösen, ohne die Komplexität der Geräteverbindung im gesamten Anwendungscode zu verteilen."
            ]
          }
        ]
      },
      es: {
        slug: "integracion-wwks2-almacen-farmacia",
        title: "Integración WWKS2 con un almacén automatizado de farmacia",
        description: "Un servicio asíncrono conecta el software de farmacia con sistemas de almacenamiento BD Rowa mediante WWKS2, TCP, XML y procesamiento recuperable de mensajes.",
        sections: [
          {
            heading: "Contexto",
            paragraphs: [
              "El software de farmacia debe coordinar la recepción, el almacenamiento, la dispensación, las devoluciones, el control de existencias y las tareas operativas con un almacén automatizado. La integración forma parte del trabajo diario, por lo que los fallos de conexión y las respuestas tardías no pueden tratarse como casos excepcionales.",
              "La interfaz del almacén utilizaba mensajes WWKS2 sobre una conexión TCP persistente. Podía haber varias solicitudes en curso mientras las respuestas llegaban de forma asíncrona, lo que hacía imprescindibles la correlación fiable de mensajes y un buffering controlado."
            ]
          },
          {
            heading: "Enfoque técnico",
            paragraphs: [
              "Desarrollé un servicio PHP asíncrono que separa los flujos de trabajo de farmacia de la conexión con el dispositivo. Envía y recibe mensajes XML, relaciona cada respuesta con su solicitud original y mantiene colas explícitas en lugar de asumir un intercambio síncrono.",
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
              "El servicio crea una frontera robusta entre los procesos de negocio y la automatización del almacén. Las aplicaciones de farmacia pueden iniciar operaciones sin distribuir la complejidad de conexión con el dispositivo por todo el código."
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
        description: "Integration of pharmacy workflows with the German NMVS for medication verification, dispensing, undo operations, and resilient error handling.",
        sections: [
          {
            heading: "Context",
            paragraphs: [
              "Prescription medicine packs in the legal supply chain are verified against a national repository. In a pharmacy application this check must fit into existing intake and dispensing workflows without hiding repository errors or leaving pack state ambiguous.",
              "The implemented integration targeted the German securPharm/NMVS environment. It needed to read GS1 DataMatrix information, support different product identifiers, authenticate requests, and represent repository responses clearly to the surrounding application."
            ]
          },
          {
            heading: "Integration design",
            paragraphs: [
              "I built a JSON-RPC integration over HTTP/cURL with HMAC-signed requests. It processes GS1/DataMatrix data with GTIN and PPN identifiers and supports medication verification, dispensing or decommissioning, and undo actions.",
              "The integration keeps transport failures, repository responses, and business-level outcomes distinct. This allows the pharmacy workflow to decide whether to continue, retry, use an approved fallback, or require operator attention."
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
        description: "Integration von Apothekenabläufen mit dem deutschen NMVS für Arzneimittelverifikation, Ausbuchung, Rücknahme und robuste Fehlerbehandlung.",
        sections: [
          {
            heading: "Ausgangssituation",
            paragraphs: [
              "Verschreibungspflichtige Arzneimittelpackungen in der legalen Lieferkette werden gegen ein nationales Repository geprüft. In einer Apothekenanwendung muss diese Prüfung in bestehende Wareneingangs- und Abgabeprozesse passen, ohne Fehler des Repositories zu verbergen oder den Packungsstatus unklar zu lassen.",
              "Die implementierte Integration war für die deutsche securPharm/NMVS-Umgebung bestimmt. Sie musste GS1-DataMatrix-Daten lesen, unterschiedliche Produktkennungen unterstützen, Anfragen authentifizieren und Antworten des Repositories für die umgebende Anwendung eindeutig darstellen."
            ]
          },
          {
            heading: "Integrationsdesign",
            paragraphs: [
              "Ich entwickelte eine JSON-RPC-Integration über HTTP/cURL mit HMAC-signierten Anfragen. Sie verarbeitet GS1/DataMatrix-Daten mit GTIN- und PPN-Kennungen und unterstützt Verifikation, Ausbuchung bei der Abgabe sowie Rücknahmeaktionen.",
              "Transportfehler, Repository-Antworten und fachliche Ergebnisse werden getrennt behandelt. Dadurch kann der Apothekenprozess entscheiden, ob er fortfährt, einen erneuten Versuch startet, einen freigegebenen Fallback verwendet oder eine manuelle Prüfung verlangt."
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
        description: "Integración productiva de flujos de farmacia con el NMVS alemán para verificación, dispensación, reversión y gestión robusta de errores, con patrones técnicos transferibles al entorno español SEVeM.",
        additionalTechnologies: [
          "SEVeM"
        ],
        sections: [
          {
            heading: "Contexto",
            paragraphs: [
              "Los envases de medicamentos con receta de la cadena legal se verifican contra un repositorio nacional. En una aplicación de farmacia, esta comprobación debe integrarse en los procesos existentes de recepción y dispensación sin ocultar errores del repositorio ni dejar ambiguo el estado del envase.",
              "La integración se implementó en producción para el entorno alemán securPharm/NMVS. El diseño se apoya en el marco europeo EMVS, por lo que sus patrones de lectura de GS1 DataMatrix, identificación de producto, autenticación y tratamiento de respuestas son reutilizables al adaptar una solución para SEVeM."
            ]
          },
          {
            heading: "Diseño de la integración",
            paragraphs: [
              "Desarrollé una integración JSON-RPC sobre HTTP/cURL con solicitudes firmadas mediante HMAC. Procesa datos GS1/DataMatrix con identificadores GTIN y PPN y admite verificación, dispensación o desactivación y operaciones de reversión.",
              "La integración diferencia los fallos de transporte, las respuestas del repositorio y los resultados de negocio. Así, el flujo de farmacia puede decidir si continúa, reintenta, utiliza un procedimiento alternativo aprobado o requiere intervención del operador."
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
        title: "Modernizing business-critical legacy PHP healthcare software",
        description: "Incremental modernization of pharmacy and healthcare applications through controlled integration boundaries, automated tests, logging, and production-focused operations.",
        sections: [
          {
            heading: "Context",
            paragraphs: [
              "Business-critical pharmacy software often combines long-lived application code, current CakePHP components, database-backed workflows, and external systems that cannot all be replaced at once. The primary risk is not age by itself, but changing interconnected behavior without enough observability or regression protection.",
              "The applications included both modern and legacy CakePHP patterns, including Table and Entity models, and supported daily medication and stock workflows."
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
              "This combination is particularly important in healthcare and pharmacy software, where a technically successful request may still represent a business-level rejection that must be handled explicitly."
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
        title: "Modernisierung geschäftskritischer Legacy-PHP-Software im Gesundheitswesen",
        description: "Schrittweise Modernisierung von Apotheken- und Gesundheitsanwendungen durch kontrollierte Integrationsgrenzen, automatisierte Tests, Logging und produktionsnahen Betrieb.",
        sections: [
          {
            heading: "Ausgangssituation",
            paragraphs: [
              "Geschäftskritische Apothekensoftware verbindet häufig langlebigen Anwendungscode, aktuelle CakePHP-Komponenten, datenbankgestützte Abläufe und externe Systeme, die nicht gleichzeitig ersetzt werden können. Das Hauptrisiko ist nicht das Alter allein, sondern die Änderung vernetzter Abläufe ohne ausreichende Beobachtbarkeit und Regressionstests.",
              "Die Anwendungen enthielten moderne und ältere CakePHP-Strukturen, darunter Table- und Entity-Modelle, und unterstützten tägliche Arzneimittel- und Bestandsprozesse."
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
              "Diese Kombination ist bei Gesundheits- und Apothekensoftware besonders wichtig, weil eine technisch erfolgreiche Anfrage dennoch eine fachliche Ablehnung darstellen kann, die explizit behandelt werden muss."
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
        title: "Modernización de software sanitario crítico basado en PHP legacy",
        description: "Modernización incremental de aplicaciones de farmacia y sanidad mediante límites de integración controlados, pruebas automatizadas, logs y operación orientada a producción.",
        sections: [
          {
            heading: "Contexto",
            paragraphs: [
              "El software crítico de farmacia suele combinar código de larga vida, componentes actuales de CakePHP, procesos respaldados por base de datos y sistemas externos que no pueden sustituirse todos a la vez. El principal riesgo no es la antigüedad por sí sola, sino cambiar comportamientos interconectados sin suficiente observabilidad ni protección contra regresiones.",
              "Las aplicaciones incluían patrones modernos y legacy de CakePHP, entre ellos modelos Table y Entity, y daban soporte a procesos diarios de medicamentos y existencias."
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
              "Esta combinación es especialmente importante en software sanitario y farmacéutico, donde una solicitud técnicamente correcta puede representar un rechazo de negocio que debe gestionarse de forma explícita."
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
  }
];

module.exports = {
  caseStudies,
  localeMeta
};
