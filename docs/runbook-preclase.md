# Runbook preclase — EntornoLab (20 y 22 de julio de 2026)

Edición **Tabletop (TTX)**, aula **multidispositivo** (cada participante en su propio navegador). Sitio público: `https://pavelgomez.github.io/EntornoLab-Decision-Simulator/`

---

## 1. Enlace de recorrido preconfigurado

El participante abre un enlace que fija **caso**, **inject** y **sesión**. El simulador valida los parámetros, fuerza **TTX** y, si el token de sesión es nuevo, empieza limpio (no arrastra una sesión previa del navegador).

**Formato:**

```
https://pavelgomez.github.io/EntornoLab-Decision-Simulator/?caso=A&inject=<ID>&sesion=<token>
```

- `caso` — `A`, `B`, `C` o `3`.
- `inject` — uno de los IDs de abajo (si es inválido, se ignora y usa el primero del caso).
- `sesion` — un token cualquiera y **único por sesión de clase**, p. ej. `sesion=20jul-am`. Cambiarlo obliga a un recorrido limpio.
- (`modo=ttx` es implícito; no hace falta añadirlo.)

**IDs de inject por caso** (elige **uno**):

| Caso | Injects disponibles |
|------|---------------------|
| A (Vala Pagos) | `court_ruling` · `competitor_move` · `political_alignment` |
| B (Provista) | `distributor_exit` · `competitor_downsize` · `price_control_signal` |
| C (Rauda) | `courier_strike` · `political_position` · `regulator_inquiry` |
| 3 (Envases del Centro) | `anchor_client_exit` · `environmental_inquiry` · `resin_shock` |

**Ejemplo (Caso A, inject del fallo judicial, sesión de la mañana del 20):**

```
https://pavelgomez.github.io/EntornoLab-Decision-Simulator/?caso=A&inject=court_ruling&sesion=20jul-am
```

> El enlace **no** oculta el inject: un participante técnico podría leer el ID. Es un riesgo residual aceptado para este piloto. El enlace **no** transporta notas, análisis ni claves del facilitador.

---

## 2. Antes de la sesión (30 minutos antes)

1. Abre el sitio público en tu equipo y confirma que **carga** (portada con "Antes de empezar · 2-3 min").
2. Confirma la edición: el pie dice **EntornoLab v1.8**; la portada dice **A-C práctica · Caso 3 entrega · PDF + JSON**.
3. (Opcional, para ver injects/notas) abre la **consola docente local** — ver §5. No es necesaria para conducir la clase.
4. Decide **caso** e **inject** de la sesión y arma el **enlace** (§1) con un `sesion` nuevo.
5. **Pruébalo en una ventana de incógnito**: debe abrir en la Pantalla 1 del caso elegido, sin arrastrar progreso previo.
6. Recorre rápido hasta P8 y confirma que el **inject que aparece es el que fijaste**.
7. Ten a mano el **instructivo para el participante** (§3) y el **plan B** (§6).

---

## 3. Instrucción exacta para el participante

> "Abran este enlace en un navegador (mejor una ventana nueva o de incógnito). Recorran las pantallas 1 a 7 a su ritmo. **No avancen a la pantalla 8 (Inject) hasta que yo lo indique.** Cuando yo lo diga, lean el inject, hagan la revisión (pantalla 9) y **descarguen el PDF y el JSON** al final (pantalla 10)."

- El **inject se revela solo** al llegar a P8. El control es **verbal**: tú anuncias cuándo avanzar.
- Recuérdales: **A-C son práctica; la entrega es el Caso 3; el memo es lo único calificado.**

---

## 4. Durante la sesión

1. Los participantes recorren P1-P7.
2. Cuando la mayoría llegó a P7, das la señal para **avanzar a P8** (punto de no retorno).
3. Tras el inject: P9 (revisión) y P10 (**descargar PDF + JSON**, mismo `verifyCode`).
4. Cierra con el hot wash (guía del facilitador).

---

## 5. Consola docente local (opcional)

La consola con datos del facilitador (injects completos, notas, análisis) **no está publicada** en el sitio. Vive en la rama **`consola-docente-v18`** del repositorio y se corre **en local**:

```bash
git clone https://github.com/PavelGomez/EntornoLab-Decision-Simulator.git
cd EntornoLab-Decision-Simulator
git checkout consola-docente-v18
python3 -m http.server 8000
# abrir http://localhost:8000/?vista=consola
```

- La consola pide una **frase de acceso** que tú defines (no está escrita en el repositorio). Reemplaza `CONSOLE_GATE_HASH` en `src/console.js` por el `sha256` de tu frase (instrucción en el propio archivo).
- La consola es **solo para ti, en tu equipo**. No la despliegues en línea.
- Para el aula multidispositivo, la consola sirve para **preparar** (ver injects y notas); el control del inject en el aula es **verbal** + el enlace preconfigurado.

---

## 6. Planes B

| Falla | Plan B |
|-------|--------|
| **Consola docente** no abre | No es necesaria para conducir. Usa el enlace preconfigurado + control verbal del inject. Los IDs de inject están en §1. |
| **El enlace/parámetros** no toman | Indica entrar por el sitio y elegir el caso a mano en la portada; el inject por defecto (primero del caso) se revela solo en P8. Anuncia el avance verbalmente. |
| **Exportación PDF/JSON** falla en un equipo | Que el participante use "Vista imprimible" (P10) y guarde como PDF desde el navegador; el JSON puede copiarse. Si falla del todo, que fotografíe/transcriba su frase E-BTA/R final; el memo se hace con eso. |
| **GitHub Pages** caído | Corre el sitio en local (`python3 -m http.server`) y comparte por proyección; o ejecuta la sesión con **plantilla E-BTA/R en papel** y el dossier del caso. El marco es independiente del motor. |

---

## 7. Al cerrar

- Recuerda a los participantes que la **entrega es el Caso 3** (memo 1.200-1.500 palabras, PDF + JSON adjuntos).
- Limpia el estado de prueba de tu equipo: en la consola del navegador, `localStorage.clear()` y recarga.
