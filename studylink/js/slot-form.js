/* Formulaire commun à « Proposer de l’aide » et « Demander de l’aide » */
function initSlotForm(type) {
  "use strict";
  var me = SL.currentUser();
  var form = document.getElementById("slot-form");

  // Remplissage des listes
  var dl = document.getElementById("matieres-list");
  dl.innerHTML = SL.MATIERES.map(function (m) { return '<option value="' + m + '">'; }).join("");
  UI.fillSelect(document.getElementById("annee"), SL.ANNEES, type === "offre" ? "Choisir l’année visée" : "Choisir ton année");
  UI.fillSelect(document.getElementById("lieu"), SL.LIEUX, "Choisir un lieu");
  var times = UI.timeOptions(8, 20, 30);
  UI.fillSelect(document.getElementById("debut"), times, "-- : --");
  UI.fillSelect(document.getElementById("fin"), times, "-- : --");
  var date = document.getElementById("date");
  date.min = SL.todayISO();
  if (type === "demande") document.getElementById("annee").value = me.annee;

  // Pré-remplissage depuis l'URL (?matiere=...)
  var pre = SL.param("matiere"); if (pre) document.getElementById("matiere").value = pre;

  // Heure de fin = début + 1h par défaut
  document.getElementById("debut").addEventListener("change", function (e) {
    var fin = document.getElementById("fin");
    var i = times.indexOf(e.target.value);
    if (i > -1 && (!fin.value || fin.value <= e.target.value)) fin.value = times[Math.min(i + 2, times.length - 1)];
  });

  function setErr(f, msg) {
    var el = form.querySelector('[data-f="' + f + '"]');
    el.classList.toggle("invalid", !!msg);
    el.querySelector(".field-error").textContent = msg || "";
  }
  function v(id) { return document.getElementById(id).value.trim(); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var errs = {
      matiere: v("matiere") ? "" : "Indique la matière.",
      annee: v("annee") ? "" : "Choisis une année.",
      date: !v("date") ? "Choisis une date." : v("date") < SL.todayISO() ? "La date est déjà passée." : "",
      debut: v("debut") ? "" : "Heure de début requise.",
      fin: !v("fin") ? "Heure de fin requise." : v("fin") <= v("debut") ? "La fin doit être après le début." : "",
      lieu: v("lieu") ? "" : "Choisis un lieu.",
      details: type === "demande" && !v("details") ? "Explique en quelques mots ce qui te bloque." : ""
    };
    if (!errs.date && !errs.debut && v("date") === SL.todayISO()) {
      var now = new Date(), t = v("debut").split(":");
      if (+t[0] * 60 + +t[1] <= now.getHours() * 60 + now.getMinutes()) errs.debut = "Cet horaire est déjà passé.";
    }
    var ok = true;
    Object.keys(errs).forEach(function (k) { setErr(k, errs[k]); if (errs[k]) ok = false; });
    if (!ok) { var first = form.querySelector(".invalid .input, .invalid .select, .invalid .textarea"); if (first) first.focus(); return; }

    // Normalise la matière si elle correspond à une matière connue (casse)
    var mat = v("matiere");
    var known = SL.MATIERES.find(function (m) { return m.toLowerCase() === mat.toLowerCase(); });
    SL.createSlot({ type: type, auteurId: me.id, matiere: known || mat, annee: v("annee"), date: v("date"),
      debut: v("debut"), fin: v("fin"), lieu: v("lieu"), details: v("details") });
    UI.flash(type === "offre" ? "Ta disponibilité est publiée !" : "Ta demande d’aide est publiée !");
    location.href = "seances.html?tab=publies";
  });
}
