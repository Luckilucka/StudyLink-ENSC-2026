# 🚀 Guide de Contribution, Architecture & Mini-Formation GitHub — StudyLink

Ce document sert à la fois de **feuille de route technique** pour l'équipe de développement et de **guide de survie Git/GitHub** afin que notre application soit ergonomique, accessible (**WCAG**), sécurisée (**RGPD**) et 100 % fonctionnelle pour la **soutenance finale du 17 décembre 2026**.

---

## 🧩 Partie 1 : Répartition des rôles & Consignes de développement (1A / 2A)

Notre architecture repose sur une séparation claire entre l'interface utilisateur (**Front-End**) et la logique métier / base de données (**Back-End**), reliées par des appels API en JavaScript.

---

### 🎨 1. Pôle Front-End & UX/UI — Équipe 1A (Jules & Romain)

> **🎯 Votre mission :** Intégrer fidèlement les maquettes validées lors de la phase **CCU** (*Conception Centrée Utilisateur*) en développant une interface web responsive avec **HTML5**, **CSS3** et **Bootstrap 5**, tout en garantissant une expérience fluide et accessible sur smartphone et ordinateur (normes **WCAG / RGAA**)

#### 🛠️ Vos tâches concrètes

* **📐 Respect ou innovation des maquettes CCU & Utilisation de Bootstrap 5 :**
  * **Inspiration des maquettes :** Chaque écran codé doit reproduire l'agencement, les fonctionnalités présentes et les parcours utilisateurs validés sur nos maquettes (issus de notre analyse des besoins), libre à vous d'innover sur certaines choses et de faire dans la mesure du possible pour réaliser le site
  * **Framework Bootstrap 5 :** Utilisez Bootstrap 5 (via CDN ou fichiers locaux) pour accélérer la mise en page responsive et assurer la cohérence visuelle
  * **CSS personnalisé minimal (`style.css`) :** N'utilisez le CSS sur mesure que pour appliquer la charte graphique exacte de nos maquettes (couleurs, typographies, bordures) sans casser les classes utilitaires de Bootstrap.

* **📄 Structure des pages à coder (HTML5 / Bootstrap) :**
  * `index.html` : Page d'accueil & présentation du concept *(rassurer et réduire l'appréhension de demander de l'aide)*
  * `auth.html` : Page d'authentification *(Inscription / Connexion — `EF_1`)*
  * `profil.html` : Page de profil utilisateur *(choix du rôle Tuteur / Tutoré, bio, matières maîtrisées ou demandées — `EF_2`, `EF_3`)*
  * `catalogue.html` : Catalogue & Recherche de tuteurs / demandes d'aide par matière avec filtres Bootstrap
  * `planning.html` : Interface de calendrier / sélection et publication de créneaux horaires *(`EF_4`, `EF_5`)*
  * `mes-seances.html` : Tableau de bord « Mes séances » *(rendez-vous à venir, passés et modale d'annulation avec motif obligatoire — `EF_7`)*
  * **P.S. C'est l'IA qui a rédigé ça et j'avais pas encore accès à la maquette, faites juste des pages correspondant aux maquettes.**

* **♿ Ergonomie & Accessibilité (Exigences `C_1` à `C_6` du CDC) :**
  * **Accessibilité WCAG :** Balises sémantiques (`<header>`, `<nav>`, `<main>`, `<section>`, `<button>`), attributs `alt` sur toutes les images, `<label for="...">` associés à chaque `<input>`, contrastes élevés et boutons suffisamment espacés (`p-2`, `gap-3`)
  * **Zéro Dark Pattern & Charge cognitive minimale :** L'utilisateur doit comprendre en moins de 5 secondes comment proposer ou demander un cours *(qualité pragmatique)* tout en se sentant en confiance *(qualité hédonique / non stigmatisant)*.

* **🔌 Préparation au branchement JS :**
  * Attribuez des `id` et des attributs `data-*` propres et explicites sur vos formulaires, boutons et conteneurs dynamiques *(ex. `id="form-inscription"`, `id="btn-reserver-creneau"`, `id="liste-tuteurs"`, `data-seance-id="12"`)* pour que le JavaScript des 2A puisse y injecter les données facilement.
  * Utilisez des données fictives (*mock*) directement dans le HTML uniquement pour tester le rendu visuel des cartes et listes Bootstrap, sans coder de logique métier en dur.

---

### ⚙️ 2. Pôle Back-End, Base de données & Liaison JS — Équipe 2A (Lucaïna & Kesiah)

> **🎯 Votre mission :** Développer l'architecture serveur en **C# / Entity Framework (EF Core)**, gérer la persistance des données (**RGPD**) et connecter le Front-End Bootstrap des 1A via **JavaScript** (`fetch` / API REST)

#### 🛠️ Vos tâches concrètes

* **🗄️ Modélisation Base de Données & Entity Framework (C# / EF Core) :**
  * **Conception des entités et migrations :** `Utilisateur` *(1A/2A/3A, rôle Tuteur/Tutoré, email `@ensc.fr`)*, `Matiere`, `Disponibilite` *(créneaux proposés)*, `Seance` *(réservation, statut, lieu/visio)*[cite: 75], `Annulation` *(motif obligatoire)*[cite: 75], `Evaluation` / `Notification`[cite: 68, 75].
  * **Implémentation des Exigences Fonctionnelles (`EF_1` à `EF_7`)[cite: 74, 75] :**
    * `EF_1` & `EF_2` : Création de compte, hachage des mots de passe, gestion et modification du profil[cite: 74, 75].
    * `EF_3` & `EF_4` : Gestion des rôles (Tuteur / Tutoré) et publication des créneaux de disponibilité[cite: 75].
    * `EF_5` & `EF_7` : Logique de réservation *(vérification qu'un créneau n'est pas déjà pris)* et annulation avec sauvegarde de la justification[cite: 75].
    * `EF_6` : Système de notifications et rappels automatiques *(e-mail **24h** et **2h** avant la séance pour contrer le risque d'absentéisme `R_1`)*[cite: 75, 76].
  * **Conformité RGPD (`ENF_4`) :** Minimisation des données collectées, sécurisation des accès et possibilité de supprimer son compte/ses données[cite: 74].

* **🔗 API & Liaison JavaScript (Le pont Front ↔ Back) :**
  * Exposition des endpoints API REST (JSON) propres et documentés pour Jules et Romain.
  * Écriture des scripts JS (`js/api.js`, `js/auth.js`, `js/booking.js`) qui interceptent les formulaires HTML des 1A, interrogent le serveur C# via `fetch()` et génèrent dynamiquement les composants Bootstrap *(cartes tuteurs, alertes de confirmation, modales)*.

* **🔍 Intégration, Code Review & Validation CCU :**
  * Relecture systématique des *Pull Requests* des 1A avant fusion dans `main` *(vérification de la conformité aux maquettes et aux normes WCAG)*[cite: 74].
  * Préparation de l'environnement de déploiement pour les **tests utilisateurs de décembre**[cite: 69, 76].

---

### 🤝 3. Le contrat d'interface (Comment 1A et 2A travaillent ensemble)

Pour éviter tout blocage entre le Front et le Back :

1. **🚫 Pas de mélange de code :** Les 1A ne touchent pas au code C# / Entity Framework ni aux appels `fetch` complexes. Ils livrent des pages HTML/Bootstrap fidèles aux maquettes avec des `id` clairs.
2. **🛡️ Respect du design :** Les 2A ne cassent pas la mise en page Bootstrap des 1A : lorsqu'ils branchent le JavaScript sur le HTML des 1A, ils conservent exactement la même hiérarchie de balises et les mêmes classes Bootstrap.
3. **📅 Point synchro hebdomadaire :** Chaque semaine, on compare les pages codées aux maquettes CCU et on vérifie que les champs (`name` / `id`) des formulaires HTML correspondent aux propriétés attendues par les modèles C#[cite: 75].

---

## 📂 Partie 2 : Architecture des fichiers du projet

Pour que tout le monde s'y retrouve sans conflit sur GitHub, voici l'arborescence officielle à respecter dès la création de vos fichiers :

```text
StudyLink/
│
├── frontend/                     # 🎨 ZONE DE TRAVAIL DES 1A (Jules & Romain)
│   ├── index.html                # Page d'accueil & présentation du concept
│   ├── auth.html                 # Inscription & Connexion (EF_1)
│   ├── profil.html               # Profil utilisateur, rôles & matières (EF_2, EF_3)
│   ├── catalogue.html            # Recherche de tuteurs / demandes d'aide
│   ├── planning.html             # Calendrier & gestion des disponibilités (EF_4, EF_5)
│   ├── mes-seances.html          # Tableau de bord & annulation avec motif (EF_7)
│   │
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css         # Charte graphique StudyLink (surcharge légère de Bootstrap)
│   │   ├── img/                  # Logos, icônes, avatars par défaut (optimisés web)
│   │   └── js/                   # 🔌 ZONE DE LIAISON DES 2A (Lucaïna & Kesiah)
│   │       ├── api.js            # Configuration des requêtes fetch() vers le serveur C#
│   │       ├── auth.js           # Gestion connexion/inscription/session
│   │       ├── catalogue.js      # Affichage dynamique des tuteurs et filtres
│   │       └── booking.js        # Réservation, disponibilités et annulation
│   │
│   └── components/               # 🧩 Snippets HTML de référence (Navbar, Footer) à copier-coller
│       ├── navbar.html
│       └── footer.html
│
├── backend/                      # ⚙️ ZONE DE TRAVAIL DES 2A (C# / .NET / EF Core)
│   ├── StudyLink.API/            # Contrôleurs API REST, Program.cs, configuration CORS
│   ├── StudyLink.Core/           # Modèles / Entités (Utilisateur, Matiere, Seance...)
│   └── StudyLink.Infrastructure/ # DbContext Entity Framework, Migrations, Service Email
│
├── docs/                         # 📄 Maquettes exportées (PNG/PDF), CDC, schémas BDD
└── README.md                     # 📘 Ce guide de contribution
