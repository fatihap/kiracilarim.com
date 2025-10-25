import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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
        <title>Kira Takip Sistemi ve Yönetim Platformu | Kiracılarım.com</title>
        <meta 
          name="description" 
          content="Kiracılarım.com ile kira takip süreçlerinizi dijitalleştirin. Otomatik ödeme takibi, anlık bildirimler ve güvenli belge saklama ile modern kira yönetimi." 
        />
        <meta 
          name="keywords" 
          content="kira takip, kira takip sistemi, kiracı yönetimi, kira ödeme takibi, dijital kira yönetimi, kiracılarım, emlak yönetimi, gayrimenkul yazılımı" 
        />
        {/* Canonical Link: Bu sayfanın orijinal kaynağını belirtir */}
        <link rel="canonical" href="https://kiracilarim.com/" />
        
        {/* Schema.org (JSON-LD) verisi - SoftwareApplication güncel ve uygun */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Kiracılarım.com - Kira Takip Sistemi",
              "operatingSystem": "Android, IOS, Web",
              "applicationCategory": "FinanceApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8", 
                "ratingCount": "125"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY"
              }
            }
          `}
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
                  className="group px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Yönetim Paneline Git
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="group px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Hemen Başla (Giriş Yap)
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/register"
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
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '1500+', label: 'Mutlu Kullanıcı' },
              { icon: Briefcase, value: '5000+', label: 'Yönetilen Sözleşme' },
              { icon: TrendingUp, value: '99%', label: 'Başarılı Tahsilat Oranı' },
              { icon: MessageSquare, value: '4.8/5', label: 'Kullanıcı Puanı' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statCardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * index }}
                className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <stat.icon className="w-8 h-8 mx-auto text-blue-400 mb-2" />
                <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                <p className="text-sm text-blue-200 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
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
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
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
                className="group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Google Play'den Kiracılarım uygulamasını indir"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play'den indir"
                  className="h-16 group-hover:brightness-110 transition-all duration-300"
                />
              </motion.a>
              <motion.div 
                className="flex items-center gap-3 border border-white/30 px-6 py-4 rounded-2xl bg-white/10 text-white/70 cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
              >
                <svg className="w-6 h-6 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z" />
                </svg>
                <span className="font-medium">App Store: Çok Yakında</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer / Sitemap Section (Site hiyerarşisi için önemli) */}
      <footer className="relative z-10 bg-slate-900/50 border-t border-white/10 py-12" aria-labelledby="footer-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="footer-heading" className="sr-only">Site Navigasyonu</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            {/* Logo ve Kısa Açıklama */}
            <div className="col-span-2 lg:col-span-1">
              <Link to="/" className="text-2xl font-extrabold text-white">
                Kiracılarım<span className="text-blue-400">.com</span>
              </Link>
              <p className="mt-4 text-sm text-blue-200">
                Gayrimenkul sahipleri ve emlak yöneticileri için kira takibi ve yönetim çözümü.
              </p>
            </div>
            
            {/* Link Grupları (Footer Sitemap Rolü) */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-base font-semibold text-white tracking-wider uppercase">{section.title}</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="text-sm text-blue-200 hover:text-blue-400 transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-blue-300">
              &copy; {new Date().getFullYear()} Kiracılarım.com. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-blue-400 mt-2 md:mt-0">
                Uygulama ID: {appId}
            </p>
          </div>
        </div>
      </footer>
    </div>
  </>
  );
};

export default Home;
