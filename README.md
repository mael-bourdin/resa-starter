# Résa

Application de réservation des salles du campus (Node.js + Express + PostgreSQL).

## Prérequis

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/get-docker/) avec Compose v2 (`docker compose version`)
- [Node.js 26](https://nodejs.org/) via [nvm](https://github.com/nvm-sh/nvm) : utile pour les hooks Git et pour développer hors conteneur

PostgreSQL n'est **pas** à installer : il tourne dans un conteneur.

## Démarrer en 3 commandes

```bash
git clone https://github.com/mael-bourdin/resa-starter.git resa
cd resa
cp .env.example .env      # puis choisis un mot de passe pour PGPASSWORD (lettres et chiffres)
docker compose up --build
```

L'application est sur <http://localhost:3000>.

## Développer sans reconstruire l'image

```bash
nvm use                    # Node 26, lu depuis .nvmrc
npm ci
docker compose up -d db    # seulement la base, publiée sur localhost:5433
npm run dev                # redémarre à chaque modification
```

`npm run doctor` vérifie ton poste (Node, Docker, `.env` non versionné…).

## Configuration

Toutes les variables sont dans `.env` (jamais versionné), modèle dans `.env.example` :

| Variable                | Rôle                                  | Valeur par défaut |
| ----------------------- | ------------------------------------- | ----------------- |
| `PORT`                  | port de l'application                 | `3000`            |
| `PGHOST`                | hôte PostgreSQL                       | `localhost`       |
| `PGPORT`                | port PostgreSQL publié sur ta machine | `5433`            |
| `PGUSER` / `PGDATABASE` | utilisateur et base                   | `resa` / `resa`   |
| `PGPASSWORD`            | mot de passe                          | à choisir         |

Dans Compose, l'application joint la base via `PGHOST=db` et `PGPORT=5432` (surchargés dans `docker-compose.yml`).

## Dépannage

- **Port déjà utilisé** (`port is already allocated`) : change `PORT` ou `PGPORT` dans `.env`.
- **Réinitialiser la base** : `docker compose down -v`, puis `docker compose up --build`. `db/init.sql` ne s'exécute que sur un volume vide.
- **Mot de passe refusé après avoir changé `PGPASSWORD`** : même remède, `docker compose down -v` (le mot de passe est fixé à la création du volume).
- **Linux : `permission denied` sur Docker** : `sudo usermod -aG docker $USER`, puis déconnecte-toi et reconnecte-toi.

## Contribuer

1. Une branche par ticket depuis `main` : `git switch -c feat/7-commits-conventionnels`.
2. Des commits au format [Conventional Commits](https://www.conventionalcommits.org/fr/) :

   ```text
   type(portée optionnelle): description à l'impératif, en minuscule

   Closes #7
   ```

   Types acceptés : `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

3. Une pull request vers `main`, relue par un·e coéquipier·e avant fusion.

`npm install` active les hooks Git (Husky). Le hook `commit-msg` lance commitlint : un message comme `update` est refusé.

## Équipe
