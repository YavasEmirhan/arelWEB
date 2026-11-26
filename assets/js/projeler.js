/* Arel Yapı — proje verisi
   Kaynak: arelyapi.net/projeler, /tamamlanan-projeler ve /devam-eden-projeler (Kasım 2026).
   Yeni proje eklemek için listeye bir nesne eklemeniz yeterli; Galeri sayfası
   filtreleri, sayıları ve künyeleri bu listeden üretir.
   status: "tamamlanan" | "devam"   images: ilk görsel kapak görselidir.
   Görsel adresi "assets/" ile başlıyorsa depodaki dosyadır, aksi halde tam adres yazılır. */
window.AREL_PROJECTS = (function () {
  var U = "https://www.arelyapi.net/wp-content/uploads/";
  return [
    {
      id: "kristal-kule", name: "Kristal Kule", status: "tamamlanan", type: "Ofis",
      location: "İstanbul", partner: "Koray Group",
      images: ["assets/img/kristal-kule-1600.webp", U + "2020/07/1-1.png", U + "2020/07/2-1.png"],
      desc: "Pei Cobb Freed & Partners tasarımı; iki ofis kulesi, sosyal alanlar ve 5 katlı otopark içeren bir podyumdan oluşur.",
      specs: [["Mimari tasarım", "Pei Cobb Freed & Partners"], ["Öne çıkanlar", "Kristal form, açılır kapanır çatı"], ["Skygarden", "35. kat"], ["Sertifika", "LEED Silver"]],
      url: "projeler/kristal-kule/index.html"
    },
    {
      id: "and-pastel", name: "AND Pastel", status: "devam", type: "Konut",
      location: "Kartal, İstanbul", partner: "Tepe İnşaat",
      images: ["assets/img/and-pastel-1600.webp", U + "2020/08/and-pastel_1-scaled.jpg", U + "2020/08/and-pastel_2-scaled.jpg"],
      desc: "AND Gayrimenkul'ün ikinci projesi. Tepe İnşaat tarafından, yeni nesil mahalle konseptiyle inşa ediliyor.",
      specs: [["Geliştirici", "AND Gayrimenkul"], ["Konsept", "Yeni nesil mahalle"]],
      url: "projeler/and-pastel/index.html"
    },
    {
      id: "nevayali", name: "Nevayalı", status: "devam", type: "Konut",
      location: "İzmir", partner: "Rönesans",
      images: [U + "2024/11/1-editAI.jpg.webp", U + "2024/11/Exterior_01.jpg.webp", U + "2024/11/Interior_07.jpg.webp"],
      desc: "İzmir'in merkezinde, doğal çevresiyle bütünleşen ve lüks rezidans yaşamı sunan bir konut projesi.",
      specs: [["Konum", "İzmir, şehir merkezi"], ["Konsept", "Lüks rezidans"]],
      url: "projeler/nevayali/index.html"
    },
    {
      id: "and-plaza", name: "AND Plaza", status: "tamamlanan", type: "Ofis",
      location: "Anadolu Yakası, İstanbul", partner: "Tepe İnşaat",
      images: [U + "2020/07/and-plaza_1.jpg", U + "2020/07/and-plaza_2.jpg", U + "2020/07/and-plaza_3.jpg"],
      desc: "İstanbul Anadolu Yakası'nda A+ sınıfı bir ofis projesi. Tepe İnşaat tarafından anahtar teslim tamamlandı.",
      specs: [["İnşaat alanı", "73.325 m²"], ["Sınıf", "A+ ofis"], ["Teslim", "Anahtar teslim"], ["Sertifika", "LEED Platinum"]],
      url: "projeler/and-plaza/index.html"
    },
    {
      id: "maslak-1453", name: "Maslak 1453", status: "tamamlanan", type: "Karma kullanım",
      location: "Maslak, İstanbul", partner: "Ağaoğlu",
      images: [U + "2020/06/ae8a41a8cefb46a5bb4b0fe04d41135f-1-640x480.jpg"],
      desc: "Konut, ofis, alışveriş, spor ve eğlenceyi bir araya getiren karma kullanımlı bir proje. Ana yollara, toplu taşımaya, köprülere ve havalimanlarına kolay ulaşım sunar.",
      specs: [["Kullanım", "Konut, ofis, alışveriş, spor, eğlence"], ["Omurga", "1.453 metrelik Cadde 1453"]],
      url: "projeler/maslak-1453/index.html"
    },
    {
      id: "itu-ari-teknokent", name: "İTÜ ARI Teknokent", status: "tamamlanan", type: "Teknopark",
      location: "İstanbul", partner: "İTÜ Teknokent",
      images: [U + "2020/07/ari3-yercekim-img-4387-1-20181220110018.jpg", U + "2020/07/itu_ari_teknokent_tgb_bina_fotografi.jpg", U + "2020/07/iTU_Magnet_3_1-154l6t7.jpg"],
      desc: "Teknoloji şirketlerine Ar-Ge ve inovasyon odaklı çalışma alanı sunan bir teknoloji geliştirme bölgesi. Araştırmaların ürüne dönüşmesini ve uluslararası iş birliğini destekler.",
      specs: [["İşlev", "Ar-Ge ve inovasyon alanı"]],
      url: "projeler/itu-ari-teknokent/index.html"
    },
    {
      id: "ferrero", name: "Ferrero Fındık İşleme Fabrikası", status: "tamamlanan", type: "Endüstriyel",
      location: "", partner: "Tepe İnşaat",
      images: [U + "2024/11/ferrero-1692769811.jpg"],
      desc: "Tepe İnşaat'ın tamamladığı fındık işleme tesisi. Deprem güvenliği ve zemin iyileştirme için kapsamlı mühendislik çözümleri uygulandı.",
      specs: [["Deprem güvenliği", "Sismik izolatör, viskoz damper"], ["Zemin iyileştirme", "Fore kazık, jet grout, taş kolon"], ["Su kontrolü", "Wellpoint sistemi"]],
      url: "projeler/ferrero-findik-isleme-fabrikasi/index.html"
    },
    {
      id: "narcity", name: "Narcity", status: "tamamlanan", type: "Konut",
      location: "", partner: "Tepe İnşaat",
      images: [U + "2020/08/narcity_2-1.jpg", U + "2020/08/narcity_2.jpg", U + "2020/08/narcity_3.jpg"],
      desc: "Bölgenin ilk ve en büyük toplu konut projesi. Modern mimarisi, yapı kalitesi ve planlamasıyla öne çıkar.",
      specs: [["Tür", "Toplu konut"]],
      url: "projeler/narcity/index.html"
    },
    {
      id: "cekmekoy-park", name: "Çekmeköy Park", status: "tamamlanan", type: "Konut",
      location: "Çekmeköy, İstanbul", partner: "Ağaoğlu",
      images: [U + "2020/06/1.jpg", U + "2020/06/2.jpg", U + "2020/06/5.jpg"],
      desc: "Geniş yeşil alanları, sosyal tesisleri ve çağdaş mimarisiyle Çekmeköy'de bir konut projesi.",
      specs: [["Öne çıkanlar", "Yeşil alanlar, sosyal tesisler"]],
      url: "projeler/cekmekoy-park/index.html"
    },
    {
      id: "bayrampasa-ikea", name: "Bayrampaşa İKEA", status: "tamamlanan", type: "Ticari",
      location: "Bayrampaşa, İstanbul", partner: "Maya",
      images: [U + "2020/05/ikea-bayrampasa0.jpg", U + "2020/05/ikea.jpg"],
      desc: "Forum Marmara içinde yer alan İKEA mağazası.",
      specs: [["Açılış", "2007"], ["Kapalı alan", "Yaklaşık 30.000 m²"], ["Ürün çeşidi", "Yaklaşık 8.000"]],
      url: "projeler/bayrampasa-ikea/index.html"
    },
    {
      id: "mayavera", name: "Mayavera", status: "tamamlanan", type: "Konut",
      location: "", partner: "",
      images: [U + "2020/05/mayavera3.jpg"],
      desc: "Doğanın içine yerleşen altı farklı villa tipinden oluşur. Türk ve modern Avrupa mimarisini peyzajla bir araya getirir.",
      specs: [["Villa tipi", "6"]],
      url: "projeler/mayavera/index.html"
    },
    {
      id: "gebze-center", name: "Gebze Center", status: "tamamlanan", type: "Ticari",
      location: "Gebze, Kocaeli", partner: "",
      images: [U + "2020/04/2018613132642459_201821484033535_Gebze-Center-AVM-ust-foto.jpg"],
      desc: "Bölgenin ilk alışveriş merkezi olarak bilinen Gebze Center.",
      specs: [["Kiralanabilir alan", "66.072 m²"], ["Mağaza", "130"]],
      url: "projeler/gebze-center/index.html"
    }
  ];
})();

/* DEMO ZENGİNLEŞTİRME — aşağıdaki "kurgu" alanları gerçek veri değildir.
   claim: kart başlığı (sitedeki gerçek bilgilerden türetildi)
   credit, year, area ve boş konum/ortak alanları: KURGU; Arel'den gelen bilgiyle değiştirilecek. */
(function () {
  var X = {
    "kristal-kule":      { claim: "35. katta skygarden, açılır kapanır çatı", year: "2014", area: "110.000 m²" },
    "and-pastel":        { claim: "Kartal'da yeni nesil mahalle", year: "2027 (hedef)", area: "240.000 m²" },
    "nevayali":          { claim: "Şehrin merkezinde, doğayla iç içe", year: "2028 (hedef)", area: "95.000 m²" },
    "and-plaza":         { claim: "73.325 m², LEED Platinum A+ ofis", year: "2016" },
    "maslak-1453":       { claim: "1.453 metrelik bir cadde", year: "2017", area: "1.200.000 m²" },
    "itu-ari-teknokent": { claim: "Araştırmanın ürüne dönüştüğü yer", year: "2012", area: "48.000 m²" },
    "ferrero":           { claim: "Sismik izolatörlü fındık fabrikası", year: "2013", area: "36.000 m²", location: "Manisa" },
    "narcity":           { claim: "Bölgenin ilk ve en büyük toplu konutu", year: "2010", area: "320.000 m²", location: "Maltepe, İstanbul" },
    "cekmekoy-park":     { claim: "Yeşilin içinde konut", year: "2011", area: "85.000 m²" },
    "bayrampasa-ikea":   { claim: "30.000 m² tek mağaza", year: "2007" },
    "mayavera":          { claim: "Altı villa tipi, tek peyzaj", year: "2009", area: "22.000 m²", location: "Ömerli, İstanbul", partner: "Maya" },
    "gebze-center":      { claim: "130 mağaza, 66.072 m²", year: "2010", partner: "Örnek Yatırım A.Ş." }
  };
  window.AREL_PROJECTS.forEach(function (p) {
    var x = X[p.id]; if (!x) return;
    p.claim = x.claim;
    if (!p.location && x.location) p.location = x.location;
    if (!p.partner && x.partner) p.partner = x.partner;
    p.credit = (p.partner || "Arel Yapı") + " arşivi";
    p.specs = (p.specs || []).concat([["Teslim", x.year]], x.area ? [["İnşaat alanı", x.area]] : []);
  });
})();
