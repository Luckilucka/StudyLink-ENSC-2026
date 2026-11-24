# 🐙 Mini-Formation Git & GitHub — Guide de Survie StudyLink

Bienvenue sur le dépôt de **StudyLink** ! Ce guide explique l'essentiel de Git/GitHub en 5 minutes et détaille la procédure obligatoire pour coder, créer une branche `feature` et demander une *Pull Request* sans casser le code des autres.

---

## 🧠 1. L'essentiel en 2 minutes

### Quelle différence entre Git et GitHub ?
* **💻 Git** : Le logiciel sur ton ordinateur qui enregistre l'historique de tes modifications (comme une sauvegarde rapide dans un jeu vidéo).
* **☁️ GitHub** : Le site web qui héberge le projet commun pour que toute l'équipe puisse synchroniser son travail sans s'envoyer des `.zip` sur WhatsApp.

### Les 5 mots-clés à connaître
* **📥 Cloner (`git clone`)** : Télécharger le dépôt sur ton PC (à faire **1 seule fois** au début).
* **🌿 Branche (`branch`)** : Une copie parallèle du projet pour travailler isolément.
  * `main` : La branche principale (code propre, stable et validé pour la soutenance). **On ne code JAMAIS directement sur `main` !**
  * `feature/...` : Ta branche personnelle dédiée à une fonctionnalité (ex. `feature/page-catalogue`).
* **💾 Commit** : Un point de sauvegarde local de ton travail avec un message explicatif.
* **🚀 Push** : Envoyer tes commits locaux vers GitHub.
* **📬 Pull Request (PR)** : Une demande officielle sur GitHub pour fusionner ta branche `feature` dans `main` après relecture par un 2A.

---

## ⚙️ 2. Configuration initiale (À faire 1 seule fois)

1. Ouvre le projet dans **VS Code** et ouvre le terminal intégré (`Ctrl + ù` ou menu *Terminal > Nouveau terminal*).
2. Configure ton identité Git (avec l'adresse e-mail de ton compte GitHub) :

```bash
git config --global user.name "Prénom Nom"
git config --global user.email "ton.email@ensc.fr"
```

3. Télécharge le dépôt sur ton ordinateur :

```bash
git clone <URL_DU_DEPOT_GITHUB>
cd StudyLink
```

---

## 🚀 3. Procédure obligatoire pour coder & Push (5 étapes)

Chaque fois que tu commences une nouvelle tâche, suis ces 5 étapes dans l'ordre :

### Étape 1 : Récupérer la dernière version de `main`
Avant de créer ta branche, mets toujours ton code local à jour avec le travail déjà validé :

```bash
git checkout main
git pull origin main
```

### Étape 2 : Créer ta branche `feature`
Crée et bascule sur une branche dédiée à ta tâche (utilisez `feature/front-...` pour l'interface ou `feature/back-...` pour l'API/BDD) :

```bash
git checkout -b feature/front-page-catalogue
```

### Étape 3 : Coder et faire des sauvegardes régulières (`commit`)
Code ta fonctionnalité (en respectant l'arborescence et les maquettes Bootstrap). Dès qu'un bloc fonctionne, sauvegarde-le :

```bash
# 1. Vérifier les fichiers modifiés
git status

# 2. Ajouter les fichiers à sauvegarder
git add .

# 3. Créer le commit avec un message clair
git commit -m "feat(front): ajout de la grille des tuteurs et filtres"
```

### Étape 4 : Envoyer ta branche sur GitHub (`push`)
Envoie ta branche `feature` et tes commits sur le dépôt distant :

```bash
# Premier envoi de cette branche :
git push -u origin feature/front-page-catalogue

# Pour les envois suivants sur cette même branche, un simple suffit :
git push
```

---

## 🤝 4. Demander une Pull Request (PR) pour fusionner son travail

Une fois ta page ou fonctionnalité terminée et testée sur ton navigateur (mobile + PC) :

1. Rends-toi sur la page GitHub du dépôt **StudyLink**.
2. Clique sur le bandeau jaune **"Compare & pull request"** qui apparaît en haut.
3. Vérifie que la fusion va bien dans le bon sens :
   * **base :** `main` *(la branche qui reçoit le code)*
   * **compare :** `feature/front-page-catalogue` *(ta branche)*
4. Décris brièvement ce que tu as fait (ajoute une capture d'écran si c'est visuel et liste les `id` HTML ajoutés pour le JS).
5. Sur la droite, dans **Reviewers**, assigne un **2A** (Lucaïna ou Kesiah), puis clique sur **"Create pull request"**.
6. Une fois relue et validée (*Merged*), ton code est intégré à `main` ! Tu peux supprimer ton ancienne branche sur GitHub.

---

## 🆘 5. SOS — En cas de galère

* **Tu as commencé à coder sur `main` par erreur (avant de créer ta branche) ?**
  Pas de panique ! Tape simplement la commande suivante pour créer ta branche en emportant tes modifications avec toi :
  ```bash
  git checkout -b feature/ma-nouvelle-branche
  ```
* **Git affiche un message d'erreur rouge ou un conflit (`CONFLICT`) ?**
  Ne fais **jamais** de `--force` ! Envoie une capture d'écran du terminal sur le groupe WhatsApp de l'équipe, on débloque ça ensemble en 2 minutes.