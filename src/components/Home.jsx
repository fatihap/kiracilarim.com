import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { trackButtonClick, trackLinkClick } from '../utils/analytics';
import { 
  ArrowRight, 
  Shield, 
  Clock, 
  BarChart3, 
  FileText, 
  Smartphone,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Zap,
  Briefcase, // Yeni ikonlar
  MessageSquare
} from 'lucide-react';

// Varsayılan uygulama kimliği ve firebase config'i globalden çekin
const appId = typeof __app_id !== 'undefined' ? __app_id : 'kiracilarim-default';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kullanıcı token'ı varsa giriş yapılmış kabul edelim
    // Gerçek bir uygulamada Firebase Auth durumu kontrol edilmelidir.
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Trust/Stat kartları için animasyon varyantları
  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Sitemap'in rolünü üstlenecek Footer link verisi
  const footerLinks = [
    { title: 'Ürün', links: [
      { name: 'Özellikler', path: '/features' },
      { name: 'Fiyatlandırma', path: '/pricing' },
      { name: 'Demo İste', path: '/demo' },
    ]},
    { title: 'Şirket', links: [
      { name: 'Hakkımızda', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Kariyer', path: '/careers' },
    ]},
    { title: 'Yasal', links: [
      { name: 'Gizlilik Politikası', path: '/privacy' },
      { name: 'Kullanım Şartları', path: '/terms' },
      { name: 'Çerez Politikası', path: '/cookies' },
    ]},
    { title: 'Destek', links: [
      { name: 'Yardım Merkezi', path: '/help' },
      { name: 'İletişim', path: '/contact' },
    ]},
  ];

  return (
    <>
      {/* Helmet: SEO ve Sayfa Başlığı Yönetimi */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Kira Takip Sistemi ve Yönetim Platformu | Kiracılarım.com</title>
        <meta 
          name="title" 
          content="Kira Takip Sistemi ve Yönetim Platformu | Kiracılarım.com" 
        />
        <meta 
          name="description" 
          content="Kiracılarım.com ile kira takip süreçlerinizi dijitalleştirin. Otomatik ödeme takibi, anlık bildirimler, güvenli belge saklama ve detaylı finansal raporlama ile modern kira yönetimi. 1500+ mutlu kullanıcı, 5000+ yönetilen sözleşme. Ücretsiz deneyin!" 
        />
        <meta 
          name="keywords" 
          content="kira takip, kira takip sistemi, kiracı yönetimi, kira ödeme takibi, dijital kira yönetimi, kiracılarım, emlak yönetimi, gayrimenkul yazılımı, kira takip uygulaması, kira yönetim yazılımı, otomatik kira takibi, kira bildirim sistemi, belge yönetimi, finansal raporlama" 
        />
        <meta name="author" content="Kiracılarım.com" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="Turkish" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://kiracilarim.com/" />
        
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://play.google.com" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kiracilarim.com/" />
        <meta property="og:title" content="Kira Takip Sistemi ve Yönetim Platformu | Kiracılarım.com" />
        <meta property="og:description" content="Kiracılarım.com ile kira takip süreçlerinizi dijitalleştirin. Otomatik ödeme takibi, anlık bildirimler ve güvenli belge saklama ile modern kira yönetimi. 1500+ mutlu kullanıcı, 5000+ yönetilen sözleşme." />
        <meta property="og:image" content="https://kiracilarim.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kiracılarım.com - Dijital Kira Takip ve Yönetim Sistemi" />
        <meta property="og:site_name" content="Kiracılarım.com" />
        <meta property="og:locale" content="tr_TR" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kiracilarim.com/" />
        <meta name="twitter:title" content="Kira Takip Sistemi ve Yönetim Platformu | Kiracılarım.com" />
        <meta name="twitter:description" content="Kiracılarım.com ile kira takip süreçlerinizi dijitalleştirin. Otomatik ödeme takibi, anlık bildirimler ve güvenli belge saklama ile modern kira yönetimi." />
        <meta name="twitter:image" content="https://kiracilarim.com/twitter-image.jpg" />
        <meta name="twitter:image:alt" content="Kiracılarım.com - Dijital Kira Takip ve Yönetim Sistemi" />
        <meta name="twitter:creator" content="@kiracilarim" />
        <meta name="twitter:site" content="@kiracilarim" />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kiracılarım.com" />
        
        {/* Additional SEO Tags */}
        <meta name="geo.region" content="TR" />
        <meta name="geo.placename" content="Turkey" />
        <meta name="application-name" content="Kiracılarım.com" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        
        {/* Schema.org (JSON-LD) - Multiple Schemas for Rich Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Kiracılarım.com - Kira Takip Sistemi",
              "applicationCategory": "FinanceApplication",
            "operatingSystem": "Android, iOS, Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "TRY",
              "availability": "https://schema.org/InStock"
            },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8", 
              "ratingCount": "125",
              "bestRating": "5",
              "worstRating": "1"
            },
            "description": "Dijital kira takip ve yönetim sistemi. Otomatik ödeme takibi, anlık bildirimler ve güvenli belge saklama.",
            "url": "https://kiracilarim.com",
            "screenshot": "https://kiracilarim.com/screenshot.jpg",
            "softwareVersion": "2.0",
            "releaseNotes": "Modern kira yönetimi için geliştirilmiş özellikler",
            "author": {
              "@type": "Organization",
              "name": "Kiracılarım.com"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Kiracılarım.com",
            "url": "https://kiracilarim.com",
            "logo": "https://kiracilarim.com/logo.png",
            "description": "Gayrimenkul sahipleri ve emlak yöneticileri için kira takibi ve yönetim çözümü",
            "sameAs": [
              "https://www.facebook.com/kiracilarim",
              "https://twitter.com/kiracilarim",
              "https://www.linkedin.com/company/kiracilarim"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "Turkish"
            },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "TR"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kiracılarım.com",
            "url": "https://kiracilarim.com",
            "description": "Dijital kira takip ve yönetim sistemi",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://kiracilarim.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kiracılarım.com"
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Kira Takip ve Yönetim Hizmeti",
            "provider": {
              "@type": "Organization",
              "name": "Kiracılarım.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Turkey"
            },
            "description": "Otomatik kira takibi, ödeme bildirimleri, belge yönetimi ve finansal raporlama hizmetleri",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Kira Yönetim Hizmetleri",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Otomatik Kira Takibi"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Anlık Bildirimler"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Dijital Belge Arşivi"
                  }
                },
                {
                "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Finansal Raporlama"
                  }
                }
              ]
            }
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": "https://kiracilarim.com"
              }
            ]
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Kiracılarım.com nedir ve ne işe yarar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kiracılarım.com, gayrimenkul sahipleri ve emlak yöneticileri için geliştirilmiş dijital bir kira takip ve yönetim sistemidir. Otomatik ödeme takibi, anlık bildirimler, güvenli belge saklama ve detaylı finansal raporlama özellikleri sunar."
                }
              },
              {
                "@type": "Question",
                "name": "Kiracılarım.com ücretsiz mi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, Kiracılarım.com temel özellikleriyle ücretsiz olarak kullanılabilir. Kira takibi, bildirimler ve belge yönetimi gibi temel işlevler tamamen ücretsizdir."
                }
              },
              {
                "@type": "Question",
                "name": "Kira ödemelerini nasıl takip edebilirim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sisteme kiracı bilgilerinizi ve kira sözleşmelerinizi ekledikten sonra, sistem otomatik olarak ödeme tarihlerini takip eder. Geciken ödemeler için anında bildirim alırsınız ve tahsilat sürecinizi kolayca yönetebilirsiniz."
                }
              },
              {
                "@type": "Question",
                "name": "Belgelerim güvende mi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, tüm belgeleriniz 256-bit SSL şifreleme ile korunur. Kira kontratları, faturalar ve diğer önemli belgeler yüksek güvenlikli sunucularda saklanır ve sadece siz erişebilirsiniz."
                }
              },
              {
                "@type": "Question",
                "name": "Mobil uygulama mevcut mu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, Kiracılarım.com mobil uygulaması Google Play Store'da mevcuttur. Android cihazlarınızdan uygulamayı indirerek tüm özelliklere erişebilirsiniz. iOS uygulaması yakında gelecektir."
                }
              },
              {
                "@type": "Question",
                "name": "Birden fazla gayrimenkulü yönetebilir miyim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, Kiracılarım.com ile sınırsız sayıda gayrimenkul ve kiracı yönetebilirsiniz. Tüm kira sözleşmelerinizi tek bir platformdan kolayca yönetebilirsiniz."
                }
              }
            ]
          })}
        </script>
      </Helmet>

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden pt-20 font-inter">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* H1: En önemli başlık, anahtar kelimeleri içeriyor */}
            <h1 
              id="hero-heading"
              className="text-6xl md:text-7xl font-extrabold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Kiracılarım.com: Dijital Kira Takip ve Yönetim Sistemi
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Kira takibinizi dijitalleştirin, kiracılarınızı yönetin, belgelerinizi güvenle saklayın.
              <br />
              <strong className="text-blue-300 font-semibold">Modern kira yönetiminin yeni adresi.</strong>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  onClick={() => trackButtonClick('Yönetim Paneline Git', 'home-hero')}
                  className="group px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Yönetim Paneline Git
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => trackButtonClick('Hemen Başla (Giriş Yap)', 'home-hero')}
                    className="group px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Hemen Başla (Giriş Yap)
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => trackButtonClick('Ücretsiz Kayıt Ol', 'home-hero')}
                    className="px-8 py-4 text-lg font-semibold rounded-2xl text-blue-300 border-2 border-blue-400 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-blue-300 shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Ücretsiz Kayıt Ol
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust/Statistics Section (E-E-A-T için önemli) */}
      <section className="relative z-10 py-12" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">İstatistikler ve Başarı Rakamları</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '1500+', label: 'Mutlu Kullanıcı', ariaLabel: 'Bin beş yüz artı mutlu kullanıcı sayısı' },
              { icon: Briefcase, value: '5000+', label: 'Yönetilen Sözleşme', ariaLabel: 'Beş bin artı yönetilen sözleşme sayısı' },
              { icon: TrendingUp, value: '99%', label: 'Başarılı Tahsilat Oranı', ariaLabel: 'Yüzde doksan dokuz başarılı tahsilat oranı' },
              { icon: MessageSquare, value: '4.8/5', label: 'Kullanıcı Puanı', ariaLabel: 'Dört virgül sekiz bölü beş kullanıcı puanı' }
            ].map((stat, index) => (
              <motion.article
                key={index}
                variants={statCardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index }}
                className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                aria-label={stat.ariaLabel}
              >
                <stat.icon className="w-8 h-8 mx-auto text-blue-400 mb-2" aria-hidden="true" />
                <p className="text-3xl font-extrabold text-white" aria-label={`${stat.value} ${stat.label}`}>{stat.value}</p>
                <p className="text-sm text-blue-200 uppercase tracking-widest">{stat.label}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="relative z-10 py-20" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* H2: Ana özellikler başlığı, anahtar kelimeler içeriyor */}
            <h2 id="features-heading" className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Neden <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Kiracılarım.com</span>'u Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Modern teknoloji ile kira yönetiminizi kolaylaştıran 6 temel özellik.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Otomatik Kira Takibi', // Anahtar kelimeyi güçlendirdik
                desc: 'Kira ödemelerini otomatik olarak takip edin, gecikmeleri anında görün ve tahsilat sürecinizi hızlandırın.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Zap,
                title: 'Anlık ve Hatırlatıcı Bildirimler', // Anahtar kelimeyi güçlendirdik
                desc: 'Geciken ödemeler ve yaklaşan kira tarihleri için kiracılara otomatik bildirimler gönderin.',
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                icon: BarChart3,
                title: 'Detaylı Finansal Raporlama',
                desc: 'Gelir-gider tabloları, yıllık enflasyon artış hesaplamaları ile finansal durumunuzu detaylı yönetin.',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: FileText,
                title: 'Dijital Belge Arşivi',
                desc: 'Kira kontratları, faturalar ve diğer önemli belgeleri yüksek güvenlikli sunucularda saklayın.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: Shield,
                title: 'Yüksek Veri Güvenliği',
                desc: 'Tüm verileriniz 256-bit SSL şifreleme ile korunur. Kiracı ve mal sahibi bilgileri güvendedir.',
                gradient: 'from-indigo-500 to-blue-500',
              },
              {
                icon: Smartphone,
                title: 'Tüm Cihazlarda Kullanım',
                desc: 'Tamamen mobil uyumlu arayüz sayesinde masaüstü, tablet ve telefondan kolayca yönetin.',
                gradient: 'from-rose-500 to-pink-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
                className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                role="article" // Her özellik kartı için semantik rol
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`} aria-hidden="true">
                  <feature.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="relative z-10 py-20" aria-labelledby="download-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl px-8 py-16 shadow-2xl"
          >
            {/* H2: İndirme başlığı */}
            <h2 id="download-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
              Uygulamayı Hemen İndirin
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Kiracılarım.com'un tüm özelliklerine mobil cihazınızdan erişin. Google Play'deyiz! App Store yakında...
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.fatalsoft.kiratakip"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkClick('https://play.google.com/store/apps/details?id=com.fatalsoft.kiratakip', 'Google Play Download')}
                className="group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Google Play'den Kiracılarım uygulamasını indir"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Kiracılarım.com uygulamasını Google Play Store'dan indirin"
                  width="180"
                  height="70"
                  className="h-16 group-hover:brightness-110 transition-all duration-300"
                  loading="lazy"
                />
              </motion.a>
              <motion.div 
                className="flex items-center gap-3 border border-white/30 px-6 py-4 rounded-2xl bg-white/10 text-white/70 cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                aria-label="App Store indirme bağlantısı yakında gelecek"
              >
                <svg className="w-6 h-6 text-white/50" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z" />
                </svg>
                <span className="font-medium">App Store: Çok Yakında</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - SEO için önemli */}
      <section className="relative z-10 py-20" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-xl text-blue-100">
              Kiracılarım.com hakkında merak ettikleriniz
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "Kiracılarım.com nedir ve ne işe yarar?",
                answer: "Kiracılarım.com, gayrimenkul sahipleri ve emlak yöneticileri için geliştirilmiş dijital bir kira takip ve yönetim sistemidir. Otomatik ödeme takibi, anlık bildirimler, güvenli belge saklama ve detaylı finansal raporlama özellikleri sunar."
              },
              {
                question: "Kiracılarım.com ücretsiz mi?",
                answer: "Evet, Kiracılarım.com temel özellikleriyle ücretsiz olarak kullanılabilir. Kira takibi, bildirimler ve belge yönetimi gibi temel işlevler tamamen ücretsizdir."
              },
              {
                question: "Kira ödemelerini nasıl takip edebilirim?",
                answer: "Sisteme kiracı bilgilerinizi ve kira sözleşmelerinizi ekledikten sonra, sistem otomatik olarak ödeme tarihlerini takip eder. Geciken ödemeler için anında bildirim alırsınız ve tahsilat sürecinizi kolayca yönetebilirsiniz."
              },
              {
                question: "Belgelerim güvende mi?",
                answer: "Evet, tüm belgeleriniz 256-bit SSL şifreleme ile korunur. Kira kontratları, faturalar ve diğer önemli belgeler yüksek güvenlikli sunucularda saklanır ve sadece siz erişebilirsiniz."
              },
              {
                question: "Mobil uygulama mevcut mu?",
                answer: "Evet, Kiracılarım.com mobil uygulaması Google Play Store'da mevcuttur. Android cihazlarınızdan uygulamayı indirerek tüm özelliklere erişebilirsiniz. iOS uygulaması yakında gelecektir."
              },
              {
                question: "Birden fazla gayrimenkulü yönetebilir miyim?",
                answer: "Evet, Kiracılarım.com ile sınırsız sayıda gayrimenkul ve kiracı yönetebilirsiniz. Tüm kira sözleşmelerinizi tek bir platformdan kolayca yönetebilirsiniz."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-blue-100 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   
   
          

    </div>
  </>
  );
};

export default Home;
