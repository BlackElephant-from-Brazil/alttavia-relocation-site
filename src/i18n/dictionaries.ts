import type { Locale } from './routing'

export type Dictionary = typeof dictionaries.en

export const dictionaries = {
  en: {
    languageName: 'English',
    nav: {
      home: 'Home',
      whyUs: 'Why Us',
      services: 'Relocation Services',
      blog: 'Blog',
      contact: 'Contact',
    },
    common: {
      getInTouch: 'Get in touch',
      exploreServices: 'Explore services',
      readMore: 'Read article',
      viewAll: 'View all articles',
      start: 'Start your relocation',
      visualTitle: 'Private support for global arrivals.',
      visualItems: ['Residency', 'Housing', 'Schools', 'Arrival'],
    },
    seo: {
      home: {
        title: 'Premium relocation services for international families',
        description:
          'Elegant immigration, settlement, and relocation guidance for families, founders, and executives moving across borders.',
      },
      whyUs: {
        title: 'Why choose Alttavia Relocation',
        description:
          'A human, precise, and international relocation partner for complex moves.',
      },
      services: {
        title: 'Relocation services',
        description:
          'Visa guidance, home search, school placement, administrative support, and arrival coordination.',
      },
      blog: {
        title: 'Relocation insights and articles',
        description:
          'Practical relocation insights for international families and professionals.',
      },
      contact: {
        title: 'Contact Alttavia Relocation',
        description:
          'Tell us about your relocation plans and receive a thoughtful first response.',
      },
    },
    home: {
      eyebrow: 'Private relocation advisory',
      heroTitle: 'Relocation designed with precision, discretion, and calm.',
      heroSubtitle:
        'We guide international families, founders, and executives through the practical, legal, and human details of moving to a new country.',
      aboutTitle: 'A refined partner for life-changing moves.',
      aboutText:
        'Every relocation has paperwork, timelines, schools, homes, finances, and emotions moving at once. Our role is to bring order to that complexity, coordinating each step with clear communication and senior attention.',
      whyTitle: 'Why clients choose us',
      whyItems: [
        ['Senior guidance', 'Your move is led by experienced specialists, not passed between anonymous desks.'],
        ['Cross-border clarity', 'We translate local systems into practical decisions before deadlines become pressure.'],
        ['Human coordination', 'Families and teams get support that respects both logistics and real life.'],
      ],
      servicesTitle: 'Core services',
      services: [
        ['Immigration planning', 'Visa pathways, residence documentation, and government appointments.'],
        ['Settlement support', 'Housing search, utilities, banking, healthcare, and local registrations.'],
        ['Family integration', 'School orientation, neighborhood guidance, and cultural arrival support.'],
      ],
      processTitle: 'A measured process',
      process: [
        ['01', 'Map', 'We understand your profile, timing, family needs, and risk points.'],
        ['02', 'Plan', 'You receive a structured relocation roadmap with owners and deadlines.'],
        ['03', 'Coordinate', 'We manage documents, appointments, vendors, and arrival logistics.'],
        ['04', 'Settle', 'We stay close while you build routines in your new city.'],
      ],
      destinationsTitle: 'Relocation expertise across Europe',
      destinationsText:
        'From Portugal and Spain to Malta and wider European mobility, we help clients compare residence routes, lifestyle fit, and administrative requirements with confidence.',
      trust: ['Private clients', 'Founders', 'Executives', 'International families'],
      ctaTitle: 'Move with confidence from the first decision.',
      ctaText:
        'Share your destination, timing, and concerns. We will help you understand the next right step.',
    },
    whyUs: {
      heroTitle: 'A relocation partner built for high-trust transitions.',
      heroSubtitle:
        'We combine technical command, international experience, and thoughtful coordination so clients feel informed from first consultation to arrival.',
      pillars: [
        ['Direct senior involvement', 'Complex moves need judgment. You work with specialists who understand immigration, settlement, and family priorities.'],
        ['Premium without opacity', 'The process is structured, documented, and transparent so you know what is happening and why.'],
        ['Local intelligence', 'We combine formal requirements with practical knowledge about neighborhoods, schools, providers, and timing.'],
        ['International sensibility', 'We understand the emotional weight of moving and the standards expected by globally mobile clients.'],
      ],
      proofTitle: 'Confidence is built in the details',
      proofText:
        'Our work is organized around clear milestones, proactive communication, and carefully prepared documentation. That discipline reduces friction and gives clients room to focus on the opportunity behind the move.',
    },
    services: {
      heroTitle: 'Relocation services from first visa question to settled daily life.',
      heroSubtitle:
        'Choose focused support or a full relocation program coordinated around your destination, family profile, and timeline.',
      groups: [
        ['Immigration and documentation', 'Eligibility assessment, visa strategy, residence permits, renewals, translations, and appointment preparation.'],
        ['Home and neighborhood search', 'Shortlisting, visit coordination, lease review support, utilities, and arrival essentials.'],
        ['Family and education support', 'School mapping, application coordination, healthcare registration, and family onboarding.'],
        ['Business and administrative setup', 'Tax number coordination, banking support, company setup orientation, and public administration guidance.'],
        ['Move logistics', 'Shipment coordination, temporary accommodation planning, vendor introductions, and arrival checklists.'],
        ['Post-arrival concierge', 'Ongoing support during the first weeks as routines, services, and documents settle into place.'],
      ],
    },
    blog: {
      heroTitle: 'Relocation insight for people planning serious moves.',
      heroSubtitle:
        'Original articles on immigration, settlement, family planning, and the decisions that shape an international move.',
      empty: 'No published articles yet for this language.',
      back: 'Back to blog',
    },
    contact: {
      heroTitle: 'Tell us where life is taking you.',
      heroSubtitle:
        'Share the destination, timing, and complexity of your move. We will respond with a practical next step.',
      detailsTitle: 'A private first conversation',
      details:
        'We work remotely with international clients and coordinate locally through trusted specialists when presence matters.',
      location: 'Portugal, Spain, Malta and selected European destinations',
      emailLabel: 'Email',
      whatsapp: 'WhatsApp available by appointment',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Message',
        submit: 'Send message',
        success: 'Thank you. Your message has been received for local development.',
        error: 'Please provide your name, a valid email, and a message.',
      },
    },
    footer: {
      tagline: 'Move. Settle. Thrive.',
      legal: 'Development build for local CMS editing.',
      pagesLabel: 'Pages',
      cmsLabel: 'CMS',
    },
  },
  pt: {
    languageName: 'Português',
    nav: {
      home: 'Início',
      whyUs: 'Por que nós',
      services: 'Serviços de relocation',
      blog: 'Blog',
      contact: 'Contato',
    },
    common: {
      getInTouch: 'Fale conosco',
      exploreServices: 'Ver serviços',
      readMore: 'Ler artigo',
      viewAll: 'Ver artigos',
      start: 'Começar relocation',
      visualTitle: 'Suporte privado para chegadas globais.',
      visualItems: ['Residência', 'Moradia', 'Escolas', 'Chegada'],
    },
    seo: {
      home: {
        title: 'Relocation premium para famílias internacionais',
        description:
          'Orientação elegante em imigração, instalação e relocation para famílias, fundadores e executivos em mudança internacional.',
      },
      whyUs: {
        title: 'Por que escolher a Alttavia Relocation',
        description:
          'Um parceiro humano, preciso e internacional para mudanças complexas.',
      },
      services: {
        title: 'Serviços de relocation',
        description:
          'Vistos, busca de imóvel, escolas, suporte administrativo e coordenação de chegada.',
      },
      blog: {
        title: 'Artigos e insights de relocation',
        description:
          'Conteúdo prático para famílias e profissionais planejando uma mudança internacional.',
      },
      contact: {
        title: 'Contato Alttavia Relocation',
        description:
          'Conte-nos seus planos de mudança e receba uma primeira orientação objetiva.',
      },
    },
    home: {
      eyebrow: 'Consultoria privada de relocation',
      heroTitle: 'Relocation com precisão, discrição e tranquilidade.',
      heroSubtitle:
        'Acompanhamos famílias, fundadores e executivos nos detalhes práticos, legais e humanos de uma mudança para outro país.',
      aboutTitle: 'Um parceiro refinado para mudanças decisivas.',
      aboutText:
        'Toda relocation envolve documentos, prazos, escolas, imóveis, finanças e emoções acontecendo ao mesmo tempo. Nosso papel é organizar essa complexidade com comunicação clara e atenção sênior.',
      whyTitle: 'Por que clientes nos escolhem',
      whyItems: [
        ['Orientação sênior', 'Sua mudança é conduzida por especialistas experientes, não por processos impessoais.'],
        ['Clareza internacional', 'Traduzimos sistemas locais em decisões práticas antes que os prazos virem pressão.'],
        ['Coordenação humana', 'Famílias e equipes recebem suporte que respeita logística e vida real.'],
      ],
      servicesTitle: 'Serviços principais',
      services: [
        ['Planejamento migratório', 'Vistos, residência, documentação e agendamentos governamentais.'],
        ['Instalação local', 'Busca de imóvel, serviços, banco, saúde e registros locais.'],
        ['Integração familiar', 'Escolas, bairros e suporte cultural na chegada.'],
      ],
      processTitle: 'Um processo medido',
      process: [
        ['01', 'Mapear', 'Entendemos perfil, prazo, necessidades familiares e pontos de risco.'],
        ['02', 'Planejar', 'Você recebe um roteiro claro com responsáveis e prazos.'],
        ['03', 'Coordenar', 'Gerimos documentos, agendas, fornecedores e chegada.'],
        ['04', 'Estabelecer', 'Seguimos próximos enquanto a rotina se forma na nova cidade.'],
      ],
      destinationsTitle: 'Expertise em relocation na Europa',
      destinationsText:
        'De Portugal e Espanha a Malta e outros destinos europeus, ajudamos clientes a comparar residência, estilo de vida e exigências administrativas.',
      trust: ['Clientes privados', 'Fundadores', 'Executivos', 'Famílias internacionais'],
      ctaTitle: 'Mude com confiança desde a primeira decisão.',
      ctaText:
        'Compartilhe destino, prazo e preocupações. Vamos ajudar você a entender o próximo passo correto.',
    },
    whyUs: {
      heroTitle: 'Um parceiro de relocation para transições de alta confiança.',
      heroSubtitle:
        'Combinamos domínio técnico, experiência internacional e coordenação cuidadosa para que cada cliente se sinta informado até a chegada.',
      pillars: [
        ['Envolvimento sênior direto', 'Mudanças complexas pedem julgamento. Você trabalha com especialistas que entendem imigração, instalação e prioridades familiares.'],
        ['Premium com transparência', 'O processo é estruturado, documentado e claro para que você saiba o que acontece e por quê.'],
        ['Inteligência local', 'Unimos exigências formais e conhecimento prático sobre bairros, escolas, serviços e prazos.'],
        ['Sensibilidade internacional', 'Entendemos o peso emocional da mudança e o padrão esperado por clientes globalmente móveis.'],
      ],
      proofTitle: 'Confiança nasce nos detalhes',
      proofText:
        'Nosso trabalho se apoia em marcos claros, comunicação proativa e documentação cuidadosamente preparada. Essa disciplina reduz atritos e libera foco para a oportunidade por trás da mudança.',
    },
    services: {
      heroTitle: 'Serviços de relocation da primeira dúvida de visto à rotina estabelecida.',
      heroSubtitle:
        'Escolha um suporte pontual ou um programa completo, coordenado em torno do destino, perfil familiar e cronograma.',
      groups: [
        ['Imigração e documentação', 'Elegibilidade, estratégia de visto, autorizações de residência, renovações, traduções e preparação para agendamentos.'],
        ['Busca de casa e bairro', 'Curadoria de imóveis, coordenação de visitas, apoio na análise de contrato, serviços e chegada.'],
        ['Família e educação', 'Mapeamento escolar, candidaturas, saúde e integração familiar.'],
        ['Negócios e administração', 'NIF, bancos, orientação para empresa e relacionamento com órgãos públicos.'],
        ['Logística de mudança', 'Coordenação de envio, acomodação temporária, fornecedores e checklists de chegada.'],
        ['Concierge pós-chegada', 'Suporte nas primeiras semanas enquanto documentos, serviços e rotina se estabilizam.'],
      ],
    },
    blog: {
      heroTitle: 'Insights para quem planeja uma mudança importante.',
      heroSubtitle:
        'Artigos originais sobre imigração, instalação, família e decisões que moldam uma relocation internacional.',
      empty: 'Ainda não há artigos publicados neste idioma.',
      back: 'Voltar ao blog',
    },
    contact: {
      heroTitle: 'Conte-nos para onde a vida está levando você.',
      heroSubtitle:
        'Compartilhe destino, prazo e complexidade da mudança. Responderemos com um próximo passo prático.',
      detailsTitle: 'Uma primeira conversa privada',
      details:
        'Atendemos clientes internacionais remotamente e coordenamos localmente por meio de especialistas quando a presença é relevante.',
      location: 'Portugal, Espanha, Malta e destinos europeus selecionados',
      emailLabel: 'Email',
      whatsapp: 'WhatsApp disponível com agendamento',
      form: {
        name: 'Nome',
        email: 'Email',
        phone: 'Telefone',
        message: 'Mensagem',
        submit: 'Enviar mensagem',
        success: 'Obrigado. Sua mensagem foi recebida no ambiente local.',
        error: 'Informe seu nome, um email válido e uma mensagem.',
      },
    },
    footer: {
      tagline: 'Mude. Estabeleça-se. Prospere.',
      legal: 'Build de desenvolvimento para edição local no CMS.',
      pagesLabel: 'Páginas',
      cmsLabel: 'CMS',
    },
  },
  es: {
    languageName: 'Español',
    nav: {
      home: 'Inicio',
      whyUs: 'Por qué nosotros',
      services: 'Servicios de relocation',
      blog: 'Blog',
      contact: 'Contacto',
    },
    common: {
      getInTouch: 'Contactar',
      exploreServices: 'Ver servicios',
      readMore: 'Leer artículo',
      viewAll: 'Ver artículos',
      start: 'Iniciar relocation',
      visualTitle: 'Soporte privado para llegadas globales.',
      visualItems: ['Residencia', 'Vivienda', 'Colegios', 'Llegada'],
    },
    seo: {
      home: {
        title: 'Relocation premium para familias internacionales',
        description:
          'Asesoría elegante en inmigración, instalación y relocation para familias, fundadores y ejecutivos.',
      },
      whyUs: {
        title: 'Por qué elegir Alttavia Relocation',
        description:
          'Un socio humano, preciso e internacional para mudanzas complejas.',
      },
      services: {
        title: 'Servicios de relocation',
        description:
          'Visados, búsqueda de vivienda, colegios, soporte administrativo y coordinación de llegada.',
      },
      blog: {
        title: 'Artículos e insights de relocation',
        description:
          'Contenido práctico para familias y profesionales que planean una mudanza internacional.',
      },
      contact: {
        title: 'Contacto Alttavia Relocation',
        description:
          'Cuéntanos tus planes de mudanza y recibe una primera orientación clara.',
      },
    },
    home: {
      eyebrow: 'Asesoría privada de relocation',
      heroTitle: 'Relocation con precisión, discreción y calma.',
      heroSubtitle:
        'Acompañamos a familias, fundadores y ejecutivos en los detalles prácticos, legales y humanos de mudarse a otro país.',
      aboutTitle: 'Un socio refinado para cambios decisivos.',
      aboutText:
        'Toda relocation combina documentos, plazos, colegios, viviendas, finanzas y emociones. Nuestro papel es ordenar esa complejidad con comunicación clara y atención senior.',
      whyTitle: 'Por qué nos eligen',
      whyItems: [
        ['Guía senior', 'Tu mudanza está dirigida por especialistas experimentados, no por procesos impersonales.'],
        ['Claridad internacional', 'Convertimos sistemas locales en decisiones prácticas antes de que los plazos presionen.'],
        ['Coordinación humana', 'Familias y equipos reciben apoyo que respeta la logística y la vida real.'],
      ],
      servicesTitle: 'Servicios principales',
      services: [
        ['Planificación migratoria', 'Visados, residencia, documentación y citas gubernamentales.'],
        ['Instalación local', 'Vivienda, servicios, banca, salud y registros locales.'],
        ['Integración familiar', 'Colegios, barrios y apoyo cultural durante la llegada.'],
      ],
      processTitle: 'Un proceso medido',
      process: [
        ['01', 'Mapear', 'Entendemos perfil, tiempos, necesidades familiares y riesgos.'],
        ['02', 'Planificar', 'Recibes una hoja de ruta clara con responsables y fechas.'],
        ['03', 'Coordinar', 'Gestionamos documentos, citas, proveedores y llegada.'],
        ['04', 'Instalar', 'Seguimos cerca mientras la rutina toma forma en la nueva ciudad.'],
      ],
      destinationsTitle: 'Expertise de relocation en Europa',
      destinationsText:
        'Desde Portugal y España hasta Malta y otros destinos europeos, ayudamos a comparar residencia, estilo de vida y requisitos administrativos.',
      trust: ['Clientes privados', 'Fundadores', 'Ejecutivos', 'Familias internacionales'],
      ctaTitle: 'Múdate con confianza desde la primera decisión.',
      ctaText:
        'Comparte destino, calendario e inquietudes. Te ayudaremos a entender el siguiente paso adecuado.',
    },
    whyUs: {
      heroTitle: 'Un socio de relocation para transiciones de alta confianza.',
      heroSubtitle:
        'Combinamos dominio técnico, experiencia internacional y coordinación cuidadosa para que cada cliente se sienta informado hasta la llegada.',
      pillars: [
        ['Participación senior directa', 'Las mudanzas complejas requieren criterio. Trabajas con especialistas en inmigración, instalación y prioridades familiares.'],
        ['Premium con transparencia', 'El proceso es estructurado, documentado y claro para que sepas qué ocurre y por qué.'],
        ['Inteligencia local', 'Unimos requisitos formales con conocimiento práctico sobre barrios, colegios, servicios y tiempos.'],
        ['Sensibilidad internacional', 'Entendemos el peso emocional de mudarse y el estándar esperado por clientes globalmente móviles.'],
      ],
      proofTitle: 'La confianza se construye en los detalles',
      proofText:
        'Nuestro trabajo se organiza con hitos claros, comunicación proactiva y documentación preparada con cuidado. Esa disciplina reduce fricción y deja espacio para la oportunidad detrás de la mudanza.',
    },
    services: {
      heroTitle: 'Servicios de relocation desde la primera pregunta de visado hasta la vida diaria.',
      heroSubtitle:
        'Elige soporte puntual o un programa completo coordinado según destino, perfil familiar y calendario.',
      groups: [
        ['Inmigración y documentación', 'Elegibilidad, estrategia de visado, residencia, renovaciones, traducciones y preparación de citas.'],
        ['Búsqueda de vivienda y barrio', 'Selección, visitas, apoyo en revisión de contrato, servicios y básicos de llegada.'],
        ['Familia y educación', 'Mapeo de colegios, solicitudes, registro sanitario e integración familiar.'],
        ['Negocios y administración', 'Números fiscales, banca, orientación empresarial y trámites públicos.'],
        ['Logística de mudanza', 'Envíos, alojamiento temporal, proveedores y listas de llegada.'],
        ['Concierge posterior', 'Apoyo durante las primeras semanas mientras documentos, servicios y rutinas se estabilizan.'],
      ],
    },
    blog: {
      heroTitle: 'Insights para quienes planean una mudanza seria.',
      heroSubtitle:
        'Artículos originales sobre inmigración, instalación, familia y decisiones que dan forma a una relocation internacional.',
      empty: 'Todavía no hay artículos publicados en este idioma.',
      back: 'Volver al blog',
    },
    contact: {
      heroTitle: 'Cuéntanos hacia dónde te lleva la vida.',
      heroSubtitle:
        'Comparte destino, calendario y complejidad de la mudanza. Responderemos con un próximo paso práctico.',
      detailsTitle: 'Una primera conversación privada',
      details:
        'Trabajamos remotamente con clientes internacionales y coordinamos localmente con especialistas cuando la presencia importa.',
      location: 'Portugal, España, Malta y destinos europeos seleccionados',
      emailLabel: 'Email',
      whatsapp: 'WhatsApp disponible con cita',
      form: {
        name: 'Nombre',
        email: 'Email',
        phone: 'Teléfono',
        message: 'Mensaje',
        submit: 'Enviar mensaje',
        success: 'Gracias. Tu mensaje fue recibido en el entorno local.',
        error: 'Indica tu nombre, un email válido y un mensaje.',
      },
    },
    footer: {
      tagline: 'Múdate. Instálate. Prospera.',
      legal: 'Build de desarrollo para edición local en el CMS.',
      pagesLabel: 'Páginas',
      cmsLabel: 'CMS',
    },
  },
} satisfies Record<Locale, Record<string, unknown>>

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
