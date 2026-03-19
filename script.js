const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 70}ms`;
  observer.observe(item);
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const THEME_KEY = "portfolio_theme";
const body = document.body;

function applyTheme(theme) {
  body.classList.toggle("theme-dark", theme === "dark");
}

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

applyTheme(getStoredTheme());

const header = document.querySelector(".site-header");
if (header) {
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "theme-toggle";
  toggle.setAttribute("aria-label", "Toggle theme");

  function syncLabel() {
    toggle.textContent = body.classList.contains("theme-dark") ? "Light" : "Dark";
  }

  toggle.addEventListener("click", () => {
    const next = body.classList.contains("theme-dark") ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    syncLabel();
  });

  syncLabel();
  header.appendChild(toggle);
}
