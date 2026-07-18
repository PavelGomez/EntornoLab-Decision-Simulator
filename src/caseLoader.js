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

// NOTA DE SEGURIDAD (split de capa privada — jul 2026).
// Los archivos del facilitador (`caso-X.facilitator.*.json`), la consola y sus
// cargadores (loadFacilitatorCase/mergeFacilitator/FACILITATOR_FILES) fueron
// RETIRADOS de la build pública. Ninguna ruta ni sufijo privado aparece ya en
// el bundle servido por GitHub Pages. La consola del facilitador vive en la
// rama `consola-docente`, que NO es la fuente de Pages y se ejecuta local.
