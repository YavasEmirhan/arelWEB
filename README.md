# Arel Yapı — Anasayfa, Galeri ve Panel (v5)

arelyapi.net için yeniden tasarlanan anasayfa ve Galeri sayfası. Tasarım "Arel Yapı" marka kılavuzuna (Design System) bağlıdır. Saf HTML, CSS ve JavaScript; derleme adımı veya bağımlılık yok.

## Klasör yapısı

```
index.html              Anasayfa
galeri/index.html       Galeri (?durum=tamamlanan|devam, ?tur=<tür>, ?p=<proje-id>)
panel/index.html        Yönetim paneli (demo; assets/css/panel.css, assets/js/panel.js)
assets/css/arel.css     Ortak stil; en üstte kılavuzdaki token'lar
assets/js/site.js       Mobil menü, header çizgisi, yıl, sayılar, kırık görsel yedeği
assets/js/anasayfa.js   "Tüm projeler" dizini ve masaüstünde görsel önizleme
assets/js/galeri.js     Filtreler, ızgara, proje künyesi penceresi
assets/js/projeler.js   Proje verisi (anasayfa dizini ve galeri bu listeden üretilir)
assets/fonts/           Archivo ve Newsreader (SIL OFL lisanslı, kendi sunucunuzdan)
assets/img/             Görseller (WebP + JPG yedeği)
```

## Yayınlama

Dosyaları GitHub deposunun köküne kopyalayın (eski `index.html`, `galeri/`, `assets/` üzerine yazılır). Bağlantılar göreli olduğu için hem GitHub Pages alt klasöründe hem de alan adının kökünde çalışır. Kurumsal, Sürdürülebilirlik, Kariyer gibi henüz yeniden tasarlanmayan sayfalar www.arelyapi.net'teki mevcut adreslerine gider.

## Proje eklemek

`assets/js/projeler.js` dosyasına yeni bir nesne ekleyin. Anasayfadaki proje dizini, sayılar, galeri filtreleri ve künyeler otomatik güncellenir. Anasayfadaki iki öne çıkan proje (Kristal Kule, AND Pastel) `index.html` içinde elle yazılıdır.

## Bilinen eksikler

- Çoğu proje görseli arelyapi.net/wp-content adresinden çekiliyor. O site kapanırsa veya görseli engellerse yerine kat çizgili lacivert bir blok çıkar. Kalıcı çözüm: görselleri indirip `assets/img/` içine koymak ve `projeler.js`'teki adresleri güncellemek.
- E-posta adresi yok; iletişim telefon ve yol tarifi üzerinden.
- Ferrero, Narcity, Mayavera için konum; Mayavera ve Gebze Center için iş ortağı bilgisi yok.

## Demo sürümü: kurgu içerikler

Sayfanın üstündeki şerit bunun demo olduğunu söyler. Yayına almadan önce aşağıdakiler Arel'den gelen gerçek bilgiyle değiştirilmeli, sonra şerit (`.demo-bant`) kaldırılmalı:

- Künye şeridi: kuruluş yılı (1998), toplam inşaat alanı (2,2 milyon m²)
- Değerler altındaki üç rakam (%32 atık azalması, 1,8 milyon adam-saat; "2 LEED projesi" gerçek)
- "Şantiyeden" bölümündeki üç haber
- İletişimdeki üç kişi (ad, görev) ve kariyer kartlarındaki program ayrıntıları
- Footer'daki ISO 9001 / 14001 / 45001 rozetleri (LEED olanlar gerçek)
- `projeler.js` sonundaki blok: teslim yılları, inşaat alanları, fotoğraf kredileri, Ferrero / Narcity / Mayavera konumları, Mayavera ve Gebze Center iş ortakları
- Proje talep formu hiçbir yere veri göndermez; yayında bir form servisine bağlanmalı
- "Ekipten hikâyeler" kutusu video çekilene kadar yer tutucudur

## Yönetim paneli (demo)

`/panel/` adresinde açılır. Giriş ekranı ve sunucu yoktur: veriler tarayıcıda (localStorage) tutulur, siteye yansımaz, arama motorlarına kapalıdır (noindex). Bölümler: Genel bakış, Projeler, Talepler, Şantiyeden, Otomasyonlar, Paneli düzenle. Gerçek sürümde giriş (kullanıcı/şifre), veritabanı ve otomasyonların arka ucu eklenir; `panel.js` içindeki `defaults()` verisi API'den gelir.

## v5 düzeni

Kimlik aynı (marka kılavuzundaki renk ve fontlar), düzen yeni: koyu header; hero'da fotoğraf logodaki çizgili üçgenin içinden görünür ve alttan yükselir; sayfa gece laciverti ve taş bantları arasında ilerler; projeler koyu bantta büyük dizin ve yapışkan önizlemeyle. Stiller `arel.css` içinde "11. v5 düzeni" bölümündedir.
