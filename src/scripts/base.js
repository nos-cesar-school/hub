// Tema claro/escuro e menu do cabeçalho, comuns a todas as páginas novas.
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');

function setTheme(t, save) {
  if (t === 'light') root.dataset.theme = 'light';
  else root.removeAttribute('data-theme');
  const light = t === 'light';
  themeBtn.textContent = light ? 'Escuro' : 'Claro';
  themeBtn.setAttribute('aria-label', light ? 'Mudar para modo escuro' : 'Mudar para modo claro');
  if (save) {
    try { localStorage.setItem('nos-theme', t); } catch { /* sem armazenamento: só não lembra a escolha */ }
  }
}
setTheme(root.dataset.theme === 'light' ? 'light' : 'dark', false);
themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true));

const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const setMenu = (open) => {
  menu.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
};
menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
});
