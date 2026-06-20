const VALID_EVENT_TYPES = new Set(['subito-discreto', 'acumulativo', 'cascada', 'legitimidad']);
const VALID_CHANNELS = new Set(['operacional', 'financiero', 'regulatorio-legal', 'legitimidad', 'modelo-de-negocio']);
const VALID_UNCERTAINTY = new Set(['ocurrencia', 'magnitud', 'duracion', 'actor']);
const VALID_COST_UNITS = new Set(['caja', 'tiempo', 'capital_politico', 'legitimidad']);

function required(obj, field, type) {
  if (obj[field] === undefined || obj[field] === null) throw new Error(`Campo requerido faltante: "${field}"`);
  if (type && typeof obj[field] !== type) throw new Error(`Campo "${field}" debe ser de tipo ${type}`);
}

function validateCase(data) {
  required(data, 'schemaVersion', 'string');
  if (data.schemaVersion !== '1.0') throw new Error('schemaVersion debe ser "1.0"');
  required(data, 'caseId', 'string');
  required(data, 'title', 'string');
  if (!['A', 'B', 'C'].includes(data.order)) throw new Error('"order" debe ser A, B o C');
  if (!['ancla', 'transferencia', 'portable'].includes(data.role)) throw new Error('"role" inválido');
  required(data, 'estimatedMinutes', 'number');
  required(data, 'initialSignal', 'string');
  required(data, 'briefing', 'string');
  required(data, 'facilitatorNotes', 'string');

  // Context
  if (!data.context) throw new Error('Falta "context"');
  if (!Array.isArray(data.context.dominantEventType)) throw new Error('"context.dominantEventType" debe ser array');
  data.context.dominantEventType.forEach(t => {
    if (!VALID_EVENT_TYPES.has(t)) throw new Error(`Tipo de evento inválido: "${t}"`);
  });
  if (!VALID_CHANNELS.has(data.context.dominantChannel)) throw new Error(`Canal dominante inválido: "${data.context.dominantChannel}"`);
  if (data.context.secondaryChannel && !VALID_CHANNELS.has(data.context.secondaryChannel)) throw new Error('Canal secundario inválido');

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

  // Injects
  if (!Array.isArray(data.injects) || data.injects.length !== 3) throw new Error('"injects" debe tener exactamente 3 elementos');
  data.injects.forEach((inj, i) => {
    if (!inj.id) throw new Error(`Inject ${i}: falta "id"`);
    if (!inj.text) throw new Error(`Inject ${i}: falta "text"`);
    if (!inj.latentInformation) throw new Error(`Inject ${i}: falta "latentInformation"`);
    if (!VALID_UNCERTAINTY.has(inj.primaryUncertaintyAffected)) throw new Error(`Inject "${inj.id}": primaryUncertaintyAffected inválido`);
    if (!inj.facilitatorPrompt) throw new Error(`Inject ${i}: falta "facilitatorPrompt"`);
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

export const CASE_FILES = {
  A: 'caso-A.json',
  B: 'caso-B.json',
  C: 'caso-C.json',
};
