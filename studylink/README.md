# StudyLink — plateforme d’entraide entre étudiants de l’ENSC

Site en **HTML / CSS / JavaScript pur** (aucune installation, aucun framework).

## Lancer le site

**Option 1 — le plus simple :** double-clique sur `index.html`.

**Option 2 — serveur local (recommandé pour le travail en équipe) :**
- VS Code : extension *Live Server* → clic droit sur `index.html` → *Open with Live Server*
- ou en terminal, dans le dossier : `python -m http.server 8000` puis ouvrir http://localhost:8000

**Compte de démo :** `helia.usandisaga@ensc.fr` / `studylink`
(tous les comptes fictifs ont le mot de passe `studylink` : lea.dubois@ensc.fr, emma.laurent@ensc.fr…)

## Pages

| Page | Fichier | Accès |
|---|---|---|
| Accueil (landing) | `index.html` | public |
| Comment ça marche ? | `comment-ca-marche.html` | public |
| À propos | `a-propos.html` | public |
| Connexion | `connexion.html` | public |
| Inscription | `inscription.html` | public |
| Tableau de bord | `espace.html` | connecté |
| Consulter les créneaux (filtres, onglets, infos, réservation) | `creneaux.html` | connecté |
| Proposer de l’aide | `proposer.html` | connecté |
| Demander de l’aide | `demander.html` | connecté |
| Mes séances (à venir, publications, historique, annulation, validation + note) | `seances.html` | connecté |
| Messagerie | `messagerie.html` | connecté |
| Mon profil | `profil.html` | connecté |

## Organisation du code

```
css/style.css      → tout le style (couleurs des maquettes dans :root)
js/store.js        → "back-end" simulé : comptes, créneaux, messages, notifications (localStorage)
js/ui.js           → composants partagés : header, sidebar, notifications, modales, toasts, icônes
js/slot-form.js    → formulaire commun Proposer / Demander
assets/            → favicon
```

## Fonctionnement des données

Il n’y a pas de serveur : tout est enregistré dans le **localStorage** du navigateur
(clé `studylink_db_v1`). Au premier lancement, des données de démo sont créées
(les 6 créneaux des maquettes, des conversations, des notifications).
Profil → « Réinitialiser la démo » remet tout à zéro.

⚠️ Conséquences : chaque navigateur a ses propres données, et les mots de passe sont
stockés en clair. C’est adapté à une démo / soutenance, pas à une mise en production.
Pour passer à un vrai back-end, il suffit de remplacer les fonctions de `js/store.js`
(login, register, createSlot, reserveSlot, sendMessage…) par des appels `fetch()` vers une API :
les pages n’utilisent que ces fonctions.

## Règles métier implémentées

- Inscription réservée aux adresses `@ensc.fr`, mot de passe ≥ 8 caractères.
- On ne voit pas ses propres créneaux dans « Consulter les créneaux », ni les créneaux passés ou déjà réservés.
- Réserver un créneau prévient l’autre étudiant (notification + message automatique dans la messagerie).
- Annuler une réservation remet le créneau en ligne ; supprimer sa publication prévient l’inscrit.
- Une séance commencée passe « À valider » ; l’étudiant aidé peut laisser une note (1 à 5 ★).
