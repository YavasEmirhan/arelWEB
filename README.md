# Arel Yapı — Anasayfa ve Galeri

arelyapi.net için yeniden tasarlanan anasayfa ve yeni Galeri sayfası. Saf HTML, CSS ve JavaScript; derleme adımı veya bağımlılık yok.

## Klasör yapısı

```
index.html              Anasayfa
galeri/index.html       Galeri sayfası
assets/css/arel.css     Ortak stil (iki sayfa da kullanır)
assets/js/site.js       Ortak davranışlar: mobil menü, yıl, kırık görsel yedeği
assets/js/anasayfa.js   Anasayfa: öne çıkan projeler sekmeleri
assets/js/projeler.js   Proje verisi (Galeri bu listeden üretilir)
assets/js/galeri.js     Galeri: filtreler, liste görünümü, proje künyesi
assets/img/             Optimize edilmiş görseller (WebP + JPG yedeği)
```

## Yayınlama

Dosyaları mevcut sitenin kök klasörüne kopyalayın. Bağlantılar göreli yazıldığı için hem alan adının kökünde hem de GitHub Pages alt klasöründe çalışır. Menüdeki diğer sayfalar (Kurumsal, Projeler, Kariyer…) mevcut sitedeki adreslerine gider; adresler değişmediği için yönlendirme gerekmez.

Diğer sayfaların menüsüne de "Galeri" bağlantısını eklemeyi unutmayın: `galeri/index.html`.

## Proje eklemek

`assets/js/projeler.js` dosyasına yeni bir nesne ekleyin. Galeri sayfasındaki filtreler, sayılar ve künyeler otomatik güncellenir. Anasayfadaki "10 proje / 2 proje" sayıları ve öne çıkan projeler ise `index.html` içinde elle yazılıdır.

## Eksik bilgiler

- E-posta adresi: sitede gizli olduğu için okunamadı. Footer'daki `[Eksik: e-posta adresi]` yorumunun yerine ekleyin.
- Ferrero, Narcity ve Mayavera projelerinin konumu; Mayavera ve Gebze Center'ın iş ortağı sitede yazmıyor.
- Galeri ve anasayfadaki Nevayalı / AND Plaza görselleri arelyapi.net'ten çekilir. Bir görsel açılmazsa yerinde lacivert bir yer tutucu görünür.
