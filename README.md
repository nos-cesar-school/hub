# Hub Virtual — Núcleo Open Source (CESAR School)

Landing page institucional do **Núcleo Open Source (NOS)**, iniciativa acadêmica da CESAR School voltada a aprender construindo e colaborar em soluções de código aberto para desafios reais.

**Status:** em desenvolvimento e validação. O conteúdo ainda depende de aprovação institucional.

## Backlog do MVP — Fase 1

O MVP apresenta o NOS, suas equipes, os benefícios da participação, a forma de colaboração e os canais oficiais, para avaliação das equipes e lideranças da CESAR School.

### US01 — Conhecer o Núcleo Open Source

Como visitante da comunidade acadêmica, quero compreender o que é o NOS e qual é seu propósito, para identificar sua atuação e seus objetivos.

**Critério de aceite:** o visitante identifica o propósito do NOS e acessa as principais seções sem dificuldades.

### US02 — Conhecer as equipes

Como estudante interessado no NOS, quero conhecer suas áreas de atuação, para identificar como posso colaborar.

**Critério de aceite:** Desenvolvimento, Cibersegurança e Design UX/UI estão representadas, com responsabilidades claras e conteúdo validado.

### US03 — Compreender os benefícios da participação

Como estudante, quero conhecer as oportunidades oferecidas pelo Núcleo, para avaliar meu interesse em participar.

**Critério de aceite:** os benefícios de experiência prática, colaboração e compartilhamento de conhecimento são claros e não prometem validação de horas complementares.

### US04 — Entender o funcionamento do NOS

Como visitante, quero compreender como os integrantes trabalham em conjunto, para entender a dinâmica das iniciativas.

**Critério de aceite:** o visitante entende as etapas de descoberta, planejamento, construção e validação, a colaboração entre áreas e o papel da organização comunitária.

### US05 — Acessar canais oficiais

Como visitante interessado, quero encontrar canais confiáveis do NOS, para acompanhar suas iniciativas ou entrar em contato.

**Critério de aceite:** os canais publicados são oficiais, funcionais e aprovados; não há formulários fictícios nem inscrições não confirmadas.

O GitHub oficial está disponível em [github.com/nos-cesar-school](https://github.com/nos-cesar-school). O canal de contato ainda não foi definido; a página não exibe formulário nem inscrições fictícias.

### US06 — Utilizar o Hub em diferentes dispositivos

Como visitante, quero acessar a landing page pelo celular ou computador, para navegar independentemente do dispositivo.

**Critério de aceite:** conteúdo e funcionalidades permanecem utilizáveis nas resoluções testadas, incluindo 320 CSS px, sem perda de informação ou rolagem horizontal indevida.

### US07 — Garantir acessibilidade

Como pessoa que utiliza tecnologias assistivas ou diferentes formas de interação, quero navegar pelo Hub com autonomia, para acessar seu conteúdo.

**Critério de aceite:** testes e limitações estão documentados; a conformidade WCAG 2.2 AA só será declarada após avaliação adequada. Os testes automatizados de interface e axe foram executados; a validação manual permanece pendente.

### US08 — Garantir qualidade técnica

Como integrante da equipe de Desenvolvimento, quero uma base organizada e testável, para facilitar a manutenção e a colaboração.

**Critério de aceite:** a equipe consegue instalar, executar, testar e compilar o projeto com as instruções documentadas.

### US09 — Disponibilizar uma versão para validação

Como integrante da equipe ou liderança, quero acessar uma versão publicada do Hub, para avaliar a implementação e registrar feedback antes da homologação.

**Critério de aceite:** existe uma versão demonstrável, acessível à equipe e com feedback documentado. A publicação DEV e a validação institucional continuam pendentes.

## Fora do escopo da Fase 1

Autenticação e gestão de usuários, administração de membros, perfis, competências e portfólio, crachás e QR Code, registro e validação de horas, certificados, painel administrativo, gestão interna de projetos e sistema próprio de inscrições pertencem a fases futuras e dependem de levantamento e validação específicos.

## Começar

Requer Node.js 20.19+ ou 22.12+ e npm.

```bash
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://127.0.0.1:5173`.

## Build e testes

```bash
npm run build
npm run test
npm run test:a11y
npm run test:ui
```

O Playwright inicia um servidor Vite durante os testes. Para executar o relatório local, use `npm run test:report`.

## Acessibilidade

A meta é **WCAG 2.2 nível AA**, incluindo os critérios aplicáveis dos níveis A e AA. Testes automatizados não comprovam conformidade; revisão manual de teclado, foco, leitores de tela, contraste, zoom e reflow continua necessária. Consulte `docs/accessibility/WCAG-2.2-AA.md`.

## Documentação e colaboração

`PRODUCT.md` descreve o escopo e as restrições do produto; `DESIGN.md`, a direção visual; `CONTRIBUTING.md`, o fluxo de contribuição; e `docs/` reúne documentação complementar. O conteúdo em `docs/product/conteudo-base.md` é um rascunho ainda não aprovado.

A licença de código aberto depende de definição institucional. O CI e o deploy automático ainda não estão configurados neste pacote.
