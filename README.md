# MaPtiteColoc - Backend

Ce projet est une API permettant de gérer des colocations, leurs membres, finances, et diverses opérations courantes.

## Prérequis

- Node.js (version 16+)
- Base de données MySQL (ou autre, selon la configuration)
- Variables d’environnement (fichier `.env`) :
  - `JWT_SECRET` et `JWT_REFRESH_SECRET` pour l’authentification
  - `DB_HOST`, `DB_USER`, etc. pour la base de données

## Installation

1. Cloner le dépôt Git.
2. Installer les dépendances :
   ```bash
   npm install
   ```

## Routes Principales

### Authentification - /api/users

- **POST /register**  
  Permet de créer un nouvel utilisateur (champs : nom, prénom, email, âge, mot de passe…).

- **POST /login**  
  Retourne un token JWT si l’email et le mot de passe sont corrects.

- **POST /refresh**  
  Permet de rafraîchir le token d’authentification avec un refresh token.

- **GET /me**  
  Retourne les informations de l’utilisateur actuellement connecté (token nécessaire).

### Colocation - /api/colocs

- **POST /create (protégé)**  
  Crée une nouvelle colocation. Ajoute automatiquement l’utilisateur comme propriétaire.

- **GET /:id (protégé)**  
  Récupère les informations d’une colocation précise, y compris ses membres.

- **DELETE /:id (protégé)**  
  Marque la colocation comme supprimée (garde un historique, sans suppression réelle).

### Membres - /api/members

- **POST /add (protégé)**  
  Ajoute un membre à la colocation (autorisé uniquement au propriétaire).

- **DELETE /remove (protégé)**  
  Supprime un membre de la colocation (autorisé uniquement au propriétaire).

### Tâches (Bonus) - /api/tasks

- **POST / (protégé)**  
  Crée une nouvelle tâche (ex. ménage, courses…).

- **GET / (protégé)**  
  Liste toutes les tâches existantes.

### Finances (Exemple) - /api/finances

- **POST /charges (protégé)**  
  Ajoute une charge (loyer, courses…).

- **POST /pay (protégé)**  
  Simule un paiement/remboursement.

- **GET /history (protégé)**  
  Retourne l’historique des transactions.

## Tests

Exécutez les tests unitaires :

```bash
npm run test
```

## Licence

Projet privé - Tous droits réservés.
