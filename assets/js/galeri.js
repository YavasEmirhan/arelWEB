/* Arel Yapı — Galeri sayfası
   Filtreler, galeri/liste görünümü, liste önizlemesi, "Yakından" şeridi ve proje künyesi. */
(function () {
  "use strict";

  var PROJECTS = window.AREL_PROJECTS || [];
  var ROOT = document.body.getAttribute("data-root") || "";
  var STATUS = { tamamlanan: "Tamamlandı", devam: "Devam ediyor" };
  // Galeri ızgarasının ritmi: [sütun sınıfı, en-boy oranı, aşağı kaydır]
  var RHYTHM = [["s7", "4/3", false], ["s5", "4/5", true], ["s5", "4/5", false], ["s7", "4/3", true], ["s8", "16/10", false], ["s4", "4/5", true]];

  var state = { status: "all", type: "all", view: "gallery" };
  var visible = PROJECTS.slice();
  var current = { index: 0, image: 0, pool: PROJECTS };
  var lastFocus = null;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var byId = function (id) { return PROJECTS.filter(function (p) { return p.id === id; })[0]; };
  var metaLine = function (p) { return [p.location, p.type].filter(Boolean).join(", "); };
  var guard = window.arelGuard || function () {};
  // Depodaki görseller (assets/...) sayfanın klasörüne göre çözülür
  var src = function (u) { return /^(https?:)?\/\//.test(u) ? u : ROOT + u; };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Sayılar ---------- */
  $$("[data-count]").forEach(function (el) {
    var key = el.getAttribute("data-count");
    el.textContent = PROJECTS.filter(function (p) { return p.status === key; }).length;
  });

  /* ---------- Filtreler ---------- */
  function countFor(key, val) {
    return PROJECTS.filter(function (p) {
      if (key === "status") return (val === "all" || p.status === val) && (state.type === "all" || p.type === state.type);
      return (val === "all" || p.type === val) && (state.status === "all" || p.status === state.status);
    }).length;
  }

  function renderChips() {
    var statusOpts = [["all", "Tümü"], ["tamamlanan", "Tamamlanan"], ["devam", "Devam eden"]];
    var types = [];
    PROJECTS.forEach(function (p) { if (types.indexOf(p.type) < 0) types.push(p.type); });
    var typeOpts = [["all", "Tüm türler"]].concat(types.map(function (t) { return [t, t]; }));

    $("#status-chips").innerHTML = statusOpts.map(function (o) {
      return '<button type="button" class="chip" data-status="' + o[0] + '" aria-pressed="' + (state.status === o[0]) + '">' + o[1] + '<span class="n">' + countFor("status", o[0]) + "</span></button>";
    }).join("");
    $("#type-chips").innerHTML = typeOpts.map(function (o) {
      return '<button type="button" class="chip" data-type="' + esc(o[0]) + '" aria-pressed="' + (state.type === o[0]) + '">' + esc(o[1]) + '<span class="n">' + countFor("type", o[0]) + "</span></button>";
    }).join("");
  }

  /* ---------- URL ile durum (paylaşılabilir filtre) ---------- */
  function readUrl() {
    var q = new URLSearchParams(location.search);
    if (q.get("durum") === "tamamlanan" || q.get("durum") === "devam") state.status = q.get("durum");
    var tur = q.get("tur");
    if (tur && PROJECTS.some(function (p) { return p.type === tur; })) state.type = tur;
    if (q.get("gorunum") === "liste") state.view = "list";
  }
  function writeUrl() {
    var q = new URLSearchParams();
    if (state.status !== "all") q.set("durum", state.status);
    if (state.type !== "all") q.set("tur", state.type);
    if (state.view === "list") q.set("gorunum", "liste");
    var s = q.toString();
    history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
  }

  /* ---------- Galeri ve liste ---------- */
  function render() {
    visible = PROJECTS.filter(function (p) {
      return (state.status === "all" || p.status === state.status) && (state.type === "all" || p.type === state.type);
    });

    var gallery = $("#gallery-view");
    gallery.innerHTML = visible.map(function (p, i) {
      var r = RHYTHM[i % RHYTHM.length];
      var badge = p.status === "devam" ? '<span class="badge">Devam ediyor</span>' : "";
      return '<article class="work ' + r[0] + (r[2] ? " drop" : "") + ' reveal">' +
        '<button type="button" class="work-btn" data-open="' + p.id + '" aria-label="' + esc(p.name) + ' projesinin künyesini açın">' +
          '<span class="media" style="aspect-ratio:' + r[1] + '">' +
            '<img src="' + esc(src(p.images[0])) + '" alt="" loading="lazy" decoding="async">' + badge +
            '<span class="fallback"><b>' + esc(p.name) + "</b><span>[Görsel yüklenemedi]</span></span>" +
          "</span>" +
          '<span class="work-meta"><span class="work-name">' + esc(p.name) + '</span><span class="work-place">' + esc(metaLine(p) || p.type) + "</span></span>" +
        "</button></article>";
    }).join("");
    $$("img", gallery).forEach(guard);

    $("#index-body").innerHTML = visible.map(function (p) {
      return '<tr data-row="' + p.id + '">' +
        '<td><button type="button" data-open="' + p.id + '">' + esc(p.name) + "</button></td>" +
        "<td><span>" + esc(p.location || "—") + "</span></td>" +
        "<td><span>" + esc(p.type) + "</span></td>" +
        "<td><span>" + esc(p.partner || "—") + "</span></td>" +
        '<td><span><i class="dot' + (p.status === "devam" ? " live" : "") + '" aria-hidden="true"></i>' + STATUS[p.status] + "</span></td>" +
      "</tr>";
    }).join("");

    var empty = visible.length === 0;
    $("#empty").hidden = !empty;
    $("#gallery-view").hidden = empty || state.view !== "gallery";
    $("#list-view").hidden = empty || state.view !== "list";
    $("#status-line").textContent = empty ? "" : visible.length + " proje gösteriliyor";
    $(".segmented").setAttribute("data-view", state.view);
    $$("[data-view-btn]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-view-btn") === state.view)); });
    renderChips();
  }

  function update() { render(); writeUrl(); }

  document.addEventListener("click", function (e) {
    var s = e.target.closest("[data-status]");
    if (s) { state.status = s.getAttribute("data-status"); update(); return; }
    var t = e.target.closest("[data-type]");
    if (t) { state.type = t.getAttribute("data-type"); update(); return; }
    var v = e.target.closest("[data-view-btn]");
    if (v) { state.view = v.getAttribute("data-view-btn"); update(); return; }
    var o = e.target.closest("[data-open]");
    if (o) { openProject(o.getAttribute("data-open"), Number(o.getAttribute("data-img") || 0), o); return; }
    var row = e.target.closest("[data-row]");
    if (row) { openProject(row.getAttribute("data-row"), 0, row.querySelector("button")); }
  });
  $("#reset-filters").addEventListener("click", function () { state.status = "all"; state.type = "all"; update(); });

  /* ---------- Liste önizlemesi (yalnız fare ile) ---------- */
  var peek = $("#peek");
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var body = $("#index-body");
    body.addEventListener("mouseover", function (e) {
      var row = e.target.closest("[data-row]");
      if (!row) return;
      var p = byId(row.getAttribute("data-row"));
      var img = peek.querySelector("img");
      if (img.getAttribute("src") !== src(p.images[0])) img.src = src(p.images[0]);
      peek.classList.add("on");
    });
    body.addEventListener("mousemove", function (e) {
      peek.style.left = Math.min(e.clientX, window.innerWidth - 320) + "px";
      peek.style.top = e.clientY + "px";
    });
    body.addEventListener("mouseleave", function () { peek.classList.remove("on"); });
  }

  /* ---------- Yakından şeridi ---------- */
  var shots = [];
  PROJECTS.forEach(function (p) {
    p.images.slice(1).forEach(function (src, k) { shots.push({ p: p, src: src, k: k + 1 }); });
  });
  $("#strip").innerHTML = shots.map(function (s) {
    return '<button type="button" class="shot" data-open="' + s.p.id + '" data-img="' + s.k + '" aria-label="' + esc(s.p.name) + ", fotoğraf " + (s.k + 1) + '">' +
      '<span class="media"><img src="' + esc(src(s.src)) + '" alt="" loading="lazy" decoding="async"><span class="fallback"><b>' + esc(s.p.name) + "</b><span>[Görsel yüklenemedi]</span></span></span>" +
      '<span class="t">' + esc(s.p.name) + "</span></button>";
  }).join("");
  $$("#strip img").forEach(guard);
  $$("[data-scroll]").forEach(function (b) {
    b.addEventListener("click", function () {
      var strip = $("#strip");
      strip.scrollBy({ left: Number(b.getAttribute("data-scroll")) * strip.clientWidth * 0.8, behavior: reduceMotion.matches ? "auto" : "smooth" });
    });
  });

  /* ---------- Proje künyesi ---------- */
  var dlg = $("#mono");

  function openProject(id, imgIndex, trigger) {
    var pool = visible.length ? visible : PROJECTS;
    var idx = pool.map(function (p) { return p.id; }).indexOf(id);
    if (idx < 0) { pool = PROJECTS; idx = PROJECTS.map(function (p) { return p.id; }).indexOf(id); }
    current.index = idx;
    current.pool = pool;
    lastFocus = trigger || document.activeElement;
    fill(pool[idx], imgIndex || 0);
    if (!dlg.open) {
      if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
      document.body.style.overflow = "hidden";
      peek.classList.remove("on");
    }
  }

  function fill(p, imgIndex) {
    $("#mono-count").textContent = (current.index + 1) + " / " + current.pool.length;
    $("#mono-title").textContent = p.name;
    $("#mono-sub").textContent = [p.location, p.type, STATUS[p.status]].filter(Boolean).join(", ");
    $("#mono-desc").textContent = p.desc;
    $("#mono-fallback").textContent = p.name;
    $("#mono-link").href = ROOT + p.url;
    $("#mono-link-text").textContent = p.name + " sayfasına gidin";

    var specs = [["Durum", STATUS[p.status]], ["Tür", p.type]];
    if (p.location) specs.push(["Konum", p.location]);
    if (p.partner) specs.push(["İş ortağı", p.partner]);
    specs = specs.concat(p.specs || []);
    $("#mono-spec").innerHTML = specs.map(function (s) { return "<div><dt>" + esc(s[0]) + "</dt><dd>" + esc(s[1]) + "</dd></div>"; }).join("");

    var thumbs = $("#mono-thumbs");
    thumbs.hidden = p.images.length < 2;
    thumbs.innerHTML = p.images.map(function (u, i) {
      return '<button type="button" data-thumb="' + i + '" aria-label="Fotoğraf ' + (i + 1) + '"><img src="' + esc(src(u)) + '" alt="" loading="lazy" decoding="async"></button>';
    }).join("");
    $$("img", thumbs).forEach(function (im) { im.addEventListener("error", function () { im.parentNode.hidden = true; }); });
    showImage(p, imgIndex);
    $(".mono-inner").scrollTop = 0;
  }

  function showImage(p, i) {
    current.image = Math.max(0, Math.min(i, p.images.length - 1));
    var img = $("#mono-img");
    $("#mono-media").classList.remove("is-broken");
    img.alt = p.name + ", fotoğraf " + (current.image + 1);
    img.src = src(p.images[current.image]);
    $$("[data-thumb]").forEach(function (b) { b.setAttribute("aria-current", String(Number(b.getAttribute("data-thumb")) === current.image)); });
  }
  guard($("#mono-img"));

  $("#mono-thumbs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-thumb]");
    if (b) showImage(current.pool[current.index], Number(b.getAttribute("data-thumb")));
  });

  function step(dir) {
    current.index = (current.index + dir + current.pool.length) % current.pool.length;
    fill(current.pool[current.index], 0);
  }
  $("#mono-prev").addEventListener("click", function () { step(-1); });
  $("#mono-next").addEventListener("click", function () { step(1); });
  $("#mono-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("#mono-thumbs")) return;
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  });
  dlg.addEventListener("close", function () {
    document.body.style.overflow = "";
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  });

  /* ---------- Başlat ---------- */
  readUrl();
  render();
})();
