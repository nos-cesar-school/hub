# Direção visual — Núcleo Open Source (NOS Hub)

## Princípio editorial
O site deve parecer uma **comunidade universitária construindo software aberta e colaborativamente**, não uma landing page genérica de SaaS nem um painel corporativo. Simplicidade não significa eliminar personalidade.

## Tokens aplicados
- Acento: `#ff4d00` para pequenos pontos visuais. CTAs usam `#a93100` com texto branco (6,72:1); hover usa `#9f2d00` (7,37:1).
- Laranja para **texto sobre branco**: `#a93100` (mais escuro; confirmar contraste medido em cada contexto).
- Tinta: `#242424`. Texto secundário: `#454545`. Superfície: branco e `#f8f8f7`.
- Bordas: `#d6dce2`. Tinta laranja suave: `#ffe6d8`.
- Tipografia: Inter ou fontes system UI disponíveis; monospace do sistema para rótulos técnicos. **Não incluir a fonte comercial Suisse**.
- Botões em pílula; cards com raio de 20px; microdetalhes com linhas finas.

## Composição e narrativa
1. **Hero**: título de impacto, proposta clara e diagrama autoral de colaboração entre três equipes, não quatro.
2. **Sobre**: bloco editorial com texto institucional verificável.
3. **Equipes**: três cards ricos, equilibrados, com títulos e funções completas.
4. **Por que participar**: pequena janela de código conceitual + benefícios concretos.
5. **Como trabalhamos**: quatro etapas de processo; não promete método técnico obrigatório.
6. **Comunidade e acompanhamento**: governança sem nomes inventados, chamada para GitHub.

## Animações
- Preferir hover discreto de cards, transições CSS curtas e movimento com propósito.
- Não ocultar informações essenciais com animação dependente de JS/IntersectionObserver.
- Respeitar `prefers-reduced-motion` e evitar scroll-jacking e parallax pesado.

## Regras de revisão visual
- Apontar problemas observáveis antes de propor alterações.
- Simplificar sem remover equipes, conteúdo aprovado, componentes estruturais ou a narrativa visual.
- Refinar espaçamento, legibilidade, contraste, responsividade e microdetalhes sem descaracterizar o projeto.
- Antes de mudanças amplas, registrar o que será preservado, melhorado e não removido.

## Acessibilidade
A estética não prevalece sobre WCAG 2.2 AA. Ver `docs/accessibility/WCAG-2.2-AA.md` e `AGENTS.md`.
