/*
 * console.js — Consola del facilitador (Capa de Gobierno e Integridad).
 *
 * Ruta privada NO enlazada: ?vista=consola (o #consola). Antes de cargar
 * cualquier dato del facilitador exige una frase de acceso, cuyo sha256 se
 * compara contra CONSOLE_GATE_HASH incrustado en el build.
 *
 * HONESTIDAD (documentado a propósito): este gate es OFUSCACIÓN del lado del
 * cliente, no seguridad fuerte. El hash es visible en el bundle y cualquier
 * persona técnica puede leer los archivos del facilitador directamente. Frena
 * al alumno casual. La privacidad estricta (gate validado en servidor, archivo
 * servido tras autenticación real) es Fase 2 — backend. Ver PROMPT v1.7 §B/§F.
 *
 * Genere un hash propio (frase no trivial elegida por el profesor):
 *   node -e "console.log(require('crypto').createHash('sha256').update(process.argv[1]).digest('hex'))" "MI-FRASE-SECRETA"
 * y reemplace CONSOLE_GATE_HASH.
 */
import { state } from './state.js';
import { T } from './i18n.js';
import { loadCase, loadFacilitatorCase, mergeFacilitator, CASE_FILES } from './caseLoader.js';

// PLACEHOLDER: sha256 de la frase-marcador «cambiar-esta-frase-docente».
// Reemplázalo por el sha256 de TU frase (comando arriba). NO es una clave real.
export const CONSOLE_GATE_HASH = '5df67ad15a1fab70c3605e59c305e8b276a88e0ee7b976d932636c0da3b14049';

const UNLOCK_FLAG = 'entornolab_console_unlocked';

// Almacén en memoria de datos del facilitador (vive solo mientras la pestaña
// está abierta; nunca se persiste). Keyed por order.
const facilitatorStore = new Map();

export function isConsoleRoute() {
  const params = new URLSearchParams(window.location.search);
  return params.get('vista') === 'consola' || window.location.hash === '#consola';
}

export function isConsoleUnlocked() {
  try { return sessionStorage.getItem(UNLOCK_FLAG) === '1'; } catch (e) { return false; }
}

export function getFacilitatorData(order) {
  return facilitatorStore.get(order) || null;
}

async function sha256Hex(str) {
  const buf = new TextEncoder().encode(str);
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Guía de selección de inject por objetivo (resalta, no autoselecciona) ──
// Mapea cada atajo a un inject sugerido usando injectInteractions / metadatos.
function suggestInjectFor(objective, facData) {
  const ii = facData.facilitatorAnalysis?.injectInteractions || [];
  const byUndercut = (move) => ii.find(x => (x.undercuts || []).includes(move))?.inject;
  if (objective === 'cerrar-ablandara') {
    // cerrar la salida "se ablandará": el inject que socava esperar/gradualidad (M1).
    return byUndercut('M1') || (facData.injects.find(i => i.primaryUncertaintyAffected === 'ocurrencia')?.id);
  }
  if (objective === 'desplazar-legitimidad') {
    // desplazar hacia legitimidad: el inject de actor (competidor / política).
    return facData.injects.find(i => i.primaryUncertaintyAffected === 'actor')?.id;
  }
  if (objective === 'cambiar-signo-buffer') {
    // cambiar el signo de un buffer: el inject que socava una movida de relación (M5).
    return byUndercut('M5') || facData.injects[facData.injects.length - 1]?.id;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Vista completa de la consola (?vista=consola): gate → pre-vuelo / tablero.
// onStartRun(order, runConfig, facData, studentData) lo provee main.js.
// ─────────────────────────────────────────────────────────────────────────────
export async function renderConsole(app, { onStartRun }) {
  app.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'screen';
  wrap.style.maxWidth = '760px';
  wrap.style.margin = '0 auto';
  app.appendChild(wrap);

  // Banner privado (siempre visible en la consola).
  const banner = document.createElement('div');
  banner.className = 'console-private-banner';
  banner.style.cssText = 'background:#7a1f1f;color:#fff;padding:10px 14px;border-radius:8px;font-size:13px;font-weight:700;margin-bottom:16px;';
  banner.textContent = '🔒 ' + T.consolePrivateBanner;
  wrap.appendChild(banner);

  const title = document.createElement('h1');
  title.className = 'screen-title';
  title.textContent = T.console_title;
  wrap.appendChild(title);

  const body = document.createElement('div');
  wrap.appendChild(body);

  if (!isConsoleUnlocked()) {
    renderGate(body, () => renderAfterGate(body, { onStartRun }));
  } else {
    await renderAfterGate(body, { onStartRun });
  }
}

function renderGate(container, onUnlock) {
  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-header"><h2 class="card-title">${T.console_gatePrompt}</h2></div>
    <p style="font-size:13px;color:var(--color-muted);margin-bottom:12px;">${T.console_gateHint}</p>
    <div class="field-group">
      <input id="console-gate-input" type="password" class="field-input" autocomplete="off"
        placeholder="Frase de acceso" style="width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;">
    </div>
    <div id="console-gate-error" style="color:var(--color-error,#b00);font-size:13px;margin-bottom:10px;display:none;">${T.console_gateError}</div>
    <button id="console-gate-btn" class="btn btn-primary" type="button">${T.console_gateBtn}</button>
  `;
  container.appendChild(card);

  const input = card.querySelector('#console-gate-input');
  const errEl = card.querySelector('#console-gate-error');
  const btn = card.querySelector('#console-gate-btn');

  async function attempt() {
    const phrase = input.value || '';
    const hex = await sha256Hex(phrase);
    if (hex === CONSOLE_GATE_HASH) {
      try { sessionStorage.setItem(UNLOCK_FLAG, '1'); } catch (e) { /* noop */ }
      onUnlock();
    } else {
      errEl.style.display = 'block';
      input.value = '';
      input.focus();
    }
  }
  btn.addEventListener('click', attempt);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') attempt(); });
  input.focus();
}

async function renderAfterGate(container, { onStartRun }) {
  const st = state.get();
  // Si ya hay un run activo, muestra el tablero; si no, el pre-vuelo.
  if (st.runConfig && st.caseId) {
    // Asegura que tenemos los datos del facilitador del caso activo en el store.
    const order = st.runConfig.order;
    if (!facilitatorStore.has(order)) {
      try {
        const [studentData, facData] = await Promise.all([loadCase(CASE_FILES[order]), loadFacilitatorCase(order)]);
        facilitatorStore.set(order, mergeFacilitator(studentData, facData));
      } catch (e) { /* el tablero mostrará lo disponible */ }
    }
    renderBoard(container, facilitatorStore.get(order));
  } else {
    await renderPreflight(container, { onStartRun });
  }
}

async function renderPreflight(container, { onStartRun }) {
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.className = 'card-title';
  title.style.marginBottom = '12px';
  title.textContent = T.console_preflightTitle;
  container.appendChild(title);

  // runConfig en construcción.
  const cfg = { mode: 'ttx', order: 'A', injectId: null, revealPolicy: 'facilitator', phase: 'demo', sessionCode: '', alias: '' };

  const form = document.createElement('div');
  container.appendChild(form);

  // El detalle de injects se re-renderiza al cambiar de caso.
  const injectsHost = document.createElement('div');

  function pill(label, value, group, current, onPick) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.dataset.value = value;
    b.dataset.group = group;
    const active = current === value;
    b.style.cssText = 'padding:8px 14px;border-radius:999px;border:1px solid #bbb;cursor:pointer;font-size:13px;font-weight:700;margin:0 8px 8px 0;' +
      (active ? 'background:#1a2744;color:#fff;border-color:#1a2744;' : 'background:#fff;color:#1a2744;');
    b.addEventListener('click', () => onPick(value));
    return b;
  }

  function rowOf(labelText, buttons) {
    const row = document.createElement('div');
    row.style.cssText = 'margin-bottom:14px;';
    const lab = document.createElement('div');
    lab.style.cssText = 'font-size:13px;font-weight:700;color:var(--color-muted);margin-bottom:6px;';
    lab.textContent = labelText;
    row.appendChild(lab);
    const host = document.createElement('div');
    buttons.forEach(b => host.appendChild(b));
    row.appendChild(host);
    return row;
  }

  function rebuild() {
    form.innerHTML = '';

    // Caso
    form.appendChild(rowOf('Caso', ['A', 'B', 'C', '3'].map(o =>
      pill(o === '3' ? 'Caso 3 (eval.)' : `Caso ${o}`, o, 'order', cfg.order, async (v) => { cfg.order = v; cfg.injectId = null; await loadInjects(); rebuild(); }))));

    // Modalidad
    form.appendChild(rowOf('Modalidad', [
      pill('Tabletop (TTX)', 'ttx', 'mode', cfg.mode, (v) => { cfg.mode = v; rebuild(); }),
      pill('Wargame', 'wargame', 'mode', cfg.mode, (v) => { cfg.mode = v; rebuild(); }),
    ]));

    // Política de revelado
    form.appendChild(rowOf('Política de revelado del inject', [
      pill('Facilitador libera', 'facilitator', 'revealPolicy', cfg.revealPolicy, (v) => { cfg.revealPolicy = v; rebuild(); }),
      pill('Automático', 'auto', 'revealPolicy', cfg.revealPolicy, (v) => { cfg.revealPolicy = v; rebuild(); }),
    ]));

    // Fase
    form.appendChild(rowOf('Fase', [
      pill('Demo (sin evidencia)', 'demo', 'phase', cfg.phase, (v) => { cfg.phase = v; rebuild(); }),
      pill('Real', 'real', 'phase', cfg.phase, (v) => { cfg.phase = v; rebuild(); }),
    ]));

    // Código de sesión + alias
    const meta = document.createElement('div');
    meta.style.cssText = 'display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px;';
    meta.innerHTML = `
      <label style="flex:1;min-width:180px;font-size:13px;font-weight:700;color:var(--color-muted)">Código de sesión (opcional)
        <input id="cfg-session" type="text" value="${cfg.sessionCode}" style="display:block;width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;font-weight:400;"></label>
      <label style="flex:1;min-width:180px;font-size:13px;font-weight:700;color:var(--color-muted)">Alias del grupo/autor (opcional)
        <input id="cfg-alias" type="text" value="${cfg.alias}" style="display:block;width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;font-weight:400;"></label>
    `;
    meta.querySelector('#cfg-session').addEventListener('input', (e) => { cfg.sessionCode = e.target.value; });
    meta.querySelector('#cfg-alias').addEventListener('input', (e) => { cfg.alias = e.target.value; });
    form.appendChild(meta);

    // Guía de selección por objetivo
    const facData = facilitatorStore.get(cfg.order);
    if (facData) {
      const guide = document.createElement('div');
      guide.style.cssText = 'margin-bottom:10px;';
      const gl = document.createElement('div');
      gl.style.cssText = 'font-size:13px;font-weight:700;color:var(--color-muted);margin-bottom:6px;';
      gl.textContent = 'Guía de selección por objetivo (resalta el inject sugerido; no lo elige por ti)';
      guide.appendChild(gl);
      const objectives = [
        { key: 'cerrar-ablandara', label: 'Cerrar la salida “se ablandará”' },
        { key: 'desplazar-legitimidad', label: 'Desplazar hacia legitimidad' },
        { key: 'cambiar-signo-buffer', label: 'Cambiar el signo de un buffer' },
      ];
      objectives.forEach(obj => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = obj.label;
        b.style.cssText = 'padding:6px 12px;border-radius:6px;border:1px dashed #1a2744;background:#f3f6fb;color:#1a2744;cursor:pointer;font-size:12px;margin:0 8px 8px 0;';
        b.addEventListener('click', () => {
          const sugg = suggestInjectFor(obj.key, facData);
          cfg._highlight = sugg;
          rebuild();
        });
        guide.appendChild(b);
      });
      form.appendChild(guide);
    }

    // Injects con metadatos completos
    form.appendChild(injectsHost);

    // Iniciar run
    const startBtn = document.createElement('button');
    startBtn.className = 'btn btn-primary';
    startBtn.type = 'button';
    startBtn.style.marginTop = '8px';
    startBtn.textContent = T.console_startRun;
    startBtn.disabled = !cfg.injectId;
    startBtn.addEventListener('click', async () => {
      startBtn.disabled = true;
      const order = cfg.order;
      const studentData = await loadCase(CASE_FILES[order]);
      const facData2 = facilitatorStore.get(order);
      onStartRun(order, { ...cfg }, facData2, studentData);
    });
    form.appendChild(startBtn);
  }

  async function loadInjects() {
    if (!facilitatorStore.has(cfg.order)) {
      const [studentData, facData] = await Promise.all([loadCase(CASE_FILES[cfg.order]), loadFacilitatorCase(cfg.order)]);
      facilitatorStore.set(cfg.order, mergeFacilitator(studentData, facData));
    }
    renderInjectList();
  }

  function renderInjectList() {
    injectsHost.innerHTML = '';
    const facData = facilitatorStore.get(cfg.order);
    if (!facData) return;
    const lab = document.createElement('div');
    lab.style.cssText = 'font-size:13px;font-weight:700;color:var(--color-muted);margin-bottom:6px;';
    lab.textContent = 'Inject a revelar (con metadatos del facilitador)';
    injectsHost.appendChild(lab);

    const ii = facData.facilitatorAnalysis?.injectInteractions || [];
    facData.injects.forEach(inj => {
      const sel = cfg.injectId === inj.id;
      const high = cfg._highlight === inj.id;
      const card = document.createElement('div');
      card.style.cssText = 'border:2px solid ' + (sel ? '#1a2744' : high ? '#2D6EA3' : '#e0e0e0') +
        ';border-radius:8px;padding:12px;margin-bottom:10px;cursor:pointer;background:' + (sel ? '#f3f6fb' : '#fff') + ';';
      const inter = ii.find(x => x.inject === inj.id);
      card.innerHTML = `
        <div style="font-weight:700;color:#1a2744;margin-bottom:4px;">${inj.id}${high ? ' · <span style="color:#2D6EA3">sugerido</span>' : ''}${sel ? ' · ✓ elegido' : ''}</div>
        <div style="font-size:13px;margin-bottom:6px;">${inj.text}</div>
        <div style="font-size:12px;color:#555;"><strong>Incertidumbre afectada:</strong> ${inj.primaryUncertaintyAffected || '—'}</div>
        <div style="font-size:12px;color:#555;"><strong>Información latente:</strong> ${inj.latentInformation || '—'}</div>
        <div style="font-size:12px;color:#555;"><strong>Pregunta guía:</strong> ${inj.facilitatorPrompt || '—'}</div>
        ${inter ? `<div style="font-size:12px;color:#555;margin-top:4px;"><strong>Socava:</strong> [${(inter.undercuts||[]).join(', ')}] · <strong>Favorece:</strong> [${(inter.rewards||[]).join(', ')}]${inter.note ? ' — ' + inter.note : ''}</div>` : ''}
      `;
      card.addEventListener('click', () => { cfg.injectId = inj.id; rebuild(); });
      injectsHost.appendChild(card);
    });
  }

  await loadInjects();
  rebuild();
}

// ─────────────────────────────────────────────────────────────────────────────
// Tablero compacto (también embebible en el flujo con renderConsoleBoard).
// ─────────────────────────────────────────────────────────────────────────────
function renderBoard(container, facData) {
  container.innerHTML = '';
  container.appendChild(renderConsoleBoard(facData));
}

// Tablero del facilitador para un run activo. Reusado por las pantallas 8/9/10
// (en lugar del antiguo panel de profesor) cuando la consola está desbloqueada.
export function renderConsoleBoard(facData, nav) {
  const st = state.get();
  const panel = document.createElement('div');
  panel.className = 'professor-panel';

  const cfg = st.runConfig || {};
  const isDemo = cfg.phase === 'demo';

  panel.innerHTML = `<div class="professor-panel-title">🎛️ ${T.console_title}${isDemo ? ' · <span style="color:#ffd24a">' + 'DEMO' + '</span>' : ''}</div>`;

  // Resumen del runConfig
  const summary = document.createElement('div');
  summary.style.cssText = 'font-size:12px;opacity:.85;margin-bottom:10px;line-height:1.6;';
  summary.innerHTML = `Caso <strong>${cfg.order || '—'}</strong> · Modo <strong>${cfg.mode || 'ttx'}</strong> · Inject <strong>${st.selectedInjectId || cfg.injectId || '—'}</strong> · Revelado <strong>${cfg.revealPolicy || '—'}</strong> · Fase <strong>${cfg.phase || '—'}</strong>${cfg.sessionCode ? ' · Sesión <strong>' + cfg.sessionCode + '</strong>' : ''}${cfg.alias ? ' · Alias <strong>' + cfg.alias + '</strong>' : ''}` +
    `${st.runId ? '<br>runId: <code>' + st.runId + '</code>' : ''}`;
  panel.appendChild(summary);

  // Botón Liberar inject (solo si política = facilitator)
  if (cfg.revealPolicy === 'facilitator') {
    const releaseWrap = document.createElement('div');
    releaseWrap.style.cssText = 'margin-bottom:12px;';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.cssText = 'padding:10px 16px;border-radius:8px;border:none;cursor:pointer;font-weight:700;font-size:14px;' +
      (st.injectReleased ? 'background:#2e7d32;color:#fff;' : 'background:#2D6EA3;color:#fff;');
    btn.textContent = st.injectReleased ? T.console_injectReleased : T.console_releaseInject;
    btn.disabled = st.injectReleased;
    btn.addEventListener('click', () => {
      state.set({ injectReleased: true });
      if (nav && nav.navigate) nav.navigate(st.currentScreen);
      else btn.textContent = T.console_injectReleased;
    });
    releaseWrap.appendChild(btn);
    panel.appendChild(releaseWrap);
  }

  if (!facData) {
    const miss = document.createElement('p');
    miss.style.cssText = 'font-size:12px;opacity:.8;';
    miss.innerHTML = 'Datos del facilitador no cargados en esta pestaña. Abra <code>?vista=consola</code> y desbloquee el gate.';
    panel.appendChild(miss);
    return panel;
  }

  // facilitatorNotes completos
  if (facData.facilitatorNotes) {
    const notes = document.createElement('details');
    notes.open = false;
    notes.style.cssText = 'margin-bottom:10px;';
    notes.innerHTML = `<summary style="font-size:12px;font-weight:700;cursor:pointer;opacity:.9;">Notas del caso (completas)</summary>
      <p style="font-size:12px;opacity:.8;line-height:1.5;margin-top:6px;">${facData.facilitatorNotes}</p>`;
    panel.appendChild(notes);
  }

  // facilitatorAnalysis completo
  if (facData.facilitatorAnalysis) {
    const fa = facData.facilitatorAnalysis;
    const an = document.createElement('details');
    an.style.cssText = 'margin-bottom:10px;';
    an.innerHTML = `<summary style="font-size:12px;font-weight:700;cursor:pointer;opacity:.9;">Análisis del facilitador (completo)</summary>`;
    const add = (label, value) => {
      if (!value) return;
      const p = document.createElement('p');
      p.style.cssText = 'font-size:11px;opacity:.8;margin:6px 0;line-height:1.5;';
      p.innerHTML = `<strong>${label}:</strong> ${value}`;
      an.appendChild(p);
    };
    add('Sin opción dominante', fa.noDominantOption);
    add('Mapa de trade-offs', fa.tradeoffMap);
    add('Calibración', fa.calibration);
    (fa.injectInteractions || []).forEach(ii => {
      add(ii.inject, `socava [${(ii.undercuts||[]).join(', ')}], favorece [${(ii.rewards||[]).join(', ')}]${ii.note ? '. ' + ii.note : ''}`);
    });
    panel.appendChild(an);
  }

  // Réplicas de Wargame (P9c) — solo en modo wargame
  if (cfg.mode === 'wargame' && facData.wargameReplicas) {
    const wr = facData.wargameReplicas;
    const wgDiv = document.createElement('div');
    wgDiv.style.cssText = 'margin:10px 0;padding:10px;background:rgba(255,255,255,.08);border-radius:8px;';
    wgDiv.innerHTML = `<div style="font-size:12px;font-weight:700;margin-bottom:6px;">Wargame · P9c — Réplicas del actor</div>
      <div style="font-size:11px;opacity:.8;margin-bottom:8px;"><strong>Actor:</strong> ${wr.actor}</div>
      <div style="font-size:11px;opacity:.85;margin-bottom:8px;font-style:italic;">${T.wargameAdjudication}</div>`;
    wr.cards.forEach(card => {
      const c = document.createElement('details');
      c.style.cssText = 'margin-bottom:6px;';
      c.innerHTML = `<summary style="font-size:12px;font-weight:700;cursor:pointer;">${card.id} — ${card.trigger}</summary>
        <div style="font-size:12px;margin:6px 0;padding:8px;background:rgba(255,255,255,.12);border-radius:6px;"><strong>Réplica (se lee al grupo):</strong> ${card.text}</div>
        <div style="font-size:11px;opacity:.8;"><strong>Supuesto que cae:</strong> ${card.assumptionFalls}</div>
        <div style="font-size:11px;opacity:.8;"><strong>Anclaje:</strong> ${card.anchor}</div>`;
      wgDiv.appendChild(c);
    });
    panel.appendChild(wgDiv);
  }

  // Registro de frases finales (hot wash)
  const reg = document.createElement('div');
  reg.style.cssText = 'margin-top:10px;';
  reg.innerHTML = `<div style="font-size:12px;font-weight:700;margin-bottom:4px;">${T.console_phraseRegistry}</div>
    <div style="font-size:11px;opacity:.75;margin-bottom:6px;">${T.console_phraseRegistryHint}</div>`;
  const ta = document.createElement('textarea');
  ta.style.cssText = 'width:100%;min-height:80px;padding:8px;border-radius:6px;border:1px solid rgba(255,255,255,.3);background:rgba(255,255,255,.06);color:#fff;font-size:12px;';
  ta.value = st.phraseRegistry || '';
  ta.addEventListener('input', () => state.set({ phraseRegistry: ta.value }));
  reg.appendChild(ta);
  panel.appendChild(reg);

  return panel;
}
