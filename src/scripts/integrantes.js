import './base.js';
import { COMITE, F, FRENTES, PESSOAS, TBC, VPOS, ZONAS } from './dados.js';
import { renderComite, renderLiderancas } from './governanca.js';

const venn = document.getElementById('venn');
const peopleEl = document.getElementById('people');
const countEl = document.getElementById('peopleCount');
const filters = document.getElementById('filters');
const comiteEl = document.getElementById('comite');
let filtro = 'todas';
let selecionado = null;
let vertical = false;
const todos = [...PESSOAS, ...COMITE];

renderComite(comiteEl, { interativo: true });
renderLiderancas(document.getElementById('leads'));
comiteEl.addEventListener('click', (e) => {
  const b = e.target.closest('.gp');
  if (b) select(b.dataset.id);
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
  if (b) select(b.dataset.id);
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
  filterCards();
}

// ---------- cards ----------
const reduzir = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const frentesDe = (p) => p.cargo
  ? `<span>Comitê Geral · ${p.cargo}</span>`
  : p.frentes.map((f) => `<span style="--c:var(--f-${f})"><i aria-hidden="true"></i>${F[f].nome}</span>`).join('');
peopleEl.innerHTML = [...COMITE, ...PESSOAS].map((p) => `
  <article class="pcard" id="p-${p.id}" data-id="${p.id}" tabindex="-1" aria-labelledby="p-${p.id}-nome">
    <div class="pc-top">
      <div class="photo" role="img" aria-label="Foto de ${p.nome} (a enviar)">${p.nome[0]}</div>
      <div>
        <h3 id="p-${p.id}-nome">${p.nome}</h3>
        <div class="meta">${p.curso ?? '<span class="tbc">CURSO</span>'}</div>
      </div>
    </div>
    <div class="meta">${frentesDe(p)}</div>
    <p class="bio">${p.bio ?? '<span class="tbc">MINI BIO</span>'}</p>
    <p class="int"><b>Interesses:</b> ${p.interesses ?? '<span class="tbc">INTERESSES</span>'}</p>
  </article>`).join('');

function filterCards() {
  let n = 0;
  peopleEl.querySelectorAll('.pcard').forEach((card) => {
    const p = todos.find((x) => x.id === card.dataset.id);
    // com filtro de frente, o Comitê sai da lista (ele aparece no bloco de cima)
    const show = filtro === 'todas' || p.frentes.includes(filtro);
    card.hidden = !show;
    if (show) n += 1;
  });
  countEl.textContent = filtro === 'todas'
    ? `${n} pessoas no Núcleo`
    : n ? `${n} ${n === 1 ? 'pessoa' : 'pessoas'} em ${F[filtro].nome}` : '';
}

// tocar numa pessoa (no diagrama ou no Comitê) leva até o card dela e destaca
function select(id) {
  selecionado = id;
  venn.querySelectorAll('.person').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
  comiteEl.querySelectorAll('.gp').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.id === id)));
  peopleEl.querySelectorAll('.pcard').forEach((c) => c.classList.toggle('hl', c.dataset.id === id));
  const card = document.getElementById(`p-${id}`);
  if (card.hidden) {
    // a pessoa está fora do filtro atual: volta para "Todas" para o card aparecer
    filters.querySelector('[data-f="todas"]').click();
  }
  card.scrollIntoView({ behavior: reduzir() ? 'auto' : 'smooth', block: 'center' });
  card.focus({ preventScroll: true });
}

const mq = matchMedia('(max-width: 900px)');
function layout() {
  vertical = mq.matches;
  renderVenn();
}
mq.addEventListener('change', layout);
layout();
