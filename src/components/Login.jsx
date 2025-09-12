import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  UserPlus,
  Building2,
  Shield,
  CheckCircle,
  AlertCircle,
  Crown,
  X,
  Star,
  CreditCard,
  Zap
} from 'lucide-react';

const Login = ({ onLogin, setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  // Sayfa açıldığında localStorage kontrolü
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      onLogin(true);
      navigate('/tenants'); // Token varsa otomatik yönlendir
    }
  }, [navigate, onLogin, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://kiracilarim.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Giriş başarısız');

      // Premium kontrolü - sadece pro planı (id: 7) web erişimine sahip
      if (data.user.subscription_plan && data.user.subscription_plan.id === 5) {
        // Free kullanıcı - upgrade modal göster
        setShowUpgradeModal(true);
        setIsLoading(false);
        return;
      }

      // Token ve kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      onLogin(true);
      setUser(data.user);

      navigate('/tenants');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 py-16 relative overflow-hidden pt-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Kiracılarım.com
            </h1>
            <p className="text-blue-100 text-sm">Kiranı kolayca takip et</p>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl font-bold text-center text-white mb-6"
          >
            Giriş Yap
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-sm text-blue-100 mb-8"
          >
          Hesabınız yok mu?{' '}
            <Link to="/register" className="font-semibold text-blue-300 hover:text-white transition-colors duration-300 flex items-center justify-center gap-1">
              <UserPlus className="w-4 h-4" />
            Hemen kayıt olun
          </Link>
          </motion.p>

        {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
            </motion.div>
          )}

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 group-focus-within:text-blue-400 transition-colors duration-300" />
            <input
              id="email"
              name="email"
              type="email"
              required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder="E-posta adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 group-focus-within:text-blue-400 transition-colors duration-300" />
            <input
              id="password"
              name="password"
              type={passwordShown ? "text" : "password"}
              required
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
                <button
                  type="button"
              onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-colors duration-300"
                >
                  {passwordShown ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
          </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 space-y-3"
          >
            <div className="flex items-center gap-3 text-blue-100 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span>Güvenli giriş</span>
            </div>
            <div className="flex items-center gap-3 text-blue-100 text-sm">
              <Shield className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span>Verileriniz korunur</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2 sm:p-4"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white/95 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Premium Gerekli
              </h2>
              <p className="text-sm text-gray-600">
                Web sürümüne erişmek için Premium üyelik gereklidir. 
                <br />
                <span className="text-xs text-blue-600 font-medium">Satın alımı mobil uygulamanızdan yapabilirsiniz.</span>
              </p>
            </div>

            {/* Current Plan Info */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-red-800 text-sm">Mevcut Plan: Ücretsiz</p>
                  <p className="text-xs text-red-600">Sadece 2 kiracı, 5 dosya limiti</p>
                </div>
              </div>
            </div>

            {/* Available Plans */}
            <div className="space-y-2 mb-4">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Mevcut Planlar</h3>
              
              {/* Pro-Aylık Plan */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => {
                  // Uygulama içi satın alma
                  window.location.href = 'kiracilarim://premium?plan=pro-aylik';
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Pro-Aylık</p>
                      <p className="text-xs text-gray-600">25 kiracı, 20 dosya</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">₺39,99</p>
                    <p className="text-xs text-gray-600">/ay</p>
                  </div>
                </div>
                <div className="mt-1 text-center">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Uygulamada Satın Al</span>
                </div>
              </motion.div>

              {/* Premium-Aylık Plan */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => {
                  // Uygulama içi satın alma
                  window.location.href = 'kiracilarim://premium?plan=premium-aylik';
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Premium-Aylık</p>
                      <p className="text-xs text-gray-600">5 kiracı, sınırsız dosya</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">₺25,00</p>
                    <p className="text-xs text-gray-600">/ay</p>
                  </div>
                </div>
                <div className="mt-1 text-center">
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Uygulamada Satın Al</span>
                </div>
              </motion.div>

              {/* Premium Yıllık Plan */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => {
                  // Uygulama içi satın alma
                  window.location.href = 'kiracilarim://premium?plan=premium-yillik';
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Premium Yıllık</p>
                      <p className="text-xs text-gray-600">5 kiracı, sınırsız dosya</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">₺200,00</p>
                    <p className="text-xs text-gray-600">/yıl</p>
                  </div>
                </div>
                <div className="mt-1 text-center">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Uygulamada Satın Al</span>
                </div>
              </motion.div>

              {/* Pro Plan Yıllık - En Popüler */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-3 hover:shadow-lg transition-all duration-300 relative cursor-pointer"
                onClick={() => {
                  // Uygulama içi satın alma
                  window.location.href = 'kiracilarim://premium?plan=pro-plan-yillik';
                }}
              >
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">EN POPÜLER</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Pro Plan Yıllık</p>
                      <p className="text-xs text-gray-600">Sınırsız kiracı ve dosya</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-600">₺399,99</p>
                    <p className="text-xs text-gray-600">/yıl</p>
                  </div>
                </div>
                <div className="mt-1 text-center">
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Uygulamada Satın Al</span>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                onClick={() => {
                  // En popüler plana uygulama içi yönlendirme
                  window.location.href = 'kiracilarim://premium?plan=pro-plan-yillik';
                }}
              >
                <Crown className="w-4 h-4" />
                Pro Plan Yıllık Seç (₺399,99)
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                onClick={() => {
                  // Uygulama içi premium sayfasına yönlendirme
                  window.location.href = 'kiracilarim://premium';
                }}
              >
                <CreditCard className="w-4 h-4" />
                Uygulamada Tüm Planları Gör
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUpgradeModal(false)}
                className="w-full bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 text-sm"
              >
                Daha Sonra
              </motion.button>
      </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Login;
