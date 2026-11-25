/* Arel Yapı — her sayfada çalışan ortak davranışlar:
   mobil menü, yıl, görsel açılmazsa yer tutucu. */
(function () {
  "use strict";

  // Mobil menü
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobil-menu");
  if (btn && menu) {
    var setOpen = function (open) {
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
      menu.hidden = !open;
    };
    btn.addEventListener("click", function () { setOpen(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setOpen(false); btn.focus(); }
    });
    window.matchMedia("(min-width: 821px)").addEventListener("change", function (m) { if (m.matches) setOpen(false); });
  }

  // Yıl
  var year = document.getElementById("yil");
  if (year) year.textContent = new Date().getFullYear();

  // Görsel açılmazsa .media kutusunda lacivert yer tutucu göster
  window.arelGuard = function (img) {
    if (!img) return;
    var box = img.closest(".media");
    if (!box) return;
    img.addEventListener("error", function () { box.classList.add("is-broken"); });
    img.addEventListener("load", function () { box.classList.remove("is-broken"); });
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) box.classList.add("is-broken");
  };
  Array.prototype.forEach.call(document.querySelectorAll(".media img"), window.arelGuard);
})();
