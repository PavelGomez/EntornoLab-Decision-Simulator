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

  // ---- Encabezado ----
  const header = document.createElement('div');
  header.className = 'landing-header';
  header.innerHTML = `
    <div class="landing-logo">EntornoLab</div>
    <p class="landing-tagline">Simulador de decisi\u00f3n bajo incertidumbre</p>
    <p class="landing-intro">
      Tres casos del entorno venezolano para practicar el marco E-BTA/R:
      clasificar el evento, elegir y valorar un buffer, formular la frase de decisi\u00f3n
      y revisarla cuando llega nueva informaci\u00f3n.
    </p>
    <button class="landing-ebta-btn" id="landing-ebta-btn">\u00bfQu\u00e9 es E-BTA/R?</button>
  `;
  landing.appendChild(header);

  // ---- Orientaci\u00f3n ----
  const guidance = document.createElement('div');
  guidance.className = 'case-guidance';
  guidance.textContent = 'Empieza por el Caso A si es tu primera vez o si har\u00e1s el memo. Usa B o C para practicar la transferencia del marco a otros sectores.';
  landing.appendChild(guidance);

  // ---- Tarjetas de caso ----
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'case-cards';
  landing.appendChild(cardsWrapper);

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
        renderCards(); // re-render to update selection visual
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
  landing.appendChild(startRow);

  // ---- Wire up ----
  container.appendChild(landing);

  landing.querySelector('#landing-ebta-btn').addEventListener('click', openEbtaModal);

  startBtn.addEventListener('click', async () => {
    startBtn.disabled = true;
    startBtn.textContent = 'Cargando\u2026';
    await nav.onStart(selectedOrder);
  });
}
