// ==========================================
// MODELO: SISTEMA DE GESTIÓN INTEGRADO (SIG)
// ==========================================
export class SigModel {
  titulo = 'POLÍTICA DEL SISTEMA DE GESTIÓN INTEGRADO';
  subtitulo = 'RMA FOREST SPA';
  icono = 'description';
  intro =
    'RMA FOREST SPA, empresa dedicada a la consultoría ambiental, forestal, agrícola, paisajística y de arbolado urbano, establece su compromiso con la calidad de sus servicios, la protección del medio ambiente, la seguridad y salud de las personas, y el cumplimiento de los requisitos aplicables, integrando estos principios en todas sus actividades y procesos.';

  compromisosTitulo = 'Para ello, la organización se compromete a:';
  compromisos = [
    'Entregar servicios confiables y de excelencia, orientados a satisfacer los requisitos y expectativas de nuestros clientes y demás partes interesadas pertinentes.',
    'Proteger el medio ambiente mediante la prevención de la contaminación, el uso eficiente de los recursos naturales, la reducción de residuos y la mitigación de los impactos ambientales derivados de nuestras actividades.',
    'Proporcionar condiciones de trabajo seguras y saludables para prevenir lesiones, enfermedades laborales y el deterioro de la salud de los trabajadores.',
    'Eliminar peligros y reducir riesgos para la seguridad y salud en el trabajo mediante la identificación, evaluación y control de los riesgos y oportunidades asociados a nuestras actividades.',
    'Garantizar la consulta y participación de los trabajadores en materias relacionadas con la seguridad, salud ocupacional y mejora del Sistema de Gestión Integrado.',
    'Cumplir con la legislación vigente, los requisitos reglamentarios, los compromisos adquiridos con clientes y demás obligaciones aplicables a la organización.',
    'Promover el desarrollo de competencias, la capacitación continua y la toma de conciencia de nuestros colaboradores, fortaleciendo una cultura organizacional basada en la excelencia y la prevención.',
    'Mejorar continuamente la eficacia y desempeño del Sistema de Gestión Integrado mediante el seguimiento de objetivos, indicadores, auditorías y revisión periódica por la Dirección.',
  ];

  objetivosTitulo = 'OBJETIVOS DEL SIG';
  objetivos = [
    'Aumentar la satisfacción de los clientes y la calidad de los servicios entregados.',
    'Cumplir el 100% de los requisitos legales y otros requisitos aplicables.',
    'Reducir y controlar los impactos ambientales significativos derivados de nuestras actividades.',
    'Mantener ambientes de trabajo seguros, minimizando incidentes, accidentes y enfermedades laborales.',
    'Fortalecer las competencias del personal mediante programas de capacitación y evaluación de eficacia.',
    'Mejorar continuamente los procesos organizacionales mediante la gestión de riesgos y oportunidades.',
  ];

  valoresTitulo = 'VALORES ORGANIZACIONALES';
  valores = [
    { titulo: 'Integridad', descripcion: 'actuamos con ética, transparencia y responsabilidad.' },
    {
      titulo: 'Excelencia',
      descripcion: 'buscamos permanentemente la calidad y mejora de nuestros servicios.',
    },
    {
      titulo: 'Seguridad',
      descripcion: 'priorizamos la protección de las personas en todas nuestras actividades.',
    },
    {
      titulo: 'Sostenibilidad',
      descripcion:
        'promovemos el equilibrio entre desarrollo, cuidado ambiental y responsabilidad social.',
    },
    {
      titulo: 'Compromiso',
      descripcion:
        'cumplimos nuestras obligaciones con clientes, trabajadores y partes interesadas.',
    },
    {
      titulo: 'Trabajo en Equipo',
      descripcion: 'fomentamos la colaboración, el respeto y la participación.',
    },
    {
      titulo: 'Innovación',
      descripcion:
        'impulsamos soluciones técnicas eficientes y sostenibles para nuestros clientes.',
    },
  ];

  compromiso =
    'La Gerencia General proporciona los recursos necesarios para implementar, mantener y mejorar continuamente el Sistema de Gestión Integrado, asegurando la difusión, comprensión y aplicación de esta política en todos los niveles de la organización.';

  firma = {
    nombre: 'Rodrigo Muñoz Alonso',
    cargo: 'GERENTE GENERAL',
  };
}

// ==========================================
// MODELO: STOP WORK
// ==========================================
export class StopWorkModel {
  titulo = 'POLÍTICA STOP WORK';
  subtitulo = 'RMA FOREST SPA';
  icono = 'health_and_safety';

  parrafosIntro = [
    'En RMA FOREST SPA, estamos comprometidos con carácter permanente en promover y consolidar la cultura de la salud y la seguridad de todas las personas involucradas en nuestra actividad en cualquier lugar del mundo. Ello significa reforzar la conciencia del riesgo y fomentar comportamientos responsables para asegurar que el trabajo se realice con calidad y sin accidentes, porque las personas que trabajan con nosotros son el bien más preciado que debemos proteger.',
    'Nos comprometemos también a salvaguardar el medioambiente, convencidos de que prevenir riesgos y alentar comportamientos responsables en esta materia significa defender nuestro bienestar y el de las generaciones futuras.',
  ];

  highlight = {
    icono: 'pan_tool',
    titulo: 'STOP WORK',
    texto:
      'Les pedimos a cada uno de vosotros que actúen rápidamente y detengan cualquier actividad que suponga un riesgo para la salud y seguridad propia o ajena o que pueda causar un daño al medioambiente, entendido como deterioro de la calidad de sus componentes (aire, suelo, agua, flora y fauna) o alteración del patrimonio arqueológico y artístico de un lugar.',
  };

  parrafosFinales = [
    'También les pedimos que informen inmediatamente a su superior directo, o al representante con el cargo más alto de RMAFOREST SPA presente en el lugar, todo comportamiento arriesgado y toda acción, omisión o situación que pueda potencialmente causar un accidente o un daño medioambiental.',
    'La orden de Stop Work debe aplicarse sin temor a las consecuencias. No se atribuirá ninguna culpa ni responsabilidad a los empleados o contratistas que señalen de buena fe una situación de riesgo o que detengan un trabajo, aunque dicha acción posteriormente se revelase innecesaria.',
  ];

  compromiso =
    'La salud y la seguridad de los trabajadores y la protección del medioambiente son nuestro compromiso diario y están por delante de cualquier otra exigencia.';

  firma = {
    nombre: 'Rodrigo Muñoz Alonso',
    cargo: 'GERENTE GENERAL',
    empresa: 'RMA FOREST SPA',
  };
}

// ==========================================
// MODELO: CERTIFICACIONES
// ==========================================
export interface Certificacion {
  titulo: string;
  nombre: string;
  icono: string;
  codigo: string;
  fecha: string;
  pdf: string;
  ariaLabel: string;
  accion: string; // "Ver certificado" o "Ver diploma"
}

export class CertModel {
  titulo = 'CERTIFICACIONES';
  subtitulo = 'RMA FOREST SPA';
  icono = 'verified';

  intro =
    'RMA FOREST SPA cuenta con un Sistema de Gestión Integrado certificado por AENOR bajo las normas internacionales ISO 9001, ISO 14001 e ISO 45001, lo que respalda nuestro compromiso con la calidad de nuestros servicios, la protección del medio ambiente y la seguridad y salud de nuestros colaboradores.';

  seccionTitulo = 'NUESTRAS CERTIFICACIONES';

  certificaciones: Certificacion[] = [
    {
      titulo: 'ISO 9001',
      nombre: 'Gestión de la Calidad',
      icono: 'workspace_premium',
      codigo: 'ER-0373/2026',
      fecha: '21-08-2026 → 21-08-2029',
      pdf: 'assets/certificaciones/iso-9001.pdf',
      ariaLabel: 'Ver certificado ISO 9001 - Gestión de la Calidad',
      accion: 'Ver certificado',
    },
    {
      titulo: 'ISO 14001',
      nombre: 'Gestión Ambiental',
      icono: 'eco',
      codigo: 'GA-2026/0188',
      fecha: '21-08-2026 → 21-08-2029',
      pdf: 'assets/certificaciones/iso-14001.pdf',
      ariaLabel: 'Ver certificado ISO 14001 - Gestión Ambiental',
      accion: 'Ver certificado',
    },
    {
      titulo: 'ISO 45001',
      nombre: 'Seguridad y Salud en el Trabajo',
      icono: 'health_and_safety',
      codigo: 'SST-0114/2026',
      fecha: '21-08-2026 → 21-08-2029',
      pdf: 'assets/certificaciones/iso-45001.pdf',
      ariaLabel: 'Ver certificado ISO 45001 - Seguridad y Salud en el Trabajo',
      accion: 'Ver certificado',
    },
    {
      titulo: 'Integridad',
      nombre: 'Pasaporte a la Integridad',
      icono: 'workspace_premium',
      codigo: 'AHK Chile',
      fecha: 'Septiembre 2026',
      pdf: 'assets/certificaciones/diploma-integridad.pdf',
      ariaLabel: 'Ver diploma Pasaporte a la Integridad - AHK Chile',
      accion: 'Ver diploma',
    },
  ];

  compromiso =
    'Nuestro Sistema de Gestión Integrado es revisado y auditado periódicamente para asegurar el cumplimiento continuo de los estándares internacionales y la mejora permanente de nuestros procesos.';
}
