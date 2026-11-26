/* =========================================================
   StudyLink — "back-end" simulé dans le navigateur (localStorage)
   Toutes les données (comptes, créneaux, messages, notifications)
   sont stockées localement. Remplaçable plus tard par une vraie API.
   ========================================================= */
(function () {
  "use strict";

  var DB_KEY = "studylink_db_v1";
  var SESSION_KEY = "studylink_session";
  var memory = {}; // secours si localStorage est indisponible

  var MATIERES = [
    "Mathématiques", "Statistiques", "Informatique", "Sciences cognitives",
    "Traitement du signal", "Psychologie cognitive", "Ergonomie", "IHM",
    "Neurosciences", "Électronique", "Physique", "Anglais",
    "Gestion de projet", "Communication"
  ];
  var LIEUX = ["Bibliothèque", "Salle de travail", "Foyer", "En ligne (visio)"];
  var ANNEES = ["1A", "2A", "3A"];

  /* ---------- Stockage ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return memory[k] || null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { memory[k] = v; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { delete memory[k]; } }

  function uid(p) { return (p || "id") + "_" + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function iso(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function today() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function addDays(n) { var d = today(); d.setDate(d.getDate() + n); return iso(d); }
  function nextWeekday(wd, minAhead) { // 5 = vendredi
    var d = today(); d.setDate(d.getDate() + (minAhead || 0));
    while (d.getDay() !== wd) d.setDate(d.getDate() + 1);
    return iso(d);
  }
  function ago(mins) { return new Date(Date.now() - mins * 60000).toISOString(); }

  /* ---------- Données de démonstration ---------- */
  function seed() {
    var users = [
      { id: "u_helia", prenom: "Hélia", nom: "Usandisaga", email: "helia.usandisaga@ensc.fr", annee: "2A", genre: "f",
        bio: "En 2A, à l'aise en psycho cognitive, un peu moins en traitement du signal 😅",
        aide: ["Psychologie cognitive", "Anglais"], besoin: ["Traitement du signal", "Mathématiques"] },
      { id: "u_lea", prenom: "Léa", nom: "Dubois", email: "lea.dubois@ensc.fr", annee: "3A", genre: "f",
        bio: "Maths et stats, j'adore expliquer !", aide: ["Mathématiques", "Statistiques"], besoin: [] },
      { id: "u_yanis", prenom: "Yanis", nom: "Benali", email: "yanis.benali@ensc.fr", annee: "3A", genre: "m",
        bio: "", aide: ["Informatique"], besoin: ["Statistiques"] },
      { id: "u_emma", prenom: "Emma", nom: "Laurent", email: "emma.laurent@ensc.fr", annee: "2A", genre: "f",
        bio: "Dev web & algo.", aide: ["Informatique"], besoin: ["Neurosciences"] },
      { id: "u_hugo", prenom: "Hugo", nom: "Moreau", email: "hugo.moreau@ensc.fr", annee: "3A", genre: "m",
        bio: "", aide: ["Sciences cognitives", "Ergonomie"], besoin: ["Anglais"] },
      { id: "u_ines", prenom: "Inès", nom: "Bernard", email: "ines.bernard@ensc.fr", annee: "2A", genre: "f",
        bio: "", aide: ["Communication"], besoin: ["Informatique"] },
      { id: "u_noah", prenom: "Noah", nom: "Petit", email: "noah.petit@ensc.fr", annee: "3A", genre: "m",
        bio: "", aide: ["Physique"], besoin: ["Traitement du signal"] }
    ];
    users.forEach(function (u) { u.password = "studylink"; u.createdAt = ago(60 * 24 * 30); });

    var fri = nextWeekday(5, 2);
    function slot(o) {
      return Object.assign({ id: uid("s"), lieu: "Bibliothèque", details: "", reservedBy: null, statut: "ouvert",
        createdAt: ago(60 * 24 * 2), rating: null, feedback: "" }, o);
    }
    var slots = [
      slot({ type: "offre", auteurId: "u_lea", matiere: "Mathématiques", annee: "1A", date: fri, debut: "14:00", fin: "15:00",
        details: "Révisions d'algèbre linéaire : matrices, déterminants, diagonalisation. Amène tes exercices !" }),
      slot({ type: "demande", auteurId: "u_yanis", matiere: "Statistiques", annee: "3A", date: fri, debut: "17:00", fin: "18:00", lieu: "Salle de travail",
        details: "Je bloque sur les tests d'hypothèse et l'ANOVA pour le projet de stats." }),
      slot({ type: "offre", auteurId: "u_emma", matiere: "Informatique", annee: "1A", date: fri, debut: "09:00", fin: "10:30",
        details: "Bases de C# : boucles, tableaux, classes. Idéal avant le premier TP noté." }),
      slot({ type: "offre", auteurId: "u_hugo", matiere: "Sciences cognitives", annee: "2A", date: fri, debut: "14:00", fin: "15:00", lieu: "Foyer",
        details: "Mémoire de travail, attention, modèles de Baddeley : on refait le cours ensemble." }),
      slot({ type: "demande", auteurId: "u_ines", matiere: "Informatique", annee: "2A", date: fri, debut: "14:30", fin: "15:30", lieu: "En ligne (visio)",
        details: "Besoin d'aide sur les requêtes SQL (jointures) pour le projet BDD." }),
      slot({ type: "demande", auteurId: "u_noah", matiere: "Traitement du signal", annee: "3A", date: fri, debut: "10:00", fin: "11:00",
        details: "Transformée de Fourier et filtrage, je n'arrive pas à faire les exos du TD 4." }),
      // Données propres au compte de démo (Hélia)
      slot({ type: "offre", auteurId: "u_helia", matiere: "Psychologie cognitive", annee: "1A", date: addDays(9), debut: "12:30", fin: "13:30",
        details: "Perception et attention : je repasse les points clés du partiel." }),
      slot({ type: "offre", auteurId: "u_emma", matiere: "Informatique", annee: "2A", date: addDays(-2), debut: "16:00", fin: "17:00",
        details: "Programmation orientée objet : héritage et interfaces.", reservedBy: "u_helia", statut: "reserve" }),
      slot({ type: "offre", auteurId: "u_lea", matiere: "Mathématiques", annee: "2A", date: addDays(-12), debut: "10:00", fin: "11:00",
        details: "Probabilités.", reservedBy: "u_helia", statut: "termine", rating: 5, feedback: "Super clair, merci Léa !" })
    ];

    var conversations = [
      { id: "c_emma", participants: ["u_helia", "u_emma"], lastRead: { u_helia: ago(60 * 26), u_emma: ago(5) },
        messages: [
          { id: uid("m"), from: "system", text: "Hélia a réservé le créneau Informatique d'Emma.", at: ago(60 * 24 * 4) },
          { id: uid("m"), from: "u_emma", text: "Coucou Hélia ! On se retrouve à la bibli ?", at: ago(60 * 24 * 4 - 10) },
          { id: uid("m"), from: "u_helia", text: "Oui parfait, je ramène mon TP sur l'héritage 🙂", at: ago(60 * 24 * 4 - 20) },
          { id: uid("m"), from: "u_emma", text: "Top ! Tu peux valider la séance sur StudyLink quand tu as un moment ?", at: ago(60 * 25) }
        ] },
      { id: "c_lea", participants: ["u_helia", "u_lea"], lastRead: { u_helia: ago(60 * 24 * 10), u_lea: ago(60 * 24 * 10) },
        messages: [
          { id: uid("m"), from: "u_helia", text: "Merci encore pour la séance de probas !", at: ago(60 * 24 * 11) },
          { id: uid("m"), from: "u_lea", text: "Avec plaisir, n'hésite pas si tu as d'autres questions 😊", at: ago(60 * 24 * 11 - 30) }
        ] }
    ];

    var notifications = [
      { id: uid("n"), userId: "u_helia", text: "Emma Laurent t'a envoyé un message.", link: "messagerie.html?c=c_emma", at: ago(60 * 25), read: false },
      { id: uid("n"), userId: "u_helia", text: "N'oublie pas de valider ta séance d'Informatique avec Emma.", link: "seances.html", at: ago(60 * 20), read: false },
      { id: uid("n"), userId: "u_helia", text: "Bienvenue sur StudyLink, Hélia !", link: "espace.html", at: ago(60 * 24 * 30), read: true }
    ];

    return { version: 1, users: users, slots: slots, conversations: conversations, notifications: notifications };
  }

  /* ---------- Accès base ---------- */
  function load() {
    var raw = lsGet(DB_KEY);
    if (raw) { try { return JSON.parse(raw); } catch (e) { /* données corrompues : on régénère */ } }
    var db = seed(); save(db); return db;
  }
  function save(db) { lsSet(DB_KEY, JSON.stringify(db)); }
  function update(fn) { var db = load(); var r = fn(db); save(db); return r; }

  /* ---------- Utilisateurs / session ---------- */
  function getUser(id, db) { db = db || load(); return db.users.find(function (u) { return u.id === id; }) || null; }
  function currentUser() { var id = lsGet(SESSION_KEY); return id ? getUser(id) : null; }
  function fullName(u) { return u ? u.prenom + " " + u.nom : "Utilisateur supprimé"; }
  function shortName(u) { return u ? u.prenom + " " + u.nom.charAt(0) + "." : "?"; }
  function initials(u) { return u ? (u.prenom.charAt(0) + u.nom.charAt(0)).toUpperCase() : "?"; }
  function studentLabel(u) { return (u && u.genre === "m" ? "Étudiant" : u && u.genre === "f" ? "Étudiante" : "Étudiant(e)") + " · " + (u ? u.annee : ""); }

  function login(email, password) {
    email = String(email || "").trim().toLowerCase();
    var u = load().users.find(function (x) { return x.email === email; });
    if (!u || u.password !== password) return { ok: false, error: "Adresse mail ou mot de passe incorrect." };
    lsSet(SESSION_KEY, u.id);
    return { ok: true, user: u };
  }
  function register(data) {
    var email = String(data.email || "").trim().toLowerCase();
    return update(function (db) {
      if (db.users.some(function (u) { return u.email === email; })) return { ok: false, field: "email", error: "Un compte existe déjà avec cette adresse." };
      var u = { id: uid("u"), prenom: cap(data.prenom.trim()), nom: cap(data.nom.trim()), email: email, password: data.password,
        annee: data.annee, genre: "", bio: "", aide: [], besoin: [], createdAt: new Date().toISOString() };
      db.users.push(u);
      db.notifications.push({ id: uid("n"), userId: u.id, text: "Bienvenue sur StudyLink, " + u.prenom + " ! Complète ton profil pour trouver plus facilement un échange.", link: "profil.html", at: new Date().toISOString(), read: false });
      lsSet(SESSION_KEY, u.id);
      return { ok: true, user: u };
    });
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function logout() { lsDel(SESSION_KEY); location.href = "index.html"; }
  function requireAuth() {
    if (!currentUser()) {
      var here = location.pathname.split("/").pop() + location.search;
      location.replace("connexion.html?next=" + encodeURIComponent(here));
    }
  }
  function updateUser(id, patch) {
    return update(function (db) { var u = getUser(id, db); Object.assign(u, patch); return u; });
  }

  /* ---------- Dates ---------- */
  var JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  var MOIS_C = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  function parseISO(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtShort(s) { var d = parseISO(s); return JOURS[d.getDay()] + " " + d.getDate() + " " + MOIS_C[d.getMonth()]; }
  function fmtLong(s) { var d = parseISO(s); return JOURS[d.getDay()] + " " + d.getDate() + " " + MOIS[d.getMonth()] + " " + d.getFullYear(); }
  function dayNum(s) { return parseISO(s).getDate(); }
  function monthShort(s) { return MOIS_C[parseISO(s).getMonth()].replace(".", ""); }
  function slotStart(sl) { var d = parseISO(sl.date); var t = sl.debut.split(":"); d.setHours(+t[0], +t[1]); return d; }
  function slotEnd(sl) { var d = parseISO(sl.date); var t = sl.fin.split(":"); d.setHours(+t[0], +t[1]); return d; }
  function isPast(sl) { return slotEnd(sl) < new Date(); }
  function hasStarted(sl) { return slotStart(sl) <= new Date(); }
  function relTime(isoStr) {
    var diff = (Date.now() - new Date(isoStr).getTime()) / 60000;
    if (diff < 1) return "à l'instant";
    if (diff < 60) return "il y a " + Math.round(diff) + " min";
    if (diff < 60 * 24) return "il y a " + Math.round(diff / 60) + " h";
    if (diff < 60 * 24 * 7) return "il y a " + Math.round(diff / 1440) + " j";
    var d = new Date(isoStr); return d.getDate() + " " + MOIS_C[d.getMonth()];
  }
  function clock(isoStr) { var d = new Date(isoStr); return pad(d.getHours()) + ":" + pad(d.getMinutes()); }

  /* ---------- Créneaux ---------- */
  function getSlot(id, db) { db = db || load(); return db.slots.find(function (s) { return s.id === id; }) || null; }
  function helperOf(sl) { return sl.type === "offre" ? sl.auteurId : sl.reservedBy; }
  function learnerOf(sl) { return sl.type === "offre" ? sl.reservedBy : sl.auteurId; }
  function otherOf(sl, me) { return sl.auteurId === me ? sl.reservedBy : sl.auteurId; }

  function availableSlots(me) {
    return load().slots.filter(function (s) {
      return s.statut === "ouvert" && !s.reservedBy && s.auteurId !== me && !isPast(s);
    }).sort(function (a, b) { return slotStart(a) - slotStart(b); });
  }
  function createSlot(data) {
    return update(function (db) {
      var s = Object.assign({ id: uid("s"), reservedBy: null, statut: "ouvert", createdAt: new Date().toISOString(), rating: null, feedback: "" }, data);
      db.slots.push(s); return s;
    });
  }
  function reserveSlot(id, me) {
    return update(function (db) {
      var s = getSlot(id, db);
      if (!s || s.statut !== "ouvert" || s.reservedBy) return { ok: false, error: "Ce créneau n'est plus disponible." };
      if (s.auteurId === me) return { ok: false, error: "Tu ne peux pas réserver ton propre créneau." };
      s.reservedBy = me; s.statut = "reserve";
      var meU = getUser(me, db);
      var txt = s.type === "offre"
        ? fullName(meU) + " a réservé ton créneau " + s.matiere + " du " + fmtShort(s.date) + " à " + s.debut + "."
        : fullName(meU) + " propose de t'aider en " + s.matiere + " le " + fmtShort(s.date) + " à " + s.debut + ".";
      pushNotif(db, s.auteurId, txt, "seances.html");
      var c = convWith(db, me, s.auteurId);
      c.messages.push({ id: uid("m"), from: "system", text: (s.type === "offre" ? meU.prenom + " a réservé le créneau " : meU.prenom + " a accepté d'aider sur ") + s.matiere + " · " + fmtShort(s.date) + " · " + s.debut + ".", at: new Date().toISOString() });
      return { ok: true, slot: s };
    });
  }
  function cancelSlot(id, me) {
    return update(function (db) {
      var s = getSlot(id, db); if (!s) return { ok: false };
      var meU = getUser(me, db);
      if (s.reservedBy === me) {
        var owner = s.auteurId;
        s.reservedBy = null; s.statut = isPast(s) ? "annule" : "ouvert";
        pushNotif(db, owner, fullName(meU) + " a annulé sa participation à « " + s.matiere + " » du " + fmtShort(s.date) + ". Ton créneau est de nouveau visible.", "seances.html");
      } else if (s.auteurId === me) {
        if (s.reservedBy) pushNotif(db, s.reservedBy, fullName(meU) + " a annulé le créneau « " + s.matiere + " » du " + fmtShort(s.date) + ".", "seances.html");
        s.statut = "annule";
      }
      return { ok: true };
    });
  }
  function completeSlot(id, me, rating, feedback) {
    return update(function (db) {
      var s = getSlot(id, db); if (!s) return { ok: false };
      s.statut = "termine"; s.rating = rating || null; s.feedback = feedback || ""; s.validatedBy = me;
      var other = otherOf(s, me);
      if (other) pushNotif(db, other, fullName(getUser(me, db)) + " a validé la séance « " + s.matiere + " ». Merci pour l'échange !", "seances.html");
      return { ok: true };
    });
  }
  function mySlots(me) {
    return load().slots.filter(function (s) { return s.auteurId === me || s.reservedBy === me; });
  }
  function statsFor(me) {
    var done = load().slots.filter(function (s) { return s.statut === "termine"; });
    var given = done.filter(function (s) { return helperOf(s) === me; });
    var received = done.filter(function (s) { return learnerOf(s) === me; });
    var rated = given.filter(function (s) { return s.rating; });
    var avg = rated.length ? rated.reduce(function (a, s) { return a + s.rating; }, 0) / rated.length : null;
    return { given: given.length, received: received.length, avg: avg };
  }

  /* ---------- Messagerie ---------- */
  function convWith(db, a, b) {
    var c = db.conversations.find(function (c) { return c.participants.indexOf(a) > -1 && c.participants.indexOf(b) > -1; });
    if (!c) { c = { id: uid("c"), participants: [a, b], lastRead: {}, messages: [] }; db.conversations.push(c); }
    return c;
  }
  function getOrCreateConversation(me, other) { return update(function (db) { return convWith(db, me, other).id; }); }
  function conversationsFor(me) {
    return load().conversations.filter(function (c) { return c.participants.indexOf(me) > -1; })
      .sort(function (a, b) { return lastAt(b) - lastAt(a); });
  }
  function lastAt(c) { var m = c.messages[c.messages.length - 1]; return m ? new Date(m.at).getTime() : 0; }
  function unreadIn(c, me) {
    var lr = c.lastRead && c.lastRead[me] ? new Date(c.lastRead[me]).getTime() : 0;
    return c.messages.filter(function (m) { return m.from !== me && m.from !== "system" && new Date(m.at).getTime() > lr; }).length;
  }
  function unreadTotal(me) { return conversationsFor(me).reduce(function (n, c) { return n + unreadIn(c, me); }, 0); }
  function markConvRead(id, me) {
    update(function (db) { var c = db.conversations.find(function (c) { return c.id === id; }); if (c) { c.lastRead = c.lastRead || {}; c.lastRead[me] = new Date().toISOString(); } });
  }
  function sendMessage(convId, from, text) {
    return update(function (db) {
      var c = db.conversations.find(function (c) { return c.id === convId; });
      var m = { id: uid("m"), from: from, text: text, at: new Date().toISOString() };
      c.messages.push(m); c.lastRead = c.lastRead || {}; c.lastRead[from] = m.at;
      return m;
    });
  }

  /* ---------- Notifications ---------- */
  function pushNotif(db, userId, text, link) {
    db.notifications.push({ id: uid("n"), userId: userId, text: text, link: link || "", at: new Date().toISOString(), read: false });
  }
  function notificationsFor(me) {
    return load().notifications.filter(function (n) { return n.userId === me; })
      .sort(function (a, b) { return new Date(b.at) - new Date(a.at); });
  }
  function markNotifsRead(me) { update(function (db) { db.notifications.forEach(function (n) { if (n.userId === me) n.read = true; }); }); }
  function markNotifRead(id) { update(function (db) { var n = db.notifications.find(function (x) { return x.id === id; }); if (n) n.read = true; }); }

  /* ---------- Divers ---------- */
  function resetDemo() { lsDel(DB_KEY); lsDel(SESSION_KEY); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function param(name) { return new URLSearchParams(location.search).get(name); }

  window.SL = {
    MATIERES: MATIERES, LIEUX: LIEUX, ANNEES: ANNEES,
    load: load, update: update, resetDemo: resetDemo,
    getUser: getUser, currentUser: currentUser, fullName: fullName, shortName: shortName, initials: initials, studentLabel: studentLabel,
    login: login, register: register, logout: logout, requireAuth: requireAuth, updateUser: updateUser,
    fmtShort: fmtShort, fmtLong: fmtLong, dayNum: dayNum, monthShort: monthShort, relTime: relTime, clock: clock,
    isPast: isPast, hasStarted: hasStarted, slotStart: slotStart, todayISO: function () { return iso(today()); }, addDays: addDays, parseISO: parseISO,
    getSlot: getSlot, helperOf: helperOf, learnerOf: learnerOf, otherOf: otherOf,
    availableSlots: availableSlots, createSlot: createSlot, reserveSlot: reserveSlot, cancelSlot: cancelSlot, completeSlot: completeSlot,
    mySlots: mySlots, statsFor: statsFor,
    getOrCreateConversation: getOrCreateConversation, conversationsFor: conversationsFor, unreadIn: unreadIn, unreadTotal: unreadTotal,
    markConvRead: markConvRead, sendMessage: sendMessage,
    notificationsFor: notificationsFor, markNotifsRead: markNotifsRead, markNotifRead: markNotifRead,
    esc: esc, param: param, uid: uid
  };
})();
