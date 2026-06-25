const VALID_EVENT_TYPES = new Set(['subito-discreto', 'acumulativo', 'cascada', 'legitimidad']);
const VALID_CHANNELS = new Set(['operacional', 'financiero', 'regulatorio-legal', 'legitimidad', 'modelo-de-negocio']);
const VALID_UNCERTAINTY = new Set(['ocurrencia', 'magnitud', 'duracion', 'actor']);
const VALID_COST_UNITS = new Set(['caja', 'tiempo', 'capital_politico', 'legitimidad']);

function required(obj, field, type) {
  if (obj[field] === undefined || obj[field] === null) throw new Error(`Campo requerido faltante: "${field}"`);
  if (type && typeof obj[field] !== type) throw new Error(`Campo "${field}" debe ser de tipo ${type}`);
}

// Valida el archivo del ALUMNO (`caso-X.json`). Tras el split de datos
// (Capa de Gobierno e Integridad), el archivo del alumno ya NO contiene
// campos solo-facilitador: `facilitatorNotes`, `facilitatorAnalysis`,
// `context.dominant*`/`secondaryChannel`, ni los injects completos
// (`latentInformation`, `primaryUncertaintyAffected`, `facilitatorPrompt`).
// Esos viven en `caso-X.facilitator.<sufijo>.json` y solo los carga la consola.
// Por eso aquí esos campos son OPCIONALES: si aparecen (compatibilidad con un
// JSON sin dividir) se validan; si no, no se exigen.
function validateCase(data) {
  required(data, 'schemaVersion', 'string');
  if (!['1.0', '1.1'].includes(data.schemaVersion)) throw new Error('schemaVersion debe ser "1.0" o "1.1"');
  required(data, 'caseId', 'string');
  required(data, 'title', 'string');
  if (!['A', 'B', 'C', '3'].includes(data.order)) throw new Error('"order" debe ser A, B, C o 3');
  if (!['ancla', 'transferencia', 'portable', 'final'].includes(data.role)) throw new Error('"role" inválido');
  required(data, 'estimatedMinutes', 'number');
  required(data, 'initialSignal', 'string');
  required(data, 'briefing', 'string');

  // Context (solo se exigen los campos visibles al alumno: sector/country/size).
  if (!data.context) throw new Error('Falta "context"');
  // dominantEventType/dominantChannel/secondaryChannel son solo-facilitador:
  // se validan únicamente si están presentes (JSON sin dividir).
  if (data.context.dominantEventType !== undefined) {
    if (!Array.isArray(data.context.dominantEventType)) throw new Error('"context.dominantEventType" debe ser array');
    data.context.dominantEventType.forEach(t => {
      if (!VALID_EVENT_TYPES.has(t)) throw new Error(`Tipo de evento inválido: "${t}"`);
    });
  }
  if (data.context.dominantChannel !== undefined &&
      (typeof data.context.dominantChannel !== 'string' || !data.context.dominantChannel.trim())) {
    throw new Error('"context.dominantChannel" debe ser un string no vacío');
  }
  if (data.context.secondaryChannel != null && typeof data.context.secondaryChannel !== 'string') {
    throw new Error('"context.secondaryChannel" debe ser un string u opcional');
  }

  // Buffers
  if (!Array.isArray(data.availableBuffers) || data.availableBuffers.length === 0) throw new Error('"availableBuffers" debe ser un array no vacío');
  data.availableBuffers.forEach((b, i) => {
    if (!b.id) throw new Error(`Buffer ${i}: falta "id"`);
    if (!b.label) throw new Error(`Buffer ${i}: falta "label"`);
    if (!VALID_COST_UNITS.has(b.costUnit)) throw new Error(`Buffer "${b.id}": costUnit inválido "${b.costUnit}"`);
  });

  // Uncertainty sources
  if (!Array.isArray(data.uncertaintySources)) throw new Error('"uncertaintySources" debe ser array');
  data.uncertaintySources.forEach(u => {
    if (!VALID_UNCERTAINTY.has(u)) throw new Error(`Fuente de incertidumbre inválida: "${u}"`);
  });

  // Injects — el alumno solo recibe { id, text }; el resto es solo-facilitador
  // y se valida en la consola (validateFacilitatorCase).
  if (!Array.isArray(data.injects) || data.injects.length !== 3) throw new Error('"injects" debe tener exactamente 3 elementos');
  data.injects.forEach((inj, i) => {
    if (!inj.id) throw new Error(`Inject ${i}: falta "id"`);
    if (!inj.text) throw new Error(`Inject ${i}: falta "text"`);
  });

  return true;
}

// Valida el archivo del FACILITADOR (`caso-X.facilitator.<sufijo>.json`).
// Contiene los injects completos, notas y análisis. Solo lo invoca la consola.
function validateFacilitatorCase(data) {
  required(data, 'caseId', 'string');
  if (!Array.isArray(data.injects) || data.injects.length !== 3) throw new Error('"injects" (facilitador) debe tener 3 elementos');
  data.injects.forEach((inj, i) => {
    if (!inj.id) throw new Error(`Inject ${i}: falta "id"`);
    if (!inj.text) throw new Error(`Inject ${i}: falta "text"`);
    if (!inj.latentInformation) throw new Error(`Inject ${i}: falta "latentInformation"`);
    if (!VALID_UNCERTAINTY.has(inj.primaryUncertaintyAffected)) throw new Error(`Inject "${inj.id}": primaryUncertaintyAffected inválido`);
    if (!inj.facilitatorPrompt) throw new Error(`Inject ${i}: falta "facilitatorPrompt"`);
  });
  required(data, 'facilitatorNotes', 'string');
  return true;
}

export async function loadCase(caseFile) {
  const url = `./cases/v1/${caseFile}`;
  let data;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} al cargar ${url}`);
    data = await resp.json();
  } catch (e) {
    throw new Error(`No se pudo cargar el caso "${caseFile}": ${e.message}`);
  }

  try {
    validateCase(data);
  } catch (e) {
    throw new Error(`El caso "${caseFile}" está malformado: ${e.message}`);
  }

  return data;
}

// Registro de casos. Los participantes ven A/B/C en el selector; el Caso 3
// (Envases del Centro) es el caso de evaluación (entrega final), accesible
// por tarjeta diferenciada y por ?caso=3.
export const CASE_FILES = {
  A: 'caso-A.json',
  B: 'caso-B.json',
  C: 'caso-C.json',
  '3': 'caso-3.json',
};

// Archivos del facilitador (solo-consola). El sufijo poco adivinable sube el
// costo del acceso directo; NUNCA se referencian desde el flujo del alumno.
export const FACILITATOR_FILES = {
  A: 'caso-A.facilitator.7f3a.json',
  B: 'caso-B.facilitator.9c2e.json',
  C: 'caso-C.facilitator.b5d1.json',
  '3': 'caso-3.facilitator.a4e8.json',
};

// Carga el archivo del facilitador para un caso. SOLO debe llamarse desde la
// consola, tras pasar el gate de acceso. El flujo del alumno jamás lo invoca.
export async function loadFacilitatorCase(order) {
  const facFile = FACILITATOR_FILES[order] || FACILITATOR_FILES.A;
  const url = `./cases/v1/${facFile}`;
  let data;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status} al cargar ${url}`);
    data = await resp.json();
  } catch (e) {
    throw new Error(`No se pudo cargar el archivo del facilitador "${facFile}": ${e.message}`);
  }
  try {
    validateFacilitatorCase(data);
  } catch (e) {
    throw new Error(`El archivo del facilitador "${facFile}" está malformado: ${e.message}`);
  }
  return data;
}

// Fusiona en memoria los datos del alumno con los del facilitador para que la
// consola disponga de la vista completa (injects completos, notas, análisis,
// réplicas de Wargame). No persiste: vive solo mientras la consola está abierta.
export function mergeFacilitator(studentData, facData) {
  if (!facData) return studentData;
  // Mapa de notas de buffer por id → reinyectar notesForFacilitator.
  const notesById = {};
  (facData.bufferNotes || []).forEach(b => { notesById[b.id] = b.notesForFacilitator; });
  const availableBuffers = (studentData.availableBuffers || []).map(b => (
    notesById[b.id] != null ? { ...b, notesForFacilitator: notesById[b.id] } : { ...b }
  ));
  return {
    ...studentData,
    context: { ...studentData.context, ...(facData.context || {}) },
    availableBuffers,
    injects: facData.injects || studentData.injects, // injects completos
    facilitatorNotes: facData.facilitatorNotes,
    facilitatorAnalysis: facData.facilitatorAnalysis,
    replies: facData.replies || studentData.replies,
    wargameReplicas: facData.wargameReplicas || null,
    dossier: { ...studentData.dossier, _visibility: facData.dossierVisibility },
  };
}
