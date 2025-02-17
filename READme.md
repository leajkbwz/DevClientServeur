Gestionnaire de Tâches

Description
Il s'agit d'un système de gestion de tâches collaboratif permettant aux utilisateurs de créer, modifier, assigner et supprimer des tâches. Il inclut également une fonctionnalité de chat en temps réel pour discuter des tâches.

Fonctionnalités

Créer, modifier et supprimer des tâches.
Assigner des tâches à des utilisateurs.
Afficher les tâches dans une liste dynamique.
Discuter en temps réel à propos des tâches.

Pile Technologique
Frontend : React, Axios, WebSocket
Backend : Node.js, Express, MongoDB, Socket.io
Authentification : JWT (JSON Web Token)
Base de données : MongoDB

Installation

Backend
Cloner le dépôt du backend.
Exécuter npm install pour installer les dépendances requises.
Créer un fichier .env à la racine du dossier backend et y ajouter l'URI de connexion à MongoDB ainsi qu'une clé secrète pour JWT.
Exécuter npm start pour démarrer le serveur sur http://localhost:5000.

Frontend
Cloner le dépôt du frontend.
Exécuter npm install pour installer les dépendances requises.
Exécuter npm start pour démarrer le serveur de développement React sur http://localhost:3000.
Exécution des tests

Pour exécuter les tests du frontend, utilisez la commande suivante :

```bash
npm test

