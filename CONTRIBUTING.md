# Contribuição

Este documento define o fluxo proposto de branches, commits e Pull Requests do Hub do NOS. Ele complementa o escopo em `PRODUCT.md`, a direção visual em `DESIGN.md` e os requisitos de acessibilidade em `docs/accessibility/WCAG-2.2-AA.md`.

## Branches permanentes

| Branch | Função | Recebe Pull Requests de |
|---|---|---|
| `develop` | Integração do trabalho em andamento; branch padrão do repositório | Branches de trabalho |
| `staging` | Candidata para revisão e validação antes da homologação | `develop` |
| `main` | Versão homologada | `staging` |

Não fazer push diretamente para `develop`, `staging` ou `main`. As mudanças entram por Pull Request. A branch `develop` já é a padrão no GitHub; confirmar essa configuração após a inicialização do clone local.

## Branches de trabalho

Criar branches curtas a partir de `develop`, usando minúsculas, hífens e um prefixo semântico:

```text
feat/<descricao>
fix/<descricao>
docs/<descricao>
test/<descricao>
refactor/<descricao>
chore/<descricao>
hotfix/<descricao>
revert/<descricao>
```

Exemplos: `feat/nos-hub-initial`, `fix/mobile-nav`, `docs/backlog-mvp`, `hotfix/broken-homepage`.

Fluxo normal:

1. Criar uma branch de trabalho a partir da versão atualizada de `develop`.
2. Fazer commits pequenos e focados.
3. Abrir Pull Request para `develop`.
4. Após revisão e verificações, integrar a mudança. Apagar a branch de trabalho após o merge.
5. Promover `develop` para `staging` por Pull Request quando houver uma versão candidata para validação.
6. Promover `staging` para `main` por Pull Request após a aprovação da versão.

O GitHub não restringe a branch de origem do Pull Request com as regrasets básicas; conferir manualmente que as promoções seguem `develop → staging → main`.

## Hotfix e rollback

### Hotfix em produção

Para um defeito crítico em `main`:

1. Criar `hotfix/<descricao>` a partir de `main`.
2. Fazer a menor correção segura e executar build e testes.
3. Abrir Pull Request para `main`, mantendo as regras de revisão e sem push direto.
4. Após o merge e a publicação aprovada, abrir Pull Requests para levar a correção de `main` a `staging` e `develop`, evitando que o defeito volte em uma promoção futura.

Para um defeito encontrado em `staging` antes da publicação, corrigir por Pull Request para `staging` e levar a mesma correção a `develop` antes da próxima promoção.

### Rollback

Se uma alteração publicada causar um problema, criar `revert/<descricao>` a partir da branch afetada, usar `git revert <sha-do-commit>` para criar um commit que desfaz a alteração e abrir Pull Request. Não reescrever o histórico compartilhado com `reset --hard` ou force push. Executar build e testes antes de integrar; depois, sincronizar a reversão nas branches permanentes relacionadas.

O pacote ainda não tem publicação nem rollback automatizados. O procedimento para restaurar uma versão pública depende da hospedagem e do fluxo de publicação que forem aprovados.

## Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) no formato:

```text
<tipo>(<escopo>): <resumo no imperativo>
```

Tipos comuns: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci` e `revert`. O escopo é opcional. Usar um resumo curto, sem ponto final.

Exemplos:

```text
feat(menu): usa popover nativo em telas pequenas
fix(layout): evita overflow em 320 px
docs(contributing): define regras de branches
test(a11y): cobre navegação do menu por teclado
revert(menu): restaura navegação anterior
```

Para mudanças incompatíveis, usar `!` após o tipo/escopo e explicar `BREAKING CHANGE:` no corpo do commit.

## Pull Requests

- Usar um título no formato Conventional Commit.
- Descrever o que mudou e o motivo; associar issue quando houver.
- Informar os testes executados e os que ainda faltam.
- Para alterações visuais, incluir capturas de desktop e mobile e registrar a revisão de acessibilidade pertinente.
- Obter pelo menos uma aprovação de outra pessoa e resolver todas as conversas antes do merge.
- Integrar mudanças de feature/fix em `develop` com **Squash and merge**.
- Promover `develop → staging` e `staging → main` com **Create a merge commit**, preservando a relação entre as branches permanentes.
- Não exigir histórico linear enquanto as promoções usarem merge commits.
- Nas configurações do repositório, manter **Squash and merge** e **Create a merge commit** habilitados e desabilitar **Rebase and merge**, para evitar métodos fora do fluxo definido.

## Rulesets do GitHub

Criar rulesets ativos para `develop`, `staging` e `main`. Aplicar a cada um:

- exigir Pull Request antes do merge;
- exigir uma aprovação;
- descartar aprovações antigas quando novos commits forem enviados;
- exigir resolução das conversas de revisão;
- bloquear force push e exclusão da branch;
- deixar a lista de bypass vazia, inclusive para administradores.

Regras adicionais por branch:

| Branch | Origem esperada do PR | Validação |
|---|---|---|
| `develop` | Branch de trabalho | Build e testes do projeto |
| `staging` | `develop` | Build, testes e validação da versão candidata |
| `main` | `staging` | Build, testes e aprovação da versão para homologação |

**Estado atual:** as branches existem, mas ainda não há rulesets, proteção de branch ou workflow de CI configurados. Não marcar checks como obrigatórios antes de existir um workflow que os publique. Quando o CI estiver disponível, exigir `npm run build`, `npm run test` e `npm run test:a11y` como checks para os três alvos.

## Antes de abrir um Pull Request

```bash
npm ci
npm run build
npm run test
npm run test:a11y
```

Em mudanças de interface, executar também `npm run test:ui` e revisar a implementação em desktop, tablet e mobile. Os testes automatizados não substituem a avaliação manual WCAG indicada em `docs/accessibility/WCAG-2.2-AA.md`.
