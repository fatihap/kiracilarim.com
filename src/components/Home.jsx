import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Kiracılarım.com
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Modern ve kullanımı kolay bir platform ile kira takibinizi yönetin. 
            Mülkleriniz, kiracılarınız ve ödemeleriniz hakkında her şeyi tek bir yerden takip edin.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-6"
          >
            <Link
              to="/login"
              className="inline-flex items-center px-10 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
            >
              Hemen Başla
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-10 py-4 border-2 border-blue-600 text-base font-medium rounded-xl text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
            >
              Kayıt Ol
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-gray-900 text-center mb-16"
          >
            Neden Kiracılarım.com?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-10 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-blue-100 p-6 rounded-full mx-auto mb-8">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Otomatik Takip</h3>
              <p className="text-gray-600 text-lg">
                Kira ödemelerini otomatik takip edin ve gecikmeleri anında tespit edin.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-10 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-green-100 p-6 rounded-full mx-auto mb-8">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Bildirimler</h3>
              <p className="text-gray-600 text-lg">
                Ödeme hatırlatıcıları ve gecikme bildirimleri ile zamanınızı daha iyi yönetin.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-10 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-yellow-100 p-6 rounded-full mx-auto mb-8">
                <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Raporlama</h3>
              <p className="text-gray-600 text-lg">
                Detaylı raporlar ile kira gelirlerinizi ve giderlerinizi kolayca takip edin.
              </p>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Hemen Başlayın!
          </h2>
          <p className="text-xl text-gray-200 mb-12">
            30 günlük ücretsiz deneme süreniz var. Her şeyi deneyin!
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/register"
              className="inline-flex items-center px-12 py-5 border border-white text-base font-medium rounded-xl text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300 transform hover:scale-105"
            >
              Ücretsiz Deneyin
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-12 py-5 border-2 border-white text-base font-medium rounded-xl text-white hover:bg-white hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300 transform hover:scale-105"
            >
              Hesabım Var
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
