# Acessibilidade — meta WCAG 2.2 AA

O projeto **busca conformidade** com [WCAG 2.2](https://www.w3.org/TR/WCAG22/), níveis A e AA, considerando todos os critérios aplicáveis. A aprovação dos testes automatizados **não é certificação**.

## Automação incluída
- `npm run test:a11y`: Playwright + `@axe-core/playwright`, com auditoria da página no desktop e no mobile, e menu móvel aberto.
- `npm run test:ui`: estrutura semântica, três equipes, links internos, navegação mobile e ausência de overflow horizontal.
- `npm run test`: suíte completa.
- Escopos verificáveis: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`. Nem todos os critérios WCAG 2.2 são verificáveis automaticamente.

## Checklist de testes manuais antes de publicar
- [ ] Navegação total por teclado (Tab/Shift+Tab, Enter, Espaço, Esc); ordem lógica; foco não oculto por cabeçalho fixo.
- [ ] Menu mobile: nome acessível, expansão, links, fechamento e comportamento em mudança de largura.
- [ ] Leitores de tela: NVDA (Windows) ou Orca (Linux); leitura de landmarks, títulos, navegação e conteúdo.
- [ ] Contraste de texto, ícones funcionais e foco, medido na composição real; verificar estados normal/hover/foco.
- [ ] Zoom de texto 200% e zoom de página; conteúdo adaptável e utilizável.
- [ ] Reflow em largura equivalente a 320 CSS px sem rolagem lateral não essencial (1.4.10).
- [ ] Alvos interativos e espaçamento (2.5.8), foco não obscurecido (2.4.11), movimentos reduzidos (2.3.3 e boas práticas), navegação consistente.
- [ ] Imagens: alternativa adequada ou marcação decorativa correta.
- [ ] Sem dependência exclusiva de cor; mensagens compreensíveis.
- [ ] Se forem adicionados formulários, rever labels, erros e assistência de entrada.
- [ ] Executar testes em pelo menos dois navegadores e em dispositivo real quando possível.

## Critérios com atenção especial
- **1.4.3** Contraste mínimo: 4,5:1 para texto comum; 3:1 para texto grande.
- **1.4.11** Contraste de componentes e informações gráficas relevantes: 3:1.
- **1.4.10** Reflow até 320 CSS px em contexto aplicável.
- **2.1.1 / 2.1.2** Teclado e ausência de armadilhas.
- **2.4.7 / 2.4.11** Foco visível e não encoberto.
- **2.5.8** Tamanho mínimo de alvo (24×24 CSS px ou exceção por espaçamento etc.).
- **3.2.3** Navegação consistente.

## Evidências
Documentar data, versão/branch, navegador, resolução, erros e correções. Não usar "100% acessível" sem auditoria abrangente.
