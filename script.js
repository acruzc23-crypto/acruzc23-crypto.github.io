// ===== Datos de los proyectos =====
// Para agregar un proyecto nuevo, solo añade un objeto a esta lista.
const GITHUB = "https://github.com/acruzc23-crypto";

const projects = [
  {
    icon: "⚡",
    title: "API REST de Tareas",
    description: "API con FastAPI y SQLite para crear, listar, actualizar y eliminar tareas. Incluye validación de datos y pruebas automatizadas con pytest.",
    tags: ["python"],
    stack: "Python · FastAPI · SQLite · pytest",
    repo: `${GITHUB}/tareas-api-fastapi`,
  },
  {
    icon: "💰",
    title: "Control de Gastos",
    description: "Aplicación web para registrar ingresos y gastos, filtrarlos por categoría y ver un resumen gráfico. Los datos se guardan en el navegador.",
    tags: ["javascript"],
    stack: "HTML · CSS · JavaScript",
    repo: `${GITHUB}/control-gastos-js`,
    demo: "https://acruzc23-crypto.github.io/control-gastos-js/",
  },
  {
    icon: "📦",
    title: "Inventario y Ventas",
    description: "Sistema de consola para gestionar productos, stock y ventas con base de datos SQLite, reportes y exportación a CSV.",
    tags: ["python"],
    stack: "Python · SQL · SQLite",
    repo: `${GITHUB}/inventario-python-sql`,
  },
  {
    icon: "🧾",
    title: "Sistema de Facturación",
    description: "Sistema web de facturación que permite agregar productos, calcular subtotales, IVA y total de la factura.",
    tags: ["javascript"],
    stack: "HTML · CSS · JavaScript",
    repo: `${GITHUB}/Sistema-de-Facturaci-n-mejorado`,
  },
];

// ===== Renderizar tarjetas =====
const container = document.getElementById("projects");

function renderProjects(filter = "all") {
  const list = filter === "all" ? projects : projects.filter(p => p.tags.includes(filter));
  container.innerHTML = list.map(p => `
    <article class="project">
      <div class="project__icon">${p.icon}</div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <ul class="tags"><li>${p.stack}</li></ul>
      <div class="project__links">
        <a href="${p.repo}" target="_blank" rel="noopener">Código →</a>
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Demo en vivo →</a>` : ""}
      </div>
    </article>
  `).join("");
}

// ===== Filtros =====
document.getElementById("filters").addEventListener("click", e => {
  if (!e.target.matches(".filter")) return;
  document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  renderProjects(e.target.dataset.filter);
});

// ===== Tema claro / oscuro =====
const themeBtn = document.getElementById("themeBtn");
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  try { localStorage.setItem("theme", theme); } catch (_) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (_) {}
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
themeBtn.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

// ===== Menú móvil =====
const navLinks = document.getElementById("navLinks");
document.getElementById("navToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", e => { if (e.target.tagName === "A") navLinks.classList.remove("open"); });

// ===== Efecto de escritura en el título =====
const words = ["Python", "JavaScript", "APIs REST", "HTML & CSS"];
const typed = document.getElementById("typed");
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (deleting && c > 0) c--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1400); }
  else { deleting = false; w = (w + 1) % words.length; }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// ===== Año del footer =====
document.getElementById("year").textContent = new Date().getFullYear();

renderProjects();
