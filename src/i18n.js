// All Spanish UI strings and taxonomy labels
export const T = {
  // Taxonomy labels
  eventTypes: {
    'subito-discreto': 'Súbito-discreto',
    'acumulativo': 'Acumulativo',
    'cascada': 'Cascada',
    'legitimidad': 'Legitimidad'
  },
  channels: {
    'operacional': 'Operacional',
    'financiero': 'Financiero',
    'regulatorio-legal': 'Regulatorio-legal',
    'legitimidad': 'Legitimidad',
    'modelo-de-negocio': 'Modelo de negocio'
  },
  uncertaintySources: {
    'ocurrencia': 'Ocurrencia',
    'magnitud': 'Magnitud',
    'duracion': 'Duración',
    'actor': 'Actor'
  },
  costUnits: {
    'caja': 'Caja',
    'tiempo': 'Tiempo',
    'capital_politico': 'Capital político',
    'legitimidad': 'Legitimidad'
  },
  potencia: { 'baja': 'Baja', 'media': 'Media', 'alta': 'Alta' },
  duracion: { 'una-ronda': 'Una ronda', 'multiples-rondas': 'Múltiples rondas', 'persistente': 'Persistente' },
  costo: { 'bajo': 'Bajo', 'medio': 'Medio', 'alto': 'Alto' },
  roles: { 'ancla': 'Caso ancla', 'transferencia': 'Caso de transferencia', 'portable': 'Caso portable' },

  // Screen titles
  screenTitles: [
    '',
    'Briefing del caso',
    'Clasificación del evento',
    'Mapa de impacto',
    'Buffer Board',
    'Trade-off statement',
    'Decisión y frase E-BTA/R',
    'Indicadores de revisión',
    'Inject revelado',
    'Revisión forzada',
    'Exportar'
  ],

  // UI strings
  continue: 'Continuar →',
  back: '← Atrás',
  reset: 'Reiniciar sesión',
  downloadPdf: 'Descargar PDF',
  printView: 'Vista imprimible',
  screenLabel: (n, total) => `Pantalla ${n} de ${total}`,

  // Phrases
  phrasePrefix: 'Dado el evento',
  phrasePart2: ', que abre la incertidumbre',
  phrasePart3: ' sobre el canal',
  phrasePart4: ', protegemos',
  phrasePart5: ' mediante el buffer',
  phrasePart6: ' (potencia:',
  phrasePart7: ', duración:',
  phrasePart8: ', costo:',
  phrasePart9: '), sacrificamos parcialmente',
  phrasePart10: ', monitoreamos',
  phrasePart11: ' e',
  phrasePart12: ', y revisamos la decisión si se cruza el umbral:',

  empty: (label) => `[${label}]`,

  // Screen 1
  s1_read: 'He leído el briefing y entiendo el contexto del caso',
  s1_signal: 'Señal inicial',
  s1_estimated: (min) => `Tiempo estimado: ${min} minutos`,

  // Screen 2
  s2_eventType: 'Tipo de evento',
  s2_eventTypeHint: 'Puede seleccionar más de un tipo si el evento es híbrido.',
  s2_demarcation: 'Criterio de demarcación',
  s2_demarcationHint: 'Explique brevemente por qué clasifica el evento así (2-3 oraciones).',
  s2_uncertainty: 'Fuente principal de incertidumbre',

  // Screen 3
  s3_dominantChannel: 'Canal de impacto dominante',
  s3_secondaryChannel: 'Canal de impacto secundario (opcional)',
  s3_secondaryNone: 'Ninguno',
  s3_impact1: 'Impacto en la 1.ª ronda (corto plazo)',
  s3_impact1Hint: 'Describa el impacto inmediato sobre la operación y las finanzas.',
  s3_impact2: 'Impacto en la 2.ª ronda (mediano plazo)',
  s3_impact2Hint: 'Describa cómo se propaga el impacto si el evento se sostiene o escala.',

  // Screen 4
  s4_selectBuffers: 'Seleccione hasta 2 buffers para activar',
  s4_selectHint: 'Un buffer es un recurso o capacidad que amortigua el impacto del evento. Elija los que la empresa activaría.',
  s4_potencia: 'Potencia del buffer',
  s4_duracion: 'Duración estimada',
  s4_costo: 'Nivel de costo',
  s4_costUnit: 'Unidad de costo',
  s4_costUnitHint: 'Unidad de costo definida por el caso para este buffer.',
  s4_maxReached: 'Ya seleccionó 2 buffers. Deseleccione uno para elegir otro.',

  // Screen 5
  s5_protects: '¿Qué se protege?',
  s5_protectsHint: 'El activo, capacidad o relación que la decisión pone a resguardo.',
  s5_sacrifices: '¿Qué se sacrifica?',
  s5_sacrificesHint: 'Lo que se cede o expone para proteger lo anterior.',
  s5_residualRisk: 'Riesgo residual',
  s5_residualRiskHint: 'El riesgo que permanece incluso si la decisión funciona como se espera.',

  // Screen 6
  s6_phraseTitle: 'Frase E-BTA/R',
  s6_phraseHint: 'Esta frase se construye a partir de sus respuestas anteriores. Complete los indicadores para cerrar la frase.',
  s6_i1: 'Indicador I1',
  s6_i1Hint: 'Primer indicador que monitoreará para detectar cambios relevantes.',
  s6_i2: 'Indicador I2',
  s6_i2Hint: 'Segundo indicador de seguimiento.',
  s6_threshold: 'Umbral de revisión (T)',
  s6_thresholdHint: 'Condición o valor que, al cruzarse, dispara una revisión de la decisión. Ej: "Si la circular se publica con plazo menor a 60 días..."',

  // Screen 7
  s7_review: 'Revise y confirme sus indicadores',
  s7_hint: 'Estos indicadores y el umbral definen cuándo revisitará su decisión. Puede ajustarlos antes de continuar.',

  // Screen 8
  s8_title: 'INJECT DEL FACILITADOR',
  s8_warning: 'A partir de este momento no podrá regresar a las pantallas anteriores. Lea con atención.',
  s8_readBtn: 'He leído el inject — continuar →',

  // Screen 9
  s9_supuestos: 'Revisión de supuestos',
  s9_hint: 'A la luz del inject, identifique qué supuestos sostienen su decisión original.',
  s9_maintains: 'Supuesto que mantengo',
  s9_maintainsHint: 'Un supuesto de su decisión original que sigue en pie después del inject.',
  s9_abandons: 'Supuesto que abandono',
  s9_abandonsHint: 'Un supuesto que el inject invalida o debilita de forma significativa.',
  s9_inverts: 'Supuesto que invierto',
  s9_invertsHint: 'Un supuesto que no solo se invalida, sino que ahora opera en sentido contrario.',
  s9_newPhrase: 'Nueva frase E-BTA/R (revisada)',
  s9_newPhraseHint: 'Reformule su decisión a la luz del inject. Edite los campos que cambian; mantenga los que siguen igual.',

  // Screen 10
  s10_title: 'Exportar resultados',
  s10_hint: 'Su ciclo de decisión está completo. Descargue el registro para compartirlo con el facilitador.',
  s10_pdfNote: 'El PDF incluye todas sus respuestas, la frase E-BTA/R inicial y revisada, y el inject revelado.',

  // Professor mode
  prof_panel: 'MODO PROFESOR',
  prof_injectSelect: 'Seleccione el inject a revelar',
  prof_facilPrompt: 'Pregunta guía para el hot wash:',
  prof_bufferNotes: 'Notas para el facilitador:',
  prof_caseNotes: 'Notas generales del caso:',
  prof_navTitle: 'Navegación de cohorte',

  // Reset confirm
  resetConfirm: '¿Reiniciar la sesión? Se perderá todo el progreso no exportado.'
};
