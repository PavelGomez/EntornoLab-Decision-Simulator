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
  // Mecanismo del buffer (cómo protege) — v1.5
  bufferMechanisms: { 'absorber': 'Absorber', 'demorar': 'Demorar', 'desviar': 'Desviar', 'transformar': 'Transformar' },
  bufferMechanismDefs: {
    'absorber': 'Encaja el golpe sin trasladarlo (lo aguanta dentro).',
    'demorar': 'Gana tiempo: pospone el impacto para decidir con más información.',
    'desviar': 'Traslada el impacto a otro canal, actor o momento.',
    'transformar': 'Cambia la naturaleza del problema (rediseña la exposición).',
  },
  // Tipos de jugada (opción real) — v1.5
  realOptions: {
    'esperar': 'Esperar / diferir',
    'pilotar': 'Pilotar / expandir',
    'abandonar': 'Abandonar',
    'contraer': 'Contraer',
    'cambiar': 'Cambiar / sustituir',
    'secuenciar': 'Secuenciar',
  },
  roles: { 'ancla': 'Caso ancla', 'transferencia': 'Caso de transferencia', 'portable': 'Caso portable', 'final': 'Caso de evaluación (entrega final)' },

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
  downloadPdf: 'Descargar PDF + JSON',
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
  // Reducir equivocidad (v1.5) — antes de fijar el canal dominante
  s3_equivTitle: 'Reducir equivocidad',
  s3_equivIntro: 'Reducir equivocidad: nombra 2–3 lecturas causales rivales de la señal y qué evidencia las distinguiría, antes de elegir el canal dominante.',
  s3_rivalInterpretations: 'Interpretaciones rivales (opcional)',
  s3_rivalInterpretationsHint: 'Escribe 2–3 lecturas causales plausibles e incompatibles de la misma señal (2–3 líneas).',
  s3_discriminatingEvidence: 'Evidencia discriminante (opcional)',
  s3_discriminatingEvidenceHint: 'Qué dato favorecería una lectura sobre otra (1 línea).',
  s3_rivalSuggestions: 'Lecturas rivales sugeridas (para inspirarte):',

  // Screen 4
  s4_selectBuffers: 'Seleccione hasta 2 buffers para activar',
  s4_selectHint: 'Un buffer es un recurso o capacidad que amortigua el impacto del evento. Elija los que la empresa activaría.',
  s4_potencia: 'Potencia del buffer',
  s4_duracion: 'Duración estimada',
  s4_costo: 'Nivel de costo',
  s4_costUnit: 'Unidad de costo',
  s4_costUnitHint: 'Unidad de costo definida por el caso para este buffer.',
  s4_maxReached: 'Ya seleccionó 2 buffers. Deseleccione uno para elegir otro.',
  // Mecanismo y costo de oportunidad (v1.5) — opcionales por buffer
  s4_mechanism: '¿Cómo protege? (opcional)',
  s4_mechanismNone: '— Mecanismo —',
  s4_opportunityCost: '¿Qué alternativa sacrificas al mantener o activar este buffer? (opcional)',
  s4_opportunityCostHint: 'El costo de oportunidad, no el directo: caja que no inviertes, foco, velocidad, legitimidad, flexibilidad…',

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
  // Opción real (v1.5) — opcional, en Decisión
  s6_realOption: 'Tipo de jugada (opción real) — opcional',
  s6_realOptionNone: '— Sin especificar —',
  s6_realOptionHint: 'Una opción real compra flexibilidad: el derecho —no la obligación— de actuar después.',
  s6_realOptionTrigger: 'Gatillo de ejercicio',
  s6_realOptionTriggerHint: 'Qué señal define ejercer, abandonar o seguir esperando.',
  s6_waitPista: 'Esperar es opción real solo si dices qué proteges mientras esperas, qué incertidumbre buscas resolver y bajo qué señal dejas de esperar.',

  // P6 — tarjeta de acción táctica (rediseño A7 / N0.2)
  s6_actionCardTitle: 'Tarjeta de acción: Qué · Quién · Primer hito · Cuándo · No haré',
  s6_action: 'Qué haremos (verbo + objeto)',
  s6_actionHint: 'Un verbo que comprometa recursos, con su objeto. Ej.: «constituir un fideicomiso parcial», «renegociar la custodia».',
  s6_owner: 'Quién responde',
  s6_ownerHint: 'Una persona o función nombrable. «La empresa» no basta.',
  s6_firstMilestone: 'Primer hito / primer movimiento',
  s6_firstMilestoneHint: 'La primera acción concreta y verificable.',
  s6_deadline: 'Cuándo (plazo)',
  s6_deadlineHint: 'Fecha o ventana. Ej.: «antes del día 30».',
  s6_rejectedAlt: 'Qué NO haré (alternativa rechazada)',
  s6_rejectedAltHint: 'Una alternativa plausible que descartas, para hacer explícita la apuesta.',
  s6_aspirationalHint: '«%V» por sí solo informa u observa, pero no compromete recursos. Añade un objeto y un verbo de acción (activar, suspender, renegociar, pilotar, migrar, abandonar…) para que sea un curso ejecutable.',
  s6_actionTooltip: 'Acción táctica: un curso ejecutable dentro del horizonte; no una aspiración ni un indicador.',

  // Screen 7
  s7_review: 'Contrato de monitoreo',
  s7_hint: 'Define dos señales que puedas observar a tiempo y un umbral que dispare una acción concreta. Un umbral sin acción asociada es solo una alarma.',
  s7_thresholdActionHint: 'Une el umbral a una acción: «Si se cruza T, entonces…».',

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

  // ── Capa de Gobierno e Integridad — textos fijos net-new (ANEXO §4) ──
  integrityLegend: 'Este reporte documenta el recorrido realizado en sesión. Su edición posterior debe declararse.',
  retenState: 'El facilitador revelará el inject. No es posible avanzar hasta que se libere.',
  consolePrivateBanner: 'Entorno privado del facilitador — no comparta esta URL ni este enlace con los alumnos.',
  demoMark: 'DEMO — recorrido de práctica, sin valor de evidencia.',
  wargameAdjudication: 'No se declara ganador. Se explica por qué el actor responde así y qué supuesto cae.',

  // Consola docente (pre-vuelo + tablero + gate)
  console_title: 'Consola del facilitador',
  console_gatePrompt: 'Frase de acceso',
  console_gateHint: 'La consola está protegida por una frase de acceso. (Ofuscación del lado del cliente: frena al alumno casual, no a un atacante técnico. La privacidad estricta es Fase 2 — backend.)',
  console_gateBtn: 'Entrar',
  console_gateError: 'Frase incorrecta. Inténtelo de nuevo.',
  console_preflightTitle: 'Pre-vuelo — armar el recorrido',
  console_startRun: 'Iniciar run →',
  console_releaseInject: 'Liberar inject',
  console_injectReleased: 'Inject liberado ✓',
  console_phraseRegistry: 'Registro de frases E-BTA/R finales (hot wash)',
  console_phraseRegistryHint: 'Pegue aquí la frase leída por cada grupo en el hot wash. Se usa para calibrar; no es nota.',

  // Professor mode
  prof_panel: 'MODO PROFESOR',
  prof_modality: 'Modalidad del recorrido',
  prof_injectSelect: 'Seleccione el inject a revelar',
  prof_facilPrompt: 'Pregunta guía para el hot wash:',
  prof_bufferNotes: 'Notas para el facilitador:',
  prof_caseNotes: 'Notas generales del caso:',
  prof_navTitle: 'Navegación de cohorte',

  // Reset confirm
  resetConfirm: '¿Reiniciar la sesión? Se perderá todo el progreso no exportado.',

  // Microcopy por módulo (v1.5) — texto guía breve bajo el encabezado
  microcopy: {
    evento: 'No describas el clima general. Identifica el hecho o umbral que obliga a decidir ahora.',
    canal: 'Reduce equivocidad: elige la lectura causal dominante y nombra una interpretación rival.',
    buffer: 'Un recurso solo cuenta como buffer si protege un canal específico y tiene costo de activación y de oportunidad.',
    incertidumbre: 'No escribas "VUCA" como conclusión. Tradúcelo a una fuente: ocurrencia, magnitud, duración o actor.',
    tradeoff: 'Formula: protejo X, sacrifico Y, queda el riesgo residual Z.',
    accion: 'Ahora decide. Usa un verbo que comprometa recursos: activar, suspender, renegociar, pilotar, migrar o abandonar. «Analizar» por sí solo no es una acción.',
    monitoreo: 'Elige señales que puedas observar antes de que sea demasiado tarde. Un umbral sin una acción asociada es solo una alarma.',
    revision: 'Ante el inject, no ajustes al margen: declara qué supuesto mantienes, abandonas o inviertes.',
  },
};
