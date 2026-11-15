# Guide de Contribution & Mini-Formation GitHub — StudyLink

Bienvenue sur le dépôt officiel de **StudyLink** (Projet TransPromotion ENSC)[cite: 69] !
Ce document sert à la fois de **guide de survie Git/GitHub** pour les 1A et de **règles d'équipe** pour que notre code reste propre, accessible (WCAG) et fonctionnel jusqu'à la soutenance finale du 17 décembre[cite: 73, 74].

---

## Partie 1 : L'essentiel de Git & GitHub en 5 minutes

### 1. C'est quoi la différence entre Git et GitHub ?
* **Git** est un logiciel installé sur ton ordinateur qui agit comme une « machine à remonter le temps » pour ton code. Il enregistre l'historique de tes modifications.
* **GitHub** est le site web (le cloud) qui héberge le projet commun pour que toute l'équipe puisse synchroniser son travail sans s'envoyer des fichiers `.zip` sur WhatsApp.

### 2. Le vocabulaire vital
* **Dépôt (Repository / Repo) :** Le dossier global du projet sur GitHub.
* **Cloner (`git clone`) :** Télécharger le projet depuis GitHub sur ton ordinateur (à faire une seule fois au début).
* **Branche (`branch`) :** Une copie parallèle du projet. La branche `main` contient uniquement le code propre et validé. **On ne code jamais directement sur `main` !** Chaque fonctionnalité a sa propre branche.
* **Commit :** Une sauvegarde locale de tes modifications avec un message explicatif (comme une sauvegarde rapide dans un jeu vidéo).
* **Push :** Envoyer tes commits locaux vers GitHub.
* **Pull :** Récupérer sur ton ordinateur les dernières modifications envoyées par les autres sur GitHub.
* **Pull Request (PR) :** Une demande officielle sur GitHub pour fusionner ta branche de travail dans `main` après relecture par un 2A.

---

## Partie 2 : Installation et premier démarrage (À faire 1 seule fois)

1. Installe **Git** sur ton PC et ouvre **VS Code**.
2. Ouvre le terminal intégré dans VS Code (`Ctrl + ù` ou menu *Terminal > Nouveau terminal*).
3. Configure ton identité (avec l'email de ton compte GitHub) :
   ```bash
   git config --global user.name "Ton Prénom Nom"
   git config --global user.email "ton.email@ensc.fr"
   ```
4. Place-toi dans le dossier où tu ranges tes cours et télécharge le projet :
   ```bash
   git clone <LIEN_DU_DEPOT_GITHUB>
   cd StudyLink
   ```

---

## Partie 3 : Procédure obligatoire quand tu codes

Pour éviter d'écraser le travail des autres ou de bloquer l'équipe, suis **toujours** ces 5 étapes dans l'ordre :

### Étape 1 : Récupérer la dernière version du projet
Avant de commencer à coder, mets toujours ta branche `main` à jour :
```bash
git checkout main
git pull origin main
```

### Étape 2 : Créer ta propre branche de travail
Crée une branche dédiée à la tâche qui t'a été attribuée, en utilisant un préfixe clair (`feat/` pour une fonctionnalité, `fix/` pour un bug, `style/` pour du CSS) :
```bash
git checkout -b feat/formulaire-reservation
```

### Étape 3 : Coder et respecter les règles StudyLink
* **Architecture :** Range tes fichiers au bon endroit (`src/pages/` pour le HTML, `src/css/` pour le style, `src/js/` pour les scripts).
* **Responsive & Mobile-First :** Le site doit être parfaitement lisible sur smartphone et ordinateur (penser aux tests utilisateurs).
* **Accessibilité (Normes WCAG / RGAA — exigence du CDC) :**
  * Toujours mettre un attribut `alt` descriptif sur les images (`<img src="..." alt="...">`)[cite: 73].
  * Utiliser des balises sémantiques (`<header>`, `<nav>`, `<main>`, `<button>`) plutôt que des `<div>` partout.
  * Associer chaque champ `<input>` à un `<label>`.
  * Vérifier que le contraste des couleurs reste bien lisible[cite: 73].

### Étape 4 : Sauvegarder (Commit) et envoyer (Push)
Fais des sauvegardes régulières dès qu'une petite partie fonctionne :
```bash
# 1. Vérifier les fichiers modifiés
git status

# 2. Sélectionner les fichiers à sauvegarder
git add .

# 3. Créer le point de sauvegarde avec un message clair
git commit -m "feat: ajout de la grille de créneaux horaires"

# 4. Envoyer ta branche sur GitHub
git push origin feat/formulaire-reservation
```

### Étape 5 : Demander la validation (Pull Request)
1. Va sur la page GitHub du projet : un bandeau jaune apparaît avec le bouton **"Compare & pull request"**. Clique dessus.
2. Décris brièvement ce que tu as fait (et ajoute une capture d'écran si c'est visuel).
3. Assigne un **2A en Reviewer** (relecteur) sur la droite, puis clique sur **Create pull request**.
4. Une fois validée et fusionnée par un 2A, ton code fait officiellement partie de `main` !

---

## En cas de panique (SOS Git)
* **Tu as modifié des fichiers sur `main` par erreur avant de créer ta branche ?** Pas de panique : tape simplement `git checkout -b feat/ma-branche`, tes modifications suivront automatiquement sur la nouvelle branche.
* **Tu as un conflit ou une erreur rouge dans le terminal ?** Ne force jamais avec `--force`. Envoie une capture d'écran du terminal sur le groupe WhatsApp de l'équipe, on débloque ça ensemble en 2 minutes.
