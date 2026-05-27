# Bike Component Wear Tracker

Une API REST qui permet à un cycliste de suivre l'usure de ses composants consommables (chaîne, cassette, plaquettes de frein, etc.) et d'être alerté quand il est temps de les remplacer.

Conçue pour être utilisée aussi bien par un particulier que par un magasin ou fournisseur souhaitant offrir ce service à ses clients.

## Fonctionnalités

- Authentification JWT (register / login)
- Gestion de plusieurs vélos par utilisateur
- Ajout de composants sur un vélo avec une date d'installation
- Enregistrement des sorties (rides) avec la distance parcourue
- Calcul automatique de l'usure de chaque composant en fonction des km parcourus depuis son installation
- Alerte quand un composant dépasse son seuil de remplacement

## Technologies

- [NestJS](https://nestjs.com/) — framework Node.js
- [Prisma](https://www.prisma.io/) — ORM
- [PostgreSQL](https://www.postgresql.org/) — base de données
- [Docker](https://www.docker.com/) — conteneurisation
- JWT — authentification
- Swagger — documentation API

## Lancement avec Docker (recommandé)

```bash
# Configurer les variables d'environnement
cp .env.example .env
# Remplir JWT_SECRET dans .env

# Lancer l'app et la base de données
docker compose up
```

L'API est accessible sur `http://localhost:3000`.

## Installation locale

```bash
# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir DATABASE_URL et JWT_SECRET dans .env

# Appliquer les migrations
npx prisma migrate dev

# Lancer le serveur
pnpm start:dev
```

## Variables d'environnement

| Variable       | Description                        |
|----------------|------------------------------------|
| `DATABASE_URL` | URL de connexion PostgreSQL        |
| `JWT_SECRET`   | Clé secrète pour signer les tokens |

## Documentation API

Une fois le serveur lancé, la documentation Swagger est disponible sur :

```
http://localhost:3000/api
```

## Tests

```bash
pnpm test:e2e
```
