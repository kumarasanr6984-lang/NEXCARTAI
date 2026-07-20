window.applyTheme = function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  localStorage.setItem('nexcartai_theme', isDark ? 'dark' : 'light');

  const toggleButton = document.getElementById('themeToggle');
  if (toggleButton) {
    toggleButton.textContent = isDark ? '☀️' : '🌙';
    toggleButton.setAttribute('aria-pressed', String(isDark));
  }
};

window.toggleTheme = function toggleTheme() {
  const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  window.applyTheme(nextTheme);
};

function initTheme() {
  const toggleButton = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('nexcartai_theme');
  window.applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      window.applyTheme(nextTheme);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
