const CATEGORIA_LABELS = {
  'acuarelas': 'Acuarelas',
  'dibujo-digital': 'Dibujo digital',
  'pintura': 'Pintura',
  'varios': 'Varios',
};

const CATEGORIA_PIGMENTOS = {
  'acuarelas': '--pigment-cerulean',
  'dibujo-digital': '--pigment-magenta',
  'pintura': '--pigment-ochre',
  'varios': '--pigment-teal',
};

let obras = [];
let categoriaActiva = 'todas';

async function cargarObras() {
  const grid = document.getElementById('galleryGrid');
  try {
    const res = await fetch('data/obras.json');
    if (!res.ok) throw new Error('No se pudo cargar obras.json');
    const data = await res.json();
    obras = data.obras || [];
    renderGaleria();
  } catch (err) {
    grid.innerHTML = '<p class="gallery-empty">No se pudieron cargar las obras. Verificá data/obras.json.</p>';
    console.error(err);
  }
}

function renderGaleria() {
  const grid = document.getElementById('galleryGrid');
  const filtradas = categoriaActiva === 'todas'
    ? obras
    : obras.filter((o) => o.categoria === categoriaActiva);

  if (filtradas.length === 0) {
    grid.innerHTML = '<p class="gallery-empty">Todavía no hay obras en esta categoría.</p>';
    return;
  }

  grid.innerHTML = filtradas.map((obra) => `
    <article class="gallery-item" data-index="${obras.indexOf(obra)}">
      <div class="img-wrap">
        <img src="${obra.imagen}" alt="${obra.titulo}" loading="lazy">
      </div>
      <div class="info">
        <h3>${obra.titulo}</h3>
        <span>${CATEGORIA_LABELS[obra.categoria] || obra.categoria} · ${obra.anio || ''}</span>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      const obra = obras[Number(item.dataset.index)];
      abrirLightbox(obra);
    });
  });
}

function actualizarEstadoGaleria() {
  const dot = document.getElementById('statusDot');
  const label = document.getElementById('statusLabel');

  if (categoriaActiva === 'todas') {
    dot.style.background = 'var(--paper)';
    label.textContent = 'Todas las obras';
  } else {
    dot.style.background = `var(${CATEGORIA_PIGMENTOS[categoriaActiva]})`;
    label.textContent = CATEGORIA_LABELS[categoriaActiva];
  }

  document.querySelectorAll('.pigment-pill').forEach((pill) => {
    pill.classList.toggle('active', pill.dataset.categoria === categoriaActiva);
  });
}

function seleccionarCategoria(categoria, { scroll = true } = {}) {
  categoriaActiva = categoria;
  actualizarEstadoGaleria();
  renderGaleria();
  if (scroll) {
    document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' });
  }
}

function abrirLightbox(obra) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  img.src = obra.imagen;
  img.alt = obra.titulo;
  caption.textContent = `${obra.titulo} — ${obra.descripcion || ''}`;
  lightbox.classList.add('open');
}

function cerrarLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

function initPigmentPills() {
  document.querySelectorAll('.pigment-pill').forEach((pill) => {
    pill.addEventListener('click', () => seleccionarCategoria(pill.dataset.categoria));
  });
  document.getElementById('verTodas').addEventListener('click', () => seleccionarCategoria('todas'));
}

function initLightbox() {
  document.getElementById('lightboxClose').addEventListener('click', cerrarLightbox);
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') cerrarLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarLightbox();
  });
}

function initNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

function initCopyEmail() {
  const btn = document.getElementById('copyEmail');
  if (!btn) return;
  const email = btn.dataset.email;
  const textoOriginal = btn.textContent;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      const input = document.createElement('input');
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    btn.textContent = 'Copiado ✓';
    setTimeout(() => { btn.textContent = textoOriginal; }, 1800);
  });
}

async function cargarConfig() {
  try {
    const res = await fetch('data/config.json');
    if (!res.ok) throw new Error('No se pudo cargar config.json');
    const config = await res.json();
    const heroImage = document.getElementById('heroImage');
    if (config.heroImagen) heroImage.src = config.heroImagen;
    if (config.heroAlt) heroImage.alt = config.heroAlt;
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarObras();
  cargarConfig();
  actualizarEstadoGaleria();
  initPigmentPills();
  initLightbox();
  initNav();
  initCopyEmail();
});
