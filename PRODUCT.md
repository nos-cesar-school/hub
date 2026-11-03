# Produto — Hub Virtual do Núcleo Open Source

## Platform

web

## Users

Estudantes da CESAR School que procuram aprender construindo e colaborar com outras áreas em desafios reais da comunidade acadêmica.

## Product Purpose

O Núcleo Open Source (NOS) é uma iniciativa acadêmica da CESAR School para aprender na prática, compartilhar conhecimento e desenvolver soluções abertas para necessidades reais. Nesta fase, o Hub é uma landing page institucional para apresentar a iniciativa e sua forma de colaboração.

## Positioning

O NOS combina aprendizagem prática com colaboração entre Desenvolvimento, Cibersegurança e Design UX/UI para construir soluções de código aberto voltadas a desafios reais da comunidade CESAR School.

## Operating Context

O trabalho colaborativo envolve compreender necessidades, planejar em conjunto, construir e revisar contribuições, e validar e evoluir soluções com feedback. O projeto do Hub é uma versão inicial para revisão com Design, lideranças e comunidade; seu conteúdo ainda depende de validação institucional.

## Capabilities and Constraints

- A entrega atual é uma landing page pública e responsiva sobre o Núcleo, a cultura Builder/Open Source, as três equipes, benefícios, processo colaborativo e a comunidade no GitHub.
- As três equipes confirmadas são **Desenvolvimento** (interfaces, serviços, integrações, testes e evolução do código), **Cibersegurança** (riscos, segurança, privacidade e proteção de sistemas e dados) e **Design UX/UI** (pesquisa, jornadas, experiências digitais e acessibilidade). Não apresentar DevOps como uma quarta equipe.
- O produto completo é uma visão futura que poderá centralizar projetos, membros, documentação, atividades, horas, competências e credenciais. Essas capacidades não fazem parte da landing page atual.
- Não implementar nesta fase autenticação, perfis, crachás, QR codes, registro ou validação de horas, certificados, recrutamento automatizado, gestão de projetos nem contato com backend.
- Não afirmar que há inscrições abertas, prometer validação automática de horas complementares, nem divulgar contatos, lideranças, projetos concluídos ou números sem fonte e autorização. As regras de ingresso e horas dependem de confirmação institucional.
- Stack existente: Vite, HTML semântico, CSS e JavaScript puro; Playwright e axe-core são usados nos testes de interface e acessibilidade. Evitar dependências de UI.
- A hospedagem definitiva, o fluxo de branches/revisões e o processo de publicação ainda dependem de decisão institucional.
- A licença dos projetos de código ainda depende de definição institucional; não presumir uma licença.

## Brand Commitments

- O nome de trabalho é **Núcleo Open Source (NOS)**, associado à CESAR School. A nomenclatura oficial e o uso da marca ainda dependem de validação institucional.
- A iniciativa promove cultura Builder e Open Source, colaboração e aprendizagem prática. O conteúdo institucional atual é proposto e precisa de aprovação.

## Evidence on Hand

- `docs/product/conteudo-base.md` contém um rascunho editorial, não aprovado institucionalmente.
- `public/images/nos-mark.webp` é o recurso de marca presente no projeto; o uso oficial da marca aguarda validação.
- O GitHub público da organização é `https://github.com/nos-cesar-school`.
- Não há canal oficial de contato, política confirmada de ingresso, projeto concluído ou métricas de participação documentados. Não inventar provas, depoimentos ou reconhecimentos.
- A base é um protótipo funcional para validação; testes automatizados não comprovam conformidade WCAG nem aprovação institucional.

## Product Principles

- Aprender construindo e compartilhando conhecimento.
- Aproximar diferentes áreas em colaboração sobre necessidades reais.
- Tratar o open source como prática de construção e evolução compartilhada.
- Comunicar apenas fatos confirmados e distinguir protótipo de informação institucional aprovada.

## Accessibility & Inclusion

Buscar WCAG 2.2 nível AA, considerando todos os critérios aplicáveis dos níveis A e AA. Manter HTML semântico, operação por teclado, foco visível, contraste, reflow desde 320 CSS px, alvos interativos adequados e respeito a `prefers-reduced-motion`. Testes automatizados não substituem avaliação manual nem certificam conformidade. Pendências de validação manual estão em `docs/accessibility/WCAG-2.2-AA.md`.
