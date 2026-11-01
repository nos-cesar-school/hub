# Contribuição

Este documento define o fluxo de branches, commits, Pull Requests e rulesets do Hub do NOS. Ele complementa o escopo em `PRODUCT.md`, a direção visual em `DESIGN.md` e os requisitos de acessibilidade em `docs/accessibility/WCAG-2.2-AA.md`.

## Branches permanentes

| Branch | Função | Recebe Pull Requests de |
|---|---|---|
| `develop` | Integração do trabalho em andamento; branch padrão do repositório | Branches de trabalho |
| `staging` | Candidata para revisão e validação antes da homologação | `develop` |
| `main` | Versão homologada | `staging` |

Não fazer push diretamente para `develop`, `staging` ou `main`. As mudanças entram por Pull Request. `develop` é a branch padrão do repositório.

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

### Atualizar uma branch de trabalho

Antes de abrir ou atualizar uma PR, buscar as mudanças mais recentes de `develop` e rebasear a branch de trabalho sobre elas:

```bash
git fetch origin
git switch feat/minha-tarefa
git rebase origin/develop
```

Resolver eventuais conflitos, executar os testes e continuar com `git rebase --continue` (ou cancelar com `git rebase --abort`). Se a branch já foi enviada ao GitHub, atualizar **somente a branch de trabalho própria** com `git push --force-with-lease`. Não usar force push em `develop`, `staging` ou `main`. Se outras pessoas compartilham a branch, combinar antes do rebase ou integrar `origin/develop` com merge.

O rebase local serve para atualizar uma branch de trabalho; ele não é o método **Rebase and merge** do botão de PR no GitHub, que está desativado para este repositório.

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

Estão ativos dois rulesets no repositório:

| Ruleset | Branches-alvo | Método de merge exigido |
|---|---|---|
| `protect-develop-squash` | `develop` | Squash |
| `protect-staging-main-merge` | `staging`, `main` | Merge commit |

Ambos exigem Pull Request, uma aprovação, descarte de aprovações antigas após novos commits, resolução das conversas, bloqueio de force push e exclusão da branch, sem bypass. O ruleset de `develop` permite apenas squash; o de `staging`/`main`, apenas merge commit.

Configurações globais de Pull Request: **Merge commits** e **Squash** habilitados; **Rebase** desabilitado. As regrasets continuam sendo a fonte de verdade para o método permitido em cada branch.

| Branch | Origem esperada do PR | Validação |
|---|---|---|
| `develop` | Branch de trabalho | Build e testes do projeto |
| `staging` | `develop` | Build, testes e validação da versão candidata |
| `main` | `staging` | Build, testes e aprovação da versão para homologação |

**CI:** ainda não há workflow do GitHub Actions. Por isso, status checks não são obrigatórios nas rulesets. Quando o CI for configurado, exigir os checks com os nomes que o workflow publicar; ele deve executar `npm run build`, `npm run test` e `npm run test:a11y`.

## Antes de abrir um Pull Request

```bash
npm ci
npm run build
npm run test
npm run test:a11y
```

Em mudanças de interface, executar também `npm run test:ui` e revisar a implementação em desktop, tablet e mobile. Os testes automatizados não substituem a avaliação manual WCAG indicada em `docs/accessibility/WCAG-2.2-AA.md`.
