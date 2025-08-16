import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kullanıcı token'ı varsa giriş yapılmış kabul edelim
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      
      {/* Üst sağ butonlar */}
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="mt-10 flex justify-center gap-6"
>
  {isLoggedIn ? (
    <Link
      to="/tenants"
      className="px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transform hover:scale-105 transition"
    >
      Kira Sistemine Git
    </Link>
  ) : (
    <>
      <Link
        to="/login"
        className="px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transform hover:scale-105 transition"
      >
        Hemen Başla
      </Link>
      <Link
        to="/register"
        className="px-8 py-4 text-lg font-semibold border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 rounded-xl shadow-md transform hover:scale-105 transition"
      >
        Kayıt Ol
      </Link>
    </>
  )}
</motion.div>


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6"
          >
            Kiracılarım.com
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            Kira takibinizi dijitalleştirin, kiracılarınızı yönetin, belgelerinizi güvenle saklayın.
          </motion.p>
        </div>

      
        {/* Features Section */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-gray-800 text-center mb-16"
        >
          Neden Kiracılarım.com?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              iconBg: 'bg-blue-100',
              iconColor: 'text-blue-600',
              title: 'Otomatik Takip',
              desc: 'Kira ödemelerini otomatik olarak takip edin ve gecikmeleri anında görün.',
              iconPath: 'M9 12l2 2 4-4',
            },
            {
              iconBg: 'bg-green-100',
              iconColor: 'text-green-600',
              title: 'Bildirimler',
              desc: 'Geciken ödemeler ve yaklaşan kira tarihleri için anlık bildirimler alın.',
              iconPath: 'M12 8v4l3 3',
            },
            {
              iconBg: 'bg-yellow-100',
              iconColor: 'text-yellow-600',
              title: 'Raporlama',
              desc: 'Gelir-gider raporlarıyla finansal durumunuzu detaylı görün.',
              iconPath: 'M7 16h6M7 8h6v4H7V8z',
            },
            {
              iconBg: 'bg-purple-100',
              iconColor: 'text-purple-600',
              title: 'Belge Saklama',
              desc: 'Kira kontratları, faturalar ve diğer belgeleri güvenli şekilde saklayın.',
              iconPath: 'M4 4h16v16H4V4z M4 10h16',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center"
            >
              <div className={`${feature.iconBg} p-5 rounded-full inline-block mb-6`}>
                <svg className={`w-10 h-10 ${feature.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.iconPath} />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-md">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
       {/* App Download Section */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.5 }}
  className="mt-32 text-center bg-white shadow-xl rounded-3xl px-8 py-16"
>
  <h2 className="text-4xl font-bold text-gray-900 mb-4">
    Uygulamayı Hemen İndirin
  </h2>
  <p className="text-lg text-gray-600 mb-8">
    Kiracılarım.com şimdi Google Play'de! App Store versiyonumuz da çok yakında yayında olacak.
  </p>
  <div className="flex justify-center items-center gap-6 flex-wrap">
    <a
      href="https://play.google.com/store/apps/details?id=com.fatalsoft.kiratakip"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        alt="Google Play'den indir"
        className="h-16"
      />
    </a>
    <div className="flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed">
      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z" />
      </svg>
      <span>App Store: Yakında</span>
    </div>
  </div>
</motion.div>

      </main>

<footer className="bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
      
      {/* Logo + Açıklama */}
      <div>
        <h2 className="text-2xl font-extrabold text-blue-700 dark:text-white mb-2">Kiracılarım.com</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Kiranızı takip etmenin en akıllı ve pratik yolu. Şeffaf, hızlı ve modern kira yönetimi.
        </p>
      </div>

      {/* Bağlantılar */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Bağlantılar</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li><a href="/login" className="hover:text-blue-600 transition">Giriş Yap</a></li>
          <li><a href="/register" className="hover:text-blue-600 transition">Kayıt Ol</a></li>
        </ul>
      </div>

      {/* İletişim + Sosyal Medya */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">İletişim</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">fatalsoft.inc@gmail.com</p>

        <div className="flex justify-center md:justify-start gap-4 mt-4">
          {/* Sosyal ikon örnekleri, istersen bağlantı da eklersin */}
          <a href="#" className="text-gray-500 hover:text-blue-600 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 4.01a8.94 8.94 0 01-2.6.72 4.52 4.52 0 001.98-2.5 8.86 8.86 0 01-2.83 1.08A4.49 4.49 0 0016.03 3a4.5 4.5 0 00-4.48 4.48c0 .35.04.7.12 1.03A12.8 12.8 0 013 4.65a4.49 4.49 0 001.39 5.98 4.45 4.45 0 01-2.04-.56v.05a4.5 4.5 0 003.6 4.4 4.5 4.5 0 01-2.02.08 4.5 4.5 0 004.2 3.13A9.02 9.02 0 013 19.5a12.76 12.76 0 006.92 2.02c8.3 0 12.84-6.88 12.84-12.84l-.01-.58A9.2 9.2 0 0022 4.01z" />
            </svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.41 2.87 8.15 6.84 9.49.5.09.68-.21.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.32-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0112 6.8a9.49 9.49 0 012.5.34c1.9-1.3 2.74-1.02 2.74-1.02.56 1.37.21 2.38.1 2.63.64.7 1.03 1.6 1.03 2.69 0 3.85-2.35 4.7-4.59 4.95.36.31.68.93.68 1.87v2.77c0 .27.18.58.69.48a10.01 10.01 0 006.83-9.48C21.96 6.49 17.51 2.04 12 2.04z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div className="mt-10 text-sm text-gray-500 dark:text-gray-400 text-center border-t pt-4 border-gray-300 dark:border-gray-600">
      © {new Date().getFullYear()} <strong>Kiracılarım.com</strong> | Tüm hakları saklıdır.
    </div>
  </div>
</footer>


    </div>
    
  );
};

export default Home;
