/**
 * dossier.js — Renderizado del bloque dossier (v1.1)
 *
 * Reglas de visibilidad:
 * - Nunca muestra _visibility, facilitatorAnalysis, notesForFacilitator ni facilitatorNotes.
 * - Compatible hacia atrás: si caseData.dossier es undefined, las funciones devuelven null.
 */

import { escapeHtml } from './screens/helpers.js';

// ─── Internos ─────────────────────────────────────────────────────────────────

/**
 * Construye una tabla responsive.
 * headers: [{key, label, highlight?}]
 * rows: objetos con esas claves
 */
function buildTable(headers, rows) {
  const wrap = document.createElement('div');
  wrap.className = 'dossier-table-wrap';

  const table = document.createElement('table');
  table.className = 'dossier-table';

  const thead = document.createElement('thead');
  const hrow = document.createElement('tr');
  headers.forEach(h => {
    const th = document.createElement('th');
    th.textContent = h.label;
    hrow.appendChild(th);
  });
  thead.appendChild(hrow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  rows.forEach(row => {
    const tr = document.createElement('tr');
    headers.forEach(h => {
      const td = document.createElement('td');
      td.setAttribute('data-label', h.label);
      td.textContent = String(row[h.key] ?? '\u2014');
      if (h.highlight) td.classList.add('dossier-table-td--highlight');
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

/**
 * Crea un acordeón <details>/<summary>.
 * buildContent(bodyEl) rellena el contenido.
 */
function buildAccordion(title, buildContent) {
  const details = document.createElement('details');
  details.className = 'dossier-accordion';

  const summary = document.createElement('summary');
  summary.className = 'dossier-accordion-header';
  summary.textContent = title;
  details.appendChild(summary);

  const body = document.createElement('div');
  body.className = 'dossier-accordion-body';
  buildContent(body);
  details.appendChild(body);

  return details;
}

function sublabel(text) {
  const p = document.createElement('p');
  p.className = 'dossier-sublabel';
  p.textContent = text;
  return p;
}

// ─── Exportaciones p\u00fablicas ───────────────────────────────────────────────────

/**
 * Devuelve la econom\u00eda de un buffer por id, o null si no existe.
 */
export function getBufferEconomics(dossier, bufferId) {
  if (!dossier?.bufferEconomics) return null;
  return dossier.bufferEconomics.find(b => b.id === bufferId) || null;
}

/**
 * Renderiza los acordeones del dossier para la Pantalla 1 (Briefing).
 * Devuelve un elemento DOM o null si no hay dossier.
 */
export function renderDossierAccordions(dossier) {
  if (!dossier) return null;

  const wrapper = document.createElement('div');
  wrapper.className = 'dossier-section';

  const heading = document.createElement('h2');
  heading.className = 'dossier-section-title';
  heading.textContent = 'Dossier del caso';
  wrapper.appendChild(heading);

  const note = document.createElement('p');
  note.className = 'dossier-section-note';
  note.textContent = 'Datos cuantitativos y cualitativos de referencia. Abre los acordeones que necesites durante el an\u00e1lisis.';
  wrapper.appendChild(note);

  // 1. Perfil y datos financieros
  if (dossier.company) {
    const co = dossier.company;
    wrapper.appendChild(buildAccordion('Perfil y datos financieros', body => {
      const profileParts = [
        co.founded,
        co.employees != null ? `${co.employees} empleados` : null,
        co.usersOrCustomers
      ].filter(Boolean);
      if (profileParts.length) {
        const p = document.createElement('p');
        p.className = 'dossier-profile-line';
        p.textContent = profileParts.join(' \u00b7 ');
        body.appendChild(p);
      }

      if (co.financials?.length) {
        body.appendChild(sublabel('Indicadores financieros'));
        body.appendChild(buildTable(
          [
            { key: 'metric', label: 'Indicador' },
            { key: 'value', label: 'Valor', highlight: true },
            { key: 'note', label: 'Nota' }
          ],
          co.financials
        ));
      }

      if (co.revenueMix?.length) {
        body.appendChild(sublabel('Mezcla de ingresos'));
        body.appendChild(buildTable(
          [
            { key: 'stream', label: 'Fuente' },
            { key: 'shareOfMargin', label: 'Participaci\u00f3n en margen', highlight: true }
          ],
          co.revenueMix
        ));
      }

      if (co.keyDependencies?.length) {
        body.appendChild(sublabel('Dependencias cr\u00edticas'));
        const list = document.createElement('ul');
        list.className = 'dossier-list';
        co.keyDependencies.forEach(dep => {
          const li = document.createElement('li');
          li.textContent = dep;
          list.appendChild(li);
        });
        body.appendChild(list);
      }
    }));
  }

  // 2. Mapa de actores
  if (dossier.actors?.length) {
    wrapper.appendChild(buildAccordion('Mapa de actores', body => {
      body.appendChild(buildTable(
        [
          { key: 'actor', label: 'Actor' },
          { key: 'interest', label: 'Inter\u00e9s' },
          { key: 'leverage', label: 'Palanca', highlight: true },
          { key: 'publicStance', label: 'Postura p\u00fablica' },
          { key: 'predictability', label: 'Predictibilidad' }
        ],
        dossier.actors
      ));
    }));
  }

  // 3. Incertidumbre
  if (dossier.uncertainties?.length) {
    wrapper.appendChild(buildAccordion('Incertidumbre', body => {
      dossier.uncertainties.forEach((u, i) => {
        if (i > 0) {
          const hr = document.createElement('hr');
          hr.className = 'dossier-divider';
          body.appendChild(hr);
        }
        const srcEl = document.createElement('p');
        srcEl.className = 'dossier-uncertainty-src';
        srcEl.innerHTML = `<strong>${escapeHtml(u.source)}</strong>`;
        body.appendChild(srcEl);

        if (u.question) {
          const qEl = document.createElement('p');
          qEl.className = 'dossier-uncertainty-q';
          qEl.textContent = u.question;
          body.appendChild(qEl);
        }

        if (u.scenarios?.length) {
          body.appendChild(buildTable(
            [
              { key: 'scenario', label: 'Escenario' },
              { key: 'band', label: 'Banda', highlight: true },
              { key: 'impact', label: 'Impacto' }
            ],
            u.scenarios
          ));
        }
      });
    }));
  }

  // 4. Restricciones
  if (dossier.constraints?.length) {
    wrapper.appendChild(buildAccordion('Restricciones del caso', body => {
      const list = document.createElement('ul');
      list.className = 'dossier-list';
      dossier.constraints.forEach(c => {
        const li = document.createElement('li');
        li.textContent = c;
        list.appendChild(li);
      });
      body.appendChild(list);
    }));
  }

  // 5. Cursos de acci\u00f3n plausibles
  if (dossier.plausibleMoves?.length) {
    wrapper.appendChild(buildAccordion('Cursos de acci\u00f3n plausibles', body => {
      const noteEl = document.createElement('p');
      noteEl.className = 'dossier-moves-note';
      noteEl.textContent = 'Ninguno es obviamente superior; el objetivo es que t\u00fa razones la decisi\u00f3n, no elegir de un men\u00fa.';
      body.appendChild(noteEl);

      const list = document.createElement('ul');
      list.className = 'dossier-list';
      dossier.plausibleMoves.forEach(m => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${escapeHtml(m.id)}. ${escapeHtml(m.label)}</strong> \u2014 ${escapeHtml(m.note)}`;
        list.appendChild(li);
      });
      body.appendChild(list);
    }));
  }

  return wrapper;
}

/**
 * Renderiza un panel de consulta compacto para la Pantalla 3 (Impacto).
 * Muestra actores e incertidumbre. Devuelve null si no hay datos.
 */
export function renderDossierConsultPanel(dossier) {
  if (!dossier || (!dossier.actors?.length && !dossier.uncertainties?.length)) return null;

  const panel = document.createElement('details');
  panel.className = 'dossier-consult-panel';

  const summary = document.createElement('summary');
  summary.className = 'dossier-consult-summary';
  summary.textContent = 'Consultar datos del caso \u2014 actores e incertidumbre';
  panel.appendChild(summary);

  const body = document.createElement('div');
  body.className = 'dossier-consult-body';

  if (dossier.actors?.length) {
    body.appendChild(sublabel('Mapa de actores'));
    body.appendChild(buildTable(
      [
        { key: 'actor', label: 'Actor' },
        { key: 'interest', label: 'Inter\u00e9s' },
        { key: 'leverage', label: 'Palanca', highlight: true },
        { key: 'publicStance', label: 'Postura p\u00fablica' },
        { key: 'predictability', label: 'Predictibilidad' }
      ],
      dossier.actors
    ));
  }

  if (dossier.uncertainties?.length) {
    body.appendChild(sublabel('Incertidumbre y escenarios'));
    dossier.uncertainties.forEach((u, i) => {
      if (i > 0) {
        const hr = document.createElement('hr');
        hr.className = 'dossier-divider';
        body.appendChild(hr);
      }
      const srcEl = document.createElement('p');
      srcEl.className = 'dossier-uncertainty-src';
      srcEl.innerHTML = `<strong>${escapeHtml(u.source)}</strong>${u.question ? ': ' + escapeHtml(u.question) : ''}`;
      body.appendChild(srcEl);

      if (u.scenarios?.length) {
        body.appendChild(buildTable(
          [
            { key: 'scenario', label: 'Escenario' },
            { key: 'band', label: 'Banda', highlight: true },
            { key: 'impact', label: 'Impacto' }
          ],
          u.scenarios
        ));
      }
    });
  }

  panel.appendChild(body);
  return panel;
}
