const root = document.documentElement;
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

function setMenu(open) {
  menuButton?.setAttribute('aria-expanded', String(open));
  menuButton?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav?.classList.toggle('is-open', open);
}

menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav?.classList.contains('is-open')) { setMenu(false); menuButton?.focus(); }
});

const themeButton = document.querySelector('.theme-toggle');
function syncTheme() {
  const dark = root.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-checked', String(dark));
}
syncTheme();
themeButton?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('algorithmistic-theme', next); } catch { /* storage blocked: theme still applies to this page */ }
  syncTheme();
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const stack = document.querySelector('.stack');
if (stack) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { stack.classList.add('is-visible'); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(stack);
  } else stack.classList.add('is-visible');
}

const consolePanel = document.querySelector('.console');
if (consolePanel && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => consolePanel.classList.toggle('is-paused', !e.isIntersecting)).observe(consolePanel);
}

const tabButtons = document.querySelectorAll('.console-tabs button');
tabButtons.forEach((btn) => btn.addEventListener('click', () => {
  consolePanel.dataset.tab = btn.dataset.tab;
  tabButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
}));

if ('IntersectionObserver' in window) {
  const heroTop = document.querySelector('.hero-top');
  const closing = document.querySelector('.closing');
  if (heroTop) new IntersectionObserver(([e]) => document.body.classList.toggle('show-cta', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(heroTop);
  if (closing) new IntersectionObserver(([e]) => document.body.classList.toggle('cta-hide', e.isIntersecting)).observe(closing);
}
