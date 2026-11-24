/* =========================================================
   StudyLink — composants d'interface partagés
   (icônes, en-têtes, barre latérale, modales, toasts)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Icônes (SVG inline, style trait) ---------- */
  var P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4M7.5 14h1M11.5 14h1M15.5 14h1M7.5 17.5h1M11.5 17.5h1"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20.5 20.5-4.5-4.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    bell: '<path d="M6 8a6 6 0 1 1 12 0c0 7 3 8.5 3 8.5H3S6 15 6 8"/><path d="M10.3 20a1.9 1.9 0 0 0 3.4 0"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.2 3.1M6.6 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7a9.8 9.8 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M2 2l20 20"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="11" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
    book: '<path d="M12 6.5C10 5 7 4.5 3 5v14c4-.5 7 0 9 1.5 2-1.5 5-2 9-1.5V5c-4-.5-7 0-9 1.5Z"/><path d="M12 6.5v14"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    message: '<path d="M21 12a8 8 0 0 1-11.8 7L3 21l2-6A8 8 0 1 1 21 12Z"/>',
    send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z"/>',
    logout: '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    heart: '<path d="M12 20s-8-4.6-8-10.2A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 2.8C20 15.4 12 20 12 20Z"/>',
    shield: '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    graduation: '<path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.8-3.5M4 4v4h4M4 13a8 8 0 0 0 14.8 3.5M20 20v-4h-4"/>'
  };
  // Icônes pleines (maquette page d'accueil)
  var FILLED = {
    userCircle: '<svg class="ic step-ic" viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" stroke-width="7"/><circle cx="40" cy="31" r="12" fill="currentColor"/><path d="M17 62c5-10 13-14 23-14s18 4 23 14" fill="currentColor"/></svg>',
    searchBig: '<svg class="ic step-ic" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><circle cx="35" cy="34" r="22"/><path d="m51 51 15 15"/></svg>',
    folder: '<svg class="ic step-ic" viewBox="0 0 80 80"><path d="M6 20a5 5 0 0 1 5-5h18l7 7h33a5 5 0 0 1 5 5v35a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5V20Z" fill="currentColor"/></svg>',
    group: '<svg class="ic ic-fill" viewBox="0 0 92 60"><circle cx="46" cy="14" r="9"/><circle cx="17" cy="23" r="7"/><circle cx="75" cy="23" r="7"/><path d="M28 48c0-10 8-16 18-16s18 6 18 16v8H28v-8Z"/><path d="M2 50c0-8 6-13 14-13 4 0 7 1 9 3-1.5 2.5-2 5-2 8v8H2v-6ZM90 50c0-8-6-13-14-13-4 0-7 1-9 3 1.5 2.5 2 5 2 8v8h21v-6Z"/></svg>'
  };
  function icon(name, cls) { return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || "") + "</svg>"; }

  var LOGO = '<span class="l-study">Study</span><span class="l-link">L<span class="l-i"></span>nk</span>';
  function logoHTML(href) { return '<a class="logo" href="' + (href || "index.html") + '" aria-label="StudyLink, accueil">' + LOGO + "</a>"; }

  /* ---------- En-tête public ---------- */
  function publicHeader(active) {
    var el = document.getElementById("site-header"); if (!el) return;
    var u = SL.currentUser();
    var links = [["index.html", "Accueil", "accueil"], ["comment-ca-marche.html", "Comment ça marche ?", "comment"], ["a-propos.html", "A propos", "apropos"]];
    var nav = links.map(function (l) { return '<a class="nav-link' + (l[2] === active ? " active" : "") + '" href="' + l[0] + '">' + l[1] + "</a>"; }).join("");
    nav += u
      ? '<a class="btn btn-login" href="espace.html">Mon espace</a><a class="btn btn-signup" href="#" data-logout>Se déconnecter</a>'
      : '<a class="btn btn-login" href="connexion.html">Se connecter</a><a class="btn btn-signup" href="inscription.html">S’inscrire</a>';
    el.className = "site-header";
    el.innerHTML = '<div class="inner">' + logoHTML() + '<button class="nav-burger" aria-label="Menu">' + icon("menu") + '</button><nav class="site-nav">' + nav + "</nav></div>";
    el.querySelector(".nav-burger").onclick = function () { el.querySelector(".site-nav").classList.toggle("open"); };
    bindLogout(el);
  }
  function authHeader() {
    var el = document.getElementById("site-header"); if (!el) return;
    el.className = "site-header";
    el.innerHTML = '<div class="inner">' + logoHTML() + '<a class="header-back" href="index.html">' + icon("arrowLeft") + "Retour à l’accueil</a></div>";
  }
  function footerHTML() {
    return "<span>StudyLink · L’entraide entre étudiants de l’ENSC</span><span>Année universitaire 2026 — 2027</span>";
  }
  function publicFooter() { var f = document.getElementById("site-footer"); if (f) { f.className = "site-footer"; f.innerHTML = footerHTML(); } }
  function bindLogout(root) {
    root.querySelectorAll("[data-logout]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); SL.logout(); }); });
  }

  /* ---------- Coque de l'espace connecté ---------- */
  var NAV = [
    ["accueil", "espace.html", "home", "Accueil"],
    ["seances", "seances.html", "calendar", "Mes séances"],
    ["creneaux", "creneaux.html", "search", "Consulter les créneaux"],
    ["proposer", "proposer.html", "plus", "Proposer de l’aide"],
    ["demander", "demander.html", "plus", "Demander de l’aide"],
    ["messagerie", "messagerie.html", "mail", "Messagerie"],
    ["profil", "profil.html", "user", "Mon profil"]
  ];
  function appShell(active) {
    var u = SL.currentUser(); if (!u) return;
    var page = document.getElementById("page");
    var unread = SL.unreadTotal(u.id);
    var app = document.createElement("div");
    app.className = "app";
    app.innerHTML =
      '<aside class="sidebar" id="sidebar"><div class="brand">' + logoHTML("espace.html") + "</div>" +
      '<nav class="side-nav">' + NAV.map(function (n) {
        var badge = n[0] === "messagerie" && unread ? '<span class="count">' + unread + "</span>" : "";
        return '<a class="side-link' + (n[0] === active ? " active" : "") + '" href="' + n[1] + '">' + icon(n[2]) + "<span>" + n[3] + "</span>" + badge + "</a>";
      }).join("") + "</nav>" +
      '<a class="side-user" href="profil.html"><strong>' + SL.esc(SL.fullName(u)) + "</strong><span>" + SL.esc(SL.studentLabel(u)) + "</span></a></aside>" +
      '<div class="sidebar-backdrop" id="sb-backdrop"></div>' +
      '<div class="app-main"><header class="topbar"><button class="burger" aria-label="Menu">' + icon("menu") + "</button>" +
      '<div class="bell-wrap"><button class="bell" aria-label="Notifications">' + icon("bell") + '<span class="dot hidden"></span></button></div>' +
      '<a class="who" href="profil.html">' + SL.esc(SL.shortName(u)) + "&nbsp; / &nbsp;" + SL.esc(u.annee) + "</a></header>" +
      '<main class="app-content" id="app-content"></main><footer class="app-footer">' + footerHTML() + "</footer></div>";
    page.parentNode.insertBefore(app, page);
    app.querySelector("#app-content").appendChild(page);

    var sb = app.querySelector("#sidebar"), bd = app.querySelector("#sb-backdrop");
    app.querySelector(".burger").onclick = function () { sb.classList.add("open"); bd.classList.add("open"); };
    bd.onclick = function () { sb.classList.remove("open"); bd.classList.remove("open"); };
    initBell(app.querySelector(".bell-wrap"), u);
  }

  function refreshUnread() {
    var u = SL.currentUser(); if (!u) return;
    var link = document.querySelector('.side-link[href="messagerie.html"]'); if (!link) return;
    var n = SL.unreadTotal(u.id), c = link.querySelector(".count");
    if (!n) { if (c) c.remove(); return; }
    if (!c) { c = document.createElement("span"); c.className = "count"; link.appendChild(c); }
    c.textContent = n;
  }

  function initBell(wrap, u) {
    var btn = wrap.querySelector(".bell"), dot = wrap.querySelector(".dot"), panel = null;
    function refreshDot() { dot.classList.toggle("hidden", !SL.notificationsFor(u.id).some(function (n) { return !n.read; })); }
    refreshDot();
    function close() { if (panel) { panel.remove(); panel = null; } }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (panel) return close();
      var list = SL.notificationsFor(u.id).slice(0, 15);
      panel = document.createElement("div");
      panel.className = "notif-panel";
      panel.innerHTML = '<div class="notif-head"><strong>Notifications</strong><button type="button" data-all>Tout marquer comme lu</button></div><div class="notif-list">' +
        (list.length ? list.map(function (n) {
          return '<a class="notif-item' + (n.read ? "" : " unread") + '" href="' + SL.esc(n.link || "#") + '" data-id="' + n.id + '"><span class="ndot"></span><span>' + SL.esc(n.text) + "<time>" + SL.relTime(n.at) + "</time></span></a>";
        }).join("") : '<div class="notif-empty">Aucune notification pour le moment.</div>') + "</div>";
      wrap.appendChild(panel);
      panel.addEventListener("click", function (ev) { ev.stopPropagation(); });
      panel.querySelector("[data-all]").onclick = function () { SL.markNotifsRead(u.id); panel.querySelectorAll(".unread").forEach(function (x) { x.classList.remove("unread"); }); refreshDot(); };
      panel.querySelectorAll(".notif-item").forEach(function (a) { a.addEventListener("click", function () { SL.markNotifRead(a.dataset.id); }); });
    });
    document.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- Modale ---------- */
  function modal(html, opts) {
    opts = opts || {};
    var bd = document.createElement("div");
    bd.className = "modal-backdrop";
    bd.innerHTML = '<div class="modal ' + (opts.size || "") + '" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Fermer">' + icon("x") + "</button>" + html + "</div>";
    document.body.appendChild(bd);
    document.body.style.overflow = "hidden";
    function close() { bd.remove(); document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); if (opts.onClose) opts.onClose(); }
    function onKey(e) { if (e.key === "Escape") close(); }
    bd.addEventListener("click", function (e) { if (e.target === bd) close(); });
    bd.querySelector(".modal-close").onclick = close;
    bd.querySelectorAll("[data-close]").forEach(function (b) { b.addEventListener("click", close); });
    document.addEventListener("keydown", onKey);
    var f = bd.querySelector("[autofocus]"); if (f) f.focus();
    return { el: bd.querySelector(".modal"), close: close };
  }
  function confirmDialog(title, text, okLabel, danger) {
    return new Promise(function (resolve) {
      var done = false;
      var m = modal('<h2 style="font-size:22px">' + title + '</h2><p class="modal-sub" style="text-align:left">' + text + "</p>" +
        '<div class="modal-actions"><button class="btn btn-outline" data-close>Retour</button><button class="btn ' + (danger ? "btn-danger" : "btn-primary") + '" data-ok>' + okLabel + "</button></div>",
        { size: "sm", onClose: function () { if (!done) resolve(false); } });
      m.el.querySelector("[data-ok]").onclick = function () { done = true; m.close(); resolve(true); };
    });
  }

  /* ---------- Toast ---------- */
  function toast(msg) {
    var z = document.querySelector(".toast-zone");
    if (!z) { z = document.createElement("div"); z.className = "toast-zone"; document.body.appendChild(z); }
    var t = document.createElement("div"); t.className = "toast"; t.innerHTML = icon("check") + "<span>" + SL.esc(msg) + "</span>";
    z.appendChild(t); setTimeout(function () { t.remove(); }, 3200);
  }
  // Toast différé (après redirection)
  function flash(msg) { try { sessionStorage.setItem("sl_flash", msg); } catch (e) {} }
  function showFlash() { try { var m = sessionStorage.getItem("sl_flash"); if (m) { sessionStorage.removeItem("sl_flash"); toast(m); } } catch (e) {} }

  /* ---------- Mot de passe visible / caché ---------- */
  function bindPasswordToggles(root) {
    (root || document).querySelectorAll(".toggle-pw").forEach(function (b) {
      b.innerHTML = icon("eyeOff");
      b.addEventListener("click", function () {
        var input = b.parentNode.querySelector("input");
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        b.innerHTML = icon(show ? "eye" : "eyeOff");
        b.setAttribute("aria-label", show ? "Masquer le mot de passe" : "Afficher le mot de passe");
      });
    });
  }

  /* ---------- Carte de créneau ---------- */
  function slotCard(s) {
    var a = SL.getUser(s.auteurId);
    var offre = s.type === "offre";
    return '<article class="slot-card" data-id="' + s.id + '">' +
      '<div class="slot-type">' + (offre ? "Cours proposé" : "Demande de l’aide") + "</div>" +
      '<div class="slot-person"><div class="avatar ' + (offre ? "" : "blue") + '">' + SL.initials(a) + "</div><div>" +
      '<div class="name">' + SL.esc(SL.fullName(a)) + '</div><div class="meta">' + SL.esc(a ? a.annee : "") + " · ENSC</div></div></div>" +
      '<div class="slot-subject">' + SL.esc(s.matiere) + (s.annee ? ' <span class="muted">· niveau ' + SL.esc(s.annee) + "</span>" : "") + "</div>" +
      '<div class="slot-detail">' + SL.esc(s.details || "Pas de détails supplémentaires.") + "</div>" +
      '<div class="slot-date">' + SL.fmtShort(s.date) + " · " + s.debut + "</div>" +
      '<div class="slot-actions"><button class="btn btn-outline" data-info>Infos</button><button class="btn btn-primary" data-book>Réserver</button></div></article>';
  }

  /* ---------- Sélecteurs de formulaires ---------- */
  function fillSelect(sel, values, placeholder) {
    sel.innerHTML = (placeholder ? '<option value="">' + placeholder + "</option>" : "") +
      values.map(function (v) { return '<option value="' + SL.esc(v) + '">' + SL.esc(v) + "</option>"; }).join("");
  }
  function timeOptions(from, to, step) {
    var out = [];
    for (var m = from * 60; m <= to * 60; m += step) out.push(String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"));
    return out;
  }

  // <span data-ic="x"> est remplacé par l'icône ; <div data-ic="x"> la reçoit à l'intérieur
  function hydrateIcons(root) {
    (root || document).querySelectorAll("[data-ic]").forEach(function (el) {
      if (el.tagName === "SPAN") el.outerHTML = icon(el.dataset.ic);
      else { el.innerHTML = icon(el.dataset.ic); el.removeAttribute("data-ic"); }
    });
  }

  window.UI = {
    icon: icon, hydrateIcons: hydrateIcons, FILLED: FILLED, logoHTML: logoHTML,
    publicHeader: publicHeader, authHeader: authHeader, publicFooter: publicFooter, appShell: appShell, bindLogout: bindLogout, refreshUnread: refreshUnread,
    modal: modal, confirmDialog: confirmDialog, toast: toast, flash: flash, showFlash: showFlash,
    bindPasswordToggles: bindPasswordToggles, slotCard: slotCard, fillSelect: fillSelect, timeOptions: timeOptions
  };

  document.addEventListener("DOMContentLoaded", showFlash);
})();
