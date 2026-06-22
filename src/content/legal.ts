import type { Locale } from '@/i18n/routing'

export type LegalSection = {
  heading: string
  paragraphs: string[]
}

export type LegalDocument = {
  eyebrow: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export const privacyPolicyContent: Record<Locale, LegalDocument> = {
  en: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    updated: 'Last updated: June 22, 2026',
    intro:
      'Alttavia Relocation values your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices and rights available to you.',
    sections: [
      {
        heading: 'Who We Are',
        paragraphs: [
          'Alttavia Relocation is a relocation and immigration advisory practice led by licensed attorneys, providing immigration, settlement, and relocation services for individuals, families, and businesses moving to Portugal, Spain, and Malta. References to "we," "us," or "our" in this policy mean Alttavia Relocation.',
        ],
      },
      {
        heading: 'Information We Collect',
        paragraphs: [
          'We collect information you provide directly, such as your name, email address, phone number, nationality, and details about your relocation plans when you contact us through our website, complete a form, or communicate with our team.',
          'We also collect limited technical information automatically, including your IP address, browser type, device information, and pages visited, through cookies and similar technologies described in the Cookies section below.',
        ],
      },
      {
        heading: 'How We Use Your Information',
        paragraphs: [
          'To respond to your inquiries and provide the services you request.',
          'To prepare proposals, schedule consultations, and coordinate the immigration, settlement, or business services you engage us for.',
          'To communicate with you about your case, send updates, and share relevant information about your relocation.',
          'To improve our website, services, and client experience.',
          'To comply with legal, regulatory, and professional obligations.',
        ],
      },
      {
        heading: 'Legal Basis for Processing',
        paragraphs: [
          'For clients in the European Union, we process personal data based on your consent, the necessity of processing to perform a contract with you, our legitimate interests in operating and improving our services, and compliance with legal obligations under applicable data protection law, including the General Data Protection Regulation.',
        ],
      },
      {
        heading: 'How We Share Your Information',
        paragraphs: [
          'We do not sell your personal information. We may share information with trusted partners, government authorities, and service providers strictly to the extent necessary to deliver the services you requested, such as filing immigration applications, coordinating with banks, schools, or housing providers, or fulfilling a legal requirement.',
          'Any third party that processes personal data on our behalf is required to protect that information and use it only for the purposes we specify.',
        ],
      },
      {
        heading: 'Data Retention',
        paragraphs: [
          'We retain personal information for as long as necessary to provide our services, maintain our professional and legal records, and comply with applicable retention obligations. When information is no longer needed, we securely delete or anonymize it.',
        ],
      },
      {
        heading: 'Your Rights',
        paragraphs: [
          'Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal information, to object to certain processing activities, and to request a copy of your data in a portable format. To exercise these rights, contact us using the details below.',
        ],
      },
      {
        heading: 'Cookies and Similar Technologies',
        paragraphs: [
          'Our website uses cookies and similar technologies to operate properly, remember your preferences, and understand how visitors use our site. You can manage cookie preferences through your browser settings at any time.',
        ],
      },
      {
        heading: 'Data Security',
        paragraphs: [
          'We apply reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse, or alteration. No method of transmission or storage is completely secure, and we encourage you to share sensitive information only through the secure channels we provide.',
        ],
      },
      {
        heading: 'International Data Transfers',
        paragraphs: [
          'Because we support clients relocating across borders, personal information may be transferred to and processed in countries other than your country of residence. When this occurs, we take steps to ensure an adequate level of protection consistent with applicable law.',
        ],
      },
      {
        heading: "Children's Privacy",
        paragraphs: [
          'Our services are directed at adults. We do not knowingly collect personal information from children, except where necessary to assist a family relocation and provided directly by a parent or legal guardian.',
        ],
      },
      {
        heading: 'Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated version will be posted on this page with a revised effective date.',
        ],
      },
      {
        heading: 'Contact Us',
        paragraphs: [
          'If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at info@alttavia-relocation.com or +351 934 548 395.',
        ],
      },
    ],
  },
  pt: {
    eyebrow: 'Legal',
    title: 'Política de Privacidade',
    updated: 'Última atualização: 22 de junho de 2026',
    intro:
      'A Alttavia Relocation valoriza sua privacidade e está comprometida em proteger as informações pessoais que você compartilha conosco. Esta Política de Privacidade explica quais informações coletamos, como as usamos e quais escolhas e direitos estão disponíveis para você.',
    sections: [
      {
        heading: 'Quem Somos',
        paragraphs: [
          'A Alttavia Relocation é uma assessoria de relocation e imigração conduzida por advogados licenciados, oferecendo serviços de imigração, instalação e relocation para indivíduos, famílias e empresas que se mudam para Portugal, Espanha e Malta. As referências a "nós" ou "nossa" nesta política significam Alttavia Relocation.',
        ],
      },
      {
        heading: 'Informações que Coletamos',
        paragraphs: [
          'Coletamos informações que você fornece diretamente, como nome, email, telefone, nacionalidade e detalhes sobre seus planos de mudança, quando você entra em contato pelo site, preenche um formulário ou se comunica com nossa equipe.',
          'Também coletamos informações técnicas limitadas de forma automática, incluindo endereço IP, tipo de navegador, informações do dispositivo e páginas visitadas, por meio de cookies e tecnologias semelhantes descritas na seção de Cookies abaixo.',
        ],
      },
      {
        heading: 'Como Usamos Suas Informações',
        paragraphs: [
          'Para responder suas solicitações e fornecer os serviços solicitados.',
          'Para preparar propostas, agendar consultas e coordenar os serviços de imigração, instalação ou negócios contratados.',
          'Para comunicar atualizações sobre seu caso e compartilhar informações relevantes sobre sua mudança.',
          'Para melhorar nosso site, serviços e experiência do cliente.',
          'Para cumprir obrigações legais, regulatórias e profissionais.',
        ],
      },
      {
        heading: 'Base Legal para o Tratamento',
        paragraphs: [
          'Para clientes na União Europeia, tratamos dados pessoais com base no seu consentimento, na necessidade de tratamento para cumprir um contrato com você, em nosso interesse legítimo de operar e melhorar nossos serviços e no cumprimento de obrigações legais previstas na legislação de proteção de dados aplicável, incluindo o Regulamento Geral de Proteção de Dados.',
        ],
      },
      {
        heading: 'Como Compartilhamos Suas Informações',
        paragraphs: [
          'Não vendemos suas informações pessoais. Podemos compartilhar informações com parceiros de confiança, autoridades governamentais e prestadores de serviços, estritamente na medida necessária para prestar os serviços solicitados, como protocolar pedidos de imigração, coordenar com bancos, escolas ou imobiliárias, ou cumprir uma exigência legal.',
          'Qualquer terceiro que trate dados pessoais em nosso nome é obrigado a proteger essas informações e usá-las apenas para as finalidades que especificamos.',
        ],
      },
      {
        heading: 'Retenção de Dados',
        paragraphs: [
          'Mantemos as informações pessoais pelo tempo necessário para prestar nossos serviços, manter nossos registros profissionais e legais e cumprir obrigações de retenção aplicáveis. Quando a informação deixa de ser necessária, nós a eliminamos ou anonimizamos de forma segura.',
        ],
      },
      {
        heading: 'Seus Direitos',
        paragraphs: [
          'Dependendo da sua localização, você pode ter o direito de acessar, corrigir, excluir ou restringir o uso de suas informações pessoais, de se opor a determinadas atividades de tratamento e de solicitar uma cópia de seus dados em formato portátil. Para exercer esses direitos, entre em contato conosco pelos canais abaixo.',
        ],
      },
      {
        heading: 'Cookies e Tecnologias Semelhantes',
        paragraphs: [
          'Nosso site utiliza cookies e tecnologias semelhantes para funcionar corretamente, lembrar suas preferências e entender como os visitantes usam nosso site. Você pode gerenciar as preferências de cookies pelas configurações do seu navegador a qualquer momento.',
        ],
      },
      {
        heading: 'Segurança das Informações',
        paragraphs: [
          'Aplicamos medidas técnicas e organizacionais razoáveis para proteger as informações pessoais contra acesso não autorizado, perda, uso indevido ou alteração. Nenhum método de transmissão ou armazenamento é completamente seguro, e recomendamos compartilhar informações sensíveis apenas pelos canais seguros que disponibilizamos.',
        ],
      },
      {
        heading: 'Transferências Internacionais de Dados',
        paragraphs: [
          'Como atendemos clientes em processo de mudança internacional, as informações pessoais podem ser transferidas e tratadas em países diferentes do seu país de residência. Quando isso ocorre, adotamos medidas para garantir um nível adequado de proteção, em conformidade com a legislação aplicável.',
        ],
      },
      {
        heading: 'Privacidade de Menores',
        paragraphs: [
          'Nossos serviços são direcionados a adultos. Não coletamos intencionalmente informações pessoais de menores, exceto quando necessário para apoiar a mudança de uma família e quando fornecidas diretamente por um responsável legal.',
        ],
      },
      {
        heading: 'Alterações nesta Política',
        paragraphs: [
          'Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou em exigências legais. A versão atualizada será publicada nesta página com a data de vigência revisada.',
        ],
      },
      {
        heading: 'Fale Conosco',
        paragraphs: [
          'Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos, entre em contato pelo email info@alttavia-relocation.com ou pelo telefone +351 934 548 395.',
        ],
      },
    ],
  },
  es: {
    eyebrow: 'Legal',
    title: 'Política de Privacidad',
    updated: 'Última actualización: 22 de junio de 2026',
    intro:
      'Alttavia Relocation valora su privacidad y se compromete a proteger la información personal que comparte con nosotros. Esta Política de Privacidad explica qué información recopilamos, cómo la utilizamos y qué opciones y derechos tiene a su disposición.',
    sections: [
      {
        heading: 'Quiénes Somos',
        paragraphs: [
          'Alttavia Relocation es una asesoría de relocation e inmigración dirigida por abogados con licencia, que ofrece servicios de inmigración, instalación y relocation para personas, familias y empresas que se mudan a Portugal, España y Malta. Las referencias a "nosotros" o "nuestro" en esta política significan Alttavia Relocation.',
        ],
      },
      {
        heading: 'Información que Recopilamos',
        paragraphs: [
          'Recopilamos la información que usted nos proporciona directamente, como nombre, correo electrónico, teléfono, nacionalidad y detalles sobre sus planes de mudanza, cuando se pone en contacto a través del sitio web, completa un formulario o se comunica con nuestro equipo.',
          'También recopilamos información técnica limitada de forma automática, incluyendo dirección IP, tipo de navegador, información del dispositivo y páginas visitadas, mediante cookies y tecnologías similares descritas en la sección de Cookies a continuación.',
        ],
      },
      {
        heading: 'Cómo Utilizamos Su Información',
        paragraphs: [
          'Para responder a sus consultas y prestar los servicios solicitados.',
          'Para preparar propuestas, programar consultas y coordinar los servicios de inmigración, instalación o negocios contratados.',
          'Para comunicarle actualizaciones sobre su caso y compartir información relevante sobre su mudanza.',
          'Para mejorar nuestro sitio web, servicios y experiencia del cliente.',
          'Para cumplir con obligaciones legales, regulatorias y profesionales.',
        ],
      },
      {
        heading: 'Base Legal para el Tratamiento',
        paragraphs: [
          'Para clientes en la Unión Europea, tratamos los datos personales sobre la base de su consentimiento, la necesidad del tratamiento para ejecutar un contrato con usted, nuestro interés legítimo en operar y mejorar nuestros servicios, y el cumplimiento de obligaciones legales conforme a la normativa de protección de datos aplicable, incluido el Reglamento General de Protección de Datos.',
        ],
      },
      {
        heading: 'Cómo Compartimos Su Información',
        paragraphs: [
          'No vendemos su información personal. Podemos compartir información con socios de confianza, autoridades gubernamentales y proveedores de servicios, estrictamente en la medida necesaria para prestar los servicios solicitados, como presentar solicitudes de inmigración, coordinar con bancos, colegios o agencias inmobiliarias, o cumplir con un requisito legal.',
          'Cualquier tercero que trate datos personales en nuestro nombre está obligado a proteger esa información y a utilizarla únicamente para los fines que especificamos.',
        ],
      },
      {
        heading: 'Conservación de Datos',
        paragraphs: [
          'Conservamos la información personal durante el tiempo necesario para prestar nuestros servicios, mantener nuestros registros profesionales y legales, y cumplir con las obligaciones de conservación aplicables. Cuando la información ya no es necesaria, la eliminamos o anonimizamos de forma segura.',
        ],
      },
      {
        heading: 'Sus Derechos',
        paragraphs: [
          'Según su ubicación, puede tener derecho a acceder, corregir, eliminar o restringir el uso de su información personal, a oponerse a determinadas actividades de tratamiento y a solicitar una copia de sus datos en un formato portátil. Para ejercer estos derechos, contáctenos a través de los datos indicados a continuación.',
        ],
      },
      {
        heading: 'Cookies y Tecnologías Similares',
        paragraphs: [
          'Nuestro sitio web utiliza cookies y tecnologías similares para funcionar correctamente, recordar sus preferencias y comprender cómo los visitantes utilizan el sitio. Puede gestionar las preferencias de cookies en la configuración de su navegador en cualquier momento.',
        ],
      },
      {
        heading: 'Seguridad de la Información',
        paragraphs: [
          'Aplicamos medidas técnicas y organizativas razonables para proteger la información personal frente a accesos no autorizados, pérdida, uso indebido o alteración. Ningún método de transmisión o almacenamiento es completamente seguro, por lo que le recomendamos compartir información sensible únicamente a través de los canales seguros que ponemos a su disposición.',
        ],
      },
      {
        heading: 'Transferencias Internacionales de Datos',
        paragraphs: [
          'Dado que atendemos a clientes que se trasladan entre países, la información personal puede transferirse y tratarse en países distintos al de su residencia. Cuando esto ocurre, adoptamos medidas para garantizar un nivel de protección adecuado conforme a la normativa aplicable.',
        ],
      },
      {
        heading: 'Privacidad de Menores',
        paragraphs: [
          'Nuestros servicios están dirigidos a adultos. No recopilamos intencionadamente información personal de menores, salvo cuando sea necesario para apoyar la mudanza de una familia y dicha información sea proporcionada directamente por un tutor legal.',
        ],
      },
      {
        heading: 'Cambios en esta Política',
        paragraphs: [
          'Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o en los requisitos legales. La versión actualizada se publicará en esta página con la fecha de vigencia revisada.',
        ],
      },
      {
        heading: 'Contáctenos',
        paragraphs: [
          'Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, contáctenos en info@alttavia-relocation.com o al +351 934 548 395.',
        ],
      },
    ],
  },
}

export const termsOfUseContent: Record<Locale, LegalDocument> = {
  en: {
    eyebrow: 'Legal',
    title: 'Terms of Use',
    updated: 'Last updated: June 22, 2026',
    intro:
      'These Terms of Use govern your access to and use of the Alttavia Relocation website. By using this website, you agree to these terms. Please read them carefully.',
    sections: [
      {
        heading: 'Acceptance of Terms',
        paragraphs: [
          'By accessing or using this website, you confirm that you accept these Terms of Use and agree to comply with them. If you do not agree, please discontinue use of the website.',
        ],
      },
      {
        heading: 'About Our Services',
        paragraphs: [
          'Alttavia Relocation provides immigration, relocation, and related advisory services. Information published on this website is for general guidance only and does not constitute a binding offer, a guarantee of outcome, or a substitute for personalized legal advice.',
        ],
      },
      {
        heading: 'No Attorney-Client Relationship',
        paragraphs: [
          'Browsing this website or submitting a general inquiry does not create an attorney-client relationship. A formal professional relationship is established only after both parties sign an engagement agreement describing the scope of services and applicable terms.',
        ],
      },
      {
        heading: 'Use of the Website',
        paragraphs: [
          'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of, the website by any third party. You may not attempt to gain unauthorized access to any part of the website, its systems, or networks.',
        ],
      },
      {
        heading: 'Intellectual Property',
        paragraphs: [
          'All content on this website, including text, graphics, logos, images, and the overall design, is the property of Alttavia Relocation or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from this content without our prior written consent.',
        ],
      },
      {
        heading: 'Accuracy of Information',
        paragraphs: [
          'We make reasonable efforts to keep the information on this website accurate and current. Immigration rules, fees, and requirements change frequently, and we do not guarantee that all content reflects the most recent regulations. Always confirm current requirements with our team before relying on website content for decision making.',
        ],
      },
      {
        heading: 'Third-Party Links',
        paragraphs: [
          'This website may contain links to third-party websites for your convenience. We do not control and are not responsible for the content, privacy practices, or availability of those external sites.',
        ],
      },
      {
        heading: 'Limitation of Liability',
        paragraphs: [
          'To the fullest extent permitted by law, Alttavia Relocation shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website or reliance on its content. Our services are provided under the specific terms of a separate engagement agreement, which governs liability for the professional services we deliver.',
        ],
      },
      {
        heading: 'Submissions and Communications',
        paragraphs: [
          'Any information you submit through our contact forms is used to respond to your inquiry and, where applicable, to provide the services you request, as described in our Privacy Policy. Do not share confidential or sensitive information through public or unsecured channels.',
        ],
      },
      {
        heading: 'Governing Law',
        paragraphs: [
          'These Terms of Use are governed by the laws of Portugal, without regard to conflict of law principles. Any dispute arising from your use of this website shall be subject to the exclusive jurisdiction of the competent courts of Portugal.',
        ],
      },
      {
        heading: 'Changes to These Terms',
        paragraphs: [
          'We may revise these Terms of Use at any time. Changes take effect when posted on this page. Continued use of the website after changes are posted constitutes acceptance of the revised terms.',
        ],
      },
      {
        heading: 'Contact Us',
        paragraphs: [
          'For questions about these Terms of Use, contact us at info@alttavia-relocation.com or +351 934 548 395.',
        ],
      },
    ],
  },
  pt: {
    eyebrow: 'Legal',
    title: 'Termos de Uso',
    updated: 'Última atualização: 22 de junho de 2026',
    intro:
      'Estes Termos de Uso regulam o acesso e o uso do site da Alttavia Relocation. Ao utilizar este site, você concorda com estes termos. Leia atentamente antes de continuar.',
    sections: [
      {
        heading: 'Aceitação dos Termos',
        paragraphs: [
          'Ao acessar ou utilizar este site, você confirma que aceita estes Termos de Uso e concorda em cumpri-los. Caso não concorde, interrompa o uso do site.',
        ],
      },
      {
        heading: 'Sobre Nossos Serviços',
        paragraphs: [
          'A Alttavia Relocation presta serviços de imigração, relocation e assessoria correlata. As informações publicadas neste site têm caráter geral e não constituem uma oferta vinculante, garantia de resultado ou substituto de orientação jurídica personalizada.',
        ],
      },
      {
        heading: 'Ausência de Relação Advogado-Cliente',
        paragraphs: [
          'Navegar neste site ou enviar uma solicitação geral não cria uma relação advogado-cliente. Uma relação profissional formal somente é estabelecida após a assinatura de um contrato de prestação de serviços que descreva o escopo e os termos aplicáveis.',
        ],
      },
      {
        heading: 'Uso do Site',
        paragraphs: [
          'Você concorda em utilizar este site apenas para finalidades lícitas e de forma que não viole os direitos de terceiros nem restrinja o uso do site por outras pessoas. Você não deve tentar obter acesso não autorizado a qualquer parte do site, de seus sistemas ou redes.',
        ],
      },
      {
        heading: 'Propriedade Intelectual',
        paragraphs: [
          'Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, imagens e o design em geral, é de propriedade da Alttavia Relocation ou de seus licenciantes e é protegido por leis de propriedade intelectual. Você não pode reproduzir, distribuir ou criar obras derivadas a partir deste conteúdo sem nosso consentimento prévio por escrito.',
        ],
      },
      {
        heading: 'Precisão das Informações',
        paragraphs: [
          'Empregamos esforços razoáveis para manter as informações deste site precisas e atualizadas. As regras, taxas e exigências de imigração mudam com frequência, e não garantimos que todo o conteúdo reflita a regulamentação mais recente. Confirme sempre as exigências atuais com nossa equipe antes de tomar decisões com base no conteúdo do site.',
        ],
      },
      {
        heading: 'Links de Terceiros',
        paragraphs: [
          'Este site pode conter links para sites de terceiros, por conveniência. Não controlamos e não somos responsáveis pelo conteúdo, pelas práticas de privacidade ou pela disponibilidade desses sites externos.',
        ],
      },
      {
        heading: 'Limitação de Responsabilidade',
        paragraphs: [
          'Na máxima extensão permitida por lei, a Alttavia Relocation não será responsável por danos indiretos, incidentais ou consequenciais decorrentes do uso deste site ou da confiança em seu conteúdo. Nossos serviços são prestados sob os termos específicos de um contrato de prestação de serviços, que rege a responsabilidade pelos serviços profissionais prestados.',
        ],
      },
      {
        heading: 'Envios e Comunicações',
        paragraphs: [
          'As informações enviadas por meio de nossos formulários de contato são usadas para responder sua solicitação e, quando aplicável, para prestar os serviços solicitados, conforme descrito em nossa Política de Privacidade. Não compartilhe informações confidenciais ou sensíveis por canais públicos ou não seguros.',
        ],
      },
      {
        heading: 'Legislação Aplicável',
        paragraphs: [
          'Estes Termos de Uso são regidos pelas leis de Portugal, sem considerar regras de conflito de leis. Qualquer disputa decorrente do uso deste site estará sujeita à jurisdição exclusiva dos tribunais competentes de Portugal.',
        ],
      },
      {
        heading: 'Alterações nestes Termos',
        paragraphs: [
          'Podemos revisar estes Termos de Uso a qualquer momento. As alterações entram em vigor a partir da publicação nesta página. O uso contínuo do site após a publicação das alterações representa aceitação dos termos revisados.',
        ],
      },
      {
        heading: 'Fale Conosco',
        paragraphs: [
          'Para dúvidas sobre estes Termos de Uso, entre em contato pelo email info@alttavia-relocation.com ou pelo telefone +351 934 548 395.',
        ],
      },
    ],
  },
  es: {
    eyebrow: 'Legal',
    title: 'Términos de Uso',
    updated: 'Última actualización: 22 de junio de 2026',
    intro:
      'Estos Términos de Uso regulan el acceso y el uso del sitio web de Alttavia Relocation. Al utilizar este sitio web, usted acepta estos términos. Le recomendamos leerlos con atención.',
    sections: [
      {
        heading: 'Aceptación de los Términos',
        paragraphs: [
          'Al acceder o utilizar este sitio web, usted confirma que acepta estos Términos de Uso y se compromete a cumplirlos. Si no está de acuerdo, le pedimos que interrumpa el uso del sitio.',
        ],
      },
      {
        heading: 'Sobre Nuestros Servicios',
        paragraphs: [
          'Alttavia Relocation presta servicios de inmigración, relocation y asesoría relacionada. La información publicada en este sitio web tiene carácter general y no constituye una oferta vinculante, una garantía de resultado ni un sustituto del asesoramiento legal personalizado.',
        ],
      },
      {
        heading: 'Ausencia de Relación Abogado-Cliente',
        paragraphs: [
          'Navegar por este sitio web o enviar una consulta general no crea una relación abogado-cliente. Una relación profesional formal solo se establece tras la firma de un contrato de prestación de servicios que describa el alcance y los términos aplicables.',
        ],
      },
      {
        heading: 'Uso del Sitio Web',
        paragraphs: [
          'Usted se compromete a utilizar este sitio web únicamente con fines lícitos y de manera que no infrinja los derechos de terceros ni restrinja el uso del sitio por parte de otras personas. No debe intentar obtener acceso no autorizado a ninguna parte del sitio, sus sistemas o redes.',
        ],
      },
      {
        heading: 'Propiedad Intelectual',
        paragraphs: [
          'Todo el contenido de este sitio web, incluidos textos, gráficos, logotipos, imágenes y el diseño general, es propiedad de Alttavia Relocation o de sus licenciantes y está protegido por las leyes de propiedad intelectual. No puede reproducir, distribuir ni crear obras derivadas a partir de este contenido sin nuestro consentimiento previo por escrito.',
        ],
      },
      {
        heading: 'Exactitud de la Información',
        paragraphs: [
          'Realizamos esfuerzos razonables para mantener la información de este sitio web precisa y actualizada. Las normas, tasas y requisitos de inmigración cambian con frecuencia, y no garantizamos que todo el contenido refleje la normativa más reciente. Confirme siempre los requisitos vigentes con nuestro equipo antes de tomar decisiones basadas en el contenido del sitio.',
        ],
      },
      {
        heading: 'Enlaces a Terceros',
        paragraphs: [
          'Este sitio web puede contener enlaces a sitios de terceros por su conveniencia. No controlamos ni somos responsables del contenido, las prácticas de privacidad o la disponibilidad de esos sitios externos.',
        ],
      },
      {
        heading: 'Limitación de Responsabilidad',
        paragraphs: [
          'En la máxima medida permitida por la ley, Alttavia Relocation no será responsable de daños indirectos, incidentales o consecuentes derivados del uso de este sitio web o de la confianza depositada en su contenido. Nuestros servicios se prestan conforme a los términos específicos de un contrato de prestación de servicios, que regula la responsabilidad por los servicios profesionales prestados.',
        ],
      },
      {
        heading: 'Envíos y Comunicaciones',
        paragraphs: [
          'La información enviada a través de nuestros formularios de contacto se utiliza para responder a su consulta y, cuando corresponda, para prestar los servicios solicitados, según se describe en nuestra Política de Privacidad. No comparta información confidencial o sensible a través de canales públicos o no seguros.',
        ],
      },
      {
        heading: 'Legislación Aplicable',
        paragraphs: [
          'Estos Términos de Uso se rigen por las leyes de Portugal, sin tener en cuenta las normas de conflicto de leyes. Cualquier disputa derivada del uso de este sitio web estará sujeta a la jurisdicción exclusiva de los tribunales competentes de Portugal.',
        ],
      },
      {
        heading: 'Cambios en estos Términos',
        paragraphs: [
          'Podemos revisar estos Términos de Uso en cualquier momento. Los cambios entran en vigor en el momento de su publicación en esta página. El uso continuado del sitio web tras la publicación de los cambios constituye la aceptación de los términos revisados.',
        ],
      },
      {
        heading: 'Contáctenos',
        paragraphs: [
          'Si tiene preguntas sobre estos Términos de Uso, contáctenos en info@alttavia-relocation.com o al +351 934 548 395.',
        ],
      },
    ],
  },
}
