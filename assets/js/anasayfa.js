/* Arel Yapı — Anasayfa: "Öne çıkan projeler" sekmeleri.
   JavaScript kapalıysa ilk proje görünür kalır. */
(function () {
  "use strict";
  var list = document.querySelector('[role="tablist"]');
  if (!list) return;
  var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
  var thumb = list.querySelector(".thumb");

  function select(i, focus) {
    tabs.forEach(function (tab, k) {
      var on = k === i;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !on;
      document.getElementById(tab.getAttribute("data-media")).hidden = !on;
    });
    if (thumb) thumb.style.transform = "translateX(" + (i * 100) + "%)";
    if (focus) tabs[i].focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { select(i, false); });
    tab.addEventListener("keydown", function (e) {
      var n = tabs.length, next = null;
      if (e.key === "ArrowRight") next = (i + 1) % n;
      else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = n - 1;
      if (next !== null) { e.preventDefault(); select(next, true); }
    });
  });
})();
