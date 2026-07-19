import { state } from './state.js';
import { T } from './i18n.js';
import { isConsoleUnlocked, renderConsoleBoard, getFacilitatorData } from './console.js';

export function isProfessorMode() {
  return new URLSearchParams(window.location.search).get('modo') === 'profesor' ||
    window.location.hash === '#profesor';
}

/**
 * Superficie del facilitador embebida en el flujo.
 *
 * Tras el split de datos (Capa de Gobierno e Integridad), el `caseData` del
 * flujo del alumno YA NO contiene notas, análisis ni injects completos. Por eso:
 *  - Si la consola está desbloqueada (gate superado) y hay un run activo,
 *    delega en el TABLERO de la consola, que sí tiene los datos del facilitador
 *    cargados en memoria (incluye "Liberar inject", réplicas Wargame, registro).
 *  - Si solo se entró por `?modo=profesor` (vía pública, sin gate), NO hay datos
 *    del facilitador que mostrar: se ofrece un panel mínimo (modalidad + id de
 *    inject) y se remite a `?vista=consola`. Esto deprecada la vía pública como
 *    forma de revelar datos del facilitador sin pasar el gate (PROMPT v1.7 §B).
 */
export function renderProfessorPanel(caseData, nav) {
  const st = state.get();

  // Consola docente activa: si el gate se pasó y hay run, muestra el tablero completo.
  if (isConsoleUnlocked() && st.runConfig) {
    return renderConsoleBoard(getFacilitatorData(caseData.order), nav);
  }

  const panel = document.createElement('div');
  panel.className = 'professor-panel';
  panel.innerHTML = `<div class="professor-panel-title">&#127891; ${T.prof_panel}</div>`;

  // Aviso de deprecación: los datos del facilitador viven en la consola privada.
  const notice = document.createElement('div');
  notice.style.cssText = 'font-size:12px;opacity:.85;background:rgba(255,255,255,.1);padding:10px;border-radius:6px;margin-bottom:12px;line-height:1.5;';
  notice.innerHTML = 'Las notas, el análisis y los injects completos del facilitador se cargan en la <strong>consola privada</strong> tras una frase de acceso. Abra <code>?vista=consola</code> para el pre-vuelo y el tablero. Esta vista pública ya no expone esos datos.';
  panel.appendChild(notice);

  // Modalidad (sigue funcionando sin datos del facilitador)
  const modalityDiv = document.createElement('div');
  modalityDiv.style.cssText = 'margin-bottom:12px;';
  modalityDiv.innerHTML = `<div style="margin-bottom:8px;font-size:13px;opacity:.8">${T.prof_modality}</div>`;
  const modeRow = document.createElement('div');
  modeRow.style.cssText = 'display:flex;gap:8px;';
  [{ key: 'ttx', label: 'Tabletop (TTX)' }].forEach(m => {
    const active = (st.modality || 'ttx') === m.key;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.cssText = 'flex:1;padding:8px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.35);cursor:pointer;font-size:13px;font-weight:700;' +
      (active ? 'background:#2D6EA3;color:#fff;border-color:#2D6EA3;' : 'background:transparent;color:#fff;');
    btn.textContent = m.label;
    btn.addEventListener('click', () => {
      state.set({ modality: m.key });
      nav.navigate(state.get().currentScreen);
    });
    modeRow.appendChild(btn);
  });
  modalityDiv.appendChild(modeRow);
  panel.appendChild(modalityDiv);

  // Selector de inject (solo id + texto; sin metadatos del facilitador)
  const injectDiv = document.createElement('div');
  injectDiv.innerHTML = `<div style="margin-bottom:8px;font-size:13px;opacity:.8">${T.prof_injectSelect}</div>`;
  (caseData.injects || []).forEach(inj => {
    const isSelected = st.selectedInjectId === inj.id;
    const btn = document.createElement('button');
    btn.style.cssText = 'display:block;width:100%;text-align:left;padding:8px 12px;margin-bottom:8px;border-radius:6px;border:none;cursor:pointer;font-size:13px;' +
      (isSelected ? 'background:#2D6EA3;color:white;' : 'background:rgba(255,255,255,.15);color:white;');
    const previewText = inj.text.length > 80 ? inj.text.substring(0, 80) + '...' : inj.text;
    btn.textContent = `${inj.id}: ${previewText}`;
    btn.addEventListener('click', () => {
      state.set({ selectedInjectId: inj.id });
      nav.navigate(state.get().currentScreen);
    });
    injectDiv.appendChild(btn);
  });
  panel.appendChild(injectDiv);

  return panel;
}
