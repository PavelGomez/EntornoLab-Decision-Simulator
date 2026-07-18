import { T } from './i18n.js';

/**
 * Elige 'e' o 'y' según la norma española:
 * 'e' antes de palabras que empiezan por sonido /i/
 * (grafía 'i' o 'hi' sin seguir 'e', p.ej. 'hielo' lleva 'y').
 * Si el valor está vacío, devuelve 'e' porque el placeholder es 'I2'.
 */
function conjY(word) {
  const w = String(word || '').trim().toLowerCase();
  if (!w) return 'e'; // vacío → placeholder empieza por I
  if (w.startsWith('i')) return 'e';
  if (w.startsWith('hi') && !w.startsWith('hie')) return 'e';
  return 'y';
}

function slot(value, label) {
  if (value && String(value).trim()) {
    return `<strong class="phrase-slot-filled">${String(value).trim()}</strong>`;
  }
  return `<span class="phrase-slot-empty">${T.empty(label)}</span>`;
}

function textSlot(value, label) {
  if (value && String(value).trim()) return String(value).trim();
  return `[${label}]`;
}

const _has = (v) => !!(v && String(v).trim());

// Verbos aspiracionales: informan/observan pero no comprometen recursos.
// Se usan SOLO para una pista pedagógica blanda (nunca para bloquear).
const ASPIRATIONAL_VERBS = new Set([
  'analizar', 'evaluar', 'monitorear', 'monitorizar', 'revisar', 'considerar',
  'estudiar', 'explorar', 'entender', 'observar', 'seguir', 'vigilar',
  'comunicar', 'informar', 'reflexionar', 'valorar', 'diagnosticar',
]);

/**
 * ¿La acción arranca con un verbo meramente aspiracional? Heurística blanda:
 * mira solo la PRIMERA palabra. No bloquea; alimenta un mensaje pedagógico.
 */
export function isAspirationalAction(action) {
  const first = String(action || '').trim().toLowerCase().split(/[\s,;.:]+/)[0] || '';
  // normaliza acentos para comparar
  const norm = first.normalize('NFD').replace(/[̀-ͯ]/g, '');
  for (const v of ASPIRATIONAL_VERBS) {
    if (norm === v.normalize('NFD').replace(/[̀-ͯ]/g, '')) return true;
  }
  return false;
}

/**
 * Assembles the E-BTA/R phrase from state fields.
 * Returns HTML string for display, or plain text for PDF.
 * @param {Object} fields - encuadre + protección + trade-off + acción + monitoreo
 * @param {boolean} asHtml - true for HTML, false for plain text
 */
export function assemblePhrase(fields, asHtml = true) {
  const {
    eventTypes = [], demarcation, uncertaintySource,
    dominantChannel, selectedBuffers = [], bufferDetails = {}, caseData,
    protects, sacrifices, residualRisk,
    action, owner, firstMilestone, deadline, rejectedAlt,
    i1, i2, threshold,
  } = fields;

  const E_val = eventTypes.length > 0
    ? eventTypes.map(t => T.eventTypes[t] || t).join(' + ')
    : null;

  const U_val = uncertaintySource ? (T.uncertaintySources[uncertaintySource] || uncertaintySource) : null;
  const C_val = dominantChannel ? (T.channels[dominantChannel] || dominantChannel) : null;

  // Build buffer description
  let B_val = null;
  if (selectedBuffers.length > 0 && caseData) {
    const parts = selectedBuffers.map(bid => {
      const bufDef = caseData.availableBuffers.find(b => b.id === bid);
      const det = bufferDetails[bid] || {};
      if (!bufDef) return null;
      const label = bufDef.label;
      const p = det.potencia ? (T.potencia[det.potencia] || det.potencia) : '?';
      const d = det.duracion ? (T.duracion[det.duracion] || det.duracion) : '?';
      const c = det.costo ? (T.costo[det.costo] || det.costo) : '?';
      const cu = T.costUnits[bufDef.costUnit] || bufDef.costUnit;
      return `${label} (potencia: ${p}, duración: ${d}, costo: ${c} en ${cu})`;
    }).filter(Boolean);
    B_val = parts.length > 0 ? parts.join(' y ') : null;
  }

  if (asHtml) {
    const zHtml = _has(residualRisk)
      ? ` (riesgo residual: ${slot(residualRisk, 'Z: riesgo residual')})` : '';
    const altHtml = _has(rejectedAlt)
      ? `, y descartamos ${slot(rejectedAlt, 'alternativa rechazada')}` : '';
    return `Dado el evento ${slot(E_val, 'E: tipo de evento')},
que abre la incertidumbre ${slot(U_val, 'U: fuente de incertidumbre')}
sobre el canal ${slot(C_val, 'C: canal dominante')},
protegemos ${slot(protects, 'X: qué se protege')}
mediante el buffer ${slot(B_val, 'B: buffer con p/d/c')},
sacrificamos parcialmente ${slot(sacrifices, 'Y: qué se sacrifica')}${zHtml},
y actuamos: ${slot(action, 'A: acción (verbo + objeto)')} —responsable ${slot(owner, 'responsable')}, primer hito ${slot(firstMilestone, 'primer hito')}, plazo ${slot(deadline, 'plazo')}${altHtml}—,
monitoreamos ${slot(i1, 'I1: indicador 1')} ${conjY(i2)} ${slot(i2, 'I2: indicador 2')},
y revisamos la decisión si se cruza el umbral: ${slot(threshold, 'T: umbral de revisión')}.`;
  } else {
    // Plain text for PDF
    const E = textSlot(E_val, 'tipo de evento');
    const U = textSlot(U_val, 'incertidumbre');
    const C = textSlot(C_val, 'canal');
    const X = textSlot(protects, 'qué se protege');
    const B = textSlot(B_val, 'buffer');
    const Y = textSlot(sacrifices, 'qué se sacrifica');
    const A = textSlot(action, 'acción');
    const OW = textSlot(owner, 'responsable');
    const FM = textSlot(firstMilestone, 'primer hito');
    const DL = textSlot(deadline, 'plazo');
    const I1 = textSlot(i1, 'I1');
    const I2 = textSlot(i2, 'I2');
    const Thr = textSlot(threshold, 'umbral');
    const zTxt = _has(residualRisk) ? ` (riesgo residual: ${String(residualRisk).trim()})` : '';
    const altTxt = _has(rejectedAlt) ? `, y descartamos ${String(rejectedAlt).trim()}` : '';
    return `Dado el evento ${E}, que abre la incertidumbre ${U} sobre el canal ${C}, protegemos ${X} mediante el buffer ${B}, sacrificamos parcialmente ${Y}${zTxt}, y actuamos: ${A} —responsable ${OW}, primer hito ${FM}, plazo ${DL}${altTxt}—, monitoreamos ${I1} ${conjY(i2)} ${I2}, y revisamos la decisión si se cruza el umbral: ${Thr}.`;
  }
}

/**
 * ¿Está completa la parte de ACCIÓN (Pantalla 6)? No exige I1/I2/umbral,
 * que ahora se capturan en la Pantalla 7 (contrato de monitoreo).
 */
export function isActionComplete(fields) {
  const { eventTypes = [], uncertaintySource, dominantChannel, selectedBuffers = [], bufferDetails = {},
    protects, sacrifices, action, owner, firstMilestone, deadline, rejectedAlt } = fields;
  if (!eventTypes.length) return false;
  if (!uncertaintySource) return false;
  if (!dominantChannel) return false;
  if (!selectedBuffers.length) return false;
  for (const bid of selectedBuffers) {
    const det = bufferDetails[bid] || {};
    if (!det.potencia || !det.duracion || !det.costo) return false;
  }
  if (!_has(protects) || !_has(sacrifices)) return false;
  if (!_has(action) || !_has(owner) || !_has(firstMilestone) || !_has(deadline) || !_has(rejectedAlt)) return false;
  return true;
}

/**
 * ¿Está completa la frase COMPLETA (incluye monitoreo I1/I2/umbral)?
 * Se usa como puerta de la Pantalla 7 y de la revisión (Pantalla 9).
 */
export function isPhraseComplete(fields) {
  if (!isActionComplete(fields)) return false;
  const { i1, i2, threshold } = fields;
  if (!_has(i1) || !_has(i2) || !_has(threshold)) return false;
  return true;
}

export function getPhraseFields(st, caseData, revised = false) {
  if (!revised) {
    return {
      eventTypes: st.s2_eventTypes,
      demarcation: st.s2_demarcation,
      uncertaintySource: st.s2_uncertaintySource,
      dominantChannel: st.s3_dominantChannel,
      selectedBuffers: st.s4_selectedBuffers,
      bufferDetails: st.s4_bufferDetails,
      caseData,
      protects: st.s5_protects,
      sacrifices: st.s5_sacrifices,
      residualRisk: st.s5_residualRisk,
      action: st.s6_action,
      owner: st.s6_owner,
      firstMilestone: st.s6_firstMilestone,
      deadline: st.s6_deadline,
      rejectedAlt: st.s6_rejectedAlt,
      i1: st.s6_i1,
      i2: st.s6_i2,
      threshold: st.s6_threshold,
    };
  } else {
    return {
      eventTypes: st.s9_revisedEventTypes.length > 0 ? st.s9_revisedEventTypes : st.s2_eventTypes,
      demarcation: st.s9_revisedDemarcation || st.s2_demarcation,
      uncertaintySource: st.s9_revisedUncertaintySource || st.s2_uncertaintySource,
      dominantChannel: st.s9_revisedDominantChannel || st.s3_dominantChannel,
      selectedBuffers: st.s9_revisedSelectedBuffers.length > 0 ? st.s9_revisedSelectedBuffers : st.s4_selectedBuffers,
      bufferDetails: Object.keys(st.s9_revisedBufferDetails).length > 0 ? st.s9_revisedBufferDetails : st.s4_bufferDetails,
      caseData,
      protects: st.s9_revisedProtects || st.s5_protects,
      sacrifices: st.s9_revisedSacrifices || st.s5_sacrifices,
      residualRisk: st.s9_revisedResidualRisk || st.s5_residualRisk,
      // La revisión de la acción llega en el Paquete B (P9); por ahora hereda P6.
      action: st.s9_revisedAction || st.s6_action,
      owner: st.s9_revisedOwner || st.s6_owner,
      firstMilestone: st.s9_revisedFirstMilestone || st.s6_firstMilestone,
      deadline: st.s9_revisedDeadline || st.s6_deadline,
      rejectedAlt: st.s9_revisedRejectedAlt || st.s6_rejectedAlt,
      i1: st.s9_revisedI1 || st.s6_i1,
      i2: st.s9_revisedI2 || st.s6_i2,
      threshold: st.s9_revisedThreshold || st.s6_threshold,
    };
  }
}
