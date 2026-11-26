## Ticket

Closes #

## Ce qui change

<!-- En quelques lignes : le problème, la solution. -->

## Comment tester

<!-- Les commandes ou les étapes pour vérifier. -->

## Definition of Done

Voir [docs/definition-of-done.md](../docs/definition-of-done.md).

**Fonctionnel**

- [ ] Tous les critères d'acceptation du ticket sont cochés
- [ ] Le projet démarre avec `docker compose up --build`

**Qualité**

- [ ] `npm test` passe
- [ ] Une règle métier nouvelle ou corrigée a son test
- [ ] Le lint passe, sans erreur
- [ ] Commits au format Conventional Commits
- [ ] Documentation à jour si besoin (README, `.env.example`)

**Sécurité**

- [ ] `npm audit --audit-level=high` ne trouve rien
- [ ] Aucun secret dans le code ni dans l'historique
- [ ] Aucune donnée utilisateur injectée telle quelle dans du HTML ou du SQL

**Revue**

- [ ] La PR vise `develop`
- [ ] Relue et approuvée par l'autre membre de l'équipe
