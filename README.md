# Hub Virtual — Núcleo Open Source (CESAR School)

Landing page institucional do **Núcleo Open Source (NOS)**, iniciativa acadêmica da CESAR School voltada a aprender construindo e colaborar em soluções de código aberto para desafios reais.

**Status:** versão inicial de desenvolvimento para revisão com Design, lideranças e comunidade. Conteúdo sujeito à validação institucional.

## Escopo desta fase

O site apresenta o NOS, as três equipes **Desenvolvimento, Cibersegurança e Design UX/UI**, os benefícios da participação, a forma de colaboração e o GitHub da comunidade. A plataforma completa (membros, credenciais, horas, certificados e gestão) pertence a fases futuras.

## Backlog do MVP — Fase 1

O primeiro MVP do Hub Virtual tem como objetivo disponibilizar uma landing page institucional do Núcleo Open Source (NOS) para apresentação, avaliação e validação com as equipes e lideranças da CESAR School.

**Status:** em desenvolvimento e validação. As caixas marcadas refletem o que está implementado na versão atual; validações institucionais e manuais continuam pendentes.

### US01 — Conhecer o Núcleo Open Source

**Como** visitante da comunidade acadêmica, **quero** compreender o que é o NOS e qual é seu propósito, **para** identificar sua atuação e seus objetivos.

- [x] **TASK01.1** — Implementar hero com apresentação institucional e chamada principal.
- [x] **TASK01.2** — Criar seção "Sobre o Núcleo", explicando a cultura Builder e Open Source.
- [x] **TASK01.3** — Implementar navegação entre as seções da landing page.
- [ ] **TASK01.4** — Validar os textos institucionais com a liderança.

**Critério de aceite:** um visitante consegue identificar o propósito do NOS e acessar as principais seções sem dificuldades.

### US02 — Conhecer as equipes

**Como** estudante interessado no NOS, **quero** conhecer suas áreas de atuação, **para** identificar como posso colaborar.

- [x] **TASK02.1** — Apresentar a equipe de Desenvolvimento.
- [x] **TASK02.2** — Apresentar a equipe de Cibersegurança.
- [x] **TASK02.3** — Apresentar a equipe de Design UX/UI.
- [ ] **TASK02.4** — Validar as descrições com os representantes das equipes.

**Critério de aceite:** as três equipes previstas no escopo institucional estão representadas, com responsabilidades claras e conteúdo aprovado.

### US03 — Compreender os benefícios da participação

**Como** estudante, **quero** conhecer as oportunidades oferecidas pelo Núcleo, **para** avaliar meu interesse em participar.

- [x] **TASK03.1** — Apresentar oportunidades de experiência prática em desafios da comunidade acadêmica.
- [x] **TASK03.2** — Destacar colaboração, aprendizado e compartilhamento de conhecimento.
- [ ] **TASK03.3** — Explicar as possibilidades de registro de atividades sem prometer validação automática de horas complementares.

**Critério de aceite:** os benefícios são compreensíveis e não incluem promessas institucionais não confirmadas.

### US04 — Entender o funcionamento do NOS

**Como** visitante, **quero** compreender como os integrantes trabalham em conjunto, **para** entender a dinâmica das iniciativas.

- [x] **TASK04.1** — Apresentar as etapas de descoberta, planejamento, construção e validação.
- [x] **TASK04.2** — Explicar a colaboração entre as diferentes áreas.
- [x] **TASK04.3** — Apresentar a organização comunitária e o papel das lideranças.

**Critério de aceite:** o visitante entende como as iniciativas são desenvolvidas e acompanhadas no Núcleo.

### US05 — Acessar canais oficiais

**Como** visitante interessado, **quero** encontrar canais confiáveis do NOS, **para** acompanhar suas iniciativas ou entrar em contato.

- [x] **TASK05.1** — Disponibilizar acesso à organização oficial no GitHub.
- [ ] **TASK05.2** — Definir e implementar o canal de contato aprovado.
- [ ] **TASK05.3** — Verificar funcionamento, identificação e acessibilidade dos links externos.

**Critério de aceite:** todos os canais publicados são oficiais, funcionais e aprovados. Não são exibidos formulários fictícios nem inscrições não confirmadas.

> **Divergência atual:** a página ainda contém um formulário demonstrativo não funcional. Por isso, US05 permanece aberta e esse mockup não atende ao critério de aceite acima.

### US06 — Utilizar o Hub em diferentes dispositivos

**Como** visitante, **quero** acessar a landing page pelo celular ou computador, **para** navegar independentemente do dispositivo.

- [x] **TASK06.1** — Implementar layouts responsivos para desktop, tablet e mobile.
- [x] **TASK06.2** — Implementar e validar o menu de navegação mobile.
- [x] **TASK06.3** — Testar adaptação em larguras reduzidas, incluindo 320 CSS px.
- [x] **TASK06.4** — Verificar ausência de sobreposição, cortes e rolagem horizontal indevida.

**Critério de aceite:** conteúdo e funcionalidades permanecem utilizáveis nas resoluções testadas, sem perda de informação.

### US07 — Garantir acessibilidade

**Como** pessoa que utiliza tecnologias assistivas ou diferentes formas de interação, **quero** navegar pelo Hub com autonomia, **para** acessar seu conteúdo.

- [x] **TASK07.1** — Aplicar HTML semântico, hierarquia de títulos e nomes acessíveis.
- [ ] **TASK07.2** — Completar a validação manual de navegação por teclado, ordem de foco e indicadores visíveis.
- [ ] **TASK07.3** — Completar a validação manual de contraste, ampliação de conteúdo e reflow.
- [x] **TASK07.4** — Respeitar preferências de movimento reduzido.
- [ ] **TASK07.5** — Concluir testes automatizados e manuais dos critérios aplicáveis da WCAG 2.2 A e AA.

**Critério de aceite:** não existem violações conhecidas sem tratamento; os testes e suas limitações são documentados. A conformidade WCAG 2.2 AA só poderá ser declarada após avaliação adequada.

> Os testes automatizados de interface e axe foram executados; a validação manual de acessibilidade permanece pendente.

### US08 — Garantir qualidade técnica

**Como** integrante da equipe de Desenvolvimento, **quero** uma base organizada e testável, **para** facilitar a manutenção e a colaboração.

- [x] **TASK08.1** — Organizar o projeto com Vite, HTML, CSS e JavaScript puro.
- [x] **TASK08.2** — Configurar testes de interface e acessibilidade com Playwright e axe-core.
- [x] **TASK08.3** — Garantir execução de `npm run build`, `npm run test` e `npm run test:a11y`.
- [x] **TASK08.4** — Documentar instalação, estrutura, contribuição e execução local.

**Critério de aceite:** qualquer integrante consegue instalar, executar, testar e compilar o projeto seguindo a documentação.

### US09 — Disponibilizar uma versão para validação

**Como** integrante da equipe ou liderança, **quero** acessar uma versão publicada do Hub, **para** avaliar a implementação e registrar feedback antes da homologação.

- [ ] **TASK09.1** — Criar branch própria semântica a partir de `develop`, preparar o primeiro commit e integrar por Pull Request após revisão.
- [ ] **TASK09.2** — Publicar uma versão DEV acessível por link.
- [ ] **TASK09.3** — Realizar revisão visual e funcional com Design e lideranças.
- [ ] **TASK09.4** — Registrar ajustes, decisões e aprovação para evolução à homologação.

**Critério de aceite:** existe uma versão demonstrável, acessível à equipe e com feedback documentado.

### Fora do escopo da Fase 1

- Autenticação e gestão de usuários.
- Cadastro e administração de membros.
- Perfil individual, competências e portfólio.
- Crachás virtuais e validação por QR Code.
- Registro e validação de horas complementares.
- Emissão de certificados.
- Painel administrativo.
- Gestão interna de projetos e atividades.
- Sistema próprio de inscrições.

Essas funcionalidades pertencem a fases posteriores do Hub e exigirão levantamento e validação específicos.

### Definição de pronto (Definition of Done)

Uma User Story poderá ser considerada concluída quando:

- [ ] As Tasks previstas estiverem implementadas.
- [ ] Os critérios de aceite forem atendidos.
- [x] A interface tiver sido revisada em desktop, tablet e mobile em emulação.
- [x] Os testes automatizados aplicáveis tiverem sido executados.
- [ ] As verificações manuais de acessibilidade aplicáveis forem registradas.
- [ ] Não houver defeitos críticos conhecidos sem tratamento.
- [ ] O código e a documentação forem revisados.
- [ ] A implementação estiver disponível para validação no ambiente correspondente.

**Observação:** o backlog descreve o estado da implementação; os itens marcados não substituem aprovação institucional nem validação manual.

## Stack

- Vite + HTML semântico + CSS + JavaScript puro;
- Playwright para testes de interface e responsividade;
- `@axe-core/playwright` para testes automatizados de acessibilidade.

## Começar

Requer Node.js 20.19+ ou 22.12+ e npm.

```bash
npm ci
npm run dev
```

Abrir o endereço exibido pelo Vite (normalmente `http://127.0.0.1:5173`).

## Build, prévia e testes

Gerar a versão de produção:

```bash
npm run build
```

Para conferir o build localmente, em outro terminal:

```bash
npm run preview
```

O preview fica normalmente em `http://127.0.0.1:4173`.

Instalar o navegador do Playwright uma vez e executar os testes:

```bash
npx playwright install chromium
npm run test
npm run test:a11y
npm run test:ui
npm run test:report
```

No Linux, caso faltem bibliotecas do sistema: `npx playwright install-deps chromium`.

`npm run preview` serve a versão gerada em `dist/`. O Playwright inicia seu próprio servidor Vite durante os testes. `npm run test:report` abre o relatório local, que fica em `playwright-report/` (ignorado pelo Git).

## Acessibilidade

A meta é **WCAG 2.2 nível AA**, inclusive todos os critérios aplicáveis dos níveis A e AA. Testes axe automatizados não garantem conformidade: revisão manual de teclado, foco, leitores de tela, contraste, zoom e reflow continua obrigatória. Ver `docs/accessibility/WCAG-2.2-AA.md`.

## Documentação do projeto

- Escopo e restrições do produto: `PRODUCT.md`.
- Direção visual: `DESIGN.md`.
- Meta e checklist manual de acessibilidade: `docs/accessibility/WCAG-2.2-AA.md`.
- Rascunho editorial ainda não aprovado: `docs/product/conteudo-base.md`.

## Organização

- `index.html` — estrutura e conteúdo da landing page;
- `src/styles` e `src/scripts` — apresentação e interações;
- `public/images` — recursos visuais;
- `tests/` — testes Playwright/axe;
- `docs/` — rascunho editorial e checklist de acessibilidade.

## Colaboração

O trabalho ocorre em branches próprias e Pull Requests. Consulte [`CONTRIBUTING.md`](CONTRIBUTING.md) para o fluxo de branches, commits e rulesets ativos. O CI e o deploy automático ainda não estão configurados neste pacote.

## Licença

A licença de código aberto ainda depende de definição institucional. Não presumir uma licença até sua aprovação.
