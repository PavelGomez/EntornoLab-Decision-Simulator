# Centro de Aprendizaje EntornoLab — contenido canónico

> **Qué es este archivo.** Es el contenido autoral del entorno de aprendizaje de EntornoLab, escrito para renderizarse tal cual en el sitio. La arquitectura es una **barra superior persistente** con secciones de referencia siempre disponibles (estilo MacroLab). El simulador deja de ser un embudo lineal con un solo modal y pasa a ser un entorno autocontenido. Claude Code **no inventa contenido**: maqueta y renderiza este texto. La versión canónica de los casos sigue en `cases/v1/*.json`.
>
> **Autoría:** Diseño y dirección académica: Pável Gómez · IESA · 2026.

---

## Barra superior (navegación persistente)

Secciones siempre accesibles, en este orden:

`Inicio` · `El marco E-BTA/R` · `Componentes ▾` (Evento · Canales · Buffer · Incertidumbre · Trade-off · Acción e indicadores · Revisión) · `Ejemplos` · `Casos` · `Guía de uso` · `Glosario` · **`Iniciar recorrido →`** (acción primaria)

**Blindaje del no-retorno:** consultar cualquier sección de referencia **no** altera ni reinicia el recorrido en curso, y **no** equivale a "volver atrás" en la ruta de decisión. Durante el recorrido, las secciones de referencia se abren como capa/segunda pestaña sobre el estado guardado; al cerrarlas, el alumno vuelve exactamente a la pantalla donde estaba. Tras el inject, sigue siendo imposible editar las pantallas 1–7: la referencia es para *entender*, no para *rehacer*.

---

# 1. Inicio (Acerca de)

## EntornoLab
### Laboratorio de decisión bajo incertidumbre
**Análisis del Entorno · PAG Global Online · IESA · 2026**
Diseño y dirección académica: **Pável Gómez**.

**Para qué sirve.** EntornoLab entrena una habilidad concreta del directivo: tomar una decisión defendible cuando el entorno cambia y la información es incompleta. No enseña a "adivinar el futuro"; enseña a **estructurar una decisión bajo incertidumbre** de modo que pueda explicarse, sostenerse ante un comité y revisarse cuando llega información nueva.

**Qué hace.** Te acompaña por un ciclo completo de decisión sobre un caso real-ista: clasificas el evento, mapeas su impacto, eliges y valoras un buffer, formulas una decisión táctica con indicadores, y —cuando aparece un *inject* que revela información que estaba latente— **revisas todo el recorrido** con lo que ahora sabes. El resultado es un PDF con tu razonamiento, insumo de tu memo.

**Objetivos de aprendizaje.** Al terminar serás capaz de: (1) distinguir un evento emergente de un factor estructural; (2) nombrar el canal por el que un evento golpea y anticipar su segunda ronda; (3) identificar buffers reales —no ilusorios— y costear su activación; (4) formular una decisión como frase E-BTA/R defendible; (5) definir indicadores y umbrales de revisión; y (6) **reabrir** tu decisión ante información nueva, distinguiendo qué supuesto mantienes, cuál abandonas y cuál inviertes.

**Cómo lo logra.** Mediante un ciclo guiado y la disciplina del marco **E-BTA/R**, más un mecanismo deliberado: el *inject* introduce asimetría de información entre rondas y fuerza una revisión genuina. El simulador **no te puntúa ni te dice si "acertaste"**: captura tu razonamiento para que tú y el facilitador lo discutan. Lo que se evalúa es el razonamiento, no el resultado.

**Qué te aporta.** Una gramática portátil para decidir bajo incertidumbre que puedes llevar a tu propia organización; práctica en hacer explícito lo que normalmente queda implícito (qué proteges, qué sacrificas, a qué costo); y un entregable —la frase E-BTA/R y el memo— que es, en sí mismo, una pieza de comunicación ejecutiva.

**Un ejemplo en una línea.** "Dado el alza súbita del alquiler (evento), que abre incertidumbre de magnitud sobre el canal financiero, protejo el flujo de caja con una reserva (buffer), sacrifico parte del margen, vigilo las ventas semanales y reviso si caen más de 15%." Eso es una decisión defendible y revisable: eso es lo que aquí se practica. (Ver más en **Ejemplos**.)

> **Antes de empezar.** Recorre **El marco E-BTA/R** y, si quieres, los **Componentes**. Cuando estés listo, elige un caso y pulsa **Iniciar recorrido**.

---

# 2. El marco E-BTA/R

## Qué es
E-BTA/R es una **gramática para tomar y defender una decisión** cuando aparece un evento que abre incertidumbre. No es una fórmula para acertar: es una disciplina para hacer explícito qué decides, qué proteges, qué sacrificas y cómo revisarás la apuesta. Sus letras son las piezas del ciclo: **E**vento, **B**uffer, **T**rade-off, **A**cción táctica, **/R**evisión.

## El ciclo
**Evento** → (abre **incertidumbre** sobre un **canal**) → **Buffer** → **Trade-off** → **Acción táctica + indicadores** → **[INJECT]** → **Revisión**.

El *inject* revela información latente que no estaba disponible al momento de la decisión inicial. No es una noticia nueva inventada: es algo que el caso ya contenía y que ahora pesa.

## La frase canónica
> *Dado el evento **E**, que abre la incertidumbre **U** sobre el canal **C**, protejo **X** mediante el buffer **B** (potencia, duración, costo), sacrifico parcialmente **Y**, monitoreo **I1** e **I2**, y reviso la decisión si se cruza el umbral **T**.*

## Base teórica (de dónde viene)
E-BTA/R no se inventa de cero: condensa, en un formato operativo para el aula, las tradiciones de la decisión bajo incertidumbre que sostienen el rediseño del curso.

- **Incertidumbre radical y eventos de cola.** Frank Knight (1921) distingue *riesgo* (probabilidades conocidas) de *incertidumbre* (no se conocen): E-BTA/R vive en la incertidumbre. Para clasificar las sorpresas, se distingue el *cisne negro* —sorpresa genuina, racionalizada ex post— (Taleb, 2007) del *rinoceronte gris* —amenaza visible que nadie quiso atender— (Wucker).
- **VUCA/TUNA y límites de la planificación lineal.** La planificación lineal pierde eficacia cuando los ciclos se acortan y el entorno se vuelve volátil, incierto, complejo y ambiguo (Oriesek & Schwarz, 2021); el marco TUNA —turbulencia, incertidumbre, novedad, ambigüedad— subraya que cambian incluso las categorías y relaciones causales (Ramirez & Wilkinson, 2016).
- **Wargaming y ejercicios de mesa.** El valor no está en predecir, sino en exponer supuestos, decidir bajo presión y aprender por rondas (Perla, 1990; Perla & McGrady, 2011; Dorton et al., 2023). De aquí vienen la *captura explícita de decisiones*, el *freeze probe* —que en EntornoLab es el **inject**— y el *hot wash*.
- **Decisión naturalista y sensemaking.** Bajo presión, los expertos no comparan todas las opciones: reconocen un patrón, simulan mentalmente un curso de acción y eligen el primero que "aguanta" (decisión primada por reconocimiento; Klein et al., 1993). El *sensemaking* convierte señales dispersas en una hipótesis de acción suficientemente buena para decidir y flexible para corregirse (Weick, 1995).
- **Resiliencia y capacidades dinámicas (los buffers).** La resiliencia se construye por **redundancia** (prima de seguro) o **flexibilidad** (que además rinde en la operación diaria), y la vulnerabilidad combina probabilidad y consecuencias (Sheffi & Rice); se distingue resistir, absorber, adaptarse y transformar (Holling, 1973; Woods, 2003). Las capacidades dinámicas añaden detectar, aprovechar y transformar recursos ante el cambio (Teece, Pisano & Shuen, 1997). Un buffer no es inventario pasivo: es capacidad con costo para sostener decisiones bajo estrés.
- **Trade-offs, decisión robusta y opciones reales.** Decidir bajo incertidumbre no es maximizar todo, sino elegir qué proteger y qué sacrificar, y **declararlo ex ante**. La decisión robusta busca estrategias suficientemente buenas a través de muchos futuros plausibles —caracterizando vulnerabilidades y trade-offs— en vez de optimizar para un solo pronóstico; las opciones reales valoran la flexibilidad —postergar, escalar, abandonar, diversificar— (Schoemaker, 1995, 2012).
- **Revisión: doble bucle y actualización bayesiana.** La **R** no corrige solo la ejecución dentro del marco viejo (bucle simple); pregunta si el marco mismo era erróneo o estrecho (doble bucle; Argyris) —distingue *error de ejecución* de *error de encuadre*—. Y trata cada inject como evidencia que obliga a sopesar hipótesis rivales y actualizar credibilidades, no a "ajustar" sin más (inferencia bayesiana; Fairfield & Charman). El inject es, en el wargaming, un *freeze probe*.
- **Conversación actual (2024–2026).** El foco se desplaza de VUCA hacia la *incertidumbre profunda* y la *complejidad dinámica*: importa distinguir ruido contextual, inestabilidad dinámica e incertidumbre estructural. El wargaming se reivindica como puente entre inteligencia, foresight y estrategia, y el inject se entiende como dispositivo para convertir información difusa en hipótesis operativas, vulnerabilidades visibles y señales de revisión.

## Cuándo usarlo
Cuando enfrentas un **evento emergente** (no una rutina), con **información incompleta**, **recursos escasos** y **obligación de rendir cuentas**. Si la respuesta es obvia o el futuro es conocido, no necesitas E-BTA/R: necesitas ejecutar.

## Qué NO es
No es un algoritmo que entrega la respuesta; no es un pronóstico; no es un puntaje. Es una forma de pensar y de comunicar una decisión.

---

# 3. Componentes

> Cada componente tiene la misma estructura: **qué es · base teórica · cómo se reconoce · error frecuente · ejemplo**.

## 3.1 Evento (E)
**Qué es.** El hecho que abre la incertidumbre y obliga a decidir. Se clasifica en cuatro tipos (puede ser más de uno a la vez):

- **Súbito-discreto:** ocurre en una ventana corta, con un inicio identificable (un anuncio, un fallo, un corte).
- **Acumulativo:** una variable cruza un umbral tras meses de evolución. **El evento es el cruce, no la evolución.**
- **Cascada:** un golpe en un canal dispara otros en secuencia, y el efecto secundario supera al primero.
- **Legitimidad:** altera la licencia social, política o institucional para operar; sus efectos monetarios son indirectos pero estructurales.

**Base teórica.** La incertidumbre knightiana (Knight, 1921: no todo evento trae probabilidades conocidas) y la literatura de umbrales: lo relevante no es la tendencia lenta sino el momento en que cruza el umbral que rompe el modelo. La tipología dialoga con la distinción entre *cisne negro* (Taleb, 2007) —sorpresa genuina— y *rinoceronte gris* (Wucker) —amenaza visible que nadie quiso atender—.

**Cómo se reconoce.** Aplica un **criterio de demarcación**: si no puedes nombrar por qué un hecho es evento (y no un factor de fondo), todavía no lo es. Un *factor* es contexto permanente; un *evento* cambia la decisión.

**Error frecuente.** Confundir la erosión lenta (factor) con el evento. En un caso de consumo, "el poder adquisitivo baja" es factor; "cruzó el punto en que el cliente ya no puede comprar el producto" es el evento.

**Ejemplo.** Un cambio regulatorio que se anuncia un viernes a las 17:30 es súbito-discreto; si además dispara financiero → legitimidad, es también cascada.

## 3.2 Canales de impacto (C)
**Qué es.** La vía por la que el evento golpea al negocio. Cinco canales: **operacional, financiero, regulatorio-legal, legitimidad, modelo de negocio.** Casi todo evento viaja por al menos dos; uno es el **dominante**.

**Base teórica.** Análisis de mecanismos de transmisión (la cadena causal evento → efecto) y de stakeholders/sistemas: el impacto no es difuso, viaja por canales nombrables.

**Cómo se reconoce.** Pregunta "¿por dónde me pega primero y con más fuerza?". Si no puedes nombrar el canal dominante, no has completado el mapa de impacto. Mapea también la **segunda ronda** (a qué canal salta después).

**Error frecuente.** Decir "me afecta en todo". Eso no es análisis; es ansiedad. El rigor está en jerarquizar.

**Ejemplo.** Una crisis reputacional entra por **legitimidad**, pero su segunda ronda puede ser **operacional** (un paro) o **regulatorio** (un expediente).

## 3.3 Buffer (B)
**Qué es.** Una capacidad que te protege. Para que cuente como buffer debe cumplir **dos** condiciones a la vez: (1) operar sobre un **canal nombrable** (no "protege en general") y (2) tener un **costo de activación medible**, en una de cuatro unidades: **caja, tiempo, capital político o legitimidad.** Si no cumple ambas, no es buffer: es contexto.

**Tres ejes.** Cada buffer se caracteriza por **potencia** (cuánto absorbe), **duración** (cuánto dura antes de agotarse) y **costo** (qué pagas y en qué unidad).

**Base teórica.** La resiliencia empresarial se construye por **redundancia** (prima de seguro) o **flexibilidad** (que además rinde en la operación diaria) (Sheffi & Rice); la literatura de resiliencia distingue resistir, absorber, adaptarse y transformar (Holling, 1973; Woods, 2003), y las capacidades dinámicas añaden detectar, aprovechar y transformar recursos (Teece, Pisano & Shuen, 1997). Un buffer no es inventario pasivo: es capacidad con costo para sostener decisiones bajo estrés (y puede crear rigideces o falsa seguridad).

**Cómo se reconoce.** Si puedes nombrar canal + costo, es buffer; si no, es ilusión. Cuidado con el **buffer-trampa**: el que parece fuerte pero es ilusorio o perverso según el momento o el canal (p. ej., una relación institucional usada tarde, que se lee como presión).

**Error frecuente.** Llamar buffer a cualquier recurso ("tenemos marca", "tenemos experiencia") sin nombrar sobre qué canal opera ni qué cuesta activarlo.

**Ejemplo.** Una reserva de caja protege el canal financiero, cuesta en caja y se agota en 1–2 rondas: buffer real pero limitado.

## 3.4 Incertidumbre (U)
**Qué es.** Aquello que no sabes y que afecta la decisión. Cuatro fuentes: **ocurrencia** (¿pasará?), **magnitud** (¿cuán fuerte?), **duración** (¿cuánto dura?) y **actor** (¿cómo reaccionan quienes pueden cambiar el escenario?).

**Base teórica.** Riesgo vs incertidumbre (Knight, 1921) y los marcos VUCA/TUNA: la incertidumbre se modela como escenarios, no como un dato puntual (Oriesek & Schwarz, 2021; Ramirez & Wilkinson, 2016).

**Cómo se reconoce.** Nombra la **fuente principal** que pesa sobre tu decisión. No todas las incertidumbres importan igual; una suele dominar.

**Error frecuente.** Tratar el futuro como conocido ("seguro que pasa X") o como totalmente opaco ("no se puede saber nada"). Ambos extremos evitan el trabajo de poner bandas.

**Ejemplo.** En un cambio regulatorio, la fuente principal puede ser la **ocurrencia** (¿se publica la norma?) y la secundaria la **duración** (¿el plazo se prorroga?).

## 3.5 Trade-off (T)
**Qué es.** Toda decisión protege algo a costa de otra cosa. El trade-off nombra **qué proteges (X)**, **qué sacrificas (Y)** y **qué riesgo residual** queda en pie.

**Base teórica.** Costo de oportunidad, opciones reales (flexibilidad: postergar, escalar, abandonar, diversificar; Schoemaker, 1995, 2012) y **decisión robusta** (estrategias buenas a través de muchos futuros, no óptimas para uno; caracterizar vulnerabilidades y trade-offs). El mérito está en **declarar el sacrificio ex ante**, antes de que una pérdida implícita se vuelva sorpresa moral o política. A veces la mejor jugada no elige sobre la frontera dada, sino que la **expande** (capacidades dinámicas; Teece, Pisano & Shuen, 1997).

**Cómo se reconoce.** Si tu decisión "no sacrifica nada", no es una decisión: es un deseo. El riesgo residual es la parte honesta del análisis.

**Error frecuente.** Presentar el trade-off como dilema absoluto ("o cumplimos o quebramos") en vez de como una asignación de recursos con costo y riesgo nombrados.

**Ejemplo.** Protejo el acceso al cliente con una presentación más pequeña; sacrifico margen unitario; riesgo residual: que se lea como "achicar para encarecer".

## 3.6 Acción táctica e indicadores (A)
**Qué es.** La decisión formulada, más **cómo sabrás si va bien o si hay que revisar**: dos indicadores (**I1, I2**) y un **umbral T** que, al cruzarse, dispara la revisión.

**Base teórica.** Decisión primada por reconocimiento (Klein): bajo presión no se optimiza, se elige el primer curso de acción viable y se acota con indicadores. Indicadores adelantados vs rezagados y gestión por excepción: se vigilan pocas señales con umbrales claros que disparan la revisión; el wargaming permite probar cursos de acción por movimientos (Dorton et al., 2023).

**Cómo se reconoce.** Un buen indicador es medible y oportuno; un buen umbral es específico ("si las ventas caen >15% en 3 semanas"), no vago ("si las cosas empeoran").

**Error frecuente.** Decidir sin indicadores, o ponerlos sin umbral. Sin umbral, no hay disparador de revisión.

**Ejemplo.** I1: salida neta de saldos; I2: movimiento del competidor. Umbral T: si I1 supera 10% en una semana, revisar.

## 3.7 Revisión (/R)
**Qué es.** Cuando llega información nueva (el **inject**), no ajustas al margen: **reabres**. Declaras qué supuesto **mantienes**, cuál **abandonas** y cuál **inviertes**, y reformulas la frase E-BTA/R.

**Base teórica.** El aprendizaje de **doble bucle** (Argyris): el bucle simple corrige la ejecución dentro del marco; el doble bucle cuestiona el marco mismo —distingue el *error de ejecución* del *error de encuadre*—. Se apoya en la revisión por rondas del wargaming, donde el *freeze probe* —el inject— obliga a reabrir (Perla, 1990; Dorton et al., 2023); en el *sensemaking* (Weick, 1995); y en la actualización bayesiana ante evidencia discriminante —nombrar hipótesis rivales y actualizar su credibilidad— (Fairfield & Charman). Revisar no es ajustar al margen: es reabrir los supuestos.

**Cómo se reconoce.** Una buena revisión nombra el supuesto que sostenía la decisión original y lo somete a la nueva información. Si tu decisión revisada es idéntica a la inicial sin justificar por qué, probablemente no revisaste: te aferraste. Además, clasifica tu revisión: **bucle simple** si solo ajustas la ejecución manteniendo el encuadre; **doble bucle** si cambias el encuadre mismo —el tipo de evento, el canal dominante o qué cuenta como buffer—. Distinguir el *error de ejecución* del *error de encuadre* es parte del aprendizaje.

**Error frecuente.** Tratar el inject como un detalle y "ajustar" en lugar de reabrir. El inject suele **mover el canal dominante**; si tu buffer servía para el canal viejo, quizá ya no sirve.

**Ejemplo.** Mantengo el supuesto de que el cliente valora la estabilidad; abandono el supuesto de que el plazo se ablandaría; invierto el supuesto sobre el competidor: de "es postura" a "es plan".

---

# 4. Ejemplos

## 4.1 Ejemplo guiado (de juguete)
Una cafetería de barrio se entera un lunes de que el dueño del local le subirá el alquiler 40% en 30 días.

> *Dado el evento (alza súbita del alquiler), que abre incertidumbre de **magnitud** sobre el canal **financiero**, protejo el **flujo de caja** mediante un buffer de **reserva** (potencia media, dura ~2 meses, costo en caja), sacrifico parcialmente **margen** subiendo precios con moderación, monitoreo las **ventas semanales** y las **quejas de clientes**, y reviso si las ventas caen más de **15% en tres semanas**.*

Desglose por componente: **E** = alza súbita; **C** = financiero; **U** = magnitud; **B** = reserva (caja); **T** = protejo caja / sacrifico margen / riesgo residual: perder clientes sensibles al precio; **A** = subir precios con moderación + indicadores; **R** (si llega un inject, p. ej. "el local de al lado cierra y baja la zona"): reabrir.

El ejemplo no es "la respuesta correcta": es la **forma** de una decisión que se puede defender y revisar.

## 4.2 Cómo se ve en un caso real-ista (sin spoiler)
En el Caso A, una fintech recibe un borrador de circular un viernes por la tarde. El alumno deberá demarcar si es evento o factor, nombrar el canal dominante, elegir entre buffers con costos en cuatro unidades distintas, y —cuando el facilitador dispare un inject— revisar. No hay una jugada ganadora: cada movimiento protege un canal a costa de otro, y los recursos no alcanzan para todo. Esa es, justamente, la dificultad que se entrena. (Detalle de cada caso en **Casos**; los datos completos aparecen dentro del recorrido.)

---

# 5. Casos

Tres casos, anclados en el contexto venezolano (alta variabilidad regulatoria, fricción cambiaria, escasez de buffers convencionales). El selector vive en **Inicio**.

- **Caso A — Vala Pagos · Fintech de pagos y remesas.** "Una plataforma de pagos y remesas enfrenta un cambio regulatorio repentino en un entorno cambiario tensionado." Caso ancla: el ciclo completo y más rico, base del memo evaluable. ~180 min. Recomendado para empezar.
- **Caso B — Provista · Alimentos de consumo masivo.** "Una empresa de alimentos descubre que su cliente histórico ya no puede pagar su producto." Caso de transferencia, ciclo comprimido. ~60 min.
- **Caso C — Rauda · Plataforma de reparto.** "Una app de delivery enfrenta una crisis pública que estalla tras un caso viral." Caso portable, ciclo comprimido. ~60 min.

*Empieza por el Caso A si es tu primera vez o si harás el memo. Usa B o C para practicar la transferencia del marco a otros sectores.* (El selector no muestra el tipo de evento ni el canal dominante: eso es justo lo que tú debes deducir.)

---

# 6. Guía de uso

**El recorrido tiene 10 pantallas, lineales:** 1) Briefing y dossier del caso · 2) Clasificación del evento · 3) Mapa de impacto · 4) Buffer Board · 5) Trade-off · 6) Decisión y frase E-BTA/R · 7) Indicadores y umbral · 8) **Inject** (punto de no retorno) · 9) Revisión forzada · 10) Export (PDF).

**Reglas:**
- No puedes avanzar con campos obligatorios vacíos.
- **Tras el inject (Pantalla 8) no puedes volver atrás.** La revisión es reapertura, no edición. Esta restricción es intencional: es el corazón del ejercicio.
- Puedes **consultar cualquier sección de referencia** en cualquier momento desde la barra superior: se abre sobre tu recorrido y, al cerrarla, vuelves a tu pantalla sin perder nada.
- El recorrido termina en un **PDF** con todo tu razonamiento. Es el insumo de tu **memo** (1.200–1.500 palabras), el único entregable evaluable.

**El simulador no te evalúa.** Captura tu razonamiento; la evaluación la hace el facilitador con una rúbrica.

## Modalidades del recorrido
El facilitador puede correr el laboratorio en dos modos:

- **Tabletop (TTX):** un único inject guionado, revisión y hot wash. Es el modo por defecto.
- **Wargame:** además del inject, el actor **replica** tu decisión. Antes de ver su reacción, anticipas cómo crees que responderá; luego el facilitador revela la réplica y haces una segunda revisión. Entrena el pensamiento de segundo orden: el otro también juega.

## La R tiene dos formas
Al revisar (Pantalla 9) clasificarás tu revisión: **bucle simple** —ajustas la ejecución, mantienes el encuadre— o **doble bucle** —reabres el encuadre: cambia el tipo de evento, el canal dominante o qué cuenta como buffer—. Hacer visible esa diferencia distingue cuándo fallaste al *actuar* de cuándo fallaste al *definir* lo que ocurría.

---

# 7. Glosario

- **Evento:** hecho que abre incertidumbre y obliga a decidir. Cuatro tipos (súbito-discreto, acumulativo, cascada, legitimidad).
- **Factor:** condición de fondo, permanente; no es evento hasta que algo cruza un umbral.
- **Criterio de demarcación:** la razón explícita por la que un hecho cuenta como evento (y de qué tipo).
- **Canal de impacto:** vía por la que el evento golpea (operacional, financiero, regulatorio-legal, legitimidad, modelo de negocio).
- **Canal dominante:** el canal por el que el evento pega primero y con más fuerza.
- **Segunda ronda:** el canal al que salta el impacto después del golpe inicial.
- **Buffer:** capacidad que protege un canal nombrable a un costo de activación medible. Si no cumple ambas, es contexto.
- **Ejes del buffer:** potencia, duración, costo (con su unidad).
- **Unidades de costo:** caja, tiempo, capital político, legitimidad.
- **Buffer ilusorio / perverso:** el que no opera sobre el canal dominante, o el que tiene un costo diferido alto en otro canal.
- **Incertidumbre:** lo que no sabes y afecta la decisión. Fuentes: ocurrencia, magnitud, duración, actor.
- **Trade-off:** qué proteges, qué sacrificas, qué riesgo residual queda.
- **Riesgo residual:** el riesgo que permanece después de tu decisión.
- **Frase E-BTA/R:** la formulación completa y defendible de la decisión.
- **Indicador (I1, I2):** señal medible y oportuna que vigilas.
- **Umbral T:** valor o condición que, al cruzarse, dispara la revisión.
- **Inject** (*inyección de información*): término del wargaming y los ejercicios de mesa para un acontecimiento o dato que el facilitador introduce durante el ejercicio. En EntornoLab, el inject **revela información que ya estaba latente** en el caso —no es una noticia nueva inventada— y obliga a **revisar** la decisión. Se conserva la palabra inglesa *inject* por ser el estándar en la literatura (Perla, 1990; Dorton et al., 2023), con su traducción a la vista.
- **Revisión (la R):** reabrir la decisión (doble bucle): qué supuesto mantienes, cuál abandonas, cuál inviertes.
- **Dossier del caso:** datos del caso (financieros, actores, incertidumbres, economía de buffers, restricciones) que aparecen en el recorrido.
- *Puentes con la familia:* en **MacroLab** un evento equivale a un **shock**; en **MercaLab**, el ajuste de un **equilibrio**. EntornoLab se ocupa de la **decisión** ante esos cambios.

---

# 8. Orientación rápida por pantalla (Función · Primer paso · Límite · Cierre)

> Tarjeta breve mostrada en cada pantalla del recorrido (modelo MacroLab). Cuatro casillas.

**P1 · Briefing y dossier** — *Función:* entender el caso y sus datos. *Primer paso:* lee la señal inicial y abre el dossier (financieros, actores). *Límite:* no decidas todavía; primero comprende. *Cierre:* ten claro qué decisión se te pide y en qué plazo.

**P2 · Clasificación** — *Función:* demarcar el evento. *Primer paso:* pregunta si es evento o factor. *Límite:* no asignes tipo sin criterio. *Cierre:* tipo(s) + criterio + fuente principal de incertidumbre.

**P3 · Mapa de impacto** — *Función:* nombrar por dónde golpea. *Primer paso:* identifica el canal dominante. *Límite:* no digas "afecta a todo". *Cierre:* dominante, secundario y segunda ronda.

**P4 · Buffer Board** — *Función:* elegir y costear la protección. *Primer paso:* revisa la economía de cada buffer. *Límite:* no llames buffer a lo que no tiene canal ni costo. *Cierre:* hasta 2 buffers con potencia, duración, costo y unidad.

**P5 · Trade-off** — *Función:* hacer explícito el costo. *Primer paso:* nombra qué proteges. *Límite:* no lo plantees como dilema absoluto. *Cierre:* protejo / sacrifico / riesgo residual.

**P6 · Decisión y frase** — *Función:* formular la decisión. *Primer paso:* arma la frase E-BTA/R con lo capturado. *Límite:* que sea completa y consistente. *Cierre:* una frase defendible ante un comité.

**P7 · Indicadores** — *Función:* definir cómo revisarás. *Primer paso:* elige dos señales medibles. *Límite:* no dejes el umbral vago. *Cierre:* I1, I2 y un umbral T específico.

**P8 · Inject** — *Función:* recibir información latente. *Primer paso:* léela con atención. *Límite:* **desde aquí no se vuelve atrás.** *Cierre:* identifica qué cambia.

**P9 · Revisión** — *Función:* reabrir la decisión. *Primer paso:* localiza el supuesto que la sostenía. *Límite:* no ajustes al margen; reabre. *Cierre:* mantengo / abandono / invierto + nueva frase + clasifica si fue **bucle simple** o **doble bucle**. (En modo wargame: anticipa la réplica del actor, recíbela y haz una segunda revisión.)

**P10 · Export** — *Función:* llevarte el razonamiento. *Primer paso:* genera el PDF. *Límite:* no es un puntaje, es tu insumo. *Cierre:* úsalo para el memo.

---

# 9. Referencias del marco

Base teórica de E-BTA/R (alineada con el documento curricular *Marco E-BTA/R y simulador*, §4, y con la nota de estudio teórica del curso). La bibliografía completa en formato APA vive en ese documento curricular (§13).

- **Knight, F. H. (1921).** *Risk, Uncertainty and Profit.* — Riesgo vs. incertidumbre.
- **Taleb, N. N. (2007).** *The Black Swan.* — Eventos de cola / cisne negro.
- **Wucker, M. (2016).** *The Gray Rhino.* — Amenazas visibles desatendidas (rinoceronte gris).
- **Oriesek, D. F., & Schwarz, J. O. (2021).** *Winning the Uncertainty Game* — Business wargaming; estrategia continua y *dual operating system*.
- **Ramirez, R., & Wilkinson, A. (2016).** *Strategic Reframing: The Oxford Scenario Planning Approach* — Marco TUNA.
- **Perla, P. P. (1990).** *The Art of Wargaming*; **Perla & McGrady (2011)**, *Why Wargaming Works*.
- **Dorton, S., et al. (2023).** Wargames y tabletop exercises como herramientas naturalistas — captura de decisiones, *freeze probes*, *hot wash*.
- **Klein, G., et al. (1993).** Naturalistic Decision Making / decisión primada por reconocimiento.
- **Weick, K. E. (1995).** *Sensemaking in Organizations.*
- **Argyris, C.** Aprendizaje de bucle simple y doble bucle.
- **Holling, C. S. (1973); Woods, D. D. (2003).** Resiliencia (resistir, absorber, adaptarse, transformar).
- **Sheffi, Y., & Rice, J. B. (2005).** *A Supply Chain View of the Resilient Enterprise*; Sheffi, *The Resilient Enterprise* — redundancia vs. flexibilidad.
- **Teece, D. J., Pisano, G., & Shuen, A. (1997).** Capacidades dinámicas.
- **Schoemaker, P. J. H. (1995, 2012).** Planificación por escenarios y opciones reales.
- **Fairfield, T., & Charman, A. E.** *Social Inquiry and Bayesian Inference* — actualización de hipótesis rivales ante evidencia.
- *Decisión robusta* (estrategias buenas a través de muchos futuros) y, en la conversación 2024–2026, *incertidumbre profunda* y *complejidad dinámica*.
