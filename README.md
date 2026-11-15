# 🎓 Transpromo Studylink
> **Faciliter le partage de connaissances, l'entraide et le tutorat inter-promotions au sein de l'école.**

![Status](https://img.shields.io/badge/Statut-En%20cours%20de%20conception-blue)
![Méthodologie](https://img.shields.io/badge/Approche-CCU%20%26%20Agile-success)
![Profil](https://img.shields.io/badge/Ing%C3%A9nierie-Cognitique%20%26%20UX-purple)

---

## 📋 Table des matières
1. [Vision du Projet](#-vision-du-projet)
2. [Gestion de Projet & Organisation d'Équipe](#-gestion-de-projet--organisation-déquipe)
3. [Démarche de Conception Centrée Utilisateur (CCU)](#-démarche-de-conception-centrée-utilisateur-ccu)
4. [Architecture Technique & Développement](#-architecture-technique--développement)
5. [Roadmap & Jalons](#-roadmap--jalons)
6. [Installation & Démarrage rapide](#-installation--démarrage-rapide)

---

## 🎯 Vision du Projet

**Transpromo Studylink** est une plateforme collaborative conçue pour briser les silos entre les différentes promotions d'étudiants (1ère, 2ème et 3ème année). 

### Problématique
Les étudiants rencontrent souvent des difficultés à :
* Identifier rapidement des pairs maîtrisant des compétences spécifiques dans les promotions supérieures.
* Centraliser et retrouver les ressources pédagogiques partagées de manière informelle.
* Organiser des sessions de tutorat ou de révision efficaces sans friction organisationnelle.

### Objectif
Créer une interface intuitive, ergonomique et engageante permettant la mise en relation intelligente (matching besoins/compétences), le partage structuré de ressources et la planification d'entraide, tout en minimisant la charge cognitive des utilisateurs.

---

## 👥 Gestion de Projet & Organisation d'Équipe

En tant que Chef de Projet et Ingénieur Cogniticien, le pilotage repose sur une approche hybride alliant **cadre structurant (cycle en V pour les livrables académiques)** et **agilité (Sprints Scrum/Kanban pour le développement itératif)**.

### Rôles & Responsabilités (Matrice RACI simplifiée)
* **Chef de Projet & Référent UX/CCU :** Pilotage global, gestion des risques, animation des rituels, architecture cognitive et validation ergonomique.
* **Pôle Recherche Utilisateur & Design (UI/UX) :** Entretiens, création des personas, maquettage (wireframes, prototypes interactifs) et tests utilisateurs.
* **Pôle Développement Front-End :** Intégration de l'interface finale, accessibilité, responsive design et gestion de l'état applicatif.
* **Pôle Développement Back-End & Data :** Conception de la base de données, API REST/GraphQL, algorithme de mise en relation et sécurité/RGPD.

### Rituels d'équipe
* **Daily / Point rapide (15 min, 2x/semaine) :** Synchronisation sur les blocages et avancées.
* **Sprint Planning & Review (Toutes les 2 semaines) :** Démonstration des incréments fonctionnels et ajustement du backlog produit.
* **Rétrospective :** Amélioration continue des processus de travail de l'équipe.

---

## 🧠 Démarche de Conception Centrée Utilisateur (CCU)

Conformément à la norme **ISO 9241-210** et aux principes de l'ingénierie cognitique, le développement est guidé par les besoins réels et les capacités cognitives des étudiants.

### 1. Comprendre et spécifier le contexte d'utilisation
* **Recherche utilisateur :** Questionnaires quantitatifs auprès des promotions et entretiens semi-directifs (analyse de l'activité réelle d'entraide).
* **Livrables :** Création de **Personas** (ex: *L'étudiant de 1A en difficulté*, *Le tuteur de 3A débordé*), **Empathy Maps** et **Parcours Utilisateurs (User Journeys)**.

### 2. Spécifier les exigences utilisateurs et organisationnelles
* Définition des scénarios d'usage critiques (User Stories).
* Priorisation des fonctionnalités selon la méthode **MoSCoW** (*Must have, Should have, Could have, Won't have*).
* Prise en compte des facteurs humains : réduction de la charge mentale, guidage, prévention des erreurs.

### 3. Produire des solutions de conception (Itératif)
* **Architecture de l'information :** Tri par cartes (*Card Sorting*) et arborescence de navigation.
* **Prototypage progressif :** 
  1. *Zonings & Wireframes basse fidélité* (validation des flux).
  2. *Maquettes haute fidélité & Design System* sur Figma (cohérence visuelle, contrastes, typographie).

### 4. Évaluer la conception par rapport aux exigences
* **Évaluation heuristique :** Audit ergonomique basé sur les critères de Bastien & Scapin (Guidage, Charge de travail, Contrôle explicite, Adaptabilité, etc.).
* **Tests utilisateurs (Think-Aloud Protocol) :** Observation d'un panel représentatif d'étudiants sur des tâches scénarisées, mesure de l'efficacité, de l'efficience et de la satisfaction (échelle **SUS - System Usability Scale**).

---

## 💻 Architecture Technique & Développement

L'interface finale est pensée pour être réactive, modulaire et accessible (respect des normes WCAG).

### Stack Technologique envisagée
* **Front-End :** React.js / Vue.js (ou HTML5/CSS3/JS moderne) + Tailwind CSS pour un prototypage rapide et fidèle au Design System.
* **Back-End :** Node.js (Express) ou Python (FastAPI).
* **Base de données :** PostgreSQL (données relationnelles : utilisateurs, promos, compétences) ou Firebase/Supabase pour un déploiement rapide.
* **Outils de collaboration :** Git / GitHub (gestion de versions avec convention *Conventional Commits*), Figma (Design), Notion / Trello (Gestion de tâches).

### Bonnes pratiques de code (Lien UX -> Dev)
* **Design Tokens :** Traduction directe des variables Figma (couleurs, espacements, polices) dans le code CSS.
* **Approche Composants :** Découpage de l'interface en composants réutilisables et isolés.
* **Feedback système immédiat :** Gestion soignée des états de chargement (*skeleton screens*), des messages d'erreur explicites et des micro-interactions.

---

## 📅 Roadmap & Jalons

| Phase | Période | Objectifs & Livrables Clés |
| :--- | :--- | :--- |
| **Phase 1 : Cadrage & Recherche** | Semaines 1 - 2 | Note de cadrage, planning, entretiens utilisateurs, Personas, benchmark. |
| **Phase 2 : Idéation & Maquettage** | Semaines 3 - 4 | Arborescence, User Flows, Wireframes, Design System, Prototype Figma v1. |
| **Phase 3 : Évaluation UX & Itération** | Semaine 5 | Protocole de test, passation des tests utilisateurs, calcul du score SUS, itération v2. |
| **Phase 4 : Développement MVP** | Semaines 6 - 9 | Initialisation du dépôt, développement Front/Back, intégration du matching et du partage. |
| **Phase 5 : Recette & Déploiement** | Semaines 10 - 11 | Tests fonctionnels, correction des bugs, audit d'accessibilité, déploiement. |
| **Phase 6 : Soutenance & Bilan** | Semaine 12 | Rédaction du rapport final, préparation du pitch et démonstration live. |

---

## 🚀 Installation & Démarrage rapide

*(Section à compléter lors de l'initialisation du dépôt de code)*

```bash
# Cloner le dépôt
git clone https://github.com/votre-organisation/transpromo-studylink.git

# Accéder au dossier du projet
cd transpromo-studylink

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

---

## 📝 Auteurs & Équipe
* **Chef de Projet / Ingénieur Cogniticien :** [Ton Nom]
* **Équipe projet :** [Nom 2], [Nom 3], [Nom 4]

---
*Document généré dans le cadre du projet Transpromo Studylink — Alliant Ingénierie Cognitique, Gestion de Projet et Développement Web.*
