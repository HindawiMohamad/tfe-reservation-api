# 🛠️ TFE - API Express.js | Application de gestion de réservation pour artisans

Cette API permet de gérer les données pour une application web de réservation entre clients et artisans (plombiers, électriciens, etc.).

---

## 🚀 Stack utilisée

- **Node.js** + **Express.js**
- **MongoDB** avec **Mongoose**
- **dotenv** pour la config
- **CORS** pour la communication avec le front
- **Nodemon** pour le dev

---

## 📁 Structure du projet


---

## 🧪 Données de test (non incluses dans le repo)

Pour faciliter mes tests pendant le développement, j’ai créé deux fichiers :

- `artisans.json` : contient 10 artisans fictifs
- `importArtisans.js` : script Node.js pour les importer dans la base

Ces fichiers sont **ignorés dans Git** volontairement grâce au `.gitignore`, car :

- Ils contiennent des mots de passe en clair (même si c’est pour du test)
- Ils ne sont pas nécessaires pour faire tourner le projet
- Ils sont utilisés **une seule fois** pour remplir la base

👉 Si besoin, je peux les fournir séparément pour les tests, mais ils ne sont **pas indispensables** à l’exécution de l’API.

