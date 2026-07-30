(function () {
  "use strict";

  var supportedLanguages = ["en", "de", "es", "fr", "uk", "ru"];
  var languagePathAliases = {
    en: "en",
    de: "de",
    es: "es",
    fr: "fr",
    uk: "uk",
    ru: "ru"
  };
  var cookieName = "resume_language";
  var cookieLifetime = 60 * 60 * 24 * 365;

  var translations = {
    en: {
      meta_title: "Nick Mitin — Senior Software Engineer",
      meta_description: "Senior Software Engineer focused on PHP backend development, system integration, pharmacy automation, pharmaceutical logistics, and Linux-based services.",
      language_selector: "Choose language",
      nav_summary: "Summary",
      nav_skills: "Technical skills",
      nav_experience: "Professional experience",
      nav_projects: "Selected projects",
      nav_education: "Education",
      header_role: "Senior Software Engineer",
      section_summary: "Summary",
      summary_heading: "PHP Backend & System Integration",
      summary_lead: "I build and modernize business-critical and legacy applications.",
      summary_body: "Since 2024, my work has focused on pharmacy automation, medication verification, pharmaceutical logistics, and automated warehouse systems. I also bring extensive experience in VoIP, telecom billing, and Linux-based services.",
      summary_languages_label: "Languages:",
      summary_languages: "English (B2), German (B1, currently learning), Ukrainian (native), Russian (fluent).",
      section_skills: "Skills",
      skills_ai_development: "AI-Assisted Development",
      skills_programming_data: "Programming & Data",
      skills_backend_web: "Backend & Web",
      skills_async_programming: "asynchronous programming",
      skills_event_architecture: "event-driven architecture",
      skills_testing: "Testing",
      skills_unit_testing: "unit testing",
      skills_integration_testing: "integration testing",
      skills_fixture_testing: "fixture-based testing",
      skills_regression_testing: "regression testing",
      skills_mocking: "mocking external integrations",
      skills_systems_integration: "Systems & Integration",
      skills_async_services: "asynchronous services",
      skills_external_api: "external API integration",
      skills_xml_protocols: "XML-based protocols",
      skills_production_logging: "production logging and troubleshooting",
      section_experience: "Professional Experience",
      present: "Present",
      pdms_role: "Software Engineer",
      pdms_company: "PDMS GmbH, Germany",
      pdms_summary: "Build and maintain business-critical software for pharmacy automation, pharmaceutical logistics, and automated medication storage.",
      pdms_item_1: "Work on both modern and legacy CakePHP applications, including systems built with CakePHP's Table and Entity models.",
      pdms_item_2: "Built a securPharm/NMVS integration with JSON-RPC, HTTP/cURL, and HMAC-signed requests. It validates GS1/DataMatrix codes with GTIN and PPN identifiers, supports medication verification, dispensing, and undo actions, and includes error handling, structured logging, and fallback workflows.",
      pdms_item_3: "Built a WWKS2 service that connects pharmacy software to BD Rowa warehouse systems using asynchronous TCP communication and XML messages. It handles message correlation, buffering, backpressure, retries, and connection recovery.",
      pdms_item_4: "Connected external services to day-to-day workflows for medication intake, storage, returns, dispensing, stock control, and task tracking.",
      pdms_item_5: "Write unit and integration tests with PHPUnit, fixtures, and mocked integrations. Maintain the supporting Linux services with systemd and troubleshoot production issues.",
      technion_role: "Embedded Software Engineer",
      technion_company: "Technion – Israel Institute of Technology",
      technion_item_1: "Designed and built inter-module communication interfaces for small satellites based on Atmel microcontrollers.",
      technion_item_2: "Wrote low-level firmware for data exchange between satellite modules.",
      lighttelecom_role: "Co-founder & Head of Technical Department",
      lighttelecom_company: "LightTelecom Ltd, Ukraine",
      lighttelecom_item_1: "Led the implementation of IP PBX and telecommunications billing systems for medium and large companies.",
      lighttelecom_item_2: "Integrated telephony platforms with customers' CRM systems and other business applications.",
      lighttelecom_item_3: "Managed and supported 40+ customer installations in production.",
      store_role: "Owner and Chief Executive Officer",
      store_company: "Computer equipment store",
      store_item_1: "Managed the store, day-to-day operations, and business development.",
      store_item_2: "Built and ran the company's online store.",
      wellconstruction_role: "Research Assistant & Software Engineer",
      wellconstruction_company: "WellConstruction Ltd., Ukraine",
      wellconstruction_item_1: "Developed software that automated construction cost estimates.",
      wellconstruction_item_2: "Built and evolved the system using Turbo Pascal → Object Pascal / Delphi, C++, and PostScript.",
      section_projects: "Selected Projects /",
      section_open_source: "Open Source",
      case_studies_heading: "Healthcare Software Case Studies",
      case_wwks2_title: "WWKS2 integration with an automated pharmacy warehouse",
      case_nmvs_title: "securPharm/NMVS medication verification integration",
      case_legacy_title: "Modernizing business-critical legacy PHP healthcare software",
      webrtc_role: "Author of WebRTC SIP Phone extension",
      webrtc_description: "Develop and maintain a JavaScript/WebRTC browser extension that lets call centers and other businesses place SIP calls by clicking phone numbers on web pages.",
      chrome_store: "Chrome Web Store:",
      sip_role: "Owner and Developer",
      sip_description: "Cloud IP PBX service at",
      sip_item_1: "Develop and operate the Linux/Asterisk/A2Billing platform.",
      sip_item_2: "Handle production operations and customer support.",
      a2billing_role: "Maintainer of A2Billing",
      a2billing_description: "Maintain an AGPLv3 telecom billing platform for Asterisk and use it to build and support PHP/MySQL billing and PBX systems.",
      source_code: "Source code:",
      section_education: "Education",
      education_university: "Kyiv National University of Construction and Architecture",
      faculty_label: "Faculty:",
      faculty_name: "Automation and Information Technology",
      degree_label: "Degree:",
      degree_name: "M.Sc. in Automation and Computer-Integrated Technologies",
      university_website: "University website:",
      last_updated: "Last updated: 29 July 2026"
    },
    de: {
      meta_title: "Nick Mitin — Senior Softwareentwickler",
      meta_description: "Senior Softwareentwickler mit Schwerpunkt auf PHP-Backend-Entwicklung, Systemintegration, Apothekenautomatisierung, Pharmalogistik und Linux-basierten Diensten.",
      language_selector: "Sprache auswählen",
      nav_summary: "Profil",
      nav_skills: "Technische Kenntnisse",
      nav_experience: "Berufserfahrung",
      nav_projects: "Ausgewählte Projekte",
      nav_education: "Ausbildung",
      header_role: "Senior Softwareentwickler",
      section_summary: "Profil",
      summary_heading: "PHP-Backend & Systemintegration",
      summary_lead: "Ich entwickle und modernisiere geschäftskritische Anwendungen und Legacy-Systeme.",
      summary_body: "Seit 2024 konzentriere ich mich auf Apothekenautomatisierung, Arzneimittelverifikation, Pharmalogistik und automatisierte Lagersysteme. Darüber hinaus bringe ich langjährige Erfahrung mit VoIP, Telekommunikationsabrechnung und Linux-basierten Diensten mit.",
      summary_languages_label: "Sprachen:",
      summary_languages: "Englisch (B2), Deutsch (B1, lerne ich aktuell weiter), Ukrainisch (Muttersprache), Russisch (fließend).",
      section_skills: "Kenntnisse",
      skills_ai_development: "KI-gestützte Softwareentwicklung",
      skills_programming_data: "Programmierung & Daten",
      skills_backend_web: "Backend & Web",
      skills_async_programming: "asynchrone Programmierung",
      skills_event_architecture: "ereignisgesteuerte Architektur",
      skills_testing: "Tests",
      skills_unit_testing: "Unit-Tests",
      skills_integration_testing: "Integrationstests",
      skills_fixture_testing: "fixturebasierte Tests",
      skills_regression_testing: "Regressionstests",
      skills_mocking: "Mocking externer Integrationen",
      skills_systems_integration: "Systeme & Integration",
      skills_async_services: "asynchrone Dienste",
      skills_external_api: "Anbindung externer APIs",
      skills_xml_protocols: "XML-basierte Protokolle",
      skills_production_logging: "Produktions-Logging und Fehleranalyse",
      section_experience: "Berufserfahrung",
      present: "heute",
      pdms_role: "Softwareentwickler",
      pdms_company: "PDMS GmbH, Deutschland",
      pdms_summary: "Ich entwickle und betreue geschäftskritische Software für Apothekenautomatisierung, Pharmalogistik und die automatisierte Lagerung von Arzneimitteln.",
      pdms_item_1: "Ich arbeite sowohl an modernen als auch an gewachsenen CakePHP-Anwendungen, darunter Systeme mit den Table- und Entity-Modellen von CakePHP.",
      pdms_item_2: "Ich habe eine securPharm-/NMVS-Integration mit JSON-RPC, HTTP/cURL und HMAC-signierten Anfragen entwickelt. Sie validiert GS1-/DataMatrix-Codes mit GTIN- und PPN-Kennungen, unterstützt Verifikation, Abgabe und Stornierung von Arzneimitteln und umfasst Fehlerbehandlung, strukturiertes Logging und Ausweichabläufe.",
      pdms_item_3: "Ich habe einen WWKS2-Dienst entwickelt, der Apothekensoftware über asynchrone TCP-Kommunikation und XML-Nachrichten mit Lagerautomaten von BD Rowa verbindet. Er kümmert sich um Nachrichtenzuordnung, Pufferung, Backpressure, Wiederholungsversuche und die Wiederherstellung abgebrochener Verbindungen.",
      pdms_item_4: "Ich habe externe Dienste in die täglichen Abläufe für Wareneingang, Einlagerung, Rückgaben, Abgabe, Bestandskontrolle und Aufgabenverfolgung eingebunden.",
      pdms_item_5: "Ich schreibe Unit- und Integrationstests mit PHPUnit, Fixtures und gemockten Anbindungen, betreue die zugehörigen Linux-Dienste mit systemd und analysiere Probleme im Produktivbetrieb.",
      technion_role: "Embedded-Softwareentwickler",
      technion_company: "Technion – Israel Institute of Technology",
      technion_item_1: "Ich habe Kommunikationsschnittstellen zwischen den Modulen kleiner Satelliten auf Basis von Atmel-Mikrocontrollern konzipiert und entwickelt.",
      technion_item_2: "Ich schrieb hardwarenahe Firmware für den Datenaustausch zwischen den Satellitenmodulen.",
      lighttelecom_role: "Mitgründer & Leiter der technischen Abteilung",
      lighttelecom_company: "LightTelecom Ltd, Ukraine",
      lighttelecom_item_1: "Ich leitete die Einführung von IP-Telefonanlagen und Telekommunikations-Abrechnungssystemen für mittlere und große Unternehmen.",
      lighttelecom_item_2: "Ich integrierte Telefonieplattformen in die CRM-Systeme und weitere Geschäftsanwendungen der Kunden.",
      lighttelecom_item_3: "Ich betreute und unterstützte mehr als 40 Kundeninstallationen im Produktivbetrieb.",
      store_role: "Inhaber und Geschäftsführer",
      store_company: "Computerfachgeschäft",
      store_item_1: "Ich leitete das Geschäft, das Tagesgeschäft und die Unternehmensentwicklung.",
      store_item_2: "Ich baute den Onlineshop des Unternehmens auf und betrieb ihn.",
      wellconstruction_role: "Wissenschaftlicher Mitarbeiter & Softwareentwickler",
      wellconstruction_company: "WellConstruction Ltd., Ukraine",
      wellconstruction_item_1: "Ich entwickelte Software zur Automatisierung von Baukostenschätzungen.",
      wellconstruction_item_2: "Ich entwickelte das System mit Turbo Pascal → Object Pascal / Delphi, C++ und PostScript kontinuierlich weiter.",
      section_projects: "Ausgewählte Projekte /",
      section_open_source: "Open Source",
      case_studies_heading: "Fallstudien zu Software im Gesundheitswesen",
      case_wwks2_title: "WWKS2-Integration mit einem automatisierten Apothekenlager",
      case_nmvs_title: "securPharm/NMVS-Integration zur Arzneimittelverifikation",
      case_legacy_title: "Modernisierung geschäftskritischer Legacy-PHP-Software im Gesundheitswesen",
      webrtc_role: "Entwickler der Browsererweiterung WebRTC SIP Phone",
      webrtc_description: "Ich entwickle und pflege eine JavaScript-/WebRTC-Browsererweiterung, mit der Callcenter und andere Unternehmen per Klick auf Telefonnummern in Webseiten SIP-Anrufe starten können.",
      chrome_store: "Chrome Web Store:",
      sip_role: "Inhaber und Entwickler",
      sip_description: "Cloud-IP-Telefonanlage unter",
      sip_item_1: "Ich entwickle und betreibe die Plattform auf Basis von Linux, Asterisk und A2Billing.",
      sip_item_2: "Ich kümmere mich um den Produktivbetrieb und den Kundensupport.",
      a2billing_role: "Maintainer von A2Billing",
      a2billing_description: "Ich pflege eine AGPLv3-lizenzierte Telekommunikations-Abrechnungsplattform für Asterisk und nutze sie zum Aufbau und Support von PHP-/MySQL-basierten Abrechnungs- und Telefonanlagen.",
      source_code: "Quellcode:",
      section_education: "Ausbildung",
      education_university: "Nationale Universität für Bauwesen und Architektur Kyjiw",
      faculty_label: "Fakultät:",
      faculty_name: "Automatisierung und Informationstechnologie",
      degree_label: "Abschluss:",
      degree_name: "M.Sc. in Automatisierung und computerintegrierten Technologien",
      university_website: "Website der Universität:",
      last_updated: "Zuletzt aktualisiert: 29. Juli 2026"
    },
    es: {
      meta_title: "Nick Mitin — Ingeniero de software sénior",
      meta_description: "Ingeniero de software sénior especializado en backend PHP, automatización de farmacias y verificación de medicamentos, con experiencia en securPharm/NMVS aplicable a SEVeM.",
      language_selector: "Elegir idioma",
      nav_summary: "Perfil",
      nav_skills: "Competencias técnicas",
      nav_experience: "Experiencia profesional",
      nav_projects: "Proyectos seleccionados",
      nav_education: "Formación académica",
      header_role: "Ingeniero de software sénior",
      section_summary: "Perfil",
      summary_heading: "Backend en PHP e integración de sistemas",
      summary_lead: "Desarrollo y modernizo aplicaciones críticas para el negocio y sistemas heredados.",
      summary_body: "Desde 2024, mi trabajo se centra en la automatización de farmacias, la verificación de medicamentos, la logística farmacéutica y los sistemas de almacén automatizados. Mi experiencia productiva con securPharm/NMVS en Alemania es transferible a integraciones con SEVeM en España dentro del marco europeo EMVS. También cuento con una amplia experiencia en VoIP, facturación de telecomunicaciones y servicios basados en Linux.",
      summary_languages_label: "Idiomas:",
      summary_languages: "inglés (B2), alemán (B1, sigo estudiándolo), ucraniano (nativo) y ruso (fluido).",
      section_skills: "Competencias",
      skills_ai_development: "Desarrollo asistido por IA",
      skills_programming_data: "Programación y datos",
      skills_backend_web: "Backend y web",
      skills_async_programming: "programación asíncrona",
      skills_event_architecture: "arquitectura basada en eventos",
      skills_testing: "Pruebas",
      skills_unit_testing: "pruebas unitarias",
      skills_integration_testing: "pruebas de integración",
      skills_fixture_testing: "pruebas con fixtures",
      skills_regression_testing: "pruebas de regresión",
      skills_mocking: "mocks de integraciones externas",
      skills_systems_integration: "Sistemas e integración",
      skills_async_services: "servicios asíncronos",
      skills_external_api: "integración con API externas",
      skills_xml_protocols: "protocolos basados en XML",
      skills_production_logging: "registro y diagnóstico de incidencias en producción",
      section_experience: "Experiencia profesional",
      present: "Actualidad",
      pdms_role: "Ingeniero de software",
      pdms_company: "PDMS GmbH, Alemania",
      pdms_summary: "Desarrollo y mantengo software crítico para la automatización de farmacias, la logística farmacéutica y el almacenamiento automatizado de medicamentos.",
      pdms_item_1: "Trabajo tanto con aplicaciones CakePHP modernas como con sistemas heredados, incluidos proyectos basados en los modelos Table y Entity de CakePHP.",
      pdms_item_2: "Desarrollé para el mercado alemán una integración con securPharm/NMVS mediante JSON-RPC, HTTP/cURL y peticiones firmadas con HMAC. Valida códigos GS1/DataMatrix con identificadores GTIN y PPN, permite verificar, dispensar y deshacer operaciones con medicamentos e incluye gestión de errores, registro estructurado y flujos alternativos. Al basarse en el marco europeo EMVS, este patrón de integración es transferible al entorno español SEVeM.",
      pdms_item_3: "Desarrollé un servicio WWKS2 que conecta el software de farmacia con los sistemas de almacén BD Rowa mediante comunicación TCP asíncrona y mensajes XML. Gestiona la correlación de mensajes, el almacenamiento en búfer, la contrapresión, los reintentos y la recuperación de la conexión.",
      pdms_item_4: "Integré servicios externos en los flujos diarios de recepción, almacenamiento, devolución y dispensación de medicamentos, control de existencias y seguimiento de tareas.",
      pdms_item_5: "Escribo pruebas unitarias y de integración con PHPUnit, fixtures e integraciones simuladas. También mantengo los servicios Linux asociados con systemd y diagnostico incidencias en producción.",
      technion_role: "Ingeniero de software embebido",
      technion_company: "Technion – Instituto de Tecnología de Israel",
      technion_item_1: "Diseñé y desarrollé interfaces de comunicación entre módulos para pequeños satélites basados en microcontroladores Atmel.",
      technion_item_2: "Escribí firmware de bajo nivel para el intercambio de datos entre los módulos del satélite.",
      lighttelecom_role: "Cofundador y director del departamento técnico",
      lighttelecom_company: "LightTelecom Ltd, Ucrania",
      lighttelecom_item_1: "Dirigí la implantación de centralitas IP y sistemas de facturación de telecomunicaciones para empresas medianas y grandes.",
      lighttelecom_item_2: "Integré plataformas de telefonía con los sistemas CRM y otras aplicaciones de negocio de los clientes.",
      lighttelecom_item_3: "Gestioné y di soporte a más de 40 instalaciones de clientes en producción.",
      store_role: "Propietario y director general",
      store_company: "Tienda de equipos informáticos",
      store_item_1: "Gestioné la tienda, la operativa diaria y el desarrollo del negocio.",
      store_item_2: "Creé y gestioné la tienda online de la empresa.",
      wellconstruction_role: "Asistente de investigación e ingeniero de software",
      wellconstruction_company: "WellConstruction Ltd., Ucrania",
      wellconstruction_item_1: "Desarrollé software para automatizar las estimaciones de costes de construcción.",
      wellconstruction_item_2: "Construí y amplié el sistema con Turbo Pascal → Object Pascal / Delphi, C++ y PostScript.",
      section_projects: "Proyectos seleccionados /",
      section_open_source: "Código abierto",
      case_studies_heading: "Casos prácticos de software sanitario",
      case_wwks2_title: "Integración WWKS2 con un almacén automatizado de farmacia",
      case_nmvs_title: "Integración securPharm/NMVS: experiencia transferible a SEVeM",
      case_legacy_title: "Modernización de software sanitario crítico basado en PHP legacy",
      webrtc_role: "Autor de la extensión WebRTC SIP Phone",
      webrtc_description: "Desarrollo y mantengo una extensión de navegador en JavaScript/WebRTC que permite a centros de llamadas y otras empresas iniciar llamadas SIP haciendo clic en números de teléfono de una página web.",
      chrome_store: "Chrome Web Store:",
      sip_role: "Propietario y desarrollador",
      sip_description: "Servicio de centralita IP en la nube en",
      sip_item_1: "Desarrollo y opero la plataforma basada en Linux, Asterisk y A2Billing.",
      sip_item_2: "Me encargo de la operación en producción y de la atención al cliente.",
      a2billing_role: "Responsable del mantenimiento de A2Billing",
      a2billing_description: "Mantengo una plataforma de facturación de telecomunicaciones para Asterisk con licencia AGPLv3 y la utilizo para crear y dar soporte a sistemas de facturación y centralitas basados en PHP/MySQL.",
      source_code: "Código fuente:",
      section_education: "Formación académica",
      education_university: "Universidad Nacional de Construcción y Arquitectura de Kyiv",
      faculty_label: "Facultad:",
      faculty_name: "Automatización y Tecnología de la Información",
      degree_label: "Titulación:",
      degree_name: "Máster en Automatización y Tecnologías Integradas por Ordenador",
      university_website: "Web de la universidad:",
      last_updated: "Última actualización: 29 de julio de 2026"
    },
    fr: {
      meta_title: "Nick Mitin — Ingénieur logiciel senior",
      meta_description: "Ingénieur logiciel senior spécialisé dans le développement backend PHP, l’intégration de systèmes, l’automatisation des pharmacies, la logistique pharmaceutique et les services sous Linux.",
      language_selector: "Choisir la langue",
      nav_summary: "Profil",
      nav_skills: "Compétences techniques",
      nav_experience: "Expérience professionnelle",
      nav_projects: "Projets sélectionnés",
      nav_education: "Formation",
      header_role: "Ingénieur logiciel senior",
      section_summary: "Profil",
      summary_heading: "Backend PHP et intégration de systèmes",
      summary_lead: "Je développe et modernise des applications critiques pour l’entreprise, y compris des systèmes historiques.",
      summary_body: "Depuis 2024, mon travail porte principalement sur l’automatisation des pharmacies, la vérification des médicaments, la logistique pharmaceutique et les systèmes d’entrepôt automatisés. J’ai également une solide expérience de la VoIP, de la facturation télécom et des services sous Linux.",
      summary_languages_label: "Langues :",
      summary_languages: "anglais (B2), allemand (B1, en cours d’apprentissage), ukrainien (langue maternelle), russe (courant).",
      section_skills: "Compétences",
      skills_ai_development: "Développement assisté par l’IA",
      skills_programming_data: "Programmation et données",
      skills_backend_web: "Backend et web",
      skills_async_programming: "programmation asynchrone",
      skills_event_architecture: "architecture événementielle",
      skills_testing: "Tests",
      skills_unit_testing: "tests unitaires",
      skills_integration_testing: "tests d’intégration",
      skills_fixture_testing: "tests basés sur des fixtures",
      skills_regression_testing: "tests de non-régression",
      skills_mocking: "simulation des intégrations externes",
      skills_systems_integration: "Systèmes et intégration",
      skills_async_services: "services asynchrones",
      skills_external_api: "intégration d’API externes",
      skills_xml_protocols: "protocoles basés sur XML",
      skills_production_logging: "journalisation et diagnostic en production",
      section_experience: "Expérience professionnelle",
      present: "aujourd’hui",
      pdms_role: "Ingénieur logiciel",
      pdms_company: "PDMS GmbH, Allemagne",
      pdms_summary: "Je développe et maintiens des logiciels critiques pour l’automatisation des pharmacies, la logistique pharmaceutique et le stockage automatisé de médicaments.",
      pdms_item_1: "Je travaille sur des applications CakePHP modernes comme historiques, notamment des systèmes construits avec les modèles Table et Entity de CakePHP.",
      pdms_item_2: "J’ai développé une intégration securPharm/NMVS utilisant JSON-RPC, HTTP/cURL et des requêtes signées par HMAC. Elle valide les codes GS1/DataMatrix comportant des identifiants GTIN et PPN, prend en charge la vérification et la délivrance des médicaments ainsi que l’annulation des opérations, avec gestion des erreurs, journalisation structurée et scénarios de secours.",
      pdms_item_3: "J’ai développé un service WWKS2 qui relie le logiciel de pharmacie aux systèmes de stockage BD Rowa via des communications TCP asynchrones et des messages XML. Il gère la corrélation des messages, la mise en mémoire tampon, la contre-pression, les nouvelles tentatives et le rétablissement de la connexion.",
      pdms_item_4: "J’ai intégré des services externes aux processus quotidiens de réception, de stockage, de retour et de délivrance des médicaments, de contrôle des stocks et de suivi des tâches.",
      pdms_item_5: "J’écris des tests unitaires et d’intégration avec PHPUnit, des fixtures et des intégrations simulées. Je maintiens également les services Linux associés avec systemd et diagnostique les incidents en production.",
      technion_role: "Ingénieur logiciel embarqué",
      technion_company: "Technion – Institut israélien de technologie",
      technion_item_1: "J’ai conçu et développé des interfaces de communication intermodules pour de petits satellites basés sur des microcontrôleurs Atmel.",
      technion_item_2: "J’ai écrit un firmware de bas niveau pour l’échange de données entre les modules des satellites.",
      lighttelecom_role: "Cofondateur et responsable du département technique",
      lighttelecom_company: "LightTelecom Ltd, Ukraine",
      lighttelecom_item_1: "J’ai piloté la mise en place de systèmes de téléphonie IP et de facturation télécom pour des entreprises moyennes et grandes.",
      lighttelecom_item_2: "J’ai intégré les plateformes de téléphonie aux CRM des clients et à leurs autres applications métier.",
      lighttelecom_item_3: "J’ai administré et assuré le support de plus de 40 installations clientes en production.",
      store_role: "Propriétaire et directeur général",
      store_company: "Magasin de matériel informatique",
      store_item_1: "J’ai géré le magasin, les activités quotidiennes et le développement de l’entreprise.",
      store_item_2: "J’ai créé et exploité la boutique en ligne de l’entreprise.",
      wellconstruction_role: "Assistant de recherche et ingénieur logiciel",
      wellconstruction_company: "WellConstruction Ltd., Ukraine",
      wellconstruction_item_1: "J’ai développé un logiciel automatisant l’estimation des coûts de construction.",
      wellconstruction_item_2: "J’ai construit et fait évoluer le système avec Turbo Pascal → Object Pascal / Delphi, C++ et PostScript.",
      section_projects: "Projets sélectionnés /",
      section_open_source: "Open source",
      case_studies_heading: "Études de cas sur les logiciels de santé (en anglais)",
      case_wwks2_title: "Intégration WWKS2 avec un entrepôt automatisé de pharmacie",
      case_nmvs_title: "Intégration securPharm/NMVS pour la vérification des médicaments",
      case_legacy_title: "Modernisation d’un logiciel de santé PHP legacy critique",
      webrtc_role: "Auteur de l’extension WebRTC SIP Phone",
      webrtc_description: "Je développe et maintiens une extension de navigateur en JavaScript/WebRTC qui permet aux centres d’appels et à d’autres entreprises de lancer des appels SIP en cliquant sur les numéros de téléphone affichés sur les pages web.",
      chrome_store: "Chrome Web Store :",
      sip_role: "Propriétaire et développeur",
      sip_description: "Service de téléphonie IP hébergé dans le cloud sur",
      sip_item_1: "Je développe et exploite la plateforme Linux/Asterisk/A2Billing.",
      sip_item_2: "Je gère l’exploitation en production et le support client.",
      a2billing_role: "Mainteneur d’A2Billing",
      a2billing_description: "Je maintiens une plateforme de facturation télécom pour Asterisk sous licence AGPLv3 et je l’utilise pour développer et assurer le support de systèmes de facturation et de téléphonie IP basés sur PHP/MySQL.",
      source_code: "Code source :",
      section_education: "Formation",
      education_university: "Université nationale de construction et d’architecture de Kyiv",
      faculty_label: "Faculté :",
      faculty_name: "Automatisation et technologies de l’information",
      degree_label: "Diplôme :",
      degree_name: "Master en automatisation et technologies intégrées par ordinateur",
      university_website: "Site de l’université :",
      last_updated: "Dernière mise à jour : 29 juillet 2026"
    },
    uk: {
      meta_title: "Nick Mitin — Старший інженер-програміст",
      meta_description: "Старший інженер-програміст зі спеціалізацією на PHP-бекенді, системній інтеграції, автоматизації аптек, фармацевтичній логістиці та сервісах на базі Linux.",
      language_selector: "Вибрати мову",
      nav_summary: "Про мене",
      nav_skills: "Технічні навички",
      nav_experience: "Досвід роботи",
      nav_projects: "Вибрані проєкти",
      nav_education: "Освіта",
      header_role: "Старший інженер-програміст",
      section_summary: "Про мене",
      summary_heading: "PHP-бекенд та системна інтеграція",
      summary_lead: "Розробляю й модернізую критично важливі для бізнесу застосунки, зокрема успадковані системи.",
      summary_body: "З 2024 року я зосереджений на автоматизації аптек, перевірці лікарських засобів, фармацевтичній логістиці та автоматизованих складських системах. Також маю багаторічний досвід у VoIP, телеком-білінгу та сервісах на базі Linux.",
      summary_languages_label: "Мови:",
      summary_languages: "англійська (B2), німецька (B1, зараз продовжую вивчати), українська (рідна), російська (вільно).",
      section_skills: "Навички",
      skills_ai_development: "Розробка за допомогою ШІ",
      skills_programming_data: "Програмування та дані",
      skills_backend_web: "Бекенд і веб",
      skills_async_programming: "асинхронне програмування",
      skills_event_architecture: "подієво-орієнтована архітектура",
      skills_testing: "Тестування",
      skills_unit_testing: "модульне тестування",
      skills_integration_testing: "інтеграційне тестування",
      skills_fixture_testing: "тестування з фікстурами",
      skills_regression_testing: "регресійне тестування",
      skills_mocking: "мокування зовнішніх інтеграцій",
      skills_systems_integration: "Системи та інтеграція",
      skills_async_services: "асинхронні сервіси",
      skills_external_api: "інтеграція із зовнішніми API",
      skills_xml_protocols: "протоколи на базі XML",
      skills_production_logging: "логування та діагностика проблем у продакшені",
      section_experience: "Досвід роботи",
      present: "дотепер",
      pdms_role: "Інженер-програміст",
      pdms_company: "PDMS GmbH, Німеччина",
      pdms_summary: "Розробляю та підтримую критично важливе для бізнесу програмне забезпечення для автоматизації аптек, фармацевтичної логістики й автоматизованого зберігання ліків.",
      pdms_item_1: "Працюю як із сучасними, так і з успадкованими застосунками на CakePHP, зокрема із системами, побудованими на моделях Table та Entity.",
      pdms_item_2: "Розробив інтеграцію із securPharm/NMVS на базі JSON-RPC, HTTP/cURL і запитів із HMAC-підписом. Вона перевіряє коди GS1/DataMatrix з ідентифікаторами GTIN і PPN, підтримує перевірку та відпуск ліків, скасування операцій, а також обробку помилок, структуроване логування й резервні сценарії.",
      pdms_item_3: "Розробив сервіс WWKS2, який з’єднує аптечне програмне забезпечення зі складськими системами BD Rowa через асинхронний TCP-обмін і XML-повідомлення. Сервіс виконує зіставлення повідомлень, буферизацію, контроль зворотного тиску, повторні спроби та відновлення з’єднання.",
      pdms_item_4: "Інтегрував зовнішні сервіси в щоденні процеси приймання, зберігання, повернення та відпуску ліків, контролю запасів і відстеження завдань.",
      pdms_item_5: "Пишу модульні та інтеграційні тести з PHPUnit, фікстурами й моками зовнішніх інтеграцій. Підтримую пов’язані Linux-сервіси за допомогою systemd і діагностую проблеми у продакшені.",
      technion_role: "Інженер вбудованого програмного забезпечення",
      technion_company: "Техніон — Ізраїльський технологічний інститут",
      technion_item_1: "Спроєктував і розробив інтерфейси обміну даними між модулями малих супутників на базі мікроконтролерів Atmel.",
      technion_item_2: "Написав низькорівневу прошивку для обміну даними між модулями супутника.",
      lighttelecom_role: "Співзасновник і керівник технічного відділу",
      lighttelecom_company: "LightTelecom Ltd, Україна",
      lighttelecom_item_1: "Керував упровадженням IP-АТС і систем телекомунікаційного білінгу для середніх і великих компаній.",
      lighttelecom_item_2: "Інтегрував телефонні платформи з CRM-системами клієнтів та іншими бізнес-застосунками.",
      lighttelecom_item_3: "Керував роботою понад 40 клієнтських інсталяцій у продакшені та забезпечував їхню підтримку.",
      store_role: "Власник і генеральний директор",
      store_company: "Магазин комп’ютерної техніки",
      store_item_1: "Керував магазином, щоденною роботою та розвитком бізнесу.",
      store_item_2: "Створив і розвивав інтернет-магазин компанії.",
      wellconstruction_role: "Науковий співробітник та інженер-програміст",
      wellconstruction_company: "WellConstruction Ltd., Україна",
      wellconstruction_item_1: "Розробив програмне забезпечення для автоматизації розрахунку вартості будівництва.",
      wellconstruction_item_2: "Створював і розвивав систему за допомогою Turbo Pascal → Object Pascal / Delphi, C++ та PostScript.",
      section_projects: "Вибрані проєкти /",
      section_open_source: "Відкритий код",
      case_studies_heading: "Технічні кейси з медичного ПЗ (англійською)",
      case_wwks2_title: "Інтеграція WWKS2 з автоматизованим аптечним складом",
      case_nmvs_title: "Інтеграція securPharm/NMVS для перевірки лікарських засобів",
      case_legacy_title: "Модернізація критично важливого медичного ПЗ на legacy PHP",
      webrtc_role: "Автор розширення WebRTC SIP Phone",
      webrtc_description: "Розробляю та підтримую браузерне розширення на JavaScript/WebRTC, за допомогою якого кол-центри та інші компанії можуть здійснювати SIP-дзвінки, просто натискаючи на номери телефонів на вебсторінках.",
      chrome_store: "Chrome Web Store:",
      sip_role: "Власник і розробник",
      sip_description: "Хмарний сервіс IP-АТС на",
      sip_item_1: "Розробляю та підтримую платформу на базі Linux, Asterisk і A2Billing.",
      sip_item_2: "Відповідаю за роботу сервісу у продакшені та підтримку клієнтів.",
      a2billing_role: "Мейнтейнер A2Billing",
      a2billing_description: "Підтримую телекомунікаційну білінгову платформу для Asterisk під ліцензією AGPLv3 і використовую її для створення та супроводу білінгових систем і АТС на PHP/MySQL.",
      source_code: "Вихідний код:",
      section_education: "Освіта",
      education_university: "Київський національний університет будівництва і архітектури",
      faculty_label: "Факультет:",
      faculty_name: "Автоматизації і інформаційних технологій",
      degree_label: "Ступінь:",
      degree_name: "Магістр з автоматизації та комп’ютерно-інтегрованих технологій",
      university_website: "Сайт університету:",
      last_updated: "Оновлено: 29 липня 2026"
    },
    ru: {
      meta_title: "Nick Mitin — Старший инженер-программист",
      meta_description: "Старший инженер-программист со специализацией на PHP-бэкенде, системной интеграции, автоматизации аптек, фармацевтической логистике и сервисах на базе Linux.",
      language_selector: "Выбрать язык",
      nav_summary: "Обо мне",
      nav_skills: "Технические навыки",
      nav_experience: "Опыт работы",
      nav_projects: "Избранные проекты",
      nav_education: "Образование",
      header_role: "Старший инженер-программист",
      section_summary: "Обо мне",
      summary_heading: "PHP-бэкенд и системная интеграция",
      summary_lead: "Разрабатываю и модернизирую критически важные для бизнеса приложения, в том числе унаследованные системы.",
      summary_body: "С 2024 года моя работа сосредоточена на автоматизации аптек, проверке лекарственных препаратов, фармацевтической логистике и автоматизированных складских системах. Также у меня многолетний опыт работы с VoIP, телеком-биллингом и сервисами на базе Linux.",
      summary_languages_label: "Языки:",
      summary_languages: "английский (B2), немецкий (B1, продолжаю изучать), украинский (родной), русский (свободно).",
      section_skills: "Навыки",
      skills_ai_development: "Разработка с помощью ИИ",
      skills_programming_data: "Программирование и данные",
      skills_backend_web: "Бэкенд и веб",
      skills_async_programming: "асинхронное программирование",
      skills_event_architecture: "событийно-ориентированная архитектура",
      skills_testing: "Тестирование",
      skills_unit_testing: "модульное тестирование",
      skills_integration_testing: "интеграционное тестирование",
      skills_fixture_testing: "тестирование с фикстурами",
      skills_regression_testing: "регрессионное тестирование",
      skills_mocking: "мокирование внешних интеграций",
      skills_systems_integration: "Системы и интеграция",
      skills_async_services: "асинхронные сервисы",
      skills_external_api: "интеграция с внешними API",
      skills_xml_protocols: "протоколы на базе XML",
      skills_production_logging: "логирование и диагностика проблем в продакшене",
      section_experience: "Опыт работы",
      present: "по н. в.",
      pdms_role: "Инженер-программист",
      pdms_company: "PDMS GmbH, Германия",
      pdms_summary: "Разрабатываю и поддерживаю критически важное для бизнеса программное обеспечение для автоматизации аптек, фармацевтической логистики и автоматизированного хранения лекарств.",
      pdms_item_1: "Работаю как с современными, так и с унаследованными приложениями на CakePHP, включая системы, построенные на моделях Table и Entity.",
      pdms_item_2: "Разработал интеграцию с securPharm/NMVS на базе JSON-RPC, HTTP/cURL и запросов с HMAC-подписью. Она проверяет коды GS1/DataMatrix с идентификаторами GTIN и PPN, поддерживает проверку и отпуск лекарств, отмену операций, а также обработку ошибок, структурированное логирование и резервные сценарии.",
      pdms_item_3: "Разработал сервис WWKS2, который связывает аптечное программное обеспечение со складскими системами BD Rowa через асинхронный TCP-обмен и XML-сообщения. Сервис отвечает за сопоставление сообщений, буферизацию, контроль обратного давления, повторные попытки и восстановление соединения.",
      pdms_item_4: "Интегрировал внешние сервисы в ежедневные процессы приёмки, хранения, возврата и отпуска лекарств, контроля запасов и отслеживания задач.",
      pdms_item_5: "Пишу модульные и интеграционные тесты с PHPUnit, фикстурами и моками внешних интеграций. Поддерживаю связанные Linux-сервисы с помощью systemd и диагностирую проблемы в продакшене.",
      technion_role: "Инженер-программист встраиваемых систем",
      technion_company: "Технион — Израильский технологический институт",
      technion_item_1: "Спроектировал и разработал интерфейсы обмена данными между модулями малых спутников на базе микроконтроллеров Atmel.",
      technion_item_2: "Написал низкоуровневую прошивку для обмена данными между модулями спутника.",
      lighttelecom_role: "Сооснователь и руководитель технического отдела",
      lighttelecom_company: "LightTelecom Ltd, Украина",
      lighttelecom_item_1: "Руководил внедрением IP-АТС и систем телекоммуникационного биллинга для средних и крупных компаний.",
      lighttelecom_item_2: "Интегрировал телефонные платформы с CRM-системами клиентов и другими бизнес-приложениями.",
      lighttelecom_item_3: "Управлял работой более 40 клиентских инсталляций в продакшене и обеспечивал их поддержку.",
      store_role: "Владелец и генеральный директор",
      store_company: "Магазин компьютерной техники",
      store_item_1: "Управлял магазином, ежедневной работой и развитием бизнеса.",
      store_item_2: "Создал и развивал интернет-магазин компании.",
      wellconstruction_role: "Научный сотрудник и инженер-программист",
      wellconstruction_company: "WellConstruction Ltd., Украина",
      wellconstruction_item_1: "Разработал программное обеспечение для автоматизации расчёта стоимости строительства.",
      wellconstruction_item_2: "Создавал и развивал систему с помощью Turbo Pascal → Object Pascal / Delphi, C++ и PostScript.",
      section_projects: "Избранные проекты /",
      section_open_source: "Открытый код",
      case_studies_heading: "Технические кейсы по медицинскому ПО (на английском)",
      case_wwks2_title: "Интеграция WWKS2 с автоматизированным аптечным складом",
      case_nmvs_title: "Интеграция securPharm/NMVS для проверки лекарственных средств",
      case_legacy_title: "Модернизация критически важного медицинского ПО на legacy PHP",
      webrtc_role: "Автор расширения WebRTC SIP Phone",
      webrtc_description: "Разрабатываю и поддерживаю браузерное расширение на JavaScript/WebRTC, с помощью которого колл-центры и другие компании могут совершать SIP-звонки, просто нажимая на номера телефонов на веб-страницах.",
      chrome_store: "Chrome Web Store:",
      sip_role: "Владелец и разработчик",
      sip_description: "Облачный сервис IP-АТС на",
      sip_item_1: "Разрабатываю и поддерживаю платформу на базе Linux, Asterisk и A2Billing.",
      sip_item_2: "Отвечаю за работу сервиса в продакшене и поддержку клиентов.",
      a2billing_role: "Мейнтейнер A2Billing",
      a2billing_description: "Поддерживаю телекоммуникационную биллинговую платформу для Asterisk под лицензией AGPLv3 и использую её для создания и сопровождения биллинговых систем и АТС на PHP/MySQL.",
      source_code: "Исходный код:",
      section_education: "Образование",
      education_university: "Киевский национальный университет строительства и архитектуры",
      faculty_label: "Факультет:",
      faculty_name: "Автоматизации и информационных технологий",
      degree_label: "Степень:",
      degree_name: "Магистр автоматизации и компьютерно-интегрированных технологий",
      university_website: "Сайт университета:",
      last_updated: "Обновлено: 29 июля 2026"
    }
  };

  var caseStudyLinks = {
    en: {
      wwks2: "/en/case-studies/wwks2-pharmacy-warehouse-integration/",
      nmvs: "/en/case-studies/securpharm-nmvs-medication-verification/",
      legacy: "/en/case-studies/legacy-php-healthcare-modernization/"
    },
    de: {
      wwks2: "/de/fallstudien/wwks2-apothekenlager-integration/",
      nmvs: "/de/fallstudien/securpharm-nmvs-arzneimittelverifikation/",
      legacy: "/de/fallstudien/legacy-php-gesundheits-it-modernisierung/"
    },
    es: {
      wwks2: "/es/casos/integracion-wwks2-almacen-farmacia/",
      nmvs: "/es/casos/securpharm-nmvs-verificacion-medicamentos/",
      legacy: "/es/casos/modernizacion-php-legacy-software-sanitario/"
    }
  };

  var universityLinks = {
    default: {
      facultyUrl: "https://en.knuba.edu.ua/about/faculties-and-academic-units/faculty-of-automation-and-information-technology/",
      universityUrl: "https://en.knuba.edu.ua/",
      universityLabel: "en.knuba.edu.ua"
    },
    uk: {
      facultyUrl: "https://fait.knuba.edu.ua/",
      universityUrl: "https://www.knuba.edu.ua/",
      universityLabel: "www.knuba.edu.ua"
    },
    ru: {
      facultyUrl: "https://fait.knuba.edu.ua/",
      universityUrl: "https://www.knuba.edu.ua/",
      universityLabel: "www.knuba.edu.ua"
    }
  };

  function normalizeLanguage(language) {
    if (typeof language !== "string") {
      return "";
    }

    return language.trim().toLowerCase().split(/[-_]/)[0];
  }

  function readLanguageCookie() {
    var prefix = cookieName + "=";
    var cookies = document.cookie ? document.cookie.split(";") : [];

    for (var index = 0; index < cookies.length; index += 1) {
      var cookie = cookies[index].trim();
      if (cookie.indexOf(prefix) === 0) {
        try {
          var language = normalizeLanguage(decodeURIComponent(cookie.slice(prefix.length)));
          return supportedLanguages.indexOf(language) !== -1 ? language : "";
        } catch (error) {
          return "";
        }
      }
    }

    return "";
  }

  function detectBrowserLanguage() {
    var browserLanguages = [];

    if (Array.isArray(navigator.languages)) {
      browserLanguages = navigator.languages.slice();
    }

    if (navigator.language && browserLanguages.indexOf(navigator.language) === -1) {
      browserLanguages.push(navigator.language);
    }

    for (var index = 0; index < browserLanguages.length; index += 1) {
      var language = normalizeLanguage(browserLanguages[index]);
      if (supportedLanguages.indexOf(language) !== -1) {
        return language;
      }
    }

    return "en";
  }

  function detectPathLanguage() {
    var pathSegments = window.location.pathname.toLowerCase().split("/");

    for (var index = pathSegments.length - 1; index >= 0; index -= 1) {
      var segment = pathSegments[index].trim();

      if (!segment || segment === "index.html") {
        continue;
      }

      return languagePathAliases[segment] || "";
    }

    return "";
  }

  function saveLanguageCookie(language) {
    var cookie = cookieName + "=" + encodeURIComponent(language)
      + "; Path=/; Max-Age=" + cookieLifetime + "; SameSite=Lax";

    if (window.location.protocol === "https:") {
      cookie += "; Secure";
    }

    document.cookie = cookie;
  }

  function translatePage(language) {
    var dictionary = translations[language] || translations.en;

    document.documentElement.lang = language;
    document.title = dictionary.meta_title;

    var description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", dictionary.meta_description);
    }

    var translatedElements = document.querySelectorAll("[data-i18n]");
    for (var index = 0; index < translatedElements.length; index += 1) {
      var element = translatedElements[index];
      var key = element.getAttribute("data-i18n");
      var value = dictionary[key];

      if (typeof value !== "string") {
        value = translations.en[key];
      }

      if (typeof value === "string") {
        element.textContent = value;
      }
    }

    var languageSelectors = document.querySelectorAll(".language-switcher");
    for (var selectorIndex = 0; selectorIndex < languageSelectors.length; selectorIndex += 1) {
      languageSelectors[selectorIndex].setAttribute("aria-label", dictionary.language_selector);
    }

    var localizedUniversityLinks = universityLinks[language] || universityLinks.default;
    var facultyLink = document.querySelector("[data-faculty-link]");
    if (facultyLink) {
      facultyLink.setAttribute("href", localizedUniversityLinks.facultyUrl);
    }

    var universityLink = document.querySelector("[data-university-link]");
    if (universityLink) {
      universityLink.setAttribute("href", localizedUniversityLinks.universityUrl);
      universityLink.textContent = localizedUniversityLinks.universityLabel;
    }

    var localizedCaseStudyLinks = caseStudyLinks[language] || caseStudyLinks.en;
    var caseStudyAnchors = document.querySelectorAll("[data-case-study]");
    for (var caseStudyIndex = 0; caseStudyIndex < caseStudyAnchors.length; caseStudyIndex += 1) {
      var caseStudyAnchor = caseStudyAnchors[caseStudyIndex];
      var caseStudyKey = caseStudyAnchor.getAttribute("data-case-study");
      var caseStudyUrl = localizedCaseStudyLinks[caseStudyKey];

      if (caseStudyUrl) {
        caseStudyAnchor.setAttribute("href", caseStudyUrl);
      }
    }

    var languageButtons = document.querySelectorAll("[data-language]");
    for (var buttonIndex = 0; buttonIndex < languageButtons.length; buttonIndex += 1) {
      var button = languageButtons[buttonIndex];
      var isActive = button.getAttribute("data-language") === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    }

    saveLanguageCookie(language);
  }

  function initialize() {
    var selectedLanguage = detectPathLanguage() || readLanguageCookie() || detectBrowserLanguage();
    var languageButtons = document.querySelectorAll("[data-language]");

    for (var index = 0; index < languageButtons.length; index += 1) {
      languageButtons[index].addEventListener("click", function () {
        var language = normalizeLanguage(this.getAttribute("data-language"));
        if (supportedLanguages.indexOf(language) !== -1) {
          translatePage(language);
        }
      });
    }

    translatePage(selectedLanguage);
  }

  try {
    initialize();
  } finally {
    document.documentElement.classList.remove("i18n-pending");
  }
}());
