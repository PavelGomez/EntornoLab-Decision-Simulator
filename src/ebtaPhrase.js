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

/**
 * Assembles the E-BTA/R phrase from state fields.
 * Returns HTML string for display, or plain text for PDF.
 * @param {Object} fields - { eventTypes[], demarcation, uncertaintySource, dominantChannel, selectedBuffers[], bufferDetails{}, caseData, protects, sacrifices, i1, i2, threshold }
 * @param {boolean} asHtml - true for HTML, false for plain text
 */
export function assemblePhrase(fields, asHtml = true) {
  const {
    eventTypes = [], demarcation, uncertaintySource,
    dominantChannel, selectedBuffers = [], bufferDetails = {}, caseData,
    protects, sacrifices, i1, i2, threshold
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
    return `Dado el evento ${slot(E_val, 'E: tipo de evento')},
que abre la incertidumbre ${slot(U_val, 'U: fuente de incertidumbre')}
sobre el canal ${slot(C_val, 'C: canal dominante')},
protegemos ${slot(protects, 'X: qué se protege')}
mediante el buffer ${slot(B_val, 'B: buffer con p/d/c')},
sacrificamos parcialmente ${slot(sacrifices, 'Y: qué se sacrifica')},
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
    const I1 = textSlot(i1, 'I1');
    const I2 = textSlot(i2, 'I2');
    const Thr = textSlot(threshold, 'umbral');
    return `Dado el evento ${E}, que abre la incertidumbre ${U} sobre el canal ${C}, protegemos ${X} mediante el buffer ${B}, sacrificamos parcialmente ${Y}, monitoreamos ${I1} ${conjY(i2)} ${I2}, y revisamos la decisión si se cruza el umbral: ${Thr}.`;
  }
}

/**
 * Checks if all slots in the phrase are filled.
 */
export function isPhraseComplete(fields) {
  const { eventTypes = [], uncertaintySource, dominantChannel, selectedBuffers = [], bufferDetails = {}, caseData, protects, sacrifices, i1, i2, threshold } = fields;

  if (!eventTypes.length) return false;
  if (!uncertaintySource) return false;
  if (!dominantChannel) return false;
  if (!selectedBuffers.length) return false;

  // Check all selected buffers have all axes filled
  for (const bid of selectedBuffers) {
    const det = bufferDetails[bid] || {};
    if (!det.potencia || !det.duracion || !det.costo) return false;
  }

  if (!protects || !protects.trim()) return false;
  if (!sacrifices || !sacrifices.trim()) return false;
  if (!i1 || !i1.trim()) return false;
  if (!i2 || !i2.trim()) return false;
  if (!threshold || !threshold.trim()) return false;

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
      i1: st.s9_revisedI1 || st.s6_i1,
      i2: st.s9_revisedI2 || st.s6_i2,
      threshold: st.s9_revisedThreshold || st.s6_threshold,
    };
  }
}
