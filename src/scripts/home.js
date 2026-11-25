import './base.js';
import './contato.js';
import { FAQ, FRENTES, TBC } from './dados.js';
import { renderComite, renderLiderancas } from './governanca.js';

// ---------- splash ----------
// Abre com o logo sendo desenhado e depois leva o logo até o cabeçalho.
// Só aparece na primeira visita: depois a home abre direto.
(() => {
  const splash = document.getElementById('splash');
  const html = document.documentElement;
  let jaViu = false;
  try {
    jaViu = localStorage.getItem('nos-abertura-vista') === '1';
    localStorage.setItem('nos-abertura-vista', '1');
  } catch { /* sem armazenamento: mostra a abertura */ }
  if (!splash || jaViu) return;

  // com "reduzir movimento" ligado, o logo aparece parado e a tela some mais rápido
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  splash.hidden = false;
  html.classList.add('splashing');
  const svg = splash.querySelector('svg');
  const target = document.querySelector('.brand svg');
  let done = false;
  function finish() {
    if (done) return;
    done = true;
    clearTimeout(timer);
    // FLIP: move o logo grande até o lugar do logo do cabeçalho
    const a = svg.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    splash.classList.add('fly');
    svg.style.transform = `translate(${b.left - a.left}px, ${b.top - a.top}px) scale(${b.width / a.width})`;
    setTimeout(() => {
      splash.hidden = true;
      html.classList.remove('splashing');
    }, 720);
  }
  const timer = setTimeout(finish, calm ? 1200 : 2100);
  splash.addEventListener('click', finish);
  addEventListener('keydown', (e) => { if (e.key === 'Escape') finish(); }, { once: true });
})();

// ---------- frentes ----------
document.getElementById('frentesList').innerHTML = FRENTES.map((f) => `
  <li class="frente" style="--c:var(--f-${f.id})">
    <h3><i aria-hidden="true"></i>${f.nome}</h3>
    <p>${f.desc}</p>
    <p class="fit"><b>Combina com você se</b>${f.fit} ${TBC}</p>
  </li>`).join('');

// ---------- faq ----------
document.getElementById('faq').innerHTML = FAQ.map(([q, a], i) => `
  <details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a ?? TBC}</p></details>`).join('');

// ---------- integrantes (resumo) ----------
renderComite(document.getElementById('comite'), { interativo: false });
renderLiderancas(document.getElementById('leads'));
