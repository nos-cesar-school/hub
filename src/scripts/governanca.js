import { COMITE, F, LIDERANCAS } from './dados.js';

// Comitê Geral: botões na página de integrantes (abrem o perfil), texto simples na home
export function renderComite(el, { interativo }) {
  el.innerHTML = COMITE.map((c) => {
    const inner = `<span class="av" aria-hidden="true">${c.nome[0]}</span><span><b>${c.nome}</b><small>${c.cargo}</small></span>`;
    return interativo
      ? `<button type="button" class="gp" data-id="${c.id}" aria-pressed="false">${inner}</button>`
      : `<div class="gp static">${inner}</div>`;
  }).join('');
}

export function renderLiderancas(el) {
  el.innerHTML = LIDERANCAS.map((f) => `
    <div class="gp tbd"><span class="av" aria-hidden="true">?</span><span><b>${F[f].nome}</b><small>Liderança a confirmar</small></span></div>`).join('');
}
