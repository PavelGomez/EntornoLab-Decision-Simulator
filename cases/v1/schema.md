# Esquema de caso EntornoLab — v1.0

Cada caso es un archivo JSON en `cases/v1/`. La versión canónica del contenido pedagógico es el JSON; el documento Word es la versión legible. Ante discrepancia, gana el JSON.

## Campos

| Campo | Tipo | Notas |
|-------|------|-------|
| `schemaVersion` | string | Fijo: `"1.0"`. |
| `caseId` | string | Único. Convención: `pais-sector-Orden-NNN`. |
| `title` | string | Título mostrado en el briefing. |
| `order` | `"A"\|"B"\|"C"` | Posición en la biblioteca. |
| `role` | `"ancla"\|"transferencia"\|"portable"` | Función pedagógica. |
| `estimatedMinutes` | number | Tiempo estimado del ciclo. |
| `context.sector` | string | Sector del caso. |
| `context.country` | string | `"VE"`. |
| `context.size` | string | Tamaño de la empresa. |
| `context.dominantEventType` | string[] | Subconjunto de `subito-discreto`, `acumulativo`, `cascada`, `legitimidad`. Multietiqueta permitida. |
| `context.dominantChannel` | string | Uno de los 5 canales. |
| `context.secondaryChannel` | string\|null | Uno de los 5 canales u opcional. |
| `initialSignal` | string | La señal inicial; se muestra en el briefing. |
| `briefing` | string | 800–1200 palabras, con secciones marcadas `§1.`, `§2.`, … Las secciones alojan la información latente de los injects. |
| `availableBuffers[]` | object[] | Típicamente 4. El participante elige hasta 2. |
| `availableBuffers[].id` | string | Identificador. |
| `availableBuffers[].label` | string | Lo único que ve el participante. |
| `availableBuffers[].channelsAddressed` | string[] | Canales sobre los que opera (criterio mínimo de buffer). |
| `availableBuffers[].costUnit` | `caja\|tiempo\|capital_politico\|legitimidad` | Unidad de costo de activación (criterio mínimo de buffer). |
| `availableBuffers[].notesForFacilitator` | string | **No se muestra al participante.** Solo modo profesor/export. |
| `uncertaintySources` | string[] | Subconjunto de `ocurrencia`, `magnitud`, `duracion`, `actor`. |
| `injects[]` | object[] | **Exactamente 3.** El facilitador elige cuál se revela. |
| `injects[].id` | string | Identificador. |
| `injects[].trigger` | string | `"facilitator"`. |
| `injects[].text` | string | Lo que se revela al participante. |
| `injects[].latentInformation` | string | Referencia al `§` donde la información ya estaba latente. **Uso interno/export.** |
| `injects[].primaryUncertaintyAffected` | string | Fuente de incertidumbre que el inject pone en juego. |
| `injects[].facilitatorPrompt` | string | Pregunta guía para el hot wash (modo profesor). |
| `facilitatorNotes` | string | **No se muestra al participante.** |

## Reglas de validación (las aplica `caseLoader`)

1. Todos los campos obligatorios presentes y con el tipo correcto.
2. Valores de taxonomía dentro de los conjuntos cerrados (tipos de evento, canales, fuentes, unidades de costo).
3. `injects` tiene exactamente 3 elementos; cada uno con `latentInformation` que referencia un `§` existente en el `briefing`.
4. Cada `availableBuffers[].costUnit` es una de las 4 unidades válidas.
5. Un caso malformado produce un error claro en pantalla, no una página en blanco.

## Taxonomías cerradas

- **Tipos de evento (4):** `subito-discreto`, `acumulativo`, `cascada`, `legitimidad`.
- **Canales de impacto (5):** `operacional`, `financiero`, `regulatorio-legal`, `legitimidad`, `modelo-de-negocio`.
- **Fuentes de incertidumbre (4):** `ocurrencia`, `magnitud`, `duracion`, `actor`.
- **Unidades de costo de buffer (4):** `caja`, `tiempo`, `capital_politico`, `legitimidad`.
