const STORAGE_KEY = 'entornolab_v1_state';

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
});

let _state = defaultState();

function load() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      _state = { ...defaultState(), ...saved };
    }
  } catch (e) {
    console.warn('Could not load session state', e);
  }
}

function persist() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
  } catch (e) {
    console.warn('Could not persist state', e);
  }
}

export const state = {
  get() { return _state; },
  set(partial) {
    _state = { ..._state, ...partial };
    persist();
  },
  reset() {
    _state = defaultState();
    sessionStorage.removeItem(STORAGE_KEY);
  },
  load,
};
