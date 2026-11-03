# NOS Hub — instruções de projeto para agentes

Leia `PRODUCT.md`, `DESIGN.md` e `docs/accessibility/WCAG-2.2-AA.md` antes de propor alterações.

## Objetivo
Construir a **landing page institucional (fase 1)** do Núcleo Open Source da CESAR School. O site deve comunicar estudantes, construção colaborativa e cultura Builder/Open Source, evitando aparência genérica de SaaS.

## Escopo obrigatório
- Somente **três equipes**: Desenvolvimento, Cibersegurança, Design UX/UI. **Não inventar DevOps como quarta equipe**.
- Não inventar inscrições abertas, formulários funcionais, contatos, projetos existentes, números, reconhecimentos ou depoimentos.
- Não implementar autenticação, perfis, crachás, horas ou backoffice nesta fase.
- Stack: Vite + HTML semântico + CSS + JavaScript puro. Evitar dependências de UI.

## Identidade e experiência
- Respeitar `DESIGN.md` sem reproduzir templates externos.
- Combinar grid técnico e acento laranja criterioso com composição editorial e representações úteis da colaboração.
- **Não confundir minimalismo com qualidade**: preservar a narrativa, a variedade de layouts e os elementos visuais com função.
- Em qualquer revisão de design, preservar o conteúdo aprovado e evitar remover seções ou equipes.

## Acessibilidade inegociável
- Objetivo: **WCAG 2.2 nível AA** (todos os critérios aplicáveis dos níveis A e AA).
- HTML semântico, rótulos, foco visível, teclado, contraste, reflow, menus acessíveis, links significativos e `prefers-reduced-motion`.
- O alvo WCAG 2.5.8 exige área mínima ou espaçamento equivalente; validar cada caso.
- O laranja claro da marca não deve ser usado diretamente como texto de leitura em fundo branco; usar token contrastante.
- Nunca declarar conformidade WCAG apenas porque testes automatizados retornaram zero alertas.

## Responsividade e testes
- Projetar para **320px até desktop largo**, sem rolagem lateral desnecessária; verificar retrato e paisagem.
- Executar `npm run build`, `npm run test`, `npm run test:a11y` quando o ambiente permitir.
- Os testes de `@axe-core/playwright` cobrem apenas critérios detectáveis automaticamente; documentar pendências manuais.
- Mudança relevante de layout deve ser avaliada em desktop, tablet e mobile.

## Git
- Não criar commits, fazer push ou alterar branches sem pedido explícito.
- Não instalar ou versionar skills, caches, binários ou configurações locais dos agentes.
