/*
 * Contenido canónico del Centro de Aprendizaje EntornoLab.
 * Transcrito fielmente de docs/CONTENIDO_Centro_Aprendizaje_EntornoLab.md
 * (no se inventa contenido: este módulo se renderiza tal cual).
 *
 * Diseño y dirección académica: Pável Gómez · IESA · 2026.
 *
 * El HTML de cada sección es contenido autoral estático (sin entrada de
 * usuario), por lo que se inserta con innerHTML de forma segura.
 */

// Glosa del término "inject" (anglicismo del wargaming) — debe mostrarse
// traducido en su primera aparición (Pantalla 8 y sección del marco).
export const INJECT_GLOSS =
  'Término del wargaming y los ejercicios de mesa: un acontecimiento o dato ' +
  'que el facilitador introduce durante el ejercicio. Aquí revela información ' +
  'que ya estaba latente en el caso y obliga a revisar la decisión.';

// ── Glosario (fuente única para la sección y para los tooltips de términos) ──
export const GLOSSARY = [
  { key: 'evento', term: 'Evento', def: 'Hecho que abre incertidumbre y obliga a decidir. Cuatro tipos (súbito-discreto, acumulativo, cascada, legitimidad).' },
  { key: 'factor', term: 'Factor', def: 'Condición de fondo, permanente; no es evento hasta que algo cruza un umbral.' },
  { key: 'demarcacion', term: 'Criterio de demarcación', def: 'La razón explícita por la que un hecho cuenta como evento (y de qué tipo).' },
  { key: 'canal', term: 'Canal de impacto', def: 'Vía por la que el evento golpea (operacional, financiero, regulatorio-legal, legitimidad, modelo de negocio).' },
  { key: 'canal-dominante', term: 'Canal dominante', def: 'El canal por el que el evento pega primero y con más fuerza.' },
  { key: 'segunda-ronda', term: 'Segunda ronda', def: 'El canal al que salta el impacto después del golpe inicial.' },
  { key: 'buffer', term: 'Buffer', def: 'Capacidad que protege un canal nombrable a un costo de activación medible. Si no cumple ambas, es contexto.' },
  { key: 'ejes-buffer', term: 'Ejes del buffer', def: 'Potencia, duración, costo (con su unidad).' },
  { key: 'unidades-costo', term: 'Unidades de costo', def: 'Caja, tiempo, capital político, legitimidad.' },
  { key: 'buffer-ilusorio', term: 'Buffer ilusorio / perverso', def: 'El que no opera sobre el canal dominante, o el que tiene un costo diferido alto en otro canal.' },
  { key: 'incertidumbre', term: 'Incertidumbre', def: 'Lo que no sabes y afecta la decisión. Fuentes: ocurrencia, magnitud, duración, actor.' },
  { key: 'trade-off', term: 'Trade-off', def: 'Qué proteges, qué sacrificas, qué riesgo residual queda.' },
  { key: 'riesgo-residual', term: 'Riesgo residual', def: 'El riesgo que permanece después de tu decisión.' },
  { key: 'frase', term: 'Frase E-BTA/R', def: 'La formulación completa y defendible de la decisión.' },
  { key: 'indicador', term: 'Indicador (I1, I2)', def: 'Señal medible y oportuna que vigilas.' },
  { key: 'umbral', term: 'Umbral T', def: 'Valor o condición que, al cruzarse, dispara la revisión.' },
  { key: 'inject', term: 'Inject (inyección de información)', def: 'Término del wargaming y los ejercicios de mesa para un acontecimiento o dato que el facilitador introduce durante el ejercicio. En EntornoLab, el inject revela información que ya estaba latente en el caso —no es una noticia nueva inventada— y obliga a revisar la decisión. Se conserva la palabra inglesa inject por ser el estándar en la literatura (Perla, 1990; Dorton et al., 2023), con su traducción a la vista.' },
  { key: 'revision', term: 'Revisión (la R)', def: 'Reabrir la decisión (doble bucle): qué supuesto mantienes, cuál abandonas, cuál inviertes.' },
  { key: 'dossier', term: 'Dossier del caso', def: 'Datos del caso (financieros, actores, incertidumbres, economía de buffers, restricciones) que aparecen en el recorrido.' },
];

// Mapa término → definición para tooltips dentro del recorrido.
export const TERM_DEFS = GLOSSARY.reduce((acc, g) => { acc[g.key] = { term: g.term, def: g.def }; return acc; }, {});

// ── Orientación rápida por pantalla (sección 8) ──
export const ORIENTACION = [
  null,
  { p: 1, name: 'Briefing y dossier', funcion: 'entender el caso y sus datos.', primerPaso: 'lee la señal inicial y abre el dossier (financieros, actores).', limite: 'no decidas todavía; primero comprende.', cierre: 'ten claro qué decisión se te pide y en qué plazo.', terms: ['dossier'] },
  { p: 2, name: 'Clasificación', funcion: 'demarcar el evento.', primerPaso: 'pregunta si es evento o factor.', limite: 'no asignes tipo sin criterio.', cierre: 'tipo(s) + criterio + fuente principal de incertidumbre.', terms: ['evento', 'factor', 'demarcacion', 'incertidumbre'] },
  { p: 3, name: 'Mapa de impacto', funcion: 'nombrar por dónde golpea.', primerPaso: 'identifica el canal dominante.', limite: 'no digas "afecta a todo".', cierre: 'dominante, secundario y segunda ronda.', terms: ['canal', 'canal-dominante', 'segunda-ronda'] },
  { p: 4, name: 'Buffer Board', funcion: 'elegir y costear la protección.', primerPaso: 'revisa la economía de cada buffer.', limite: 'no llames buffer a lo que no tiene canal ni costo.', cierre: 'hasta 2 buffers con potencia, duración, costo y unidad.', terms: ['buffer', 'ejes-buffer', 'unidades-costo', 'buffer-ilusorio'] },
  { p: 5, name: 'Trade-off', funcion: 'hacer explícito el costo.', primerPaso: 'nombra qué proteges.', limite: 'no lo plantees como dilema absoluto.', cierre: 'protejo / sacrifico / riesgo residual.', terms: ['trade-off', 'riesgo-residual'] },
  { p: 6, name: 'Decisión y frase', funcion: 'formular la decisión.', primerPaso: 'arma la frase E-BTA/R con lo capturado.', limite: 'que sea completa y consistente.', cierre: 'una frase defendible ante un comité.', terms: ['frase'] },
  { p: 7, name: 'Indicadores', funcion: 'definir cómo revisarás.', primerPaso: 'elige dos señales medibles.', limite: 'no dejes el umbral vago.', cierre: 'I1, I2 y un umbral T específico.', terms: ['indicador', 'umbral'] },
  { p: 8, name: 'Inject', funcion: 'recibir información latente.', primerPaso: 'léela con atención.', limite: 'desde aquí no se vuelve atrás.', cierre: 'identifica qué cambia.', terms: ['inject'] },
  { p: 9, name: 'Revisión', funcion: 'reabrir la decisión.', primerPaso: 'localiza el supuesto que la sostenía.', limite: 'no ajustes al margen; reabre.', cierre: 'mantengo / abandono / invierto + nueva frase + clasifica si fue bucle simple o doble bucle. (En modo wargame: anticipa la réplica del actor, recíbela y haz una segunda revisión.)', terms: ['revision', 'inject'] },
  { p: 10, name: 'Export', funcion: 'llevarte el razonamiento.', primerPaso: 'genera el PDF.', limite: 'no es un puntaje, es tu insumo.', cierre: 'úsalo para el memo.', terms: [] },
];

// ── Definiciones del doble bucle (Pantalla 9 y Guía de uso) ──
export const LOOP_DEFS = {
  simple: 'Bucle simple: ajustas la ejecución manteniendo el encuadre.',
  doble: 'Doble bucle: reabres el encuadre — cambió el tipo de evento, el canal dominante o qué cuenta como buffer.',
};

// ── SVG del ciclo E-BTA/R (nodos navy, acentos steel; inject violeta reservado) ──
export function cycleDiagramSVG() {
  return `
  <svg viewBox="0 0 680 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama del ciclo E-BTA/R" style="width:100%;height:auto;display:block;margin:var(--sp-3) 0;">
    <rect x="0" y="32" width="76" height="40" rx="6" fill="#0F2740"/>
    <text x="38" y="57" text-anchor="middle" fill="#fff" font-size="12" font-family="Inter,system-ui,sans-serif" font-weight="600">Evento</text>
    <line x1="76" y1="52" x2="96" y2="52" stroke="#5A6B79" stroke-width="1.5"/>
    <polygon points="96,47 104,52 96,57" fill="#5A6B79"/>
    <rect x="104" y="22" width="88" height="60" rx="6" fill="#2D6EA3"/>
    <text x="148" y="48" text-anchor="middle" fill="#fff" font-size="11" font-family="Inter,system-ui,sans-serif">Incertidumbre</text>
    <text x="148" y="64" text-anchor="middle" fill="#DCE9F4" font-size="11" font-family="Inter,system-ui,sans-serif">Canal</text>
    <line x1="192" y1="52" x2="212" y2="52" stroke="#5A6B79" stroke-width="1.5"/>
    <polygon points="212,47 220,52 212,57" fill="#5A6B79"/>
    <rect x="220" y="32" width="72" height="40" rx="6" fill="#0F2740"/>
    <text x="256" y="57" text-anchor="middle" fill="#fff" font-size="12" font-family="Inter,system-ui,sans-serif" font-weight="600">Buffer</text>
    <line x1="292" y1="52" x2="312" y2="52" stroke="#5A6B79" stroke-width="1.5"/>
    <polygon points="312,47 320,52 312,57" fill="#5A6B79"/>
    <rect x="320" y="32" width="80" height="40" rx="6" fill="#2D6EA3"/>
    <text x="360" y="57" text-anchor="middle" fill="#fff" font-size="12" font-family="Inter,system-ui,sans-serif">Trade-off</text>
    <line x1="400" y1="52" x2="420" y2="52" stroke="#5A6B79" stroke-width="1.5"/>
    <polygon points="420,47 428,52 420,57" fill="#5A6B79"/>
    <rect x="428" y="22" width="88" height="60" rx="6" fill="#0F2740"/>
    <text x="472" y="47" text-anchor="middle" fill="#fff" font-size="11" font-family="Inter,system-ui,sans-serif">Acción táctica</text>
    <text x="472" y="63" text-anchor="middle" fill="#DCE9F4" font-size="11" font-family="Inter,system-ui,sans-serif">+ Indicadores</text>
    <line x1="516" y1="52" x2="540" y2="52" stroke="#7b2d8b" stroke-width="2"/>
    <polygon points="540,46 550,52 540,58" fill="#7b2d8b"/>
    <text x="528" y="42" text-anchor="middle" fill="#7b2d8b" font-size="9" font-family="Inter,system-ui,sans-serif" font-weight="700">INJECT</text>
    <rect x="550" y="32" width="76" height="40" rx="6" fill="#2D6EA3"/>
    <text x="588" y="55" text-anchor="middle" fill="#fff" font-size="12" font-family="Inter,system-ui,sans-serif" font-weight="600">Revisión</text>
    <path d="M 626 52 Q 648 90 588 98 Q 38 110 38 72" fill="none" stroke="#5A6B79" stroke-width="1" stroke-dasharray="4 3"/>
    <polygon points="34,67 38,77 42,67" fill="#5A6B79"/>
  </svg>
  <p style="font-size:var(--text-xs);color:var(--muted);text-align:center;margin-top:var(--sp-1)">El inject revela información latente que no estaba disponible al momento de la decisión inicial.</p>`;
}

// ── Componentes (7) — estructura: qué es · base teórica · cómo se reconoce · error frecuente · ejemplo ──
export const COMPONENTES = [
  {
    id: 'evento', nav: 'Evento', title: 'Evento (E)',
    html: `
      <p><strong>Qué es.</strong> El hecho que abre la incertidumbre y obliga a decidir. Se clasifica en cuatro tipos (puede ser más de uno a la vez):</p>
      <ul class="lc-list">
        <li><strong>Súbito-discreto:</strong> ocurre en una ventana corta, con un inicio identificable (un anuncio, un fallo, un corte).</li>
        <li><strong>Acumulativo:</strong> una variable cruza un umbral tras meses de evolución. <strong>El evento es el cruce, no la evolución.</strong></li>
        <li><strong>Cascada:</strong> un golpe en un canal dispara otros en secuencia, y el efecto secundario supera al primero.</li>
        <li><strong>Legitimidad:</strong> altera la licencia social, política o institucional para operar; sus efectos monetarios son indirectos pero estructurales.</li>
      </ul>
      <p><strong>Base teórica.</strong> La incertidumbre knightiana (Knight, 1921: no todo evento trae probabilidades conocidas) y la literatura de umbrales: lo relevante no es la tendencia lenta sino el momento en que cruza el umbral que rompe el modelo. La tipología dialoga con la distinción entre <em>cisne negro</em> (Taleb, 2007) —sorpresa genuina— y <em>rinoceronte gris</em> (Wucker) —amenaza visible que nadie quiso atender—.</p>
      <p><strong>Cómo se reconoce.</strong> Aplica un <strong>criterio de demarcación</strong>: si no puedes nombrar por qué un hecho es evento (y no un factor de fondo), todavía no lo es. Un <em>factor</em> es contexto permanente; un <em>evento</em> cambia la decisión.</p>
      <p><strong>Error frecuente.</strong> Confundir la erosión lenta (factor) con el evento. En un caso de consumo, "el poder adquisitivo baja" es factor; "cruzó el punto en que el cliente ya no puede comprar el producto" es el evento.</p>
      <p><strong>Ejemplo.</strong> Un cambio regulatorio que se anuncia un viernes a las 17:30 es súbito-discreto; si además dispara financiero → legitimidad, es también cascada.</p>
      {{EVENT_TYPES}}`,
  },
  {
    id: 'canal', nav: 'Canales', title: 'Canales de impacto (C)',
    html: `
      <p><strong>Qué es.</strong> La vía por la que el evento golpea al negocio. Cinco canales: <strong>operacional, financiero, regulatorio-legal, legitimidad, modelo de negocio.</strong> Casi todo evento viaja por al menos dos; uno es el <strong>dominante</strong>.</p>
      <p><strong>Base teórica.</strong> Análisis de mecanismos de transmisión (la cadena causal evento → efecto) y de stakeholders/sistemas: el impacto no es difuso, viaja por canales nombrables.</p>
      <p><strong>Cómo se reconoce.</strong> Pregunta "¿por dónde me pega primero y con más fuerza?". Si no puedes nombrar el canal dominante, no has completado el mapa de impacto. Mapea también la <strong>segunda ronda</strong> (a qué canal salta después).</p>
      <p><strong>Error frecuente.</strong> Decir "me afecta en todo". Eso no es análisis; es ansiedad. El rigor está en jerarquizar.</p>
      <p><strong>Ejemplo.</strong> Una crisis reputacional entra por <strong>legitimidad</strong>, pero su segunda ronda puede ser <strong>operacional</strong> (un paro) o <strong>regulatorio</strong> (un expediente).</p>
      {{CHANNELS}}`,
  },
  {
    id: 'buffer', nav: 'Buffer', title: 'Buffer (B)',
    html: `
      <p><strong>Qué es.</strong> Una capacidad que te protege. Para que cuente como buffer debe cumplir <strong>dos</strong> condiciones a la vez: (1) operar sobre un <strong>canal nombrable</strong> (no "protege en general") y (2) tener un <strong>costo de activación medible</strong>, en una de cuatro unidades: <strong>caja, tiempo, capital político o legitimidad.</strong> Si no cumple ambas, no es buffer: es contexto.</p>
      <p><strong>Tres ejes.</strong> Cada buffer se caracteriza por <strong>potencia</strong> (cuánto absorbe), <strong>duración</strong> (cuánto dura antes de agotarse) y <strong>costo</strong> (qué pagas y en qué unidad).</p>
      <p><strong>Base teórica.</strong> La resiliencia empresarial se construye por <strong>redundancia</strong> (prima de seguro) o <strong>flexibilidad</strong> (que además rinde en la operación diaria) (Sheffi &amp; Rice); la literatura de resiliencia distingue resistir, absorber, adaptarse y transformar (Holling, 1973; Woods, 2003), y las capacidades dinámicas añaden detectar, aprovechar y transformar recursos (Teece, Pisano &amp; Shuen, 1997). Un buffer no es inventario pasivo: es capacidad con costo para sostener decisiones bajo estrés (y puede crear rigideces o falsa seguridad).</p>
      <p><strong>Cómo se reconoce.</strong> Si puedes nombrar canal + costo, es buffer; si no, es ilusión. Cuidado con el <strong>buffer-trampa</strong>: el que parece fuerte pero es ilusorio o perverso según el momento o el canal (p. ej., una relación institucional usada tarde, que se lee como presión).</p>
      <p><strong>Error frecuente.</strong> Llamar buffer a cualquier recurso ("tenemos marca", "tenemos experiencia") sin nombrar sobre qué canal opera ni qué cuesta activarlo.</p>
      <p><strong>Ejemplo.</strong> Una reserva de caja protege el canal financiero, cuesta en caja y se agota en 1–2 rondas: buffer real pero limitado.</p>
      {{BUFFER_AXES}}`,
  },
  {
    id: 'incertidumbre', nav: 'Incertidumbre', title: 'Incertidumbre (U)',
    html: `
      <p><strong>Qué es.</strong> Aquello que no sabes y que afecta la decisión. Cuatro fuentes: <strong>ocurrencia</strong> (¿pasará?), <strong>magnitud</strong> (¿cuán fuerte?), <strong>duración</strong> (¿cuánto dura?) y <strong>actor</strong> (¿cómo reaccionan quienes pueden cambiar el escenario?).</p>
      <p><strong>Base teórica.</strong> Riesgo vs incertidumbre (Knight, 1921) y los marcos VUCA/TUNA: la incertidumbre se modela como escenarios, no como un dato puntual (Oriesek &amp; Schwarz, 2021; Ramirez &amp; Wilkinson, 2016).</p>
      <p><strong>Cómo se reconoce.</strong> Nombra la <strong>fuente principal</strong> que pesa sobre tu decisión. No todas las incertidumbres importan igual; una suele dominar.</p>
      <p><strong>Error frecuente.</strong> Tratar el futuro como conocido ("seguro que pasa X") o como totalmente opaco ("no se puede saber nada"). Ambos extremos evitan el trabajo de poner bandas.</p>
      <p><strong>Ejemplo.</strong> En un cambio regulatorio, la fuente principal puede ser la <strong>ocurrencia</strong> (¿se publica la norma?) y la secundaria la <strong>duración</strong> (¿el plazo se prorroga?).</p>
      {{ACTORS}}`,
  },
  {
    id: 'trade-off', nav: 'Trade-off', title: 'Trade-off (T)',
    html: `
      <p><strong>Qué es.</strong> Toda decisión protege algo a costa de otra cosa. El trade-off nombra <strong>qué proteges (X)</strong>, <strong>qué sacrificas (Y)</strong> y <strong>qué riesgo residual</strong> queda en pie.</p>
      <p><strong>Base teórica.</strong> Costo de oportunidad, opciones reales (flexibilidad: postergar, escalar, abandonar, diversificar; Schoemaker, 1995, 2012) y <strong>decisión robusta</strong> (estrategias buenas a través de muchos futuros, no óptimas para uno; caracterizar vulnerabilidades y trade-offs). El mérito está en <strong>declarar el sacrificio ex ante</strong>, antes de que una pérdida implícita se vuelva sorpresa moral o política. A veces la mejor jugada no elige sobre la frontera dada, sino que la <strong>expande</strong> (capacidades dinámicas; Teece, Pisano &amp; Shuen, 1997).</p>
      <p><strong>Cómo se reconoce.</strong> Si tu decisión "no sacrifica nada", no es una decisión: es un deseo. El riesgo residual es la parte honesta del análisis.</p>
      <p><strong>Error frecuente.</strong> Presentar el trade-off como dilema absoluto ("o cumplimos o quebramos") en vez de como una asignación de recursos con costo y riesgo nombrados.</p>
      <p><strong>Ejemplo.</strong> Protejo el acceso al cliente con una presentación más pequeña; sacrifico margen unitario; riesgo residual: que se lea como "achicar para encarecer".</p>
      {{TRADEOFF}}`,
  },
  {
    id: 'accion', nav: 'Acción e indicadores', title: 'Acción táctica e indicadores (A)',
    html: `
      <p><strong>Qué es.</strong> La decisión formulada, más <strong>cómo sabrás si va bien o si hay que revisar</strong>: dos indicadores (<strong>I1, I2</strong>) y un <strong>umbral T</strong> que, al cruzarse, dispara la revisión.</p>
      <p><strong>Base teórica.</strong> Decisión primada por reconocimiento (Klein): bajo presión no se optimiza, se elige el primer curso de acción viable y se acota con indicadores. Indicadores adelantados vs rezagados y gestión por excepción: se vigilan pocas señales con umbrales claros que disparan la revisión; el wargaming permite probar cursos de acción por movimientos (Dorton et al., 2023).</p>
      <p><strong>Cómo se reconoce.</strong> Un buen indicador es medible y oportuno; un buen umbral es específico ("si las ventas caen &gt;15% en 3 semanas"), no vago ("si las cosas empeoran").</p>
      <p><strong>Error frecuente.</strong> Decidir sin indicadores, o ponerlos sin umbral. Sin umbral, no hay disparador de revisión.</p>
      <p><strong>Ejemplo.</strong> I1: salida neta de saldos; I2: movimiento del competidor. Umbral T: si I1 supera 10% en una semana, revisar.</p>
      {{ACTION_IND}}`,
  },
  {
    id: 'revision', nav: 'Revisión', title: 'Revisión (/R)',
    html: `
      <p><strong>Qué es.</strong> Cuando llega información nueva (el <strong>inject</strong>), no ajustas al margen: <strong>reabres</strong>. Declaras qué supuesto <strong>mantienes</strong>, cuál <strong>abandonas</strong> y cuál <strong>inviertes</strong>, y reformulas la frase E-BTA/R.</p>
      <p><strong>Base teórica.</strong> El aprendizaje de <strong>doble bucle</strong> (Argyris): el bucle simple corrige la ejecución dentro del marco; el doble bucle cuestiona el marco mismo —distingue el <em>error de ejecución</em> del <em>error de encuadre</em>—. Se apoya en la revisión por rondas del wargaming, donde el <em>freeze probe</em> —el inject— obliga a reabrir (Perla, 1990; Dorton et al., 2023); en el <em>sensemaking</em> (Weick, 1995); y en la actualización bayesiana ante evidencia discriminante —nombrar hipótesis rivales y actualizar su credibilidad— (Fairfield &amp; Charman). Revisar no es ajustar al margen: es reabrir los supuestos.</p>
      <p><strong>Cómo se reconoce.</strong> Una buena revisión nombra el supuesto que sostenía la decisión original y lo somete a la nueva información. Si tu decisión revisada es idéntica a la inicial sin justificar por qué, probablemente no revisaste: te aferraste. Además, clasifica tu revisión: <strong>bucle simple</strong> si solo ajustas la ejecución manteniendo el encuadre; <strong>doble bucle</strong> si cambias el encuadre mismo —el tipo de evento, el canal dominante o qué cuenta como buffer—. Distinguir el <em>error de ejecución</em> del <em>error de encuadre</em> es parte del aprendizaje.</p>
      <p><strong>Error frecuente.</strong> Tratar el inject como un detalle y "ajustar" en lugar de reabrir. El inject suele <strong>mover el canal dominante</strong>; si tu buffer servía para el canal viejo, quizá ya no sirve.</p>
      <p><strong>Ejemplo.</strong> Mantengo el supuesto de que el cliente valora la estabilidad; abandono el supuesto de que el plazo se ablandaría; invierto el supuesto sobre el competidor: de "es postura" a "es plan".</p>
      {{REVISION}}`,
  },
];

// ── Glosario de términos técnicos y en inglés (sección 2 del Glosario) ──
// Transcrito de docs/Glosario_terminos_tecnicos_y_en_ingles.md. La regla del
// curso: ningún término en inglés queda sin traducir en su primera aparición.
export const TECH_GLOSSARY_HTML = `
  <h3 class="lc-h3">Términos técnicos y en inglés</h3>
  <p>Traduce y explica, en lenguaje llano, las palabras técnicas y en inglés que aparecen en el simulador, las lecturas y los datos de los casos. No hace falta dominar inglés: cuando veas un término que no reconoces, búscalo aquí. La pronunciación es una guía aproximada en español.</p>
  <h4 class="lc-h4">1. Términos del marco y del simulador</h4>
  <dl class="lc-glossary">
    <dt>E-BTA/R <span class="lc-pron">≈ e-bé-te-á-érre</span></dt><dd>Las cinco piezas del marco: <strong>E</strong>vento, <strong>B</strong>uffer, <strong>T</strong>rade-off, <strong>A</strong>cción táctica, <strong>R</strong>evisión.</dd>
    <dt>Buffer <span class="lc-pron">≈ BÁ-fer</span></dt><dd><em>Amortiguador / colchón.</em> Capacidad que protege un canal nombrable a un costo de activación medible.</dd>
    <dt>Buffer Board <span class="lc-pron">≈ BÁ-fer bord</span></dt><dd><em>Tablero de buffers.</em> La pantalla donde eliges y valoras tus buffers (Pantalla 4).</dd>
    <dt>Trade-off <span class="lc-pron">≈ TREID-of</span></dt><dd><em>Disyuntiva / canje.</em> Toda decisión protege algo a costa de otra cosa (qué protejo, qué sacrifico, qué riesgo queda).</dd>
    <dt>Inject <span class="lc-pron">≈ ÍN-yect</span></dt><dd><em>Inyección de información.</em> Dato o acontecimiento que el facilitador introduce durante el ejercicio; en EntornoLab revela información que ya estaba latente y obliga a revisar.</dd>
    <dt>Freeze probe <span class="lc-pron">≈ fríz prob</span></dt><dd><em>Sondeo en pausa.</em> Técnica del wargaming: se "congela" la acción para sondear el razonamiento. El inject funciona como un freeze probe.</dd>
    <dt>Hot wash <span class="lc-pron">≈ jot uósh</span></dt><dd><em>Repaso en caliente.</em> Conversación estructurada justo después del ejercicio para extraer aprendizajes.</dd>
    <dt>Wargame / business wargaming <span class="lc-pron">≈ UÓR-gueim</span></dt><dd><em>Juego de guerra (empresarial).</em> Simulación con personas y actores que reaccionan, para probar estrategias y exponer supuestos.</dd>
    <dt>Tabletop exercise (TTX) <span class="lc-pron">≈ TÉIBOL-tap</span></dt><dd><em>Ejercicio de mesa.</em> Simulación guionada (menos adversarial que un wargame); modalidad por defecto del simulador.</dd>
    <dt>Briefing <span class="lc-pron">≈ BRÍ-fin</span></dt><dd><em>Informe inicial.</em> El texto que presenta el caso y su señal inicial (Pantalla 1).</dd>
    <dt>Sensemaking <span class="lc-pron">≈ SENS-meiking</span></dt><dd><em>Construcción de sentido.</em> Convertir señales dispersas y ambiguas en una lectura suficientemente clara para actuar.</dd>
    <dt>Single-loop / double-loop <span class="lc-pron">≈ SÍNguel / DÁbol lup</span></dt><dd><em>Bucle simple / doble bucle.</em> Simple: corriges la ejecución dentro del marco. Doble: cuestionas el marco mismo (el encuadre).</dd>
    <dt>Export <span class="lc-pron">≈ ÉX-port</span></dt><dd><em>Exportar.</em> Generar el PDF con tu razonamiento al final del recorrido (Pantalla 10).</dd>
    <dt>Memo <span class="lc-pron">≈ MÉ-mo</span></dt><dd><em>Memorando.</em> El documento ejecutivo de 1.200–1.500 palabras que es la entrega evaluable.</dd>
  </dl>
  <h4 class="lc-h4" id="glo-conceptos">2. Conceptos teóricos</h4>
  <dl class="lc-glossary">
    <dt>Knightian uncertainty <span class="lc-pron">— Incertidumbre knightiana</span></dt><dd>Situación en que no conocemos bien las probabilidades de los resultados (a diferencia del <em>riesgo</em>, donde sí se conocen).</dd>
    <dt>Black swan <span class="lc-pron">— Cisne negro</span></dt><dd>Evento de gran impacto, baja anticipación convencional y muy racionalizado después de ocurrido.</dd>
    <dt>Gray rhino <span class="lc-pron">— Rinoceronte gris</span></dt><dd>Amenaza <strong>visible y probable</strong> que la organización ve venir pero no atiende. La mayoría de las "sorpresas" gerenciales son de este tipo.</dd>
    <dt>Recognition-primed decision <span class="lc-pron">— Decisión primada por reconocimiento</span></dt><dd>Cómo deciden los expertos bajo presión: reconocen un patrón, imaginan un curso de acción y eligen el primero que "aguanta".</dd>
    <dt>Real options <span class="lc-pron">— Opciones reales</span></dt><dd>Valorar la flexibilidad (postergar, escalar, abandonar, diversificar) como algo que tiene valor bajo incertidumbre.</dd>
    <dt>Dynamic capabilities <span class="lc-pron">— Capacidades dinámicas</span></dt><dd>Capacidad de detectar, aprovechar y transformar recursos ante el cambio del entorno.</dd>
    <dt>Resilience <span class="lc-pron">— Resiliencia</span></dt><dd>Capacidad de resistir, absorber, adaptarse y transformarse ante un golpe.</dd>
    <dt>Redundancy / flexibility <span class="lc-pron">— Redundancia / flexibilidad</span></dt><dd>Dos formas de construir resiliencia: redundancia (respaldo, "prima de seguro"); flexibilidad (que además rinde en la operación diaria).</dd>
    <dt>Robust decision-making <span class="lc-pron">— Decisión robusta</span></dt><dd>Buscar estrategias suficientemente buenas a través de <strong>muchos</strong> futuros plausibles, en vez de óptimas para uno solo.</dd>
    <dt>VUCA / TUNA</dt><dd>Dos formas de nombrar entornos difíciles. VUCA: volátil, incierto (<em>uncertain</em>), complejo, ambiguo. TUNA: turbulento, incierto, novedoso, ambiguo.</dd>
    <dt>Bayesian updating <span class="lc-pron">— Actualización bayesiana</span></dt><dd>Revisar la credibilidad de hipótesis rivales a medida que llega nueva evidencia, en vez de "ajustar" sin método.</dd>
    <dt>Stakeholder <span class="lc-pron">— Actor / parte interesada</span></dt><dd>Cualquiera que afecta o es afectado por la decisión (regulador, cliente, comunidad, competidor…).</dd>
  </dl>
  <h4 class="lc-h4" id="glo-financieros">3. Términos financieros y de negocio (aparecen en los datos de los casos)</h4>
  <dl class="lc-glossary">
    <dt>NPS (Net Promoter Score) <span class="lc-pron">≈ en-pi-és</span></dt><dd><em>Índice de recomendación.</em> Cuánto recomiendan los clientes una marca (de –100 a +100). Ej.: "NPS ≈ +42".</dd>
    <dt>GMV (Gross Merchandise Value) <span class="lc-pron">≈ ge-eme-uvé</span></dt><dd><em>Valor bruto de mercancía.</em> El valor total de lo transado en una plataforma antes de la comisión. Ej.: "GMV mensual US$ 6,5 M".</dd>
    <dt>Take rate <span class="lc-pron">≈ TÉIK reit</span></dt><dd><em>Tasa de comisión.</em> El porcentaje del GMV que la plataforma se queda como ingreso. Ej.: "Take rate 18%".</dd>
    <dt>Burn (cash burn) <span class="lc-pron">≈ bern</span></dt><dd><em>Quema de caja.</em> Cuánto dinero consume la empresa por mes. Ej.: "Quema mensual (burn) US$ 0,9 M".</dd>
    <dt>Runway <span class="lc-pron">≈ RÁN-uei</span></dt><dd><em>Pista / autonomía de caja.</em> Cuántos meses sobrevive la empresa con la caja actual. Ej.: "Runway ≈ 6 meses".</dd>
    <dt>Capex (capital expenditure) <span class="lc-pron">≈ KÁP-eks</span></dt><dd><em>Inversión de capital.</em> Dinero invertido en activos (equipos, líneas, infraestructura). Ej.: "US$ 0,8 M de capex".</dd>
    <dt>Retooling <span class="lc-pron">≈ ri-TÚ-lin</span></dt><dd><em>Reconversión de línea.</em> Adaptar la maquinaria para producir un formato distinto. Ej.: "4–6 meses de retooling".</dd>
    <dt>De-risking <span class="lc-pron">≈ di-RÍS-kin</span></dt><dd><em>Reducción de riesgo (bancario).</em> Cuando un banco corta relaciones para evitar riesgo reputacional o de cumplimiento.</dd>
    <dt>Margen bruto / operativo</dt><dd><em>Ganancia</em> antes (bruto) o después (operativo) de los costos de operar, como % de los ingresos. Ej.: "Margen bruto 38%".</dd>
    <dt>Fideicomiso</dt><dd>Figura legal en la que un tercero custodia fondos para garantizar una obligación. Ej.: "constituir un fideicomiso de respaldo".</dd>
    <dt>Debida diligencia (due diligence) <span class="lc-pron">≈ diu DÍL-iyens</span></dt><dd><em>Diligencia debida.</em> Obligación de verificar y documentar (p. ej., el origen sostenible de un producto).</dd>
    <dt>Corredor de remesas</dt><dd>El canal por el que se envían y cobran remesas (dinero que migrantes envían a su país). Ej.: Caso A (fintech).</dd>
  </dl>
  <p class="lc-bridge">Si encuentras un término en inglés que no está aquí, avísale al facilitador: lo agregamos. La regla del curso es que ningún término en inglés quede sin traducir la primera vez que aparece.</p>`;

// ── Cuerpo de la home / sección Inicio (about + mapa del sitio + gráficos) ──
// Los tokens {{CYCLE}}, {{PHRASE}}, {{STRIP}} los sustituye el renderer por los
// gráficos SVG autorados. Se usa tanto en la portada (raíz) como en la sección
// Inicio del centro de aprendizaje.
// Síntesis breve (2–3 líneas) + objetivos en lista, para el primer pliegue de Inicio.
export const HOME_SYNTHESIS = `
  <p class="home-synthesis">EntornoLab es un laboratorio para <strong>estructurar una decisión defendible cuando el entorno cambia y la información es incompleta</strong>. No enseña a adivinar el futuro: enseña a decidir de modo que puedas <strong>explicar, sostener y revisar</strong> tu decisión cuando llega información nueva. El resultado es un PDF con tu razonamiento, insumo de tu memo.</p>
  <p class="home-objectives-lead"><strong>Al terminar serás capaz de:</strong></p>
  <ul class="lc-list home-objectives">
    <li>distinguir un evento emergente de un factor estructural;</li>
    <li>nombrar el canal por el que un evento golpea y anticipar su segunda ronda;</li>
    <li>identificar buffers reales —no ilusorios— y costear su activación;</li>
    <li>formular una decisión como frase E-BTA/R defendible, con indicadores y umbral;</li>
    <li><strong>reabrir</strong> tu decisión ante información nueva —el inject—, distinguiendo qué supuesto mantienes, cuál abandonas y cuál inviertes.</li>
  </ul>`;

// Bloque "por encima del pliegue": síntesis + diagrama del ciclo (ya legible).
export const HOME_ABOVE = `
  ${HOME_SYNTHESIS}
  {{CYCLE}}`;

// Bloque extenso (debajo del selector en la portada): detalle en acordeón,
// frase anotada, mapa del sitio, tira de pasos y la nota de cierre.
export const HOME_BELOW = `
  {{PHRASE}}
  <details class="lc-accordion">
    <summary class="lc-accordion-summary">Leer más: para qué sirve, qué hace y qué te aporta</summary>
    <div class="lc-accordion-body">
      <p><strong>Para qué sirve.</strong> EntornoLab entrena una habilidad concreta del directivo: tomar una decisión defendible cuando el entorno cambia y la información es incompleta. No enseña a "adivinar el futuro"; enseña a <strong>estructurar una decisión bajo incertidumbre</strong> de modo que pueda explicarse, sostenerse ante un comité y revisarse cuando llega información nueva.</p>
      <p><strong>Qué hace.</strong> Te acompaña por un ciclo completo de decisión sobre un caso real-ista: clasificas el evento, mapeas su impacto, eliges y valoras un buffer, formulas una decisión táctica con indicadores, y —cuando aparece un <em>inject</em> que revela información que estaba latente— <strong>revisas todo el recorrido</strong> con lo que ahora sabes. El resultado es un PDF con tu razonamiento, insumo de tu memo.</p>
      <p><strong>Cómo lo logra.</strong> Mediante un ciclo guiado y la disciplina del marco <strong>E-BTA/R</strong>, más un mecanismo deliberado: el <em>inject</em> introduce asimetría de información entre rondas y fuerza una revisión genuina. El simulador <strong>no te puntúa ni te dice si "acertaste"</strong>: captura tu razonamiento para que tú y el facilitador lo discutan. Lo que se evalúa es el razonamiento, no el resultado.</p>
      <p><strong>Qué te aporta.</strong> Una gramática portátil para decidir bajo incertidumbre que puedes llevar a tu propia organización; práctica en hacer explícito lo que normalmente queda implícito (qué proteges, qué sacrificas, a qué costo); y un entregable —la frase E-BTA/R y el memo— que es, en sí mismo, una pieza de comunicación ejecutiva.</p>
      <p><strong>Un ejemplo en una línea.</strong> "Dado el alza súbita del alquiler (evento), que abre incertidumbre de magnitud sobre el canal financiero, protejo el flujo de caja con una reserva (buffer), sacrifico parte del margen, vigilo las ventas semanales y reviso si caen más de 15%." Eso es una decisión defendible y revisable: eso es lo que aquí se practica. (Ver más en <strong>Ejemplos</strong>.)</p>
    </div>
  </details>
  <h3 class="lc-h3">Cómo está organizado este sitio (mapa y lógica de navegación)</h3>
  <p>EntornoLab es <strong>autocontenido</strong>: todo lo que necesitas está aquí, sin documentos aparte. Desde la <strong>barra superior</strong>, siempre visible, puedes recorrer en cualquier momento:</p>
  <ul class="lc-list">
    <li><strong>El marco E-BTA/R</strong> — qué es, su base teórica y el ciclo completo, con diagrama.</li>
    <li><strong>Componentes</strong> — una página por pieza: Evento, Canales, Buffer, Incertidumbre, Trade-off, Acción e indicadores, Revisión (cada una: qué es, base teórica, cómo se reconoce, error frecuente y ejemplo).</li>
    <li><strong>Ejemplos</strong> — una decisión resuelta paso a paso.</li>
    <li><strong>Casos</strong> — los tres escenarios disponibles (A, B, C).</li>
    <li><strong>Guía de uso</strong> — las 10 pantallas, las reglas y las modalidades (tabletop y wargame).</li>
    <li><strong>Glosario</strong> y <strong>Referencias</strong> — vocabulario del marco y su base bibliográfica.</li>
  </ul>
  <p>Y el botón <strong>Iniciar recorrido</strong> te lleva a la <strong>ruta de decisión</strong>: 10 pantallas, lineal, que termina en un PDF (el insumo de tu memo). <strong>Dos reglas de navegación</strong> que conviene tener claras desde ya: (1) puedes <strong>consultar cualquier sección de referencia mientras decides</strong>, sin perder tu progreso; (2) una vez que aparece el <strong>inject</strong>, <strong>no se vuelve atrás</strong> —la revisión es reapertura, no edición—. Esa es, justamente, la disciplina que el laboratorio entrena.</p>
  {{STRIP}}
  <blockquote class="lc-quote"><strong>Antes de empezar.</strong> Recorre <strong>El marco E-BTA/R</strong> y, si quieres, los <strong>Componentes</strong>. Cuando estés listo, elige un caso y pulsa <strong>Iniciar recorrido</strong>.</blockquote>`;

// Cuerpo completo de Inicio (centro de aprendizaje): síntesis + ciclo + bloque extenso.
export const HOME_BODY = `${HOME_ABOVE}${HOME_BELOW}`;

// ── Secciones de primer nivel ──
export const SECTIONS = {
  inicio: {
    nav: 'Inicio', title: 'EntornoLab', anchor: 'inicio',
    html: `
      <p class="lc-lead">Laboratorio de decisión bajo incertidumbre</p>
      <p class="lc-meta">Análisis del Entorno · PAG Global Online · IESA · 2026 · Diseño y dirección académica: <strong>Pável Gómez</strong>.</p>
      ${HOME_BODY}`,
  },
  marco: {
    nav: 'El marco E-BTA/R', title: 'El marco E-BTA/R', anchor: 'marco',
    // {{CYCLE}} se sustituye por el SVG en el renderer
    html: `
      <h3 class="lc-h3">Qué es</h3>
      <p>E-BTA/R es una <strong>gramática para tomar y defender una decisión</strong> cuando aparece un evento que abre incertidumbre. No es una fórmula para acertar: es una disciplina para hacer explícito qué decides, qué proteges, qué sacrificas y cómo revisarás la apuesta. Sus letras son las piezas del ciclo: <strong>E</strong>vento, <strong>B</strong>uffer, <strong>T</strong>rade-off, <strong>A</strong>cción táctica, <strong>/R</strong>evisión.</p>
      <h3 class="lc-h3">El ciclo</h3>
      <p><strong>Evento</strong> → (abre <strong>incertidumbre</strong> sobre un <strong>canal</strong>) → <strong>Buffer</strong> → <strong>Trade-off</strong> → <strong>Acción táctica + indicadores</strong> → <strong>[INJECT]</strong> → <strong>Revisión</strong>.</p>
      {{CYCLE}}
      <p>El <strong>inject (inyección de información)</strong> revela información latente que no estaba disponible al momento de la decisión inicial. No es una noticia nueva inventada: es algo que el caso ya contenía y que ahora pesa. <span class="lc-footnote">${INJECT_GLOSS}</span></p>
      <h3 class="lc-h3">La frase canónica</h3>
      <blockquote class="lc-quote"><em>Dado el evento <strong>E</strong>, que abre la incertidumbre <strong>U</strong> sobre el canal <strong>C</strong>, protejo <strong>X</strong> mediante el buffer <strong>B</strong> (potencia, duración, costo), sacrifico parcialmente <strong>Y</strong>, monitoreo <strong>I1</strong> e <strong>I2</strong>, y reviso la decisión si se cruza el umbral <strong>T</strong>.</em></blockquote>
      <p class="lc-anota-label">Versión anotada — la misma frase, con cada color marcando una pieza del marco:</p>
      {{PHRASE}}
      <details class="lc-accordion">
        <summary class="lc-accordion-summary">Para profundizar: base teórica (de dónde viene)</summary>
        <div class="lc-accordion-body">
      <p>E-BTA/R no se inventa de cero: condensa, en un formato operativo para el aula, las tradiciones de la decisión bajo incertidumbre que sostienen el rediseño del curso.</p>
      <ul class="lc-list">
        <li><strong>Incertidumbre radical y eventos de cola.</strong> Frank Knight (1921) distingue <em>riesgo</em> (probabilidades conocidas) de <em>incertidumbre</em> (no se conocen): E-BTA/R vive en la incertidumbre. Para clasificar las sorpresas, se distingue el <em>cisne negro</em> —sorpresa genuina, racionalizada ex post— (Taleb, 2007) del <em>rinoceronte gris</em> —amenaza visible que nadie quiso atender— (Wucker).</li>
        <li><strong>VUCA/TUNA y límites de la planificación lineal.</strong> La planificación lineal pierde eficacia cuando los ciclos se acortan y el entorno se vuelve volátil, incierto, complejo y ambiguo (Oriesek &amp; Schwarz, 2021); el marco TUNA —turbulencia, incertidumbre, novedad, ambigüedad— subraya que cambian incluso las categorías y relaciones causales (Ramirez &amp; Wilkinson, 2016).</li>
        <li><strong>Wargaming y ejercicios de mesa.</strong> El valor no está en predecir, sino en exponer supuestos, decidir bajo presión y aprender por rondas (Perla, 1990; Perla &amp; McGrady, 2011; Dorton et al., 2023). De aquí vienen la <em>captura explícita de decisiones</em>, el <em>freeze probe</em> —que en EntornoLab es el <strong>inject</strong>— y el <em>hot wash</em>.</li>
        <li><strong>Decisión naturalista y sensemaking.</strong> Bajo presión, los expertos no comparan todas las opciones: reconocen un patrón, simulan mentalmente un curso de acción y eligen el primero que "aguanta" (decisión primada por reconocimiento; Klein et al., 1993). El <em>sensemaking</em> convierte señales dispersas en una hipótesis de acción suficientemente buena para decidir y flexible para corregirse (Weick, 1995).</li>
        <li><strong>Resiliencia y capacidades dinámicas (los buffers).</strong> La resiliencia se construye por <strong>redundancia</strong> (prima de seguro) o <strong>flexibilidad</strong> (que además rinde en la operación diaria), y la vulnerabilidad combina probabilidad y consecuencias (Sheffi &amp; Rice); se distingue resistir, absorber, adaptarse y transformar (Holling, 1973; Woods, 2003). Las capacidades dinámicas añaden detectar, aprovechar y transformar recursos ante el cambio (Teece, Pisano &amp; Shuen, 1997). Un buffer no es inventario pasivo: es capacidad con costo para sostener decisiones bajo estrés.</li>
        <li><strong>Trade-offs, decisión robusta y opciones reales.</strong> Decidir bajo incertidumbre no es maximizar todo, sino elegir qué proteger y qué sacrificar, y <strong>declararlo ex ante</strong>. La decisión robusta busca estrategias suficientemente buenas a través de muchos futuros plausibles —caracterizando vulnerabilidades y trade-offs— en vez de optimizar para un solo pronóstico; las opciones reales valoran la flexibilidad —postergar, escalar, abandonar, diversificar— (Schoemaker, 1995, 2012).</li>
        <li><strong>Revisión: doble bucle y actualización bayesiana.</strong> La <strong>R</strong> no corrige solo la ejecución dentro del marco viejo (bucle simple); pregunta si el marco mismo era erróneo o estrecho (doble bucle; Argyris) —distingue <em>error de ejecución</em> de <em>error de encuadre</em>—. Y trata cada inject como evidencia que obliga a sopesar hipótesis rivales y actualizar credibilidades, no a "ajustar" sin más (inferencia bayesiana; Fairfield &amp; Charman). El inject es, en el wargaming, un <em>freeze probe</em>.</li>
        <li><strong>Conversación actual (2024–2026).</strong> El foco se desplaza de VUCA hacia la <em>incertidumbre profunda</em> y la <em>complejidad dinámica</em>: importa distinguir ruido contextual, inestabilidad dinámica e incertidumbre estructural. El wargaming se reivindica como puente entre inteligencia, foresight y estrategia, y el inject se entiende como dispositivo para convertir información difusa en hipótesis operativas, vulnerabilidades visibles y señales de revisión.</li>
      </ul>
        </div>
      </details>
      <h3 class="lc-h3">Cuándo usarlo</h3>
      <p>Cuando enfrentas un <strong>evento emergente</strong> (no una rutina), con <strong>información incompleta</strong>, <strong>recursos escasos</strong> y <strong>obligación de rendir cuentas</strong>. Si la respuesta es obvia o el futuro es conocido, no necesitas E-BTA/R: necesitas ejecutar.</p>
      <h3 class="lc-h3">Qué NO es</h3>
      <p>No es un algoritmo que entrega la respuesta; no es un pronóstico; no es un puntaje. Es una forma de pensar y de comunicar una decisión.</p>`,
  },
  ejemplos: {
    nav: 'Ejemplos', title: 'Ejemplos', anchor: 'ejemplos',
    html: `
      <h3 class="lc-h3">Ejemplo guiado (de juguete)</h3>
      <p>Una cafetería de barrio se entera un lunes de que el dueño del local le subirá el alquiler 40% en 30 días.</p>
      <blockquote class="lc-quote"><em>Dado el evento (alza súbita del alquiler), que abre incertidumbre de <strong>magnitud</strong> sobre el canal <strong>financiero</strong>, protejo el <strong>flujo de caja</strong> mediante un buffer de <strong>reserva</strong> (potencia media, dura ~2 meses, costo en caja), sacrifico parcialmente <strong>margen</strong> subiendo precios con moderación, monitoreo las <strong>ventas semanales</strong> y las <strong>quejas de clientes</strong>, y reviso si las ventas caen más de <strong>15% en tres semanas</strong>.</em></blockquote>
      <p class="lc-anota-label">Versión anotada — la misma decisión, con los colores del marco:</p>
      <div class="ebta-anatomy">
        <p class="ebta-frase">
          Dado el <span class="chip" style="background:#0F2740;color:#fff">alza súbita del alquiler (E)</span>,
          que abre la <span class="chip" style="background:#E7EDF4;color:#0F2740">incertidumbre de magnitud sobre el canal financiero (C)</span>,
          protejo el flujo de caja con una <span class="chip" style="background:#2D6EA3;color:#fff">reserva (B)</span>,
          sacrifico parte del <span class="chip" style="background:#2E7D6A;color:#fff">margen (trade-off, T)</span>,
          subo precios con moderación y vigilo ventas y quejas <span class="chip" style="background:#B26A00;color:#fff">(acción + indicadores, A)</span>,
          y <span class="chip" style="background:#6A4C93;color:#fff">reviso (R)</span> si las ventas caen más de 15% en tres semanas.
        </p>
        <p class="ebta-leyenda"><b>E</b> Evento · <b>B</b> Buffer · <b>T</b> Trade-off · <b>A</b> Acción táctica + indicadores · <b>R</b> Revisión</p>
      </div>
      <p>Desglose por componente: <strong>E</strong> = alza súbita; <strong>C</strong> = financiero; <strong>U</strong> = magnitud; <strong>B</strong> = reserva (caja); <strong>T</strong> = protejo caja / sacrifico margen / riesgo residual: perder clientes sensibles al precio; <strong>A</strong> = subir precios con moderación + indicadores; <strong>R</strong> (si llega un inject, p. ej. "el local de al lado cierra y baja la zona"): reabrir.</p>
      <p>El ejemplo no es "la respuesta correcta": es la <strong>forma</strong> de una decisión que se puede defender y revisar.</p>
      <h3 class="lc-h3">Cómo se ve en un caso real-ista (sin spoiler)</h3>
      <p>En el Caso A, una fintech recibe un borrador de circular un viernes por la tarde. El alumno deberá demarcar si es evento o factor, nombrar el canal dominante, elegir entre buffers con costos en cuatro unidades distintas, y —cuando el facilitador dispare un inject— revisar. No hay una jugada ganadora: cada movimiento protege un canal a costa de otro, y los recursos no alcanzan para todo. Esa es, justamente, la dificultad que se entrena. (Detalle de cada caso en <strong>Casos</strong>; los datos completos aparecen dentro del recorrido.)</p>`,
  },
  casos: {
    nav: 'Casos', title: 'Casos', anchor: 'casos',
    html: `
      <p>Tres casos, anclados en el contexto venezolano (alta variabilidad regulatoria, fricción cambiaria, escasez de buffers convencionales). El selector vive en <strong>Inicio</strong>.</p>
      <ul class="lc-list">
        <li><strong>Caso A — Vala Pagos · Fintech de pagos y remesas.</strong> "Una plataforma de pagos y remesas enfrenta un cambio regulatorio repentino en un entorno cambiario tensionado." Caso ancla: el ciclo completo y más rico, base del memo evaluable. ~180 min. Recomendado para empezar.</li>
        <li><strong>Caso B — Provista · Alimentos de consumo masivo.</strong> "Una empresa de alimentos descubre que su cliente histórico ya no puede pagar su producto." Caso de transferencia, ciclo comprimido. ~60 min.</li>
        <li><strong>Caso C — Rauda · Plataforma de reparto.</strong> "Una app de delivery enfrenta una crisis pública que estalla tras un caso viral." Caso portable, ciclo comprimido. ~60 min.</li>
      </ul>
      <p><em>Empieza por el Caso A si es tu primera vez o si harás el memo. Usa B o C para practicar la transferencia del marco a otros sectores.</em> (El selector no muestra el tipo de evento ni el canal dominante: eso es justo lo que tú debes deducir.)</p>
      <p><button class="btn btn-secondary lc-goto-selector" type="button" data-goto-selector>Ir al selector en Inicio ↓</button></p>`,
  },
  guia: {
    nav: 'Guía de uso', title: 'Guía de uso', anchor: 'guia',
    html: `
      <p><strong>El recorrido tiene 10 pantallas, lineales:</strong> 1) Briefing y dossier del caso · 2) Clasificación del evento · 3) Mapa de impacto · 4) Buffer Board · 5) Trade-off · 6) Decisión y frase E-BTA/R · 7) Indicadores y umbral · 8) <strong>Inject</strong> (punto de no retorno) · 9) Revisión forzada · 10) Export (PDF).</p>
      {{STRIP}}
      <h3 class="lc-h3">Reglas</h3>
      <ul class="lc-list">
        <li>No puedes avanzar con campos obligatorios vacíos.</li>
        <li><strong>Tras el inject (Pantalla 8) no puedes volver atrás.</strong> La revisión es reapertura, no edición. Esta restricción es intencional: es el corazón del ejercicio.</li>
        <li>Puedes <strong>consultar cualquier sección de referencia</strong> en cualquier momento desde la barra superior: se abre sobre tu recorrido y, al cerrarla, vuelves a tu pantalla sin perder nada.</li>
        <li>El recorrido termina en un <strong>PDF</strong> con todo tu razonamiento. Es el insumo de tu <strong>memo</strong> (1.200–1.500 palabras), el único entregable evaluable.</li>
      </ul>
      <p><strong>El simulador no te evalúa.</strong> Captura tu razonamiento; la evaluación la hace el facilitador con una rúbrica.</p>
      <h3 class="lc-h3">Modalidades del recorrido</h3>
      <p>El facilitador puede correr el laboratorio en dos modos:</p>
      <ul class="lc-list">
        <li><strong>Tabletop (TTX):</strong> un único inject guionado, revisión y hot wash. Es el modo por defecto.</li>
        <li><strong>Wargame:</strong> además del inject, el actor <strong>replica</strong> tu decisión. Antes de ver su reacción, anticipas cómo crees que responderá; luego el facilitador revela la réplica y haces una segunda revisión. Entrena el pensamiento de segundo orden: el otro también juega.</li>
      </ul>
      <h3 class="lc-h3">La R tiene dos formas</h3>
      <p>Al revisar (Pantalla 9) clasificarás tu revisión: <strong>bucle simple</strong> —ajustas la ejecución, mantienes el encuadre— o <strong>doble bucle</strong> —reabres el encuadre: cambia el tipo de evento, el canal dominante o qué cuenta como buffer—. Hacer visible esa diferencia distingue cuándo fallaste al <em>actuar</em> de cuándo fallaste al <em>definir</em> lo que ocurría.</p>`,
  },
  referencias: {
    nav: 'Referencias', title: 'Referencias del marco', anchor: 'referencias',
    html: `
      <p>Base teórica de E-BTA/R. Estas son las fuentes principales del marco; la <strong>bibliografía ampliada en formato APA está disponible con el facilitador</strong>.</p>
      <ul class="lc-list">
        <li><strong>Knight, F. H. (1921).</strong> <em>Risk, Uncertainty and Profit.</em> — Riesgo vs. incertidumbre.</li>
        <li><strong>Taleb, N. N. (2007).</strong> <em>The Black Swan.</em> — Eventos de cola / cisne negro.</li>
        <li><strong>Wucker, M. (2016).</strong> <em>The Gray Rhino.</em> — Amenazas visibles desatendidas (rinoceronte gris).</li>
        <li><strong>Oriesek, D. F., &amp; Schwarz, J. O. (2021).</strong> <em>Winning the Uncertainty Game</em> — Business wargaming; estrategia continua y <em>dual operating system</em>.</li>
        <li><strong>Ramirez, R., &amp; Wilkinson, A. (2016).</strong> <em>Strategic Reframing: The Oxford Scenario Planning Approach</em> — Marco TUNA.</li>
        <li><strong>Perla, P. P. (1990).</strong> <em>The Art of Wargaming</em>; <strong>Perla &amp; McGrady (2011)</strong>, <em>Why Wargaming Works</em>.</li>
        <li><strong>Dorton, S., et al. (2023).</strong> Wargames y tabletop exercises como herramientas naturalistas — captura de decisiones, <em>freeze probes</em>, <em>hot wash</em>.</li>
        <li><strong>Klein, G., et al. (1993).</strong> Naturalistic Decision Making / decisión primada por reconocimiento.</li>
        <li><strong>Weick, K. E. (1995).</strong> <em>Sensemaking in Organizations.</em></li>
        <li><strong>Argyris, C.</strong> Aprendizaje de bucle simple y doble bucle.</li>
        <li><strong>Holling, C. S. (1973); Woods, D. D. (2003).</strong> Resiliencia (resistir, absorber, adaptarse, transformar).</li>
        <li><strong>Sheffi, Y., &amp; Rice, J. B. (2005).</strong> <em>A Supply Chain View of the Resilient Enterprise</em>; Sheffi, <em>The Resilient Enterprise</em> — redundancia vs. flexibilidad.</li>
        <li><strong>Teece, D. J., Pisano, G., &amp; Shuen, A. (1997).</strong> Capacidades dinámicas.</li>
        <li><strong>Schoemaker, P. J. H. (1995, 2012).</strong> Planificación por escenarios y opciones reales.</li>
        <li><strong>Fairfield, T., &amp; Charman, A. E.</strong> <em>Social Inquiry and Bayesian Inference</em> — actualización de hipótesis rivales ante evidencia.</li>
        <li><em>Decisión robusta</em> (estrategias buenas a través de muchos futuros) y, en la conversación 2024–2026, <em>incertidumbre profunda</em> y <em>complejidad dinámica</em>.</li>
      </ul>`,
  },
};
