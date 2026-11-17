# Hub Virtual — Núcleo Open Source (CESAR School)

Portal institucional do **Núcleo Open Source (NOS)**, ecossistema estudantil de desenvolvimento tecnológico e inovação da CESAR School voltado a problemas reais da CESAR, CISSA e CESAR School.

## Estrutura da Fase 1 (MVP Institucional)

O site é construído como uma **Multi-Page Application (MPA)** leve em Vite, HTML semântico, CSS modular e JavaScript puro:

- **`/` (`index.html`)** — Landing institucional: apresentação do NOS, síntese de Missão e Propósito, visão geral das 3 frentes técnicas, benefícios, fluxo colaborativo, governança, canais oficiais e formulário de contato.
- **`/sobre/`** — Identidade institucional completa: *O que é o NOS*, *Missão*, *Propósito*, *Valores* e atuação no ecossistema local.
- **`/gestao/`** — Governança e Liderança: *Gestão do Núcleo* (*Presidência*, *Vice-presidência* e *Lideranças de Departamento*) e espaços de apresentação.
- **`/equipes/desenvolvimento/`** — Frente de Desenvolvimento (*Front-end*, *Back-end*, *DevOps e Infraestrutura*, *Gestão de Produto e Agilidade*) e espaços da equipe.
- **`/equipes/design/`** — Frente de Design (*Design Gráfico* e *Web Design / UX·UI*) e espaços da equipe.
- **`/equipes/ciberseguranca/`** — Frente de Cibersegurança (*Blue Team*, *Red Team*, *Arquitetura e Segurança de Aplicações*, *GRC / LGPD*) e espaços da equipe.

## Configuração e execução local

Requer Node.js 20.19+ ou 22.12+ e npm.

```bash
npm ci
cp .env.example .env
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente `http://127.0.0.1:5173`).

### Variáveis de ambiente (`.env`)

Consulte [`.env.example`](./.env.example):

- `VITE_NOCODB_FORM_ENDPOINT`: endpoint público de submissão de uma **Form View** do NocoDB (`/api/v2/public/shared-view/<UUID>/rows`). Não utilize `xc-token` no front-end.
- `VITE_SOCIAL_LINKEDIN`, `VITE_SOCIAL_INSTAGRAM`, `VITE_CONTACT_EMAIL`: opcionais; quando definidos, ativam automaticamente os cards da seção de canais e os ícones do rodapé em todas as páginas.

## Build e testes

```bash
npm run build
npm run test
npm run test:a11y
npm run test:ui
```

Na primeira execução local do Playwright, instale o navegador caso necessário (`npx playwright install chromium`).

## Acessibilidade e documentação

- Meta: **WCAG 2.2 nível AA** (ver [`docs/accessibility/WCAG-2.2-AA.md`](./docs/accessibility/WCAG-2.2-AA.md)). Testes automatizados não substituem revisão manual.
- Escopo do produto: [`PRODUCT.md`](./PRODUCT.md).
- Direção visual: [`DESIGN.md`](./DESIGN.md).
- Fluxo de branches, commits e Pull Requests: [`CONTRIBUTING.md`](./CONTRIBUTING.md).
