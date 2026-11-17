# Direção visual — Núcleo Open Source (NOS Hub)

## Princípio editorial
O site deve parecer uma **comunidade universitária construindo software aberta e colaborativamente**, não uma landing page genérica de SaaS nem um painel corporativo. Simplicidade não significa eliminar personalidade.

## Tokens aplicados
- Acento: `#ff4d00` para pequenos pontos visuais. CTAs usam `#a93100` com texto branco (6,72:1); hover usa `#9f2d00` (7,37:1).
- Laranja para **texto sobre branco e papel claro**: `#a93100` (confirmar contraste medido em cada contexto).
- Tinta: `#242424`. Texto secundário: `#454545`. Texto auxiliar: `#5c5c5c`. Superfície: papel claro `#fdf8ee`, superfície elevada `#fffcf6` e papel envelhecido `#f4ede1`.
- Bordas decorativas: `#d8d0c4`. Bordas de controles interativos e campos de formulário: `#766e64` (>= 4,2:1 sobre papel claro/envelhecido para atender WCAG 1.4.11). Tinta laranja suave: `#ffe6d8`.
- Tipografia: Inter ou fontes system UI disponíveis; monospace do sistema para rótulos técnicos. **Não incluir a fonte comercial Suisse**.
- Botões em pílula; cards com raio de 24px; avatares circulares com aro pontilhado técnico; ícones de contato circulares com alvo de 44×44px.

## Composição e arquitetura multipágina
1. **Landing Page (`/`)**:
   - **Hero**: etiqueta institucional, título de impacto, proposta clara e diagrama autoral de colaboração entre três equipes técnicas (Design, Desenvolvimento e Cibersegurança).
   - **Sobre (síntese)**: bloco editorial com destaque para Missão e Propósito e chamada para `/sobre/`.
   - **Equipes**: três cards ricos com subtítulos oficiais, tags de subáreas e links para as páginas de cada frente.
   - **Por que participar**: janela conceitual de código + benefícios concretos.
   - **Como trabalhamos**: quatro etapas de processo conectadas visualmente.
   - **Governança**: síntese da Gestão do Núcleo com chamada para `/gestao/`.
   - **Contato e GitHub**: chamada para o GitHub oficial + formulário de contato institucional com nota transparente sobre integração futura (ex.: NocoDB).
2. **Sobre (`/sobre/`)**: manifesto institucional expandido com *O que é o NOS*, *Missão*, *Propósito*, grade de *6 blocos de Valores* e articulação com CESAR, CISSA e CESAR School.
3. **Gestão do Núcleo (`/gestao/`)**: *Presidência*, *Vice-presidência*, *Lideranças de Departamento* e grade "Conheça a Gestão".
4. **Páginas de Departamento (`/equipes/desenvolvimento/`, `/equipes/design/`, `/equipes/ciberseguranca/`)**: cabeçalho com breadcrumb, subtítulo e descrição oficiais, cards de *Áreas de atuação* e grade "Conheça a equipe" (com foto circular, papel, descrição e ícones de E-mail, LinkedIn e GitHub).

## Animações
- Preferir hover discreto de cards, entradas escalonadas suaves e movimento com propósito. O diagrama do hero e a conexão entre as etapas são os momentos animados principais.
- Cards e textos permanecem visíveis sem JavaScript; entradas de seção apenas acrescentam movimento e nunca ocultam informações essenciais.
- Respeitar `prefers-reduced-motion`, removendo animações e transições, e evitar scroll-jacking e parallax pesado.

## Regras de revisão visual
- Apontar problemas observáveis antes de propor alterações.
- Simplificar sem remover equipes, conteúdo aprovado, componentes estruturais ou a narrativa visual.
- Refinar espaçamento, legibilidade, contraste, responsividade e microdetalhes sem descaracterizar o projeto.
- Antes de mudanças amplas, registrar o que será preservado, melhorado e não removido.

## Acessibilidade
A estética não prevalece sobre WCAG 2.2 AA. Ver `docs/accessibility/WCAG-2.2-AA.md` e `AGENTS.md`.
