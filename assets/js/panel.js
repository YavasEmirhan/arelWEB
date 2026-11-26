/* Arel Yapı — yönetim paneli (DEMO). Sunucu yok: veri tarayıcıda (localStorage) tutulur, siteye yansımaz.
   Gerçek sürümde buradaki S nesnesi bir API'den okunur ve oraya yazılır. */
(function () {
  "use strict";
  var KEY = "arel-panel-demo-v1";
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var STATUS = { tamamlanan: "Tamamlandı", devam: "Devam ediyor" };
  var TALEP_DURUM = ["Yeni", "Görüşülüyor", "Teklif verildi", "Kapandı"];
  var MODS = [["projeler", "Projeler"], ["talepler", "Talepler"], ["haberler", "Şantiyeden"], ["otomasyon", "Otomasyonlar"]];

  function defaults() {
    return {
      projeler: (window.AREL_PROJECTS || []).map(function (p) {
        return { id: p.id, name: p.name, claim: p.claim || "", type: p.type, status: p.status, location: p.location || "", partner: p.partner || "" };
      }),
      talepler: [
        { tarih: "24 Kasım 2026", kisi: "Ayşe Demir", firma: "Örnek Gayrimenkul", tur: "Ofis", mesaj: "Ataşehir'de 18.000 m² ofis binası için anahtar teslim teklif.", durum: "Yeni" },
        { tarih: "21 Kasım 2026", kisi: "Kerem Şahin", firma: "Örnek Lojistik", tur: "Endüstriyel", mesaj: "Tuzla'da depo ve idari bina; zemin etüdü hazır.", durum: "Yeni" },
        { tarih: "17 Kasım 2026", kisi: "Elif Yıldız", firma: "Örnek Yapı Kooperatifi", tur: "Konut", mesaj: "96 dairelik proje için kaba inşaat fiyatı.", durum: "Görüşülüyor" },
        { tarih: "9 Kasım 2026", kisi: "Burak Çelik", firma: "Örnek Perakende", tur: "Ticari", mesaj: "Mağaza renovasyonu, 2.400 m².", durum: "Teklif verildi" }
      ],
      haberler: [
        { tarih: "12 Kasım 2026", kat: "Şantiye", baslik: "AND Pastel'de kaba inşaat son bloğa ulaştı", yayin: true },
        { tarih: "28 Ekim 2026", kat: "Sürdürülebilirlik", baslik: "Nevayalı'da hafriyatın yüzde 80'i yeniden kullanıldı", yayin: true },
        { tarih: "3 Ekim 2026", kat: "Kariyer", baslik: "İlk Adım Programı 2027 başvuruları açıldı", yayin: true }
      ],
      oto: [
        { ad: "Talep bildirimi", acik: true, metin: "Siteden gelen her proje talebi ilgili müdüre e-posta ve WhatsApp ile iletilir.", akis: "Form gönderildi, ilgili kişi seçildi, bildirim gitti" },
        { ad: "Instagram'dan siteye", acik: true, metin: "Şantiye gönderileri Instagram'da paylaşıldığında \"Şantiyeden\" akışına taslak olarak düşer.", akis: "Yeni gönderi, taslak haber, onay, yayın" },
        { ad: "Aylık şantiye raporu", acik: false, metin: "Devam eden projeler için ilerleme, fotoğraf ve iş güvenliği özeti PDF olarak hazırlanır.", akis: "Ay sonu, veriler toplandı, PDF, yönetim e-postası" },
        { ad: "Teklif takibi", acik: false, metin: "Teklif verilen talep 7 gün yanıtsız kalırsa sorumluya hatırlatma gider.", akis: "Teklif verildi, 7 gün, hatırlatma" },
        { ad: "Kariyer başvuruları", acik: false, metin: "Başvurular pozisyona göre sınıflanır, İK'ya haftalık liste gönderilir.", akis: "Başvuru, sınıflandırma, haftalık özet" },
        { ad: "Google yorum takibi", acik: false, metin: "Yeni Google yorumları panele düşer; yanıt taslağı hazırlanır.", akis: "Yeni yorum, taslak yanıt, onay" }
      ],
      istekler: [],
      gizli: []
    };
  }
  function load() { try { var r = JSON.parse(localStorage.getItem(KEY)); if (r && r.projeler) return r; } catch (e) {} return defaults(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  var S = load();

  /* Sekmeler */
  var nav = $("p-nav");
  function go(tab, focus) {
    if (!$("tab-" + tab) || S.gizli.indexOf(tab) > -1) tab = "genel";
    document.querySelectorAll(".p-tab").forEach(function (s) { s.hidden = s.id !== "tab-" + tab; });
    nav.querySelectorAll("button").forEach(function (b) {
      if (b.getAttribute("data-tab") === tab) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    try { history.replaceState(null, "", "#" + tab); } catch (e) {}
    if (focus) { var h = $("tab-" + tab).querySelector("h1"); h.setAttribute("tabindex", "-1"); h.focus(); }
  }
  nav.addEventListener("click", function (e) { var b = e.target.closest("button[data-tab]"); if (b) go(b.getAttribute("data-tab"), true); });

  /* Çizimler */
  function draw() {
    var yeni = S.talepler.filter(function (t) { return t.durum === "Yeni"; }).length;
    var aktif = S.oto.filter(function (o) { return o.acik; });
    $("n-talep").textContent = yeni || "";
    $("kutular").innerHTML = [[S.projeler.length, "Proje"], [yeni, "Yeni talep"], [S.haberler.filter(function (h) { return h.yayin; }).length, "Yayındaki haber"], [aktif.length, "Çalışan otomasyon"]]
      .map(function (k) { return "<div><dt>" + k[1] + "</dt><dd>" + k[0] + "</dd></div>"; }).join("");
    $("son-talepler").innerHTML = S.talepler.slice(0, 3).map(function (t) {
      return "<li><span>" + esc(t.kisi) + '<span class="ikincil">' + esc(t.firma + ", " + t.tur) + "</span></span><span>" + esc(t.durum) + "</span></li>";
    }).join("");
    $("aktif-oto").innerHTML = aktif.length ? aktif.map(function (o) { return "<li><span>" + esc(o.ad) + "</span><span>Açık</span></li>"; }).join("") : '<li class="bos-not">Açık otomasyon yok. Otomasyonlar bölümünden açın.</li>';

    $("proje-govde").innerHTML = S.projeler.map(function (p, i) {
      return '<tr><td><span class="ad">' + esc(p.name) + '</span><span class="ikincil" style="display:block;color:var(--tas);font-size:13px">' + esc(p.claim) + "</span></td><td>" + esc(p.type) + "</td><td>" + esc(p.location) + "</td><td>" + STATUS[p.status] +
        '</td><td><button class="p-kucuk" type="button" data-edit="' + i + '">Düzenle<span class="visually-hidden">: ' + esc(p.name) + "</span></button></td></tr>";
    }).join("");

    $("talep-govde").innerHTML = S.talepler.map(function (t, i) {
      return "<tr><td>" + esc(t.tarih) + '</td><td><span class="ad">' + esc(t.kisi) + '</span><span style="display:block;color:var(--tas);font-size:13px">' + esc(t.firma) + "</span></td><td>" + esc(t.tur) + '</td><td class="mesaj">' + esc(t.mesaj) +
        '</td><td><select data-talep="' + i + '" aria-label="' + esc(t.kisi) + ' talebinin durumu">' + TALEP_DURUM.map(function (d) { return "<option" + (d === t.durum ? " selected" : "") + ">" + d + "</option>"; }).join("") + "</select></td></tr>";
    }).join("");

    $("haber-liste").innerHTML = S.haberler.map(function (h, i) {
      return "<li><span>" + esc(h.baslik) + '<span class="ikincil">' + esc(h.tarih + ", " + h.kat) + '</span></span><button class="p-kucuk" type="button" data-haber="' + i + '" aria-pressed="' + h.yayin + '">' + (h.yayin ? "Yayında" : "Yayında değil") + "</button></li>";
    }).join("");

    $("oto-liste").innerHTML = S.oto.map(function (o, i) {
      return "<li><h2>" + esc(o.ad) + '</h2><button class="salter" type="button" role="switch" aria-checked="' + o.acik + '" aria-label="' + esc(o.ad) + '" data-oto="' + i + '"><span></span></button><p>' + esc(o.metin) + '</p><p class="akis">Akış: ' + esc(o.akis) + "</p></li>";
    }).join("");
    $("istek-kart").hidden = !S.istekler.length;
    $("istek-liste").innerHTML = S.istekler.map(function (x) { return "<li><span>" + esc(x) + "</span><span>TwoFold'a iletilecek</span></li>"; }).join("");

    $("mod-liste").innerHTML = MODS.map(function (m) {
      return '<label><input type="checkbox" data-mod-cb="' + m[0] + '"' + (S.gizli.indexOf(m[0]) < 0 ? " checked" : "") + "> " + m[1] + "</label>";
    }).join("");
    nav.querySelectorAll("li[data-mod]").forEach(function (li) { li.hidden = S.gizli.indexOf(li.getAttribute("data-mod")) > -1; });
  }

  /* Olaylar */
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.hasAttribute("data-talep")) { S.talepler[+t.getAttribute("data-talep")].durum = t.value; save(); draw(); }
    if (t.hasAttribute("data-mod-cb")) {
      var m = t.getAttribute("data-mod-cb"), i = S.gizli.indexOf(m);
      if (t.checked && i > -1) S.gizli.splice(i, 1); else if (!t.checked && i < 0) S.gizli.push(m);
      save(); draw(); $("p-durum").textContent = "Bölümler güncellendi."; document.querySelector('[data-mod-cb="' + m + '"]').focus();
    }
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-oto")) { var o = S.oto[+b.getAttribute("data-oto")]; o.acik = !o.acik; save(); draw(); document.querySelector('[data-oto="' + b.getAttribute("data-oto") + '"]').focus(); }
    if (b.hasAttribute("data-haber")) { var h = S.haberler[+b.getAttribute("data-haber")]; h.yayin = !h.yayin; save(); draw(); document.querySelector('[data-haber="' + b.getAttribute("data-haber") + '"]').focus(); }
    if (b.hasAttribute("data-edit")) openDlg(+b.getAttribute("data-edit"));
  });

  $("haber-form").addEventListener("submit", function (e) {
    e.preventDefault(); var v = $("h-baslik").value.trim(); if (!v) { $("h-baslik").focus(); return; }
    S.haberler.unshift({ tarih: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }), kat: $("h-kat").value, baslik: v, yayin: false });
    $("h-baslik").value = ""; save(); draw();
  });
  $("oto-form").addEventListener("submit", function (e) {
    e.preventDefault(); var v = $("o-istek").value.trim(); if (!v) { $("o-istek").focus(); return; }
    S.istekler.unshift(v); $("o-istek").value = ""; save(); draw();
  });
  $("sifirla").addEventListener("click", function () { S = defaults(); save(); draw(); $("p-durum").textContent = "Demo verisi ilk haline döndü."; });

  /* Proje diyaloğu */
  var dlg = $("proje-dlg"), editing = -1;
  function openDlg(i) {
    editing = i; var p = i > -1 ? S.projeler[i] : { name: "", claim: "", type: "Ofis", status: "devam", location: "", partner: "" };
    $("dlg-baslik").textContent = i > -1 ? "Projeyi düzenleyin" : "Yeni proje";
    $("p-ad").value = p.name; $("p-claim").value = p.claim; $("p-tur").value = p.type; $("p-durum-s").value = p.status; $("p-konum").value = p.location; $("p-ortak").value = p.partner;
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  }
  $("proje-ekle").addEventListener("click", function () { openDlg(-1); });
  $("dlg-vazgec").addEventListener("click", function () { dlg.close(); });
  $("proje-form").addEventListener("submit", function (e) {
    e.preventDefault(); if (!$("p-ad").value.trim()) { $("p-ad").focus(); return; }
    var p = { name: $("p-ad").value.trim(), claim: $("p-claim").value.trim(), type: $("p-tur").value, status: $("p-durum-s").value, location: $("p-konum").value.trim(), partner: $("p-ortak").value.trim() };
    if (editing > -1) { p.id = S.projeler[editing].id; S.projeler[editing] = p; } else { p.id = "yeni-" + Date.now(); S.projeler.unshift(p); }
    save(); draw(); dlg.close();
  });

  draw();
  go((location.hash || "#genel").slice(1));
})();
