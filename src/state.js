// Versión del simulador — entra en las huellas de integridad y en el pie del PDF.
export const SIM_VERSION = 'v1.7';

// Persistencia: localStorage (antes sessionStorage). La clave concreta depende
// del runId (`entornolab_v1_state__<runId|'anon'>`); un puntero estable apunta
// a la clave activa para poder recuperar el progreso tras recargar sin conocer
// el runId de antemano.
const KEY_PREFIX = 'entornolab_v1_state__';
const ACTIVE_KEY_PTR = 'entornolab_v1_active_key';

const defaultState = () => ({
  caseId: null,
  currentScreen: 0, // 0 = portada; 1-10 = flujo del simulador
  postInject: false,
  selectedInjectId: null,
  professorMode: false,

  // S1
  s1_read: false,

  // S2
  s2_eventTypes: [],
  s2_demarcation: '',
  s2_uncertaintySource: '',

  // S3
  s3_dominantChannel: '',
  s3_secondaryChannel: '',
  s3_impact1: '',
  s3_impact2: '',
  s3_rivalInterpretations: '',   // reducir equivocidad: lecturas causales rivales
  s3_discriminatingEvidence: '', // qué dato favorecería una lectura sobre otra

  // S4
  s4_selectedBuffers: [],  // array of buffer ids (max 2)
  s4_bufferDetails: {},    // { bufferId: { potencia, duracion, costo } }

  // S5
  s5_protects: '',
  s5_sacrifices: '',
  s5_residualRisk: '',

  // S6 (indicators - captured in screen 6 to complete the phrase)
  s6_i1: '',
  s6_i2: '',
  s6_threshold: '',
  s6_realOption: '',         // tipo de jugada (opción real), opcional
  s6_realOptionTrigger: '',  // gatillo de ejercicio de la opción real

  // S9
  s9_maintains: '',
  s9_abandons: '',
  s9_inverts: '',
  s9_revisedEventTypes: [],
  s9_revisedDemarcation: '',
  s9_revisedUncertaintySource: '',
  s9_revisedDominantChannel: '',
  s9_revisedI1: '',
  s9_revisedI2: '',
  s9_revisedThreshold: '',
  s9_revisedProtects: '',
  s9_revisedSacrifices: '',
  s9_revisedResidualRisk: '',
  s9_revisedSelectedBuffers: [],
  s9_revisedBufferDetails: {},

  // S9 — clasificación de bucle (doble bucle)
  s9_loopType: '',   // 'simple' | 'doble'
  s9_loopWhy: '',

  // Modalidad del recorrido (modo profesor): 'ttx' | 'wargame'
  modality: 'ttx',

  // Ronda de réplica (wargame) — tras P9
  wgRound: false,         // true cuando se está/estuvo en la ronda de réplica
  wg_anticipate: '',      // anticipación de la réplica del actor (paso 1)
  wg_replyId: null,       // id del inject/reply usado como réplica (paso 2)
  wg_maintains: '',       // segunda revisión (paso 3)
  wg_abandons: '',
  wg_inverts: '',
  wg_loopType: '',
  wg_loopWhy: '',

  // ── Gobierno (runConfig): fuente única de verdad fijada en la consola ──
  // null = sin consola; el motor usa los defaults actuales (compat. hacia atrás).
  runConfig: null,
  // runConfig cuando existe:
  // { mode:'ttx'|'wargame', order:'A'|'B'|'C'|'3', injectId, revealPolicy:'facilitator'|'auto',
  //   phase:'demo'|'real', sessionCode:'', alias:'', timing:null }

  // ── Integridad (autenticidad por proceso) — huellas del recorrido ──
  runId: null,            // se emite SOLO en fase 'real' al iniciar el run
  startedAt: null,        // ISO al iniciar el recorrido (pantalla 1)
  injectSeenAt: null,     // ISO al avanzar desde P8 (revelado del inject)
  exportedAt: null,       // ISO al generar el PDF/JSON
  screenDurations: {},    // { '1': ms, ... } solo hitos del recorrido (no teclas)
  preInjectSnapshot: null,// copia sellada de s1..s7 congelada en P8
  integrityHash: null,    // SHA-256 del contenido canónico, recalculado al exportar
  verifyCode: null,       // 8 hex del hash, para cotejo a simple vista
  injectReleased: false,  // el facilitador liberó el inject (retén de P8)

  // Registro de frases finales E-BTA/R por grupo (hot wash) — solo consola.
  phraseRegistry: '',
});

let _state = defaultState();

function storageKey() {
  return KEY_PREFIX + (_state.runId || 'anon');
}

function load() {
  try {
    let raw = null;
    const activeKey = localStorage.getItem(ACTIVE_KEY_PTR);
    if (activeKey) raw = localStorage.getItem(activeKey);
    // Migración suave desde sessionStorage (versión anterior).
    if (!raw) raw = sessionStorage.getItem('entornolab_v1_state');
    if (raw) {
      const saved = JSON.parse(raw);
      _state = { ...defaultState(), ...saved };
    }
  } catch (e) {
    console.warn('Could not load state', e);
  }
}

function persist() {
  try {
    const key = storageKey();
    localStorage.setItem(key, JSON.stringify(_state));
    localStorage.setItem(ACTIVE_KEY_PTR, key);
  } catch (e) {
    console.warn('Could not persist state', e);
  }
}

// ── Helpers de integridad ──────────────────────────────────────────────────

function rand4() {
  return Math.random().toString(36).slice(2, 6);
}

// Serialización canónica con claves ordenadas (determinista para el hash).
function canonicalStringify(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return Object.keys(value).sort().reduce((acc, k) => { acc[k] = value[k]; return acc; }, {});
    }
    return value;
  });
}

// Conjunto canónico de campos completados que entran al hash de integridad.
function integrityPayload() {
  const s = _state;
  const fields = [
    's2_eventTypes', 's2_demarcation', 's2_uncertaintySource',
    's3_dominantChannel', 's3_secondaryChannel', 's3_impact1', 's3_impact2',
    's3_rivalInterpretations', 's3_discriminatingEvidence',
    's4_selectedBuffers', 's4_bufferDetails',
    's5_protects', 's5_sacrifices', 's5_residualRisk',
    's6_i1', 's6_i2', 's6_threshold', 's6_realOption', 's6_realOptionTrigger',
    's9_maintains', 's9_abandons', 's9_inverts', 's9_loopType', 's9_loopWhy',
    's9_revisedEventTypes', 's9_revisedDemarcation', 's9_revisedUncertaintySource',
    's9_revisedDominantChannel', 's9_revisedI1', 's9_revisedI2', 's9_revisedThreshold',
    's9_revisedProtects', 's9_revisedSacrifices', 's9_revisedResidualRisk',
    's9_revisedSelectedBuffers', 's9_revisedBufferDetails',
    'wg_anticipate', 'wg_replyId', 'wg_maintains', 'wg_abandons', 'wg_inverts',
    'wg_loopType', 'wg_loopWhy', 'selectedInjectId', 'caseId',
  ];
  const completed = {};
  fields.forEach(f => { completed[f] = s[f]; });
  return {
    runConfig: s.runConfig,
    completed,
    preInjectSnapshot: s.preInjectSnapshot,
    startedAt: s.startedAt,
    injectSeenAt: s.injectSeenAt,
    exportedAt: s.exportedAt,
    simVersion: SIM_VERSION,
  };
}

export const state = {
  get() { return _state; },
  set(partial) {
    _state = { ..._state, ...partial };
    persist();
  },
  reset() {
    try { localStorage.removeItem(storageKey()); } catch (e) { /* noop */ }
    _state = defaultState();
    try { localStorage.removeItem(ACTIVE_KEY_PTR); } catch (e) { /* noop */ }
    try { sessionStorage.removeItem('entornolab_v1_state'); } catch (e) { /* noop */ }
  },
  load,

  // Fija el runConfig y arranca el recorrido. Emite runId solo en fase 'real';
  // en demo usa "DEMO" (sin valor de evidencia).
  startRun(runConfig) {
    const phase = runConfig.phase === 'real' ? 'real' : 'demo';
    const order = runConfig.order || 'A';
    const runId = phase === 'real'
      ? `EL-${order}-${(runConfig.sessionCode || 'ANON')}-${Date.now().toString(36)}-${rand4()}`
      : 'DEMO';
    _state = {
      ..._state,
      runConfig: { ...runConfig, phase },
      runId,
      startedAt: _state.startedAt || new Date().toISOString(),
      modality: runConfig.mode === 'wargame' ? 'wargame' : 'ttx',
      selectedInjectId: runConfig.injectId || _state.selectedInjectId,
      injectReleased: runConfig.revealPolicy === 'auto',
    };
    persist();
    return runId;
  },

  // Sella la decisión inicial (s1..s7) en P8. Idempotente: no re-sella.
  sealPreInject() {
    if (_state.preInjectSnapshot) return;
    const s = _state;
    const snapshotKeys = [
      's1_read',
      's2_eventTypes', 's2_demarcation', 's2_uncertaintySource',
      's3_dominantChannel', 's3_secondaryChannel', 's3_impact1', 's3_impact2',
      's3_rivalInterpretations', 's3_discriminatingEvidence',
      's4_selectedBuffers', 's4_bufferDetails',
      's5_protects', 's5_sacrifices', 's5_residualRisk',
      's6_i1', 's6_i2', 's6_threshold', 's6_realOption', 's6_realOptionTrigger',
    ];
    const snap = {};
    snapshotKeys.forEach(k => { snap[k] = s[k]; });
    _state = {
      ..._state,
      preInjectSnapshot: snap,
      injectSeenAt: _state.injectSeenAt || new Date().toISOString(),
    };
    persist();
  },

  // Calcula el hash de integridad (SHA-256) sobre el contenido canónico y
  // deriva el verifyCode (8 hex). Se llama al exportar.
  async computeIntegrityHash() {
    const canonical = canonicalStringify(integrityPayload());
    let hashHex;
    try {
      const buf = new TextEncoder().encode(canonical);
      const digest = await crypto.subtle.digest('SHA-256', buf);
      hashHex = Array.from(new Uint8Array(digest))
        .map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      // Fallback determinista (djb2) si crypto.subtle no está disponible.
      let h = 5381;
      for (let i = 0; i < canonical.length; i++) h = ((h << 5) + h + canonical.charCodeAt(i)) >>> 0;
      hashHex = h.toString(16).padStart(8, '0').repeat(8).slice(0, 64);
    }
    const verifyCode = hashHex.slice(0, 8).toUpperCase();
    _state = { ..._state, integrityHash: hashHex, verifyCode };
    persist();
    return { integrityHash: hashHex, verifyCode };
  },
};

// Expuesto para que la consola/export puedan recomputar el hash de un JSON.
export { canonicalStringify };

// Devuelve el payload canónico exacto sobre el que se calcula integrityHash.
// El export JSON lo incrusta para que el hash sea reproducible por un tercero:
//   sha256(canonicalStringify(payload)).slice(0,8).toUpperCase() === verifyCode
export function getIntegrityPayload() {
  return integrityPayload();
}
