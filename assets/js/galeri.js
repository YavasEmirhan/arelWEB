/* Arel Yapı — Galeri: filtreler, ızgara, proje künyesi diyaloğu.
   Veri: assets/js/projeler.js. Adres parametreleri: ?durum=tamamlanan|devam, ?p=<proje-id> */
(function () {
  "use strict";

  var PROJECTS = window.AREL_PROJECTS || [];
  var ROOT = document.body.getAttribute("data-root") || "";
  var STATUS = { tamamlanan: "Tamamlandı", devam: "Devam ediyor" };
  var RHYTHM = ["w8", "", "", "", "", "", "w8"]; // satırlar: 8+4, 4+4+4, 4+8
  var state = { status: "all", type: "all" };
  var visible = [];
  var cur = { p: null, i: 0 };

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var src = function (u) { return /^(https?:)?\/\//.test(u) ? u : ROOT + u; };
  var guard = window.arelGuard || function () {};

  /* Tür filtresi düğmeleri */
  var types = [];
  PROJECTS.forEach(function (p) { if (types.indexOf(p.type) < 0) types.push(p.type); });
  types.sort(function (a, b) { return a.localeCompare(b, "tr"); });
  var tf = $("tur-filtre");
  types.forEach(function (t) {
    var b = document.createElement("button");
    b.className = "chip"; b.type = "button";
    b.setAttribute("data-value", t); b.setAttribute("aria-pressed", "false");
    b.textContent = t;
    tf.appendChild(b);
  });

  document.querySelectorAll("[data-filter]").forEach(function (group) {
    group.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      state[group.getAttribute("data-filter")] = b.getAttribute("data-value");
      group.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      render();
    });
  });

  function render() {
    visible = PROJECTS.filter(function (p) {
      return (state.status === "all" || p.status === state.status) && (state.type === "all" || p.type === state.type);
    });
    var grid = $("galeri");
    if (!visible.length) {
      grid.innerHTML = '<p class="bos">Bu filtrelere uyan proje yok. Durum ya da türü "Tümü" yapın.</p>';
    } else {
      grid.innerHTML = visible.map(function (p, i) {
        var w = visible.length > 2 ? RHYTHM[i % RHYTHM.length] : "";
        return '<article class="g-item ' + w + '"><a href="?p=' + encodeURIComponent(p.id) + '" data-id="' + esc(p.id) + '" aria-haspopup="dialog">' +
          '<figure><img src="' + esc(src(p.images[0])) + '" alt="' + esc(p.name) + '" loading="' + (i < 3 ? "eager" : "lazy") + '" width="1200" height="900">' + (p.credit ? '<figcaption class="kredi">Fotoğraf: ' + esc(p.credit) + '</figcaption>' : '') + '</figure>' +
          '<div class="row"><h2>' + esc(p.claim || p.name) + '</h2><span class="durum' + (p.status === "devam" ? " devam" : "") + '">' + STATUS[p.status] + '</span></div>' +
          '<span class="meta">' + esc([p.name, p.type, p.location].filter(Boolean).join(", ")) + '</span>' +
          '</a></article>';
      }).join("");
      grid.querySelectorAll("article").forEach(function (a, i) {
        guard(a.querySelector("img"), visible[i].name);
      });
    }
    $("sonuc").textContent = visible.length + " proje gösteriliyor";
  }

  $("galeri").addEventListener("click", function (e) {
    var b = e.target.closest("a[data-id]");
    if (b) { e.preventDefault(); open(b.getAttribute("data-id"), b); }
  });

  /* Künye diyaloğu */
  var dlg = $("kunye"), img = $("kunye-img"), lastFocus = null;

  function showImage() {
    var p = cur.p, n = p.images.length;
    var fb = dlg.querySelector(".img-fallback"); if (fb) fb.remove();
    img.style.visibility = "";
    img.alt = p.name + ", fotoğraf " + (cur.i + 1);
    img.src = src(p.images[cur.i]);
    guard(img, p.name);
    $("kunye-sayac").textContent = (cur.i + 1) + " / " + n;
    $("kunye-nav").hidden = n < 2;
  }

  function open(id, from) {
    var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    cur = { p: p, i: 0 };
    lastFocus = from || document.activeElement;
    $("kunye-ad").textContent = p.name;
    $("kunye-desc").textContent = (p.claim ? p.claim + ". " : "") + p.desc;
    var d = $("kunye-durum");
    d.textContent = STATUS[p.status];
    d.className = "durum" + (p.status === "devam" ? " devam" : "");
    var rows = [["Tür", p.type], ["Konum", p.location], ["İş ortağı", p.partner]].concat(p.specs || [], [["Fotoğraf", p.credit]]);
    $("kunye-specs").innerHTML = rows.filter(function (r) { return r[1]; }).map(function (r) {
      return "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>";
    }).join("");
    showImage();
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    history.replaceState(null, "", "?p=" + encodeURIComponent(id));
  }

  function step(k) { var n = cur.p.images.length; cur.i = (cur.i + k + n) % n; showImage(); }
  $("onceki").addEventListener("click", function () { step(-1); });
  $("sonraki").addEventListener("click", function () { step(1); });
  $("kapat").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  dlg.addEventListener("close", function () {
    history.replaceState(null, "", location.pathname);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  });

  /* Adres parametreleri */
  var q = new URLSearchParams(location.search);
  var d = q.get("durum");
  if (d === "tamamlanan" || d === "devam") {
    state.status = d;
    document.querySelectorAll('[data-filter="status"] button').forEach(function (x) {
      x.setAttribute("aria-pressed", String(x.getAttribute("data-value") === d));
    });
  }
  var t = q.get("tur");
  if (t && types.indexOf(t) > -1) {
    state.type = t;
    tf.querySelectorAll("button").forEach(function (x) {
      x.setAttribute("aria-pressed", String(x.getAttribute("data-value") === t));
    });
  }
  render();
  if (q.get("p")) open(q.get("p"));
})();
