export class ServiceModel {
    servicios = {
        inmobiliarias: [
          {
            titulo: 'Evaluaciones de Impacto Ambiental',
            icono: 'assessment',
            descripcion: 'Estudios completos para proyectos inmobiliarios.',
            lista: [
              'EIA / DIA completos',
              'Línea base de flora y fauna',
              'Planes de manejo de bosque nativo'
            ]
          },
          {
            titulo: 'Estudios de Suelo y Territorio',
            icono: 'terrain',
            descripcion: 'Análisis detallados para urbanizaciones.',
            lista: [
              'Estudios de suelo',
              'Ordenamiento territorial',
              'Informes de cumplimiento ambiental (ICA)'
            ]
          }
        ],
        electricas: [
          {
            titulo: 'Gestión de Vegetación',
            icono: 'forest',
            descripcion: 'Manejo de franjas de servidumbre.',
            lista: [
              'Evaluación de franjas',
              'Control de especies invasoras',
              'Monitoreo de riesgo de caída'
            ]
          },
          {
            titulo: 'Prevención de Riesgos',
            icono: 'warning',
            descripcion: 'Seguridad y continuidad operativa.',
            lista: [
              'Estudios de compatibilidad vegetacional',
              'Planificación de faenas',
              'Línea base de flora'
            ]
          }
        ],
        propietarios: [
          {
            titulo: 'Planes de Manejo',
            icono: 'grass',
            descripcion: 'Gestión sustentable de bosques.',
            lista: [
              'Planes para bosque nativo y exótico',
              'Reforestación',
              'Asesoría para subsidios CONAF'
            ]
          },
          {
            titulo: 'Certificaciones Forestales',
            icono: 'verified',
            descripcion: 'Acompañamiento en procesos de certificación.',
            lista: [
              'Certificación forestal',
              'Evaluación de suelos',
              'Aptitud productiva'
            ]
          }
        ]
      };
  }

  export class AboutModel {
    features = [
        {
          id: 'experiencia',
          titulo: '+10 años de experiencia',
          icono: 'verified',
          descripcion: 'Más de una década trabajando en proyectos ambientales y forestales en Chile, con resultados comprobados y clientes satisfechos.',
          stats: [
            { valor: 10, label: 'años', formato: '10+' },
            { valor: 200, label: 'proyectos', formato: '200+' },
            { valor: 98, label: 'satisfacción', formato: '98%' }
          ],
          fondo: 'assets/images/experience-bg.jpg'
        },
        {
          id: 'equipo',
          titulo: 'Equipo multidisciplinario',
          icono: 'groups',
          descripcion: 'Ingenieros forestales, biólogos, geógrafos y especialistas en normativa ambiental trabajando juntos.',
          stats: [
            { valor: 15, label: 'profesionales', formato: '15' },
            { valor: 5, label: 'especialidades', formato: '5' }
          ],
          fondo: 'assets/images/team-bg.jpg'
        },
        {
          id: 'hectareas',
          titulo: 'Más de 5000 hectáreas evaluadas',
          icono: 'forest',
          descripcion: 'Hemos evaluado y gestionado miles de hectáreas, contribuyendo a la conservación y manejo sustentable.',
          stats: [
            { valor: 5000, label: 'hectáreas evaluadas', formato: '5.000+' },
            { valor: 2000, label: 'proyectos', formato: '2.000+' }
          ],
          fondo: 'assets/images/forest-bg.jpg'
        },
        {
          id: 'clientes',
          titulo: '+200 clientes atendidos',
          icono: 'handshake',
          descripcion: 'Desde pequeñas propiedades hasta grandes empresas eléctricas e inmobiliarias, todos confían en nosotros.',
          stats: [
            { valor: 200, label: 'clientes', formato: '200+' },
            { valor: 95, label: 'recomienda', formato: '95%' }
          ],
          fondo: 'assets/images/clients-bg.jpg'
        }
      ];
}
export class MisionModel {
    misionItems = [
        {
          icono: 'psychology',
          titulo: 'Experiencia en terreno',
          descripcion: 'Más de 5000 hectáreas evaluadas y 2000 proyectos de recolección de datos ambientales con éxito.'
        },
        {
          icono: 'gavel',
          titulo: 'Conocimiento normativo',
          descripcion: 'Tramitación ante CONAF, SEA y manejo de normativa ambiental vigente.'
        },
        {
          icono: 'spa',
          titulo: 'Vocación sustentable',
          descripcion: 'Compromiso real con el medio ambiente, buscando siempre soluciones que beneficien a todos.'
        }
      ];
}