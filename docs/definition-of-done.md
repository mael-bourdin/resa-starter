# Definition of Done

Un ticket est **terminé** quand sa pull request est fusionnée dans `develop` et que tous ces critères sont remplis.

## Fonctionnel

- [ ] Tous les critères d'acceptation du ticket sont cochés.
- [ ] Le projet démarre toujours avec `docker compose up --build`.

## Qualité

- [ ] Les tests passent : `npm test`.
- [ ] Une règle métier nouvelle ou corrigée a son test.
- [ ] Le lint passe, sans erreur.
- [ ] Les commits suivent Conventional Commits (vérifié par commitlint).
- [ ] La documentation est à jour si besoin (README, `.env.example`).

## Sécurité

- [ ] `npm audit --audit-level=high` ne trouve rien.
- [ ] Aucun secret dans le code ni dans l'historique (mot de passe, clé d'API, `.env`).
- [ ] Les données utilisateur ne sont jamais injectées telles quelles dans du HTML ou du SQL.

## Revue

- [ ] La PR vise `develop` et référence le ticket (`Closes #N`).
- [ ] La PR est relue et approuvée par l'autre membre de l'équipe.
- [ ] Les commentaires de revue sont traités.
