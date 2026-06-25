import { T } from './i18n.js';
import { SIM_VERSION, canonicalStringify, getIntegrityPayload } from './state.js';
import { assemblePhrase, getPhraseFields } from './ebtaPhrase.js';
import { pickReply } from './screens/09-wargame.js';

// Duración legible entre dos ISO timestamps (para la línea de tiempo del PDF).
function fmtDuration(aIso, bIso) {
  if (!aIso || !bIso) return '—';
  const ms = new Date(bIso).getTime() - new Date(aIso).getTime();
  if (!isFinite(ms) || ms < 0) return '—';
  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return m > 0 ? `${m} min ${s} s` : `${s} s`;
}

export function generatePdf(caseData, st) {
  try {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) throw new Error('jsPDF not loaded');

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const margin = 20;
    const pageW = 210;
    const contentW = pageW - margin * 2;
    let y = margin;

    const lineH = 7;
    const sectionGap = 5;

    function checkPage(needed = 20) {
      if (y + needed > 280) {
        doc.addPage();
        y = margin;
      }
    }

    function addTitle(text, size = 16) {
      checkPage(12);
      doc.setFontSize(size);
      doc.setFont('helvetica', 'bold');
      const lines = doc.splitTextToSize(text, contentW);
      doc.text(lines, margin, y);
      y += lines.length * (size * 0.35) + 4;
    }

    function addSection(text) {
      checkPage(10);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 100, 100);
      doc.text(text.toUpperCase(), margin, y);
      y += lineH;
      doc.setTextColor(0, 0, 0);
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y - 2, pageW - margin, y - 2);
      y += 2;
    }

    function addLabel(text) {
      checkPage(6);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 100, 100);
      doc.text(text, margin, y);
      y += lineH - 1;
      doc.setTextColor(0, 0, 0);
    }

    function addText(text, size = 10) {
      checkPage(10);
      doc.setFontSize(size);
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(String(text || '—'), contentW);
      doc.text(lines, margin, y);
      y += lines.length * (size * 0.35 + 1) + sectionGap;
    }

    function addPhrase(text) {
      checkPage(20);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bolditalic');
      // Strip HTML tags
      const plain = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const lines = doc.splitTextToSize(plain, contentW - 4);
      // Draw left border
      doc.setDrawColor(26, 39, 68);
      doc.setLineWidth(1);
      doc.line(margin, y - 2, margin, y + lines.length * 5 + 2);
      doc.setLineWidth(0.2);
      doc.text(lines, margin + 4, y);
      y += lines.length * 5 + sectionGap + 2;
    }

    // jsPDF 2.x Helvetica uses WinAnsiEncoding (Latin-1 superset):
    // supports á é í ó ú ü ñ ¿ ¡ Á É Í Ó Ú Ü Ñ natively.
    // Curly quotes and em-dash are outside Latin-1 → normalize them.
    function sanitize(str) {
      return String(str || '')
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"')
        .replace(/[\u2013\u2014]/g, '-');
    }

    // Header
    addTitle('EntornoLab \u2014 Registro de Decisi\u00f3n');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(sanitize(`Caso: ${caseData.title}`), margin, y);
    y += lineH;
    doc.text(`Fecha: ${new Date().toLocaleString('es-VE')}`, margin, y);
    y += lineH;
    doc.text(`Caso ID: ${caseData.caseId}`, margin, y);
    y += lineH + sectionGap;
    doc.setTextColor(0);

    // \u2500\u2500 Banda de metadatos (huellas autodescriptivas del recorrido) \u2500\u2500
    const cfg = st.runConfig || {};
    const isDemo = cfg.phase === 'demo';
    const injectId = st.selectedInjectId || cfg.injectId || (caseData.injects[0] && caseData.injects[0].id) || '\u2014';
    if (isDemo) {
      // Marca DEMO destacada.
      doc.setFillColor(255, 244, 200);
      doc.rect(margin, y - 4, contentW, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(150, 90, 0);
      doc.text(sanitize(T.demoMark), margin + 2, y + 1.5);
      y += 10;
      doc.setTextColor(0);
    }
    addSection('Metadatos del recorrido');
    const metaPairs = [
      ['Caso', cfg.order || caseData.order || '\u2014'],
      ['Modalidad', (st.modality || cfg.mode || 'ttx') === 'wargame' ? 'Wargame' : 'Tabletop (TTX)'],
      ['Inject', injectId],
      ['Versi\u00f3n del simulador', SIM_VERSION],
      ['C\u00f3digo de sesi\u00f3n', cfg.sessionCode || '\u2014'],
      ['Alias', cfg.alias || '\u2014'],
      ['runId', st.runId || (isDemo ? 'DEMO' : '\u2014')],
      ['Fase', cfg.phase || 'demo'],
    ];
    metaPairs.forEach(([k, v]) => { addLabel(`${k}:`); addText(sanitize(String(v))); });

    // \u2500\u2500 L\u00ednea de tiempo (hitos del recorrido, no teclas) \u2500\u2500
    addSection('L\u00ednea de tiempo');
    addLabel('Total (inicio \u2192 export):'); addText(fmtDuration(st.startedAt, st.exportedAt));
    addLabel('Inicio \u2192 revelado del inject:'); addText(fmtDuration(st.startedAt, st.injectSeenAt));
    addLabel('Revelado \u2192 export:'); addText(fmtDuration(st.injectSeenAt, st.exportedAt));

    // \u2500\u2500 Decisi\u00f3n inicial (sellada) \u2500\u2500
    if (st.preInjectSnapshot) {
      const snap = st.preInjectSnapshot;
      addSection('Decisi\u00f3n inicial (sellada)');
      addLabel('Tipo(s) de evento:');
      addText(sanitize((snap.s2_eventTypes || []).map(t => T.eventTypes[t] || t).join(', ') || '\u2014'));
      addLabel('Canal dominante:');
      addText(sanitize(T.channels[snap.s3_dominantChannel] || snap.s3_dominantChannel || '\u2014'));
      addLabel('\u00bfQu\u00e9 se protege?'); addText(sanitize(snap.s5_protects));
      addLabel('\u00bfQu\u00e9 se sacrifica?'); addText(sanitize(snap.s5_sacrifices));
      addLabel('Frase E-BTA/R inicial (sellada):');
      const sealedPhrase = assemblePhrase(getPhraseFields(snap, caseData, false), false);
      addPhrase(sanitize(sealedPhrase));
    }

    // S2 - Classification
    addSection('Clasificaci\u00f3n del Evento');
    addLabel('Tipo(s) de evento:');
    addText(sanitize(st.s2_eventTypes.map(t => T.eventTypes[t] || t).join(', ') || '\u2014'));
    addLabel('Criterio de demarcaci\u00f3n:');
    addText(sanitize(st.s2_demarcation));
    addLabel('Fuente principal de incertidumbre:');
    addText(sanitize(T.uncertaintySources[st.s2_uncertaintySource] || st.s2_uncertaintySource || '\u2014'));

    // S3 - Impact
    addSection('Mapa de Impacto');
    addLabel('Canal dominante:');
    addText(sanitize(T.channels[st.s3_dominantChannel] || st.s3_dominantChannel || '\u2014'));
    if (st.s3_secondaryChannel) {
      addLabel('Canal secundario:');
      addText(sanitize(T.channels[st.s3_secondaryChannel] || st.s3_secondaryChannel));
    }
    addLabel('Impacto 1.\u00aa ronda:');
    addText(sanitize(st.s3_impact1));
    addLabel('Impacto 2.\u00aa ronda:');
    addText(sanitize(st.s3_impact2));
    if (st.s3_rivalInterpretations) {
      addLabel('Interpretaciones rivales (reducir equivocidad):');
      addText(sanitize(st.s3_rivalInterpretations));
    }
    if (st.s3_discriminatingEvidence) {
      addLabel('Evidencia discriminante:');
      addText(sanitize(st.s3_discriminatingEvidence));
    }

    // S4 - Buffers
    addSection('Buffer Board');
    if (st.s4_selectedBuffers.length === 0) {
      addText('\u2014');
    } else {
      st.s4_selectedBuffers.forEach(bid => {
        const bufDef = caseData.availableBuffers.find(b => b.id === bid);
        const det = st.s4_bufferDetails[bid] || {};
        if (!bufDef) return;
        addLabel(sanitize(`Buffer: ${bufDef.label}`));
        addText(sanitize(`Potencia: ${T.potencia[det.potencia] || '?'} | Duraci\u00f3n: ${T.duracion[det.duracion] || '?'} | Costo: ${T.costo[det.costo] || '?'} (${T.costUnits[bufDef.costUnit] || bufDef.costUnit})`));
        if (det.mechanism) addText(sanitize(`Mecanismo (\u00bfc\u00f3mo protege?): ${T.bufferMechanisms[det.mechanism] || det.mechanism}`));
        if (det.opportunityCost) addText(sanitize(`Costo de oportunidad: ${det.opportunityCost}`));
      });
    }

    // S5 - Trade-off
    addSection('Trade-off Statement');
    addLabel('\u00bfQu\u00e9 se protege?');
    addText(sanitize(st.s5_protects));
    addLabel('\u00bfQu\u00e9 se sacrifica?');
    addText(sanitize(st.s5_sacrifices));
    addLabel('Riesgo residual:');
    addText(sanitize(st.s5_residualRisk));

    // S6/7 - Indicators
    addSection('Indicadores de Revisi\u00f3n');
    addLabel('I1:'); addText(sanitize(st.s6_i1));
    addLabel('I2:'); addText(sanitize(st.s6_i2));
    addLabel('Umbral T:'); addText(sanitize(st.s6_threshold));
    if (st.s6_realOption) {
      addLabel('Tipo de jugada (opci\u00f3n real):');
      addText(sanitize(T.realOptions[st.s6_realOption] || st.s6_realOption));
      if (st.s6_realOptionTrigger) { addLabel('Gatillo de ejercicio:'); addText(sanitize(st.s6_realOptionTrigger)); }
    }

    // Phrase initial
    addSection('Frase E-BTA/R Inicial');
    const phraseFields = getPhraseFields(st, caseData, false);
    const phraseText = assemblePhrase(phraseFields, false);
    addPhrase(sanitize(phraseText));

    // Inject
    addSection('Inject Revelado');
    const inject = caseData.injects.find(i => i.id === st.selectedInjectId) || caseData.injects[0];
    addText(sanitize(inject.text));

    // S9 - Revised
    addSection('Revisi\u00f3n Forzada');
    addLabel('Supuesto que mantengo:'); addText(sanitize(st.s9_maintains));
    addLabel('Supuesto que abandono:'); addText(sanitize(st.s9_abandons));
    addLabel('Supuesto que invierto:'); addText(sanitize(st.s9_inverts));
    const loopLabelPdf = st.s9_loopType === 'doble' ? 'Doble bucle' : st.s9_loopType === 'simple' ? 'Bucle simple' : '—';
    addLabel('Tipo de revisión:'); addText(sanitize(loopLabelPdf));
    if (st.s9_loopWhy) { addLabel('¿Por qué? (bucle):'); addText(sanitize(st.s9_loopWhy)); }

    addSection('Frase E-BTA/R Revisada');
    const revisedFields = getPhraseFields(st, caseData, true);
    const revisedText = assemblePhrase(revisedFields, false);
    addPhrase(sanitize(revisedText));

    // Ronda de réplica (wargame)
    if (st.modality === 'wargame' && st.wg_replyId) {
      const reply = pickReply(caseData, st);
      addSection('Ronda de réplica (wargame)');
      addLabel('Anticipación de la réplica:'); addText(sanitize(st.wg_anticipate));
      addLabel('Réplica del actor (revelada):'); addText(sanitize(reply.text));
      addLabel('Segunda revisión — mantengo:'); addText(sanitize(st.wg_maintains));
      addLabel('Segunda revisión — abandono:'); addText(sanitize(st.wg_abandons));
      addLabel('Segunda revisión — invierto:'); addText(sanitize(st.wg_inverts));
      const wgLoop = st.wg_loopType === 'doble' ? 'Doble bucle' : st.wg_loopType === 'simple' ? 'Bucle simple' : '—';
      addLabel('Tipo de revisión:'); addText(sanitize(wgLoop));
      if (st.wg_loopWhy) { addLabel('¿Por qué? (bucle):'); addText(sanitize(st.wg_loopWhy)); }
    }

    // \u2500\u2500 Sello de integridad (al final del contenido) \u2500\u2500
    checkPage(40);
    addSection('Integridad del recorrido');
    // verifyCode en grande, para cotejo a simple vista PDF \u2194 JSON \u2194 registro.
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(26, 39, 68);
    doc.text(`verifyCode: ${st.verifyCode || '\u2014'}`, margin, y + 4);
    y += 12;
    doc.setTextColor(0);
    addLabel('runId:'); addText(sanitize(st.runId || (cfg.phase === 'demo' ? 'DEMO' : '\u2014')));
    addLabel('integrityHash (SHA-256):');
    addText(st.integrityHash || '\u2014', 8);
    addText(sanitize(T.integrityLegend), 9);

    // Footer on all pages
    doc.setFontSize(8);
    doc.setTextColor(150);
    const pageCount = doc.getNumberOfPages();
    const footRun = st.verifyCode ? ` | verifyCode ${st.verifyCode}` : '';
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`EntornoLab ${SIM_VERSION} | IESA PAG Global Online${footRun} | P\u00e1gina ${i} de ${pageCount}`, margin, 290);
    }

    const runTag = st.runId && st.runId !== 'DEMO' ? st.runId : `DEMO-${Date.now()}`;
    doc.save(`recorrido-${runTag}.pdf`);
    return true;
  } catch (e) {
    console.error('PDF generation failed:', e);
    return false;
  }
}

// Export JSON (máquina) — segunda pata de la trazabilidad. Recomputar el hash
// del payload canónico incrustado debe reproducir el verifyCode impreso en el
// PDF; editar cualquier campo del recorrido rompe el cotejo (huella de manipulación).
export function generateJson(caseData, st) {
  try {
    const cfg = st.runConfig || {};
    const payload = getIntegrityPayload();
    const out = {
      simVersion: SIM_VERSION,
      caseId: caseData.caseId,
      caseTitle: caseData.title,
      runId: st.runId || (cfg.phase === 'demo' ? 'DEMO' : null),
      phase: cfg.phase || 'demo',
      runConfig: st.runConfig,
      injectId: st.selectedInjectId || cfg.injectId || null,
      times: {
        startedAt: st.startedAt,
        injectSeenAt: st.injectSeenAt,
        exportedAt: st.exportedAt,
        screenDurations: st.screenDurations || {},
      },
      preInjectSnapshot: st.preInjectSnapshot,
      responses: {
        s2_eventTypes: st.s2_eventTypes, s2_demarcation: st.s2_demarcation, s2_uncertaintySource: st.s2_uncertaintySource,
        s3_dominantChannel: st.s3_dominantChannel, s3_secondaryChannel: st.s3_secondaryChannel,
        s3_impact1: st.s3_impact1, s3_impact2: st.s3_impact2,
        s3_rivalInterpretations: st.s3_rivalInterpretations, s3_discriminatingEvidence: st.s3_discriminatingEvidence,
        s4_selectedBuffers: st.s4_selectedBuffers, s4_bufferDetails: st.s4_bufferDetails,
        s5_protects: st.s5_protects, s5_sacrifices: st.s5_sacrifices, s5_residualRisk: st.s5_residualRisk,
        s6_i1: st.s6_i1, s6_i2: st.s6_i2, s6_threshold: st.s6_threshold,
        s6_realOption: st.s6_realOption, s6_realOptionTrigger: st.s6_realOptionTrigger,
        s9_maintains: st.s9_maintains, s9_abandons: st.s9_abandons, s9_inverts: st.s9_inverts,
        s9_loopType: st.s9_loopType, s9_loopWhy: st.s9_loopWhy,
        wargame: st.modality === 'wargame' ? {
          wg_anticipate: st.wg_anticipate, wg_replyId: st.wg_replyId,
          wg_maintains: st.wg_maintains, wg_abandons: st.wg_abandons, wg_inverts: st.wg_inverts,
          wg_loopType: st.wg_loopType, wg_loopWhy: st.wg_loopWhy,
        } : null,
      },
      integrity: {
        integrityHash: st.integrityHash,
        verifyCode: st.verifyCode,
        algorithm: 'SHA-256 sobre canonicalStringify(canonicalPayload); verifyCode = hash.slice(0,8).toUpperCase()',
        legend: T.integrityLegend,
        canonicalPayload: payload,
        canonicalString: canonicalStringify(payload),
      },
    };
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const runTag = st.runId && st.runId !== 'DEMO' ? st.runId : `DEMO-${Date.now()}`;
    a.href = url;
    a.download = `recorrido-${runTag}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch (e) {
    console.error('JSON export failed:', e);
    return false;
  }
}

export function openPrintView(caseData, st) {
  const inject = caseData.injects.find(i => i.id === st.selectedInjectId) || caseData.injects[0];

  const phraseFields = getPhraseFields(st, caseData, false);
  const phraseHtml = assemblePhrase(phraseFields, true);
  const revisedFields = getPhraseFields(st, caseData, true);
  const revisedHtml = assemblePhrase(revisedFields, true);

  function escHtml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  const cfg = st.runConfig || {};
  const isDemo = cfg.phase === 'demo';
  const injectId = st.selectedInjectId || cfg.injectId || (caseData.injects[0] && caseData.injects[0].id) || '—';
  const metaBandHtml = `
${isDemo ? `<div style="background:#fff4c8;border:1px solid #e0b000;color:#8a5a00;padding:8px 12px;border-radius:6px;font-weight:bold;margin-bottom:12px;">${escHtml(T.demoMark)}</div>` : ''}
<h2>Metadatos del recorrido</h2>
<div class="value">Caso: <strong>${escHtml(cfg.order || caseData.order || '—')}</strong> · Modalidad: <strong>${(st.modality || cfg.mode || 'ttx') === 'wargame' ? 'Wargame' : 'Tabletop (TTX)'}</strong> · Inject: <strong>${escHtml(injectId)}</strong> · Versión: <strong>${SIM_VERSION}</strong></div>
<div class="value">Código de sesión: <strong>${escHtml(cfg.sessionCode || '—')}</strong> · Alias: <strong>${escHtml(cfg.alias || '—')}</strong> · runId: <strong>${escHtml(st.runId || (isDemo ? 'DEMO' : '—'))}</strong> · Fase: <strong>${escHtml(cfg.phase || 'demo')}</strong></div>
<h2>Línea de tiempo</h2>
<div class="value">Total: ${fmtDuration(st.startedAt, st.exportedAt)} · Inicio→inject: ${fmtDuration(st.startedAt, st.injectSeenAt)} · Inject→export: ${fmtDuration(st.injectSeenAt, st.exportedAt)}</div>`;

  const snap = st.preInjectSnapshot;
  const sealedHtml = snap ? `
<h2>Decisión inicial (sellada)</h2>
<div class="label">Tipo(s) de evento</div><div class="value">${(snap.s2_eventTypes || []).map(t => T.eventTypes[t] || t).join(', ') || '—'}</div>
<div class="label">Canal dominante</div><div class="value">${T.channels[snap.s3_dominantChannel] || snap.s3_dominantChannel || '—'}</div>
<div class="label">Qué se protege</div><div class="value">${escHtml(snap.s5_protects) || '—'}</div>
<div class="label">Qué se sacrifica</div><div class="value">${escHtml(snap.s5_sacrifices) || '—'}</div>
<div class="label">Frase E-BTA/R inicial (sellada)</div>
<div class="phrase">${assemblePhrase(getPhraseFields(snap, caseData, false), true)}</div>` : '';

  const integrityHtml = `
<h2>Integridad del recorrido</h2>
<div style="font-size:20pt;font-weight:bold;color:#1a2744;margin:8px 0;">verifyCode: ${escHtml(st.verifyCode || '—')}</div>
<div class="label">runId</div><div class="value">${escHtml(st.runId || (isDemo ? 'DEMO' : '—'))}</div>
<div class="label">integrityHash (SHA-256)</div><div class="value" style="word-break:break-all;font-family:monospace;font-size:9pt;">${escHtml(st.integrityHash || '—')}</div>
<div class="value" style="font-style:italic;">${escHtml(T.integrityLegend)}</div>`;

  const buffersHtml = st.s4_selectedBuffers.map(bid => {
    const b = caseData.availableBuffers.find(x => x.id === bid);
    const d = st.s4_bufferDetails[bid] || {};
    if (!b) return '';
    const mechHtml = d.mechanism ? `<div class="value">Mecanismo (¿cómo protege?): ${T.bufferMechanisms[d.mechanism] || d.mechanism}</div>` : '';
    const oppHtml = d.opportunityCost ? `<div class="value">Costo de oportunidad: ${escHtml(d.opportunityCost)}</div>` : '';
    return `<div class="label">${escHtml(b.label)}</div>
    <div class="value">Potencia: ${T.potencia[d.potencia] || '?'} | Duración: ${T.duracion[d.duracion] || '?'} | Costo: ${T.costo[d.costo] || '?'} (${T.costUnits[b.costUnit] || b.costUnit})</div>
    ${mechHtml}${oppHtml}`;
  }).join('');

  const secondaryChannelHtml = st.s3_secondaryChannel
    ? `<div class="label">Canal secundario</div><div class="value">${T.channels[st.s3_secondaryChannel] || st.s3_secondaryChannel}</div>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>EntornoLab — ${escHtml(caseData.title)}</title>
<style>
  body { font-family: Georgia, serif; font-size: 12pt; line-height: 1.6; max-width: 700px; margin: 0 auto; padding: 20px; color: #111; }
  h1 { font-size: 16pt; border-bottom: 2px solid #333; padding-bottom: 8px; }
  h2 { font-size: 12pt; text-transform: uppercase; letter-spacing: .05em; color: #555; margin-top: 24px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
  .label { font-weight: bold; font-size: 10pt; color: #555; margin-top: 12px; }
  .value { margin-bottom: 8px; }
  .phrase { font-style: italic; border-left: 3px solid #333; padding-left: 12px; margin: 12px 0; line-height: 1.8; }
  .inject-box { border: 2px solid #7b2d8b; padding: 12px; border-radius: 6px; background: #f9f0fb; }
  .meta { color: #777; font-size: 10pt; margin-bottom: 20px; }
  .phrase strong { font-weight: 700; }
  @media print { @page { margin: 20mm; } }
</style>
</head>
<body>
<h1>EntornoLab — Registro de Decisión</h1>
<div class="meta">
  Caso: ${escHtml(caseData.title)}<br>
  ID: ${caseData.caseId} | Fecha: ${new Date().toLocaleString('es-VE')}
</div>
${metaBandHtml}
${sealedHtml}

<h2>Clasificación del Evento</h2>
<div class="label">Tipo(s) de evento</div>
<div class="value">${st.s2_eventTypes.map(t => T.eventTypes[t] || t).join(', ') || '—'}</div>
<div class="label">Criterio de demarcación</div>
<div class="value">${escHtml(st.s2_demarcation) || '—'}</div>
<div class="label">Fuente principal de incertidumbre</div>
<div class="value">${T.uncertaintySources[st.s2_uncertaintySource] || st.s2_uncertaintySource || '—'}</div>

<h2>Mapa de Impacto</h2>
<div class="label">Canal dominante</div>
<div class="value">${T.channels[st.s3_dominantChannel] || st.s3_dominantChannel || '—'}</div>
${secondaryChannelHtml}
<div class="label">Impacto 1.ª ronda</div>
<div class="value">${escHtml(st.s3_impact1) || '—'}</div>
<div class="label">Impacto 2.ª ronda</div>
<div class="value">${escHtml(st.s3_impact2) || '—'}</div>
${st.s3_rivalInterpretations ? `<div class="label">Interpretaciones rivales (reducir equivocidad)</div><div class="value">${escHtml(st.s3_rivalInterpretations)}</div>` : ''}
${st.s3_discriminatingEvidence ? `<div class="label">Evidencia discriminante</div><div class="value">${escHtml(st.s3_discriminatingEvidence)}</div>` : ''}

<h2>Buffer Board</h2>
${buffersHtml || '<div class="value">—</div>'}

<h2>Trade-off Statement</h2>
<div class="label">Qué se protege</div><div class="value">${escHtml(st.s5_protects) || '—'}</div>
<div class="label">Qué se sacrifica</div><div class="value">${escHtml(st.s5_sacrifices) || '—'}</div>
<div class="label">Riesgo residual</div><div class="value">${escHtml(st.s5_residualRisk) || '—'}</div>

<h2>Indicadores</h2>
<div class="label">I1</div><div class="value">${escHtml(st.s6_i1) || '—'}</div>
<div class="label">I2</div><div class="value">${escHtml(st.s6_i2) || '—'}</div>
<div class="label">Umbral T</div><div class="value">${escHtml(st.s6_threshold) || '—'}</div>
${st.s6_realOption ? `<div class="label">Tipo de jugada (opción real)</div><div class="value">${T.realOptions[st.s6_realOption] || st.s6_realOption}</div>` : ''}
${st.s6_realOption && st.s6_realOptionTrigger ? `<div class="label">Gatillo de ejercicio</div><div class="value">${escHtml(st.s6_realOptionTrigger)}</div>` : ''}

<h2>Frase E-BTA/R Inicial</h2>
<div class="phrase">${phraseHtml}</div>

<h2>Inject Revelado</h2>
<div class="inject-box">${escHtml(inject.text)}</div>

<h2>Revisión Forzada — Supuestos</h2>
<div class="label">Supuesto que mantengo</div><div class="value">${escHtml(st.s9_maintains) || '—'}</div>
<div class="label">Supuesto que abandono</div><div class="value">${escHtml(st.s9_abandons) || '—'}</div>
<div class="label">Supuesto que invierto</div><div class="value">${escHtml(st.s9_inverts) || '—'}</div>
<div class="label">Tipo de revisión</div><div class="value">${st.s9_loopType === 'doble' ? 'Doble bucle' : st.s9_loopType === 'simple' ? 'Bucle simple' : '—'}</div>
<div class="label">¿Por qué? (bucle)</div><div class="value">${escHtml(st.s9_loopWhy) || '—'}</div>

<h2>Frase E-BTA/R Revisada</h2>
<div class="phrase">${revisedHtml}</div>
${(st.modality === 'wargame' && st.wg_replyId) ? `
<h2>Ronda de réplica (wargame)</h2>
<div class="label">Anticipación de la réplica</div><div class="value">${escHtml(st.wg_anticipate) || '—'}</div>
<div class="label">Réplica del actor (revelada)</div><div class="value">${escHtml(pickReply(caseData, st).text) || '—'}</div>
<div class="label">Segunda revisión — mantengo</div><div class="value">${escHtml(st.wg_maintains) || '—'}</div>
<div class="label">Segunda revisión — abandono</div><div class="value">${escHtml(st.wg_abandons) || '—'}</div>
<div class="label">Segunda revisión — invierto</div><div class="value">${escHtml(st.wg_inverts) || '—'}</div>
<div class="label">Tipo de revisión</div><div class="value">${st.wg_loopType === 'doble' ? 'Doble bucle' : st.wg_loopType === 'simple' ? 'Bucle simple' : '—'}</div>
<div class="label">¿Por qué? (bucle)</div><div class="value">${escHtml(st.wg_loopWhy) || '—'}</div>` : ''}

${integrityHtml}
<p style="margin-top:40px;font-size:9pt;color:#999">EntornoLab ${SIM_VERSION} | IESA PAG Global Online | ${new Date().toLocaleString('es-VE')}${st.verifyCode ? ' | verifyCode ' + escHtml(st.verifyCode) : ''}</p>
</body>
</html>`;

  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 500);
  } else {
    alert('No se pudo abrir la ventana de impresión. Por favor, desbloquee las ventanas emergentes para este sitio.');
  }
}
