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

/* Scroll reveal, pipeline line draw, and count-up for the at-a-glance numbers */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.section-heading,.specs dl,.spec-grid,.pipeline,.notice,.privacy-copy,.privacy-points,.closing');
if ('IntersectionObserver' in window && !reduce) {
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const seen = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    seen.unobserve(e.target);
    if (e.target.matches('.specs dl')) countUp(e.target);
  }), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  revealTargets.forEach((el) => seen.observe(el));
}
function countUp(root) {
  root.querySelectorAll('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    if (!end) return;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 900);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
