/* Arel Yapı — anasayfa: proje dizini (projeler.js'ten) ve masaüstünde görsel önizleme */
(function () {
  "use strict";

  var PROJECTS = window.AREL_PROJECTS || [];
  var list = document.getElementById("dizin-list");
  if (!list || !PROJECTS.length) return;

  var STATUS = { tamamlanan: "Tamamlandı", devam: "Devam ediyor" };
  var esc = function (s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  // Devam edenler üstte, sonra tamamlananlar
  var ordered = PROJECTS.slice().sort(function (a, b) {
    return (a.status === "devam" ? 0 : 1) - (b.status === "devam" ? 0 : 1);
  });

  list.innerHTML = ordered.map(function (p) {
    return '<li><a href="galeri/index.html?p=' + encodeURIComponent(p.id) + '" data-img="' + esc(p.images[0]) + '">' +
      '<span class="ad">' + esc(p.name) + '</span>' +
      '<span class="tur">' + esc(p.type) + '</span>' +
      '<span class="konum muted">' + (p.location ? esc(p.location) : "&nbsp;") + '</span>' +
      '<span class="ortak muted">' + (p.partner ? esc(p.partner) : "&nbsp;") + '</span>' +
      '<span class="durum' + (p.status === "devam" ? " devam" : "") + '">' + STATUS[p.status] + '</span>' +
      '</a></li>';
  }).join("");

  /* Önizleme: sadece fareyle ve hareket kısıtlaması yokken */
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  var box = document.querySelector(".dizin-onizleme");
  var wrap = document.getElementById("dizin");
  if (!box || !wrap) return;
  var img = box.querySelector("img");

  function show(a) {
    var src = a.getAttribute("data-img");
    if (img.getAttribute("src") !== src) img.setAttribute("src", src);
    box.classList.add("on");
  }
  img.addEventListener("error", function () { box.classList.remove("on"); });
  list.addEventListener("mouseover", function (e) { var a = e.target.closest("a"); if (a) show(a); });
  list.addEventListener("focusin", function (e) { var a = e.target.closest("a"); if (a) show(a); });
  var ilk = list.querySelector("a"); if (ilk) show(ilk);
})();

/* Sektör girişi: türler projeler.js'ten; her kart galeride o türü açar */
(function () {
  "use strict";
  var PROJECTS = window.AREL_PROJECTS || [], grid = document.getElementById("sektor-grid");
  if (!grid || !PROJECTS.length) return;
  var PITCH = {
    "Ofis": "A+ ofis kuleleri ve plazalar; LEED sertifikalı teslimler.",
    "Konut": "Toplu konuttan villaya, mahalle ölçeğinde yaşam alanları.",
    "Ticari": "Alışveriş merkezleri ve büyük mağazalar.",
    "Endüstriyel": "Üretim tesisleri; zemin iyileştirme ve deprem güvenliği.",
    "Karma kullanım": "Konut, ofis ve ticareti tek omurgada birleştiren projeler.",
    "Teknopark": "Ar-Ge ve inovasyon için çalışma alanları."
  };
  var ORDER = ["Ofis", "Konut", "Ticari", "Endüstriyel", "Karma kullanım", "Teknopark"];
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  grid.innerHTML = ORDER.map(function (t) {
    var ps = PROJECTS.filter(function (p) { return p.type === t; });
    if (!ps.length) return "";
    var names = ps.slice(0, 3).map(function (p) { return p.name; }).join(", ") + (ps.length > 3 ? " ve " + (ps.length - 3) + " proje daha" : "");
    return '<li><a href="galeri/index.html?tur=' + encodeURIComponent(t) + '">' +
      '<span class="sayi">' + ps.length + ' proje</span><h3>' + esc(t) + '</h3>' +
      '<p>' + esc(PITCH[t] || "") + '</p><span class="adlar">' + esc(names) + '</span></a></li>';
  }).join("");
})();

/* Hero başlığında dönen kelime; durdurulabilir, hareket azaltmada kapalı */
(function () {
  "use strict";
  var el = document.getElementById("doner"), btn = document.getElementById("doner-btn");
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var WORDS = ["ofisler", "konutlar", "fabrikalar", "kuleler", "mahalleler"], i = 0, timer = null;
  function next() {
    el.classList.add("cik");
    setTimeout(function () { i = (i + 1) % WORDS.length; el.textContent = WORDS[i]; el.classList.remove("cik"); }, 260);
  }
  function start() { timer = setInterval(next, 2800); }
  start();
  if (btn) {
    btn.hidden = false;
    btn.addEventListener("click", function () {
      var paused = btn.getAttribute("aria-pressed") === "true";
      if (paused) start(); else clearInterval(timer);
      btn.setAttribute("aria-pressed", String(!paused));
      btn.textContent = paused ? "Başlık döngüsünü durdur" : "Başlık döngüsünü başlat";
    });
  }
})();

/* Proje talep formu: demo, hiçbir yere veri göndermez */
(function () {
  "use strict";
  var form = document.getElementById("talep"), out = document.getElementById("form-durum");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var bad = Array.prototype.filter.call(form.querySelectorAll("[required]"), function (f) { return !f.value.trim() || !f.checkValidity(); });
    form.querySelectorAll("[aria-invalid]").forEach(function (f) { f.removeAttribute("aria-invalid"); });
    if (bad.length) {
      bad.forEach(function (f) { f.setAttribute("aria-invalid", "true"); });
      out.textContent = "Ad, geçerli bir e-posta ve proje açıklaması gerekli.";
      bad[0].focus();
      return;
    }
    out.textContent = "Demo: talep gönderilmedi. Yayındaki sürümde bu form Arel Yapı'ya iletilecek.";
  });
})();
