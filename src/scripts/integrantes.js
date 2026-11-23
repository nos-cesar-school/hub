import './base.js';
import { COMITE, F, FRENTES, PESSOAS, TBC, VPOS, ZONAS } from './dados.js';
import { renderComite, renderLiderancas } from './governanca.js';

const venn = document.getElementById('venn');
const profile = document.getElementById('profile');
const filters = document.getElementById('filters');
const comiteEl = document.getElementById('comite');
let filtro = 'todas';
let selecionado = 'laura';
let vertical = false;
const todos = [...PESSOAS, ...COMITE];

renderComite(comiteEl, { interativo: true });
renderLiderancas(document.getElementById('leads'));
comiteEl.addEventListener('click', (e) => {
  const b = e.target.closest('.gp');
  if (b) select(b.dataset.id, true);
});

filters.innerHTML = [
  '<button type="button" data-f="todas" aria-pressed="true">Todas</button>',
  ...FRENTES.map((f) => `<button type="button" data-f="${f.id}" aria-pressed="false" style="--c:var(--f-${f.id})"><i aria-hidden="true"></i>${f.nome}</button>`),
].join('');
filters.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  filtro = b.dataset.f;
  filters.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  applyFilter();
});

function renderVenn() {
  const W = vertical ? 480 : 1000;
  const H = vertical ? 1000 : 480;
  const pos = (x, y) => (vertical ? [y, x] : [x, y]);
  venn.classList.toggle('v', vertical);
  venn.innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" aria-hidden="true">
      ${ZONAS.map((z) => { const [cx, cy] = pos(z.cx, z.cy); return `<circle class="zone" data-z="${z.id}" cx="${cx}" cy="${cy}" r="${z.r}" style="--c:var(--f-${z.id})"/>`; }).join('')}
      ${ZONAS.map((z) => { // no celular, o rótulo vai para uma área livre de cada círculo, longe das interseções
        const [lx, ly] = vertical ? { design: [240, 76], dev: [330, 507], ciber: [240, 952] }[z.id] : [z.cx, z.cy - z.r + 36];
        return `<text data-z="${z.id}" x="${lx}" y="${ly}" style="--c:var(--f-${z.id})">${F[z.id].nome}</text>`; }).join('')}
    </svg>
    ${PESSOAS.map((p) => { const [x, y] = vertical ? VPOS[p.id] : [p.x, p.y];
      return `<button type="button" class="person" data-id="${p.id}" aria-pressed="${p.id === selecionado}"
        style="left:${(x / W) * 100}%;top:${(y / H) * 100}%">
        <span class="av" aria-hidden="true">${p.nome[0]}</span><span class="nm">${p.nome}</span><span class="list-sr">, ${p.frentes.map((f) => F[f].nome).join(' e ')}</span></button>`; }).join('')}
    <div class="venn-note" hidden><p></p></div>`;
  applyFilter();
}
venn.addEventListener('click', (e) => {
  const b = e.target.closest('.person');
  if (b) select(b.dataset.id, true);
});

function applyFilter() {
  const vazio = filtro !== 'todas' && !PESSOAS.some((p) => p.frentes.includes(filtro));
  venn.classList.toggle('dim-zones', filtro !== 'todas');
  venn.querySelectorAll('[data-z]').forEach((el) => el.classList.toggle('on', el.dataset.z === filtro));
  venn.querySelectorAll('.person').forEach((b) => {
    const p = PESSOAS.find((x) => x.id === b.dataset.id);
    const off = filtro !== 'todas' && !p.frentes.includes(filtro);
    b.classList.toggle('off', off);
    b.tabIndex = off ? -1 : 0;
  });
  const note = venn.querySelector('.venn-note');
  note.hidden = !vazio;
  if (vazio) note.querySelector('p').innerHTML = `Integrantes de ${F[filtro].nome}: ${TBC}`;
}

function select(id, fromClick) {
  selecionado = id;
  venn.querySelectorAll('.person').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
  comiteEl.querySelectorAll('.gp').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
  const p = todos.find((x) => x.id === id);
  const frentes = p.cargo
    ? `<span>Comitê Geral · ${p.cargo}</span>`
    : p.frentes.map((f) => `<span style="--c:var(--f-${f})"><i aria-hidden="true"></i>${F[f].nome}</span>`).join('');
  profile.innerHTML = `
    <div class="photo" role="img" aria-label="Foto de ${p.nome} (a enviar)">FOTO</div>
    <div>
      <h3>${p.nome}</h3>
      <div class="meta">${p.curso ?? '<span class="tbc">CURSO</span>'}</div>
      <div class="meta" style="margin-top:8px">${frentes}</div>
      <p class="bio">${p.bio ?? '<span class="tbc">MINI BIO</span>'}</p>
      <p class="int"><b>Interesses:</b> ${p.interesses ?? '<span class="tbc">INTERESSES</span>'}</p>
    </div>`;
  // mostra o perfil se ele estiver fora da tela, para o clique não parecer sem efeito
  if (fromClick) {
    const r = profile.getBoundingClientRect();
    if (r.top < 80 || r.bottom > innerHeight) {
      profile.parentElement.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'nearest',
      });
    }
  }
}

const mq = matchMedia('(max-width: 900px)');
function layout() {
  vertical = mq.matches;
  renderVenn();
}
mq.addEventListener('change', layout);
layout();
select(selecionado);
