# Carina Font — Portafolio de Arte

Sitio de portafolio 100% gratuito hecho con HTML, CSS y JavaScript vanilla. Sin frameworks, sin build, sin servidor.

## Cómo agregar una obra nueva

Hay dos formas. Elegí la que prefieras — las dos escriben en el mismo lugar (`data/obras.json`), así que podés alternar entre ellas sin problema.

### Opción A — Panel visual (`/admin`), sin editar archivos

Ver la sección [Panel de administración](#panel-de-administración-admin) más abajo. Requiere el sitio ya publicado en Netlify.

### Opción B — Editar el JSON a mano

1. Poné el archivo de imagen dentro de la carpeta `images/obras/`.
   - Formatos recomendados: `.jpg` o `.webp` (más livianos).
   - Nombre sin espacios ni tildes, ej: `paisaje-otonal.jpg`.
2. Abrí `data/obras.json` y agregá un bloque nuevo dentro de la lista `"obras": [ ... ]`:

```json
{
  "titulo": "Nombre de la obra",
  "categoria": "acuarelas",
  "imagen": "images/obras/paisaje-otonal.jpg",
  "descripcion": "Una frase corta sobre la obra.",
  "anio": 2026,
  "medidas": "30 x 40 cm"
}
```

3. `categoria` debe ser una de estas cinco (en minúsculas, tal cual):
   - `acuarelas`
   - `dibujo-digital`
   - `pintura`
   - `proceso`
   - `varios`
4. `anio` y `medidas` son opcionales — si no los ponés, simplemente no aparecen en la ficha de la obra.
5. Guardá el archivo. La obra nueva aparece primera dentro de su categoría (el sitio siempre muestra lo último agregado arriba) — no hace falta tocar `index.html`.

⚠️ La galería no muestra ninguna obra hasta que el visitante toca una categoría en la portada — es intencional, no un error.

⚠️ Cuidado con la coma: cada obra dentro de `"obras": [...]` va separada por coma, excepto la última.

## Reemplazar las obras de ejemplo

Las 4 obras que vienen cargadas (`ejemplo-acuarela.svg`, etc.) son placeholders de color para probar el diseño. Borralas de `data/obras.json` y de `images/obras/` cuando subas tus obras reales.

## Personalizar textos y contacto

- **Nombre/marca**: cambiá "Carina Font" en `index.html` (etiqueta `<title>` y `.hero-name`). El monograma "CF" del menú está en la clase `.mark`.
- **Categorías y colores de pigmento**: cada categoría tiene un color asignado (`--pigment-cerulean`, `--pigment-magenta`, `--pigment-ochre`, `--pigment-violet`, `--pigment-teal` en `css/style.css`). Si agregás una categoría nueva, sumale también su color ahí y en `CATEGORIA_PIGMENTOS`/`CATEGORIA_LABELS` de `js/gallery.js`, un botón `.pigment-pill` en el hero de `index.html`, y la opción correspondiente en `admin/config.yml`.
- **Imagen del hero**: `images/hero-artwork.svg` es un placeholder abstracto (mezcla de los 4 colores de pigmento). Reemplazalo por una foto o escaneo de una obra real tuya — cualquier `.jpg`/`.png`/`.webp` funciona, solo actualizá la ruta en `<img>` dentro de `.hero-figure` en `index.html`.
- **Sección "Sobre mí"**: editá el texto directamente en `index.html`, dentro de `<section id="sobre-mi">`.
- **Formulario de contacto**: usa [Formspree](https://formspree.io) (gratis hasta 50 envíos/mes).
  1. Creá una cuenta gratuita en formspree.io.
  2. Creá un formulario nuevo y copiá tu endpoint (algo como `https://formspree.io/f/xxxxxxx`).
  3. Reemplazá `https://formspree.io/f/TU_ID_DE_FORMSPREE` en `index.html` por tu endpoint real.
- **Redes sociales**: reemplazá los links de `mailto:`, Instagram y WhatsApp en la sección de contacto de `index.html`.

## Ver el sitio en tu computadora

No hace falta instalar nada. Se puede abrir `index.html` directamente en el navegador, pero para que la galería cargue `obras.json` correctamente (algunos navegadores bloquean `fetch` sobre `file://`), lo mejor es levantar un servidor local simple:

```bash
# Con Python (viene instalado en la mayoría de los sistemas)
python -m http.server 8000
```

Y abrir `http://localhost:8000` en el navegador.

## Publicar gratis en Netlify

1. Subí este repositorio a GitHub (ya está conectado a `carinewage222-cpu/portafolio`).
2. Entrá a [netlify.com](https://netlify.com) y creá una cuenta gratuita.
3. "Add new site" → "Import an existing project" → conectá tu cuenta de GitHub → elegí este repositorio.
4. Dejá la configuración de build vacía (es un sitio estático, no necesita build command ni publish directory especial — o poné `.` como publish directory).
5. Netlify te da un dominio gratuito tipo `nombre-random.netlify.app`, que podés cambiar por uno más lindo (gratis) desde "Site settings" → "Change site name".

Cada vez que hagas `git push` a `main`, Netlify vuelve a publicar el sitio automáticamente.

## Panel de administración (`/admin`)

El sitio incluye [Decap CMS](https://decapcms.org) (antes "Netlify CMS"): un panel visual en `tusitio.netlify.app/admin` donde subís la imagen y completás un formulario, sin tocar ningún archivo. Solo funciona **después** de publicar el sitio en Netlify (no funciona en local ni antes del primer deploy) y hay que habilitarlo una vez:

1. En el panel de Netlify de tu sitio, andá a **Site configuration → Identity** y hacé clic en **Enable Identity**.
2. Todavía en Identity, bajá a **Registration** y dejalo en **Invite only** (así nadie más puede crear una cuenta).
3. Bajá a **Services → Git Gateway** y hacé clic en **Enable Git Gateway**. Esto es lo que le da permiso al panel para escribir commits en tu repositorio de GitHub.
4. Volvé arriba a la pestaña **Identity** y usá **Invite users** para invitarte a vos mismo con tu email. Te va a llegar un correo con un link.
5. Abrí ese link (te va a llevar a `tusitio.netlify.app` y abrir un modal), elegí una contraseña. Quedás logueado.
6. A partir de ahí, entrá cuando quieras a `tusitio.netlify.app/admin`, iniciá sesión, y vas a ver dos secciones:
   - **Obras**: para agregar, editar o borrar piezas de la galería, con imagen incluida.
   - **Configuración del sitio → Portada (inicio)**: para cambiar la imagen grande que aparece en el inicio, sin tocar código.

Los archivos que lo configuran son `admin/index.html` (carga el panel) y `admin/config.yml` (define los campos de cada sección). Si en el futuro agregás una categoría nueva, sumala también a la lista `options` de `categoria` en `admin/config.yml`.

## Estructura del proyecto

```
├── index.html          # Estructura de la página (hero, galería, contacto)
├── css/style.css        # Estilos y diseño responsivo
├── js/gallery.js         # Carga dinámica de obras, filtros y lightbox
├── data/obras.json       # Lista de obras — acá se agregan las nuevas
├── data/config.json      # Imagen y texto alternativo de la portada
├── images/obras/         # Archivos de imagen de las obras
└── admin/
    ├── index.html         # Carga el panel de Decap CMS
    └── config.yml          # Define los campos del formulario de "Obras"
```
