const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation?.classList.toggle('is-open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const themeButton = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-toggle-label');
const themeIcon = document.querySelector('.theme-toggle-icon');
let savedTheme = null;
try {
  savedTheme = localStorage.getItem('algorithmistic-theme');
} catch {
  // Keep theme switching usable when browser storage is unavailable.
}
if (savedTheme === 'dark') document.body.dataset.theme = 'dark';

function updateThemeButton() {
  const isDark = document.body.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-pressed', String(isDark));
  themeButton?.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  if (themeLabel) themeLabel.textContent = isDark ? 'Light theme' : 'Dark theme';
  if (themeIcon) themeIcon.textContent = isDark ? '☾' : '☼';
}

updateThemeButton();
themeButton?.addEventListener('click', () => {
  const isDark = document.body.dataset.theme !== 'dark';
  if (isDark) document.body.dataset.theme = 'dark';
  else delete document.body.dataset.theme;
  try {
    localStorage.setItem('algorithmistic-theme', isDark ? 'dark' : 'light');
  } catch {
    // The current-page theme still changes if storage is blocked.
  }
  updateThemeButton();
  themeButton.classList.remove('is-animating');
  requestAnimationFrame(() => themeButton.classList.add('is-animating'));
  window.setTimeout(() => themeButton.classList.remove('is-animating'), 520);
});
