import { openEbtaModal } from '../ebtaModal.js';

// Textos aprobados de cada tarjeta (sin spoilear dominantEventType ni dominantChannel).
const CASE_CARDS = [
  {
    order: 'A',
    heading: 'Caso A \u2014 Vala Pagos \u00b7 Fintech de pagos y remesas',
    description: 'Una plataforma de pagos y remesas enfrenta un cambio regulatorio repentino en un entorno cambiario tensionado.',
    role: 'Caso ancla: el ciclo completo y m\u00e1s rico, y la base del memo evaluable.',
    time: '~180 min',
    tip: 'Recomendado si es tu primera vez o si vas a escribir el memo.',
    isDefault: true,
  },
  {
    order: 'B',
    heading: 'Caso B \u2014 Provista \u00b7 Alimentos de consumo masivo',
    description: 'Una empresa de alimentos descubre que su cliente hist\u00f3rico ya no puede pagar su producto.',
    role: 'Caso de transferencia, ciclo comprimido y con menos andamiaje.',
    time: '~60 min',
    tip: 'Bueno para aplicar el marco a una situaci\u00f3n de naturaleza distinta.',
    isDefault: false,
  },
  {
    order: 'C',
    heading: 'Caso C \u2014 Rauda \u00b7 Plataforma de reparto',
    description: 'Una app de delivery enfrenta una crisis p\u00fablica que estalla tras un caso viral.',
    role: 'Caso portable, ciclo comprimido.',
    time: '~60 min',
    tip: 'Bueno para trabajar un tipo de presi\u00f3n distinto al de los otros dos.',
    isDefault: false,
  },
];

export async function mountScreen00(container, _caseData, nav) {
  let selectedOrder = 'A'; // Caso A por defecto

  // ---- Root wrapper ----
  const landing = document.createElement('div');
  landing.className = 'landing';

  // ---- Banda hero (navy, a sangre completa \u2014 lo m\u00e1s distintivo de MacroLab) ----
  const hero = document.createElement('header');
  hero.className = 'landing-hero';
  hero.innerHTML = `
    <div class="landing-hero-inner">
      <h1 class="landing-logo">EntornoLab</h1>
      <p class="landing-tagline">Laboratorio de decisi\u00f3n bajo incertidumbre</p>
      <p class="landing-course">An\u00e1lisis del Entorno \u00b7 PAG Global Online \u00b7 IESA</p>
    </div>
  `;
  landing.appendChild(hero);

  // ---- Cuerpo (sobre el lienzo claro, ancho de lectura acotado) ----
  const body = document.createElement('div');
  body.className = 'landing-body';
  landing.appendChild(body);

  // ---- Descripci\u00f3n ----
  const intro = document.createElement('section');
  intro.className = 'landing-intro-section';
  intro.innerHTML = `
    <p class="landing-intro">
      EntornoLab te permite experimentar un ciclo completo de decisi\u00f3n bajo el marco
      E-BTA/R: clasificar el evento, elegir y valorar un buffer, formular la frase
      estrat\u00e9gica y, cuando llega un inject que revela informaci\u00f3n latente, revisar
      todo el recorrido con lo que ahora sabes.
    </p>
    <button class="landing-ebta-btn" id="landing-ebta-btn" type="button">\u00bfQu\u00e9 es E-BTA/R?</button>
  `;
  body.appendChild(intro);

  // ---- Nota de honestidad ----
  const honesty = document.createElement('div');
  honesty.className = 'landing-honesty';
  honesty.setAttribute('role', 'note');
  honesty.innerHTML = `
    <div class="landing-honesty-icon" aria-hidden="true">\u24d8</div>
    <div>
      <strong>Este simulador no punt\u00faa ni eval\u00faa.</strong>
      Captura tu razonamiento para que lo puedas discutir con el facilitador.
      Lo que se eval\u00faa en el curso es el razonamiento, no el resultado.
    </div>
  `;
  body.appendChild(honesty);

  // ---- Datos pr\u00e1cticos ----
  const practicos = document.createElement('ul');
  practicos.className = 'landing-practicos';
  practicos.innerHTML = `
    <li>\u2248\u200a10 pantallas, navegaci\u00f3n lineal paso a paso.</li>
    <li>Tiempo estimado seg\u00fan el caso elegido (ver tarjetas abajo).</li>
    <li>El recorrido termina en un PDF que es el insumo de tu memo.</li>
  `;
  body.appendChild(practicos);

  // ---- Selecci\u00f3n de caso ----
  const caseSection = document.createElement('section');
  caseSection.className = 'landing-case-section';

  const caseHeading = document.createElement('p');
  caseHeading.className = 'case-guidance';
  caseHeading.textContent = 'Empieza por el Caso A si es tu primera vez o si har\u00e1s el memo. Usa B o C para practicar la transferencia del marco a otros sectores.';
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
        <div class="case-card-check" aria-hidden="true">${isSelected ? '\u2713' : ''}</div>
        <div class="case-card-badge">Caso ${cfg.order}</div>
        <div class="case-card-title">${cfg.heading}</div>
        <div class="case-card-desc">\u201c${cfg.description}\u201d</div>
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

  // ---- Bot\u00f3n Comenzar ----
  const startRow = document.createElement('div');
  startRow.className = 'landing-start-row';

  const startBtn = document.createElement('button');
  startBtn.className = 'btn btn-primary btn-start';
  startBtn.textContent = 'Comenzar \u2192';
  startBtn.type = 'button';
  startRow.appendChild(startBtn);

  body.appendChild(startRow);

  // ---- Pie de p\u00e1gina ----
  const footer = document.createElement('footer');
  footer.className = 'landing-footer';
  footer.textContent = 'Dise\u00f1o y direcci\u00f3n: P\u00e1vel G\u00f3mez \u00b7 IESA';
  body.appendChild(footer);

  // ---- Montar y conectar ----
  container.appendChild(landing);

  landing.querySelector('#landing-ebta-btn').addEventListener('click', openEbtaModal);

  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    startBtn.textContent = 'Cargando\u2026';
    await nav.onStart(selectedOrder);
  });
}
