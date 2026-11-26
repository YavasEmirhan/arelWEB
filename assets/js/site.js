/* Arel Yapı — ortak davranışlar: mobil menü, header çizgisi, yıl, sayılar, kırık görsel yedeği */
(function () {
  "use strict";

  /* Görsel yüklenemezse: kat çizgili lacivert blok + proje adı */
  window.arelGuard = function (img, label) {
    function fail() {
      var box = img.closest("figure") || img.parentNode;
      if (!box || box.querySelector(".img-fallback")) return;
      var pic = img.closest("picture");
      (pic || img).style.visibility = "hidden";
      var f = document.createElement("div");
      f.className = "img-fallback";
      f.setAttribute("role", "img");
      f.setAttribute("aria-label", (label || img.alt || "Proje") + " görseli yüklenemedi");
      f.textContent = label || "";
      box.appendChild(f);
    }
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail();
    else img.addEventListener("error", fail, { once: true });
  };
  document.querySelectorAll("figure img").forEach(function (img) { window.arelGuard(img); });

  /* Mobil menü */
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("ana-menu");
  if (btn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    };
    btn.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); btn.focus(); }
    });
  }

  /* Kaydırınca header altına çizgi */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Yıl ve proje sayıları */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  var projects = window.AREL_PROJECTS || [];
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var key = el.getAttribute("data-count");
    var n = projects.filter(function (p) { return p.status === key; }).length;
    if (n) el.textContent = n;
  });
})();
