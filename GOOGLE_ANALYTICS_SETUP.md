# Google Analytics Kurulum Rehberi

Bu dosya, Kiracılarım.com projesine Google Analytics 4 (GA4) entegrasyonunu nasıl yapacağınızı açıklar.

## Adım 1: Google Analytics Hesabı Oluşturma

1. [Google Analytics](https://analytics.google.com/) sitesine gidin
2. Hesabınızla giriş yapın
3. "Ölçüm Başlat" butonuna tıklayın
4. Hesap adı girin (örn: "Kiracılarım.com")
5. Mülk (Property) adı girin (örn: "Kiracılarım.com Web")
6. Zaman dilimi ve para birimi seçin (Türkiye, TRY)
7. İşletme bilgilerini doldurun

## Adım 2: Measurement ID Alma

1. Google Analytics'te **Admin** (Yönetim) sekmesine gidin
2. **Data Streams** (Veri Akışları) bölümüne tıklayın
3. **Web** seçeneğini seçin
4. Web sitesi URL'nizi girin: `https://kiracilarim.com`
5. Stream adı girin: "Kiracılarım.com Web"
6. **Create stream** (Akış Oluştur) butonuna tıklayın
7. **Measurement ID**'yi kopyalayın (Format: `G-XXXXXXXXXX`)

## Adım 3: Projeye Entegrasyon

### Yöntem 1: Environment Variable (Önerilen)

1. Proje kök dizininde `.env` dosyası oluşturun:
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. `index.html` dosyasındaki Google Analytics script'ini güncelleyin:
   - `G-XXXXXXXXXX` yerine kendi Measurement ID'nizi yazın
   - İki yerde değiştirmeniz gerekiyor:
     - `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX">`
     - `gtag('config', 'G-XXXXXXXXXX', ...)`

### Yöntem 2: Direkt Script (Alternatif)

Eğer environment variable kullanmak istemiyorsanız, `index.html` dosyasındaki `G-XXXXXXXXXX` değerlerini doğrudan kendi Measurement ID'nizle değiştirin.

## Adım 4: Test Etme

1. Projeyi çalıştırın: `npm run dev`
2. Tarayıcıda sitenizi açın
3. Google Analytics'te **Realtime** (Gerçek Zamanlı) raporuna gidin
4. Sitede gezinin ve butonlara tıklayın
5. Realtime raporunda aktivitelerinizi görmelisiniz

## Takip Edilen Event'ler

Projede şu event'ler otomatik olarak takip edilir:

- **Sayfa Görüntülemeleri**: Her route değişikliğinde
- **Button Clicks**: CTA butonlarına tıklamalarda
- **Link Clicks**: Dış linklere tıklamalarda

## Custom Event Tracking

İstediğiniz yerde custom event tracking yapabilirsiniz:

```javascript
import { trackEvent, trackButtonClick, trackFormSubmit } from './utils/analytics';

// Custom event
trackEvent('custom_event_name', {
  category: 'user_action',
  value: 100
});

// Button click
trackButtonClick('Button Name', 'page-location');

// Form submit
trackFormSubmit('Contact Form', '/contact');
```

## Önemli Notlar

- **GDPR Uyumluluğu**: Kullanıcılarınıza çerez politikası hakkında bilgi verin
- **Privacy Policy**: Gizlilik politikası sayfanızda Google Analytics kullanımından bahsedin
- **Test Modu**: Geliştirme ortamında test yaparken, gerçek verilerin karışmaması için ayrı bir test property kullanabilirsiniz

## Sorun Giderme

### Analytics çalışmıyor
1. Measurement ID'nin doğru olduğundan emin olun
2. Tarayıcı konsolunda hata olup olmadığını kontrol edin
3. Ad blocker'ları devre dışı bırakın
4. Google Analytics'te Realtime raporunu kontrol edin

### Event'ler görünmüyor
1. Event'lerin gönderildiğini konsolda kontrol edin
2. Google Analytics'te 24-48 saat beklemeniz gerekebilir (Realtime hariç)
3. Debug mode için Google Tag Assistant kullanın

## Daha Fazla Bilgi

- [Google Analytics 4 Dokümantasyonu](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)

