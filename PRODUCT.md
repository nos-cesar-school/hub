# Produto — Hub Virtual do Núcleo Open Source

## Platform

web

## Users

Estudantes da CESAR School, docentes, colaboradores e parceiros do ecossistema CESAR, CISSA e CESAR School interessados em inovação tecnológica aberta e colaboração em desafios reais.

## Product Purpose

O Núcleo Open Source (NOS) é um ecossistema de desenvolvimento tecnológico e inovação na CESAR School voltado ao desenvolvimento profissional e acadêmico dos estudantes e à elaboração de soluções abertas para problemas reais da CESAR, CISSA e CESAR School. Nesta fase, o Hub atua como portal institucional para apresentar o Núcleo, sua missão, valores, propósito, governança, departamentos e canais de contato.

## Positioning

O NOS combina aprendizagem prática com colaboração entre Desenvolvimento, Design e Cibersegurança — articulados pela Gestão do Núcleo — para construir soluções de código aberto que impulsionam o desenvolvimento local e aproximam estudantes do mercado de trabalho.

## Operating Context

O trabalho colaborativo envolve compreender necessidades, planejar em conjunto, construir e revisar contribuições, e validar e evoluir soluções com feedback. Os textos de missão, valores, propósito e apresentação das frentes seguem a documentação institucional do NOS; os perfis individuais de integrantes e a integração ativa do formulário de contato permanecem em preparação.

## Capabilities and Constraints

- A entrega atual é um site institucional multipágina responsivo composto por:
  - **Landing page (`/`)**: síntese institucional, resumo dos três departamentos, benefícios, fluxo colaborativo, governança e seção de contato/GitHub.
  - **Sobre (`/sobre/`)**: o que é o NOS, missão, propósito, valores e relação com CESAR, CISSA e CESAR School.
  - **Gestão do Núcleo (`/gestao/`)**: Presidência, Vice-presidência, articulação com lideranças de departamento e espaços de apresentação da gestão.
  - **Páginas de Departamento (`/equipes/desenvolvimento/`, `/equipes/design/`, `/equipes/ciberseguranca/`)**: descrição institucional, áreas internas de atuação e seção "Conheça a equipe".
- As três equipes técnicas confirmadas são:
  - **Desenvolvimento** (Front-end, Back-end, DevOps e Infraestrutura, e Gestão de Produto e Agilidade).
  - **Design** (Design Gráfico e Web Design / UX·UI).
  - **Cibersegurança** (Blue Team, Red Team, Arquitetura e Segurança de Aplicações, e GRC/LGPD).
  - Não apresentar DevOps como uma quarta equipe independente; ela integra Desenvolvimento.
- Cada página de departamento e a página de Gestão reservam **três espaços estruturados de apresentação de membros** (avatar circular, papel/atuação e ícones de E-mail, LinkedIn e GitHub) sem inventar pessoas ou contatos fictícios enquanto a lista nominal autorizada não for publicada.
- A seção de contato na landing page apresenta o **design e a validação acessível completos do formulário institucional**, informando com transparência que a integração com a base institucional de mensagens (ex.: NocoDB) ainda está em homologação e sem simular envio silencioso.
- Não implementar nesta fase autenticação, perfis autenticados, crachás, QR codes, registro ou validação de horas, certificados, recrutamento automatizado nem painel administrativo.
- Stack existente: Vite (Multi-Page Application), HTML semântico, CSS e JavaScript puro; Playwright e axe-core são usados nos testes de interface e acessibilidade. Evitar dependências de UI.

## Brand Commitments

- O nome institucional é **Núcleo Open Source (NOS)**, associado à CESAR School.
- **Missão:** Proporcionar um meio para o desenvolvimento e crescimento conjunto da CESAR, CISSA, CESAR School e seus estudantes.
- **Propósito:** Garantir o desenvolvimento local, facilitando a conexão de estudantes com o mercado de trabalho e a operação da CESAR School.
- **Valores:** Inovação, coragem, determinação, coletividade, desenvolvimento econômico da região, diversidade e inclusão.

## Evidence on Hand

- Documento institucional assinado definindo *O que é, Missão, Valores e Propósito* do Núcleo Open Source.
- Documento institucional *Apresentação das Equipes* detalhando Gestão do Núcleo, Desenvolvimento, Design e Cibersegurança.
- `public/images/nos-mark.webp` é o recurso de marca presente no projeto.
- O GitHub público da organização é `https://github.com/nos-cesar-school`.
- Testes automatizados não comprovam conformidade WCAG plena; pendências de validação manual estão documentadas.

## Product Principles

- Aprender construindo e compartilhando conhecimento.
- Aproximar diferentes áreas em colaboração sobre necessidades reais do ecossistema local.
- Tratar o open source como prática de construção e evolução compartilhada.
- Comunicar apenas fatos confirmados e sinalizar claramente recursos em fase de integração ou atualização.

## Accessibility & Inclusion

Buscar WCAG 2.2 nível AA, considerando todos os critérios aplicáveis dos níveis A e AA. Manter HTML semântico, operação por teclado, foco visível, contraste, reflow desde 320 CSS px, alvos interativos adequados (incluindo ícones de 44×44 px) e respeito a `prefers-reduced-motion`. Pendências de validação manual estão em `docs/accessibility/WCAG-2.2-AA.md`.
