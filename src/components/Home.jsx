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
  Zap
} from 'lucide-react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kullanıcı token'ı varsa giriş yapılmış kabul edelim
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Helmet>
        <title>Kira Takip Sistemi ve Yönetim Platformu | Kiracılarım.com</title>
        <meta 
          name="description" 
          content="Kiracılarım.com ile kira takip süreçlerinizi dijitalleştirin. Otomatik ödeme takibi, anlık bildirimler ve güvenli belge saklama ile modern kira yönetimi." 
        />
        <meta 
          name="keywords" 
          content="kira takip, kira takip sistemi, kiracı yönetimi, kira ödeme takibi, dijital kira yönetimi, kiracılarım" 
        />
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

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl font-extrabold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Kiracılarım.com
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed"
            >
              Kira takibinizi dijitalleştirin, kiracılarınızı yönetin, belgelerinizi güvenle saklayın.
              <br />
              <span className="text-blue-300 font-semibold">Modern kira yönetiminin yeni adresi.</span>
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
                  to="/tenants"
                  className="group px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Kira Sistemine Git
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="group px-8 py-4 text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Giriş Yap
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/register"
                    className="px-8 py-4 text-lg font-semibold rounded-2xl text-blue-300 border-2 border-blue-400 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-blue-300 shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>


      {/* Features Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Neden <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Kiracılarım.com</span>?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Modern teknoloji ile kira yönetiminizi kolaylaştıran özellikler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Otomatik Takip',
                desc: 'Kira ödemelerini otomatik olarak takip edin ve gecikmeleri anında görün.',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-500/20 to-cyan-500/20',
              },
              {
                icon: Zap,
                title: 'Anlık Bildirimler',
                desc: 'Geciken ödemeler ve yaklaşan kira tarihleri için anlık bildirimler alın.',
                gradient: 'from-yellow-500 to-orange-500',
                bgGradient: 'from-yellow-500/20 to-orange-500/20',
              },
              {
                icon: BarChart3,
                title: 'Gelişmiş Raporlama',
                desc: 'Gelir-gider raporlarıyla finansal durumunuzu detaylı görün.',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-500/20 to-emerald-500/20',
              },
              {
                icon: FileText,
                title: 'Güvenli Belge Saklama',
                desc: 'Kira kontratları, faturalar ve diğer belgeleri güvenli şekilde saklayın.',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-500/20 to-pink-500/20',
              },
              {
                icon: Shield,
                title: 'Güvenli Platform',
                desc: 'Verileriniz 256-bit SSL şifreleme ile korunur ve güvenli sunucularda saklanır.',
                gradient: 'from-indigo-500 to-blue-500',
                bgGradient: 'from-indigo-500/20 to-blue-500/20',
              },
              {
                icon: Smartphone,
                title: 'Mobil Uyumlu',
                desc: 'Her cihazdan erişim sağlayın. iOS ve Android uygulamalarımız mevcut.',
                gradient: 'from-rose-500 to-pink-500',
                bgGradient: 'from-rose-500/20 to-pink-500/20',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
                className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-100 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl px-8 py-16 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Uygulamayı Hemen İndirin
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Kiracılarım.com şimdi Google Play'de! App Store versiyonumuz da çok yakında yayında olacak.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.fatalsoft.kiratakip"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                <span className="font-medium">App Store: Yakında</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
  
      </div>
    </div>
          </>
  );
};

export default Home;
