# Esquema de caso EntornoLab — v1.1+

Cada caso es un archivo JSON en `cases/v1/`. La versión canónica del contenido pedagógico es el JSON; el documento Word es la versión legible. Ante discrepancia, gana el JSON.

Los campos `dossier`, `facilitatorAnalysis` y `replies` son **opcionales** (v1.1+). Un caso sin ellos funciona igual que en v1.0: todo campo nuevo es opcional y compatible hacia atrás.

## Campos base (v1.0)

| Campo | Tipo | Notas |
|-------|------|-------|
| `schemaVersion` | string | `"1.0"` o `"1.1"` (usa `"1.1"` al agregar `dossier`/`facilitatorAnalysis`/`replies`). El motor acepta ambas. |
| `caseId` | string | Único. Convención: `pais-sector-Orden-NNN`. |
| `title` | string | Título mostrado en el briefing. |
| `order` | `"A"\|"B"\|"C"\|"3"` | Posición en la biblioteca. `"3"` = caso de evaluación (entrega final). |
| `role` | `"ancla"\|"transferencia"\|"portable"\|"final"` | Función pedagógica. `"final"` = caso de evaluación individual. |
| `estimatedMinutes` | number | Tiempo estimado del ciclo. |
| `context.sector` | string | Sector del caso. |
| `context.country` | string | `"VE"`. |
| `context.size` | string | Tamaño de la empresa. |
| `context.dominantEventType` | string[] | Subconjunto de `subito-discreto`, `acumulativo`, `cascada`, `legitimidad`. Multietiqueta permitida. |
| `context.dominantChannel` | string | Normalmente uno de los 5 canales; en casos con el canal deliberadamente en disputa (p. ej. el caso final) admite un valor descriptivo (p. ej. `"en competencia (a jerarquizar)"`). **Metadato del facilitador: nunca se muestra al participante.** |
| `context.secondaryChannel` | string\|null | Uno de los 5 canales, un valor descriptivo (p. ej. `"multiple"`) u opcional. **No se muestra al participante.** |
| `initialSignal` | string | La señal inicial; se muestra en el briefing. |
| `briefing` | string | 800–1200 palabras, con secciones marcadas `§1.`, `§2.`, … Las secciones alojan la información latente de los injects. |
| `availableBuffers[]` | object[] | Típicamente 4. El participante elige hasta 2. |
| `availableBuffers[].id` | string | Identificador. |
| `availableBuffers[].label` | string | Lo único que ve el participante. |
| `availableBuffers[].channelsAddressed` | string[] | Canales sobre los que opera (criterio mínimo de buffer). |
| `availableBuffers[].costUnit` | `caja\|tiempo\|capital_politico\|legitimidad` | Unidad de costo de activación (criterio mínimo de buffer). |
| `availableBuffers[].notesForFacilitator` | string | **No se muestra al participante.** Solo modo profesor. |
| `uncertaintySources` | string[] | Subconjunto de `ocurrencia`, `magnitud`, `duracion`, `actor`. |
| `injects[]` | object[] | **Exactamente 3.** El facilitador elige cuál se revela. |
| `injects[].id` | string | Identificador. |
| `injects[].trigger` | string | `"facilitator"`. |
| `injects[].text` | string | Lo que se revela al participante. |
| `injects[].latentInformation` | string | Referencia al `§` donde la información ya estaba latente. **Uso interno.** |
| `injects[].primaryUncertaintyAffected` | string | Fuente de incertidumbre que el inject pone en juego. |
| `injects[].facilitatorPrompt` | string | Pregunta guía para el hot wash (modo profesor). |
| `facilitatorNotes` | string | **No se muestra al participante.** |

## Campos opcionales v1.1: `dossier`

El bloque `dossier` provee datos cuantitativos y cualitativos que el simulador renderiza como acordeones en la Pantalla 1 (Briefing), un panel de consulta en la Pantalla 3 (Impacto) y datos de economía en la Pantalla 4 (Buffer Board).

**Regla de visibilidad:** `_visibility`, `facilitatorAnalysis`, `notesForFacilitator` y `facilitatorNotes` **nunca se muestran al participante**. Únicamente son accesibles en modo profesor (`?modo=profesor`).

| Campo | Tipo | Notas |
|-------|------|-------|
| `dossier._visibility` | string | Nota interna. **Nunca se renderiza al participante.** |
| `dossier.company.founded` | string | Ej. `"Hace 5 años"`. |
| `dossier.company.employees` | number | Número de empleados. |
| `dossier.company.usersOrCustomers` | string | Descripción de base de clientes/usuarios. |
| `dossier.company.financials[]` | object[] | Indicadores financieros. |
| `dossier.company.financials[].metric` | string | Nombre del indicador. |
| `dossier.company.financials[].value` | string | Valor (resaltado en tabla). |
| `dossier.company.financials[].note` | string | Nota aclaratoria. |
| `dossier.company.revenueMix[]` | object[] | Mezcla de ingresos. |
| `dossier.company.revenueMix[].stream` | string | Fuente de ingreso. |
| `dossier.company.revenueMix[].shareOfMargin` | string | Participación en el margen. |
| `dossier.company.keyDependencies[]` | string[] | Dependencias críticas (lista). |
| `dossier.actors[]` | object[] | Mapa de actores. |
| `dossier.actors[].actor` | string | Nombre del actor. |
| `dossier.actors[].interest` | string | Interés principal. |
| `dossier.actors[].leverage` | string | Palanca / poder de influencia. |
| `dossier.actors[].publicStance` | string | Postura pública conocida. |
| `dossier.actors[].predictability` | string | Nivel de predictibilidad. |
| `dossier.uncertainties[]` | object[] | Fuentes de incertidumbre con escenarios. |
| `dossier.uncertainties[].source` | string | Fuente (ej. `ocurrencia`, `actor`). |
| `dossier.uncertainties[].question` | string | La pregunta abierta central. |
| `dossier.uncertainties[].scenarios[]` | object[] | Escenarios posibles. |
| `dossier.uncertainties[].scenarios[].scenario` | string | Descripción del escenario. |
| `dossier.uncertainties[].scenarios[].band` | string | Banda de probabilidad cualitativa. |
| `dossier.uncertainties[].scenarios[].impact` | string | Impacto esperado. |
| `dossier.bufferEconomics[]` | object[] | Datos económicos de cada buffer. |
| `dossier.bufferEconomics[].id` | string | Debe coincidir con `availableBuffers[].id`. |
| `dossier.bufferEconomics[].capacity` | string | Capacidad / alcance del buffer. |
| `dossier.bufferEconomics[].activationCost` | string | Costo de activación cuantificado. |
| `dossier.bufferEconomics[].depletion` | string | En cuántas rondas se agota. |
| `dossier.bufferEconomics[].leadTime` | string | Cuándo está disponible. |
| `dossier.bufferEconomics[].residual` | string | Efecto residual tras su uso. |
| `dossier.constraints[]` | string[] | Restricciones operativas del caso (lista). |
| `dossier.plausibleMoves[]` | object[] | Cursos de acción plausibles (sin recomendar ninguno). |
| `dossier.plausibleMoves[].id` | string | Identificador corto (ej. `"M1"`). |
| `dossier.plausibleMoves[].label` | string | Nombre de la jugada. |
| `dossier.plausibleMoves[].note` | string | Observación neutral. |

## Campos opcionales v1.1: `facilitatorAnalysis`

Exclusivo del modo profesor. **Nunca se muestra al participante.**

| Campo | Tipo | Notas |
|-------|------|-------|
| `facilitatorAnalysis.noDominantOption` | string | Por qué no existe una jugada dominante. |
| `facilitatorAnalysis.tradeoffMap` | string | Cómo se relacionan recursos, canales y jugadas. |
| `facilitatorAnalysis.injectInteractions[]` | object[] | Interacción entre cada inject y las jugadas plausibles. |
| `facilitatorAnalysis.injectInteractions[].inject` | string | Id del inject. |
| `facilitatorAnalysis.injectInteractions[].undercuts` | string[] | Jugadas que el inject socava. |
| `facilitatorAnalysis.injectInteractions[].rewards` | string[] | Jugadas que el inject favorece. |
| `facilitatorAnalysis.injectInteractions[].note` | string | Explicación. |
| `facilitatorAnalysis.calibration` | string | Descripción de un memo de nivel "Sobresaliente". |

## Campos opcionales v1.3: `replies` (modalidad wargame)

Biblioteca opcional de **réplicas pre-escritas** del actor para la ronda de réplica en modalidad *wargame* (modo profesor). Misma forma que `injects`. **Sin IA: la réplica es siempre texto pre-escrito.** Si el caso no define `replies`, la ronda de réplica reutiliza un `inject` distinto al que ya se reveló.

| Campo | Tipo | Notas |
|-------|------|-------|
| `replies[]` | object[] | Opcional. Réplicas del actor disponibles para la ronda de wargame. |
| `replies[].id` | string | Identificador. |
| `replies[].text` | string | Texto que se revela al participante como réplica del actor. |
| `replies[].facilitatorPrompt` | string | Opcional. Pregunta guía para el hot wash (modo profesor). |

## Campos opcionales v1.5: equivocidad y costo de oportunidad

Compatibles hacia atrás. Si no existen, los campos del recorrido quedan vacíos para que el participante los complete.

| Campo | Tipo | Notas |
|-------|------|-------|
| `rivalInterpretations` | string[] | Opcional. Lecturas causales rivales **sugeridas** de la señal; se muestran al participante como ejemplos en el bloque "Reducir equivocidad" (Pantalla 3). No prellenan su respuesta. |
| `availableBuffers[].opportunityCost` | string | Opcional. Sugerencia de costo de oportunidad del buffer; se usa como *placeholder* del campo "¿Qué alternativa sacrificas…?" (Pantalla 4). |
| `dossier.bufferEconomics[].opportunityCost` | string | Opcional. Alternativa: misma sugerencia desde el bloque de economía del buffer (se usa si no está en `availableBuffers[].opportunityCost`). |

## Reglas de validación (las aplica `caseLoader`)

1. Todos los campos base obligatorios presentes y con el tipo correcto.
2. Valores de taxonomía dentro de los conjuntos cerrados (tipos de evento, canales, fuentes, unidades de costo).
3. `injects` tiene exactamente 3 elementos; cada uno con `latentInformation` que referencia un `§` existente en el `briefing`.
4. Cada `availableBuffers[].costUnit` es una de las 4 unidades válidas.
5. Un caso malformado produce un error claro en pantalla, no una página en blanco.
6. Los campos opcionales del `dossier` son todos opcionales entre sí; el simulador renderiza solo los bloques presentes.
7. Si `dossier.bufferEconomics[].id` no coincide con ningún `availableBuffers[].id`, el bloque de economía se ignora silenciosamente.

## Taxonomías cerradas

- **Tipos de evento (4):** `subito-discreto`, `acumulativo`, `cascada`, `legitimidad`.
- **Canales de impacto (5):** `operacional`, `financiero`, `regulatorio-legal`, `legitimidad`, `modelo-de-negocio`.
- **Fuentes de incertidumbre (4):** `ocurrencia`, `magnitud`, `duracion`, `actor`.
- **Unidades de costo de buffer (4):** `caja`, `tiempo`, `capital_politico`, `legitimidad`.
