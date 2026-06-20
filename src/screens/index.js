import { mountScreen01 } from './01-briefing.js';
import { mountScreen02 } from './02-clasificacion.js';
import { mountScreen03 } from './03-impacto.js';
import { mountScreen04 } from './04-bufferBoard.js';
import { mountScreen05 } from './05-tradeoff.js';
import { mountScreen06 } from './06-decision.js';
import { mountScreen07 } from './07-indicadores.js';
import { mountScreen08 } from './08-inject.js';
import { mountScreen09 } from './09-revision.js';
import { mountScreen10 } from './10-export.js';

const SCREENS = {
  1: mountScreen01,
  2: mountScreen02,
  3: mountScreen03,
  4: mountScreen04,
  5: mountScreen05,
  6: mountScreen06,
  7: mountScreen07,
  8: mountScreen08,
  9: mountScreen09,
  10: mountScreen10,
};

export async function mountScreen(n, container, caseData, nav) {
  const fn = SCREENS[n];
  if (!fn) throw new Error(`Screen ${n} not found`);
  await fn(container, caseData, nav);
}
