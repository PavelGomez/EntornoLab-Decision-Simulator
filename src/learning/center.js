/*
 * Centro de Aprendizaje — capa de referencia persistente (estilo MacroLab).
 *
 * Se abre como overlay SOBRE el estado del recorrido (#app intacto), de modo
 * que consultar una sección NO altera ni reinicia la ruta de decisión y, al
 * cerrar, el alumno vuelve exactamente a su pantalla. Tras el inject, las
 * pantallas 1–7 siguen sin poder editarse: el overlay solo muestra referencia.
 *
 * Rutas por hash: #aprender/<seccion> y #aprender/componentes/<id>.
 */
import { state } from '../state.js';
import { SECTIONS, COMPONENTES, GLOSSARY, TERM_DEFS, ORIENTACION, TECH_GLOSSARY_HTML } from './content.js';
import {
  cycleDiagram, pathStrip, phraseAnatomy, channelsDiagram, bufferAxes, actorsMap,
  eventTypesDiagram, tradeoffDiagram, actionIndicatorsDiagram, revisionDiagram,
} from './graphics.js';

// Sustituye los tokens de gráficos ({{CYCLE}}, etc.) por los SVG autorados.
export function fillGraphics(html) {
  return String(html)
    .replace('{{CYCLE}}', cycleDiagram())
    .replace('{{PHRASE}}', phraseAnatomy())
    .replace('{{STRIP}}', pathStrip())
    .replace('{{CHANNELS}}', channelsDiagram())
    .replace('{{BUFFER_AXES}}', bufferAxes())
    .replace('{{ACTORS}}', actorsMap())
    .replace('{{EVENT_TYPES}}', eventTypesDiagram())
    .replace('{{TRADEOFF}}', tradeoffDiagram())
    .replace('{{ACTION_IND}}', actionIndicatorsDiagram())
    .replace('{{REVISION}}', revisionDiagram());
}

let _overlay = null;
let _contentEl = null;
let _startHook = null;   // callback para "ir a elegir caso" desde la portada

const SECTION_ORDER = ['inicio', 'marco', 'componentes', 'ejemplos', 'casos', 'guia', 'glosario', 'referencias'];

export function setStartHook(fn) { _startHook = fn; }

// ---------- Construcción del overlay ----------
function build() {
  const overlay = document.createElement('div');
  overlay.className = 'lc-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Centro de aprendizaje EntornoLab');
  overlay.hidden = true;

  const bar = document.createElement('header');
  bar.className = 'lc-bar';

  const brand = document.createElement('button');
  brand.className = 'lc-brand';
  brand.type = 'button';
  brand.textContent = 'EntornoLab';
  brand.addEventListener('click', () => openLearning('inicio'));

  const nav = buildSectionNav();

  const actions = document.createElement('div');
  actions.className = 'lc-bar-actions';
  const startBtn = document.createElement('button');
  startBtn.className = 'btn btn-primary lc-start';
  startBtn.type = 'button';
  startBtn.addEventListener('click', () => {
    const inRecorrido = state.get().currentScreen >= 1;
    closeLearning();
    if (!inRecorrido && _startHook) _startHook();
  });
  const closeBtn = document.createElement('button');
  closeBtn.className = 'lc-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Cerrar el centro de aprendizaje');
  closeBtn.innerHTML = '&#x2715;';
  closeBtn.addEventListener('click', closeLearning);
  actions.appendChild(startBtn);
  actions.appendChild(closeBtn);

  bar.appendChild(brand);
  bar.appendChild(nav);
  bar.appendChild(actions);

  const content = document.createElement('main');
  content.className = 'lc-content';

  overlay.appendChild(bar);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLearning(); });

  _overlay = overlay;
  _contentEl = content;
  return overlay;
}

/**
 * Construye la navegación de secciones (links + dropdown Componentes).
 * Se reutiliza en la barra superior persistente y en la barra del overlay.
 */
export function buildSectionNav() {
  const nav = document.createElement('nav');
  nav.className = 'lc-nav';
  nav.appendChild(navLink('inicio', 'Inicio'));
  nav.appendChild(navLink('marco', 'El marco E-BTA/R'));
  nav.appendChild(buildComponentesMenu());
  nav.appendChild(navLink('ejemplos', 'Ejemplos'));
  nav.appendChild(navLink('casos', 'Casos'));
  nav.appendChild(navLink('guia', 'Guía de uso'));
  nav.appendChild(navLink('glosario', 'Glosario'));
  nav.appendChild(navLink('referencias', 'Referencias'));
  return nav;
}

function navLink(sectionKey, label) {
  const a = document.createElement('button');
  a.className = 'lc-navlink';
  a.type = 'button';
  a.dataset.section = sectionKey;
  a.textContent = label;
  a.addEventListener('click', () => openLearning(sectionKey));
  return a;
}

function buildComponentesMenu() {
  const wrap = document.createElement('div');
  wrap.className = 'lc-dropdown';
  const btn = document.createElement('button');
  btn.className = 'lc-navlink lc-dropdown-toggle';
  btn.type = 'button';
  btn.dataset.section = 'componentes';
  btn.innerHTML = `Componentes <span aria-hidden="true">&#9662;</span>`;
  const menu = document.createElement('div');
  menu.className = 'lc-dropdown-menu';
  COMPONENTES.forEach(c => {
    const item = document.createElement('button');
    item.className = 'lc-dropdown-item';
    item.type = 'button';
    item.textContent = c.nav;
    item.addEventListener('click', () => openLearning('componentes', c.id));
    menu.appendChild(item);
  });
  btn.addEventListener('click', () => wrap.classList.toggle('open'));
  wrap.appendChild(btn);
  wrap.appendChild(menu);
  return wrap;
}

// ---------- Render de secciones ----------
function renderSection(sectionKey, subKey) {
  if (!_contentEl) return;
  let html = '';
  let title = '';

  if (sectionKey === 'componentes') {
    const comp = COMPONENTES.find(c => c.id === subKey) || COMPONENTES[0];
    title = comp.title;
    html = `
      <div class="lc-compnav">${COMPONENTES.map(c =>
        `<button class="lc-chip${c.id === comp.id ? ' active' : ''}" data-comp="${c.id}">${c.nav}</button>`).join('')}</div>
      <article class="lc-article"><h2 class="lc-title">${comp.title}</h2>${fillGraphics(comp.html)}</article>`;
  } else if (sectionKey === 'glosario') {
    title = 'Glosario';
    const items = GLOSSARY.map(g => `<dt>${g.term}</dt><dd>${g.def}</dd>`).join('');
    html = `<article class="lc-article"><h2 class="lc-title">Glosario</h2>
      <div class="lc-glo-toolbar">
        <input type="search" class="lc-glo-search" placeholder="Filtrar términos…" aria-label="Filtrar términos del glosario">
        <nav class="lc-glo-index" aria-label="Saltar a una sección del glosario">
          <button type="button" class="lc-glo-jump" data-jump="glo-marco">Términos del marco</button>
          <button type="button" class="lc-glo-jump" data-jump="glo-conceptos">Conceptos teóricos</button>
          <button type="button" class="lc-glo-jump" data-jump="glo-financieros">Términos financieros</button>
        </nav>
      </div>
      <p class="lc-glo-empty" hidden>Ningún término coincide con tu búsqueda.</p>
      <h3 class="lc-h3" id="glo-marco">Términos del marco E-BTA/R</h3>
      <dl class="lc-glossary">${items}</dl>
      <p class="lc-bridge"><em>Puentes con la familia:</em> en <strong>MacroLab</strong> un evento equivale a un <strong>shock</strong>; en <strong>MercaLab</strong>, el ajuste de un <strong>equilibrio</strong>. EntornoLab se ocupa de la <strong>decisión</strong> ante esos cambios.</p>
      ${TECH_GLOSSARY_HTML}
      </article>`;
  } else {
    const sec = SECTIONS[sectionKey] || SECTIONS.inicio;
    title = sec.title;
    html = `<article class="lc-article"><h2 class="lc-title">${sec.title}</h2>${fillGraphics(sec.html)}</article>`;
  }

  _contentEl.innerHTML = html;
  _contentEl.scrollTop = 0;

  // marcar activo en la barra
  _overlay.querySelectorAll('.lc-navlink').forEach(l => {
    l.classList.toggle('active', l.dataset.section === sectionKey);
  });
  // chips de componentes
  _contentEl.querySelectorAll('.lc-chip').forEach(chip => {
    chip.addEventListener('click', () => openLearning('componentes', chip.dataset.comp));
  });
  // "Ir al selector en Inicio" (sección Casos): cierra el overlay y, en la
  // portada, lleva al selector de caso sin reiniciar el recorrido.
  _contentEl.querySelectorAll('[data-goto-selector]').forEach(btn => {
    btn.addEventListener('click', () => {
      const inRecorrido = state.get().currentScreen >= 1;
      closeLearning();
      if (!inRecorrido && _startHook) _startHook();
    });
  });
  // Glosario: filtro en cliente + saltos a sección (sin backend).
  if (sectionKey === 'glosario') wireGlossary();
  // etiqueta del botón de acción
  const startBtn = _overlay.querySelector('.lc-start');
  startBtn.textContent = state.get().currentScreen >= 1 ? 'Volver al recorrido' : 'Iniciar recorrido →';
}

// Filtro y navegación del glosario (cliente, sin backend).
function wireGlossary() {
  const search = _contentEl.querySelector('.lc-glo-search');
  const empty = _contentEl.querySelector('.lc-glo-empty');
  // Saltos a sección: scrollIntoView dentro del contenedor del centro (no usa
  // hash, que está reservado para el enrutamiento del overlay).
  _contentEl.querySelectorAll('.lc-glo-jump').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = _contentEl.querySelector('#' + btn.dataset.jump);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  if (!search) return;
  const dls = Array.from(_contentEl.querySelectorAll('.lc-glossary'));
  // Pares dt+dd por cada definición.
  const pairs = [];
  dls.forEach(dl => {
    let dt = null;
    Array.from(dl.children).forEach(node => {
      if (node.tagName === 'DT') dt = node;
      else if (node.tagName === 'DD' && dt) { pairs.push([dt, node]); dt = null; }
    });
  });
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let anyVisible = false;
    pairs.forEach(([dt, dd]) => {
      const match = !q || (dt.textContent + ' ' + dd.textContent).toLowerCase().includes(q);
      dt.hidden = !match;
      dd.hidden = !match;
      if (match) anyVisible = true;
    });
    if (empty) empty.hidden = anyVisible || !q;
  });
}

// ---------- API pública ----------
export function openLearning(sectionKey = 'inicio', subKey = null) {
  if (!_overlay) build();
  if (!SECTION_ORDER.includes(sectionKey)) sectionKey = 'inicio';
  _overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  renderSection(sectionKey, subKey);
  // hash sin disparar navegación del recorrido
  const hash = subKey ? `#aprender/${sectionKey}/${subKey}` : `#aprender/${sectionKey}`;
  if (window.location.hash !== hash) history.replaceState(history.state, '', hash);
}

export function closeLearning() {
  if (!_overlay) return;
  _overlay.hidden = true;
  document.body.style.overflow = '';
  // limpiar el hash de aprender, preservando ?caso=
  if (window.location.hash.startsWith('#aprender')) {
    history.replaceState(history.state, '', window.location.pathname + window.location.search);
  }
}

export function isLearningOpen() {
  return !!_overlay && !_overlay.hidden;
}

// Permite abrir desde un hash inicial (#aprender/...).
export function openFromHash() {
  const h = window.location.hash;
  if (!h.startsWith('#aprender')) return false;
  const parts = h.replace('#aprender/', '').split('/');
  openLearning(parts[0] || 'inicio', parts[1] || null);
  return true;
}

// ---------- Tooltips de términos del marco (popover sin perder estado) ----------
let _pop = null;
export function openTermPopover(key, anchorEl) {
  const def = TERM_DEFS[key];
  if (!def) return;
  closeTermPopover();
  const pop = document.createElement('div');
  pop.className = 'term-popover';
  pop.setAttribute('role', 'tooltip');
  pop.innerHTML = `<strong>${def.term}</strong><span>${def.def}</span>
    <button class="term-popover-more" type="button">Ver en el centro de aprendizaje →</button>`;
  document.body.appendChild(pop);

  const r = anchorEl.getBoundingClientRect();
  const top = window.scrollY + r.bottom + 6;
  let left = window.scrollX + r.left;
  pop.style.top = `${top}px`;
  pop.style.left = `${left}px`;
  // ajustar si se sale por la derecha
  const pw = pop.offsetWidth;
  if (left + pw > window.scrollX + document.documentElement.clientWidth - 8) {
    pop.style.left = `${window.scrollX + document.documentElement.clientWidth - pw - 8}px`;
  }

  pop.querySelector('.term-popover-more').addEventListener('click', () => {
    closeTermPopover();
    const comp = COMPONENTES.find(c => c.id === key);
    if (comp) openLearning('componentes', comp.id);
    else openLearning('glosario');
  });
  _pop = pop;
  setTimeout(() => document.addEventListener('click', _onDocClick, { once: true }), 0);
}
function _onDocClick(e) {
  if (_pop && !_pop.contains(e.target)) closeTermPopover();
}
export function closeTermPopover() {
  if (_pop) { _pop.remove(); _pop = null; }
}

/**
 * Tarjeta "Orientación rápida" para una pantalla del recorrido (1–10):
 * Función · Primer paso · Límite · Cierre, más los términos del marco como
 * enlaces con tooltip (no pierden el estado del recorrido).
 */
export function renderOrientacion(p) {
  const o = ORIENTACION[p];
  if (!o) return null;
  const card = document.createElement('div');
  card.className = 'orient-card';
  card.innerHTML = `
    <div class="orient-title">Orientación rápida · P${o.p} · ${o.name}</div>
    <div class="orient-grid">
      <div class="orient-item"><strong>Función:</strong> ${o.funcion}</div>
      <div class="orient-item"><strong>Primer paso:</strong> ${o.primerPaso}</div>
      <div class="orient-item"><strong>Límite:</strong> ${o.limite}</div>
      <div class="orient-item"><strong>Cierre:</strong> ${o.cierre}</div>
    </div>
  `;
  if (o.terms && o.terms.length) {
    const termsRow = document.createElement('div');
    termsRow.className = 'orient-item';
    termsRow.style.marginTop = 'var(--sp-3)';
    const lead = document.createElement('strong');
    lead.textContent = 'Términos: ';
    termsRow.appendChild(lead);
    o.terms.forEach((key, i) => {
      const def = TERM_DEFS[key];
      if (!def) return;
      if (i > 0) termsRow.appendChild(document.createTextNode(' · '));
      termsRow.appendChild(makeTermLink(def.term, key));
    });
    card.appendChild(termsRow);
  }
  return card;
}

/**
 * Convierte un elemento en un término enlazado con tooltip. `key` debe existir
 * en TERM_DEFS. No pierde el estado del recorrido.
 */
export function makeTermLink(text, key) {
  const span = document.createElement('button');
  span.className = 'term-link';
  span.type = 'button';
  span.dataset.term = key;
  span.textContent = text;
  span.addEventListener('click', (e) => {
    e.stopPropagation();
    openTermPopover(key, span);
  });
  return span;
}
