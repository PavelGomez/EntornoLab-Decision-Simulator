import { fillGraphics } from '../learning/center.js';
import { HOME_ABOVE, HOME_BELOW } from '../learning/content.js';
import { sectorGlyph } from '../learning/graphics.js';

// Textos aprobados de cada tarjeta (sin spoilear dominantEventType ni dominantChannel).
const CASE_CARDS = [
  {
    order: 'A',
    heading: 'Caso A — Vala Pagos · Fintech de pagos y remesas',
    description: 'Una plataforma de pagos y remesas enfrenta un cambio regulatorio repentino en un entorno cambiario tensionado.',
    role: 'Caso ancla: el ciclo completo y más rico, y la base del memo evaluable.',
    time: '~180 min',
    tip: 'Recomendado si es tu primera vez o si vas a escribir el memo.',
    isDefault: true,
  },
  {
    order: 'B',
    heading: 'Caso B — Provista · Alimentos de consumo masivo',
    description: 'Una empresa de alimentos descubre que su cliente histórico ya no puede pagar su producto.',
    role: 'Caso de transferencia, ciclo comprimido y con menos andamiaje.',
    time: '~60 min',
    tip: 'Bueno para aplicar el marco a una situación de naturaleza distinta.',
    isDefault: false,
  },
  {
    order: 'C',
    heading: 'Caso C — Rauda · Plataforma de reparto',
    description: 'Una app de delivery enfrenta una crisis pública que estalla tras un caso viral.',
    role: 'Caso portable, ciclo comprimido.',
    time: '~60 min',
    tip: 'Bueno para trabajar un tipo de presión distinto al de los otros dos.',
    isDefault: false,
  },
];

/**
 * Portada (raíz, sin hash): ES el entorno completo. Con la barra superior
 * (todas las secciones) ya montada por el router, aquí va el hero + el
 * contenido canónico de "Inicio (Acerca de)" + el mapa del sitio + los
 * gráficos + el selector de caso + Iniciar recorrido. Sin un solo clic, el
 * usuario ve la oferta, la lógica de navegación y todas las secciones.
 */
export async function mountScreen00(container, _caseData, nav) {
  let selectedOrder = 'A'; // Caso A por defecto

  const landing = document.createElement('div');
  landing.className = 'landing';

  // ---- Banda hero (navy, a sangre completa) ----
  const hero = document.createElement('header');
  hero.className = 'landing-hero';
  hero.innerHTML = `
    <div class="landing-hero-inner">
      <h1 class="landing-logo">EntornoLab</h1>
      <p class="landing-tagline">Laboratorio de decisión bajo incertidumbre</p>
      <p class="landing-course">Análisis del Entorno · PAG Global Online · IESA · <strong>Pável Gómez</strong> · 2026</p>
    </div>
  `;
  landing.appendChild(hero);

  // ---- Cuerpo: Acerca de + mapa del sitio + gráficos (contenido canónico) ----
  const body = document.createElement('div');
  body.className = 'landing-body';
  landing.appendChild(body);

  // Por encima del pliegue: síntesis breve + objetivos + diagrama del ciclo
  // (ya legible) + acceso visible al selector de casos.
  const about = document.createElement('section');
  about.className = 'landing-about lc-article';
  about.innerHTML = fillGraphics(HOME_ABOVE);

  const chooseRow = document.createElement('div');
  chooseRow.className = 'landing-choose-row';
  const chooseBtn = document.createElement('button');
  chooseBtn.className = 'btn btn-primary landing-choose-btn';
  chooseBtn.type = 'button';
  chooseBtn.textContent = 'Elegir un caso ↓';
  chooseBtn.addEventListener('click', () => {
    const sec = document.querySelector('.landing-case-section');
    if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  chooseRow.appendChild(chooseBtn);
  about.appendChild(chooseRow);
  body.appendChild(about);

  // ---- Selección de caso ----
  const caseSection = document.createElement('section');
  caseSection.className = 'landing-case-section';

  const caseHeading = document.createElement('p');
  caseHeading.className = 'case-guidance';
  caseHeading.textContent = 'Empieza por el Caso A si es tu primera vez o si harás el memo. Usa B o C para practicar la transferencia del marco a otros sectores.';
  caseSection.appendChild(caseHeading);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'case-cards';
  caseSection.appendChild(cardsWrapper);
  body.appendChild(caseSection);

  function renderCards() {
    cardsWrapper.innerHTML = '';
    CASE_CARDS.forEach(cfg => {
      const isSelected = cfg.order === selectedOrder;
      const card = document.createElement('button');
      card.className = 'case-card' + (isSelected ? ' selected' : '');
      card.dataset.order = cfg.order;
      card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      card.type = 'button';

      card.innerHTML = `
        <div class="case-card-check" aria-hidden="true">${isSelected ? '✓' : ''}</div>
        <div class="case-card-badge"><span class="case-card-glyph">${sectorGlyph(cfg.order)}</span> Caso ${cfg.order}</div>
        <div class="case-card-title">${cfg.heading}</div>
        <div class="case-card-desc">“${cfg.description}”</div>
        <div class="case-card-role">${cfg.role}</div>
        <div class="case-card-meta">
          <span class="case-card-meta-item">${cfg.time}</span>
        </div>
        <div class="case-card-tip">${cfg.tip}</div>
      `;

      card.addEventListener('click', () => {
        selectedOrder = cfg.order;
        renderCards();
      });

      cardsWrapper.appendChild(card);
    });
  }

  renderCards();

  // ---- Botón Iniciar recorrido ----
  const startRow = document.createElement('div');
  startRow.className = 'landing-start-row';

  const startBtn = document.createElement('button');
  startBtn.className = 'btn btn-primary btn-start';
  startBtn.textContent = 'Iniciar recorrido →';
  startBtn.type = 'button';
  startRow.appendChild(startBtn);
  body.appendChild(startRow);

  // ---- Bloque extenso (debajo del selector): detalle, mapa del sitio, tira ----
  const more = document.createElement('section');
  more.className = 'landing-about landing-more lc-article';
  more.innerHTML = fillGraphics(HOME_BELOW);
  body.appendChild(more);

  // ---- Caso de evaluación (entrega final) — diferenciado ----
  const evalSection = document.createElement('section');
  evalSection.className = 'landing-eval-section';
  evalSection.innerHTML = `
    <div class="eval-divider"></div>
    <h2 class="eval-title">Caso de evaluación (entrega final)</h2>
    <p class="eval-note">El Caso 3 es la entrega final, individual y deliberadamente más compleja. También accesible directamente por <code>?caso=3</code>.</p>
    <div class="case-card case-card--eval">
      <div class="case-card-badge"><span class="case-card-glyph">${sectorGlyph('3')}</span> Caso 3 · Entrega final</div>
      <div class="case-card-title">Envases del Centro · Manufactura de empaques</div>
      <div class="case-card-desc">“Tres frentes a la vez —un insumo crítico, un cliente que se enfría y una controversia comunitaria—, con una sola caja y una semana para decidir.”</div>
      <div class="case-card-role">Jerarquiza bajo presión y defiende cuál es EL evento; formula una frase E-BTA/R sostenible ante la junta.</div>
      <div class="case-card-meta"><span class="case-card-meta-item">~120 min</span></div>
    </div>
  `;
  const evalRow = document.createElement('div');
  evalRow.className = 'landing-start-row';
  const evalBtn = document.createElement('button');
  evalBtn.className = 'btn btn-dark btn-start';
  evalBtn.type = 'button';
  evalBtn.textContent = 'Iniciar caso de evaluación →';
  evalRow.appendChild(evalBtn);
  evalSection.appendChild(evalRow);
  body.appendChild(evalSection);

  evalBtn.addEventListener('click', async () => {
    evalBtn.disabled = true;
    evalBtn.textContent = 'Cargando…';
    await nav.onStart('3');
  });

  // ---- Pie de página ----
  const footer = document.createElement('footer');
  footer.className = 'landing-footer';
  footer.textContent = 'Diseño y dirección académica: Pável Gómez · IESA · 2026 · EntornoLab v1.5';
  body.appendChild(footer);

  container.appendChild(landing);

  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    startBtn.textContent = 'Cargando…';
    await nav.onStart(selectedOrder);
  });
}
