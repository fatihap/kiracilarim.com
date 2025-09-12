import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  ShoppingCart, 
  HelpCircle, 
  Lightbulb, 
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  MessageCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Kullanıcı bilgilerini yükle
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFormData(prev => ({
        ...prev,
        name: `${userData.name} ${userData.surname}`,
        email: userData.email
      }));
    }
  }, []);

  const categories = [
    { value: 'purchase', label: 'Satın Alma', icon: ShoppingCart, color: 'blue' },
    { value: 'trial', label: 'Deneme', icon: HelpCircle, color: 'green' },
    { value: 'support', label: 'Destek', icon: MessageSquare, color: 'purple' },
    { value: 'suggestion', label: 'Öneri', icon: Lightbulb, color: 'orange' },
    { value: 'other', label: 'Diğer', icon: MessageCircle, color: 'gray' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.category || !formData.message) {
      toast.error('Lütfen tüm alanları doldurun');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Geçerli bir email adresi girin');
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // API'ye mesaj gönder
      const response = await fetch('https://kiracilarim.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          category: formData.category,
          message: formData.message,
          user_id: user?.user_id || null
        })
      });

      if (!response.ok) {
        throw new Error('Mesaj gönderilemedi');
      }

      const result = await response.json();
      
      toast.success('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
      
      // Sadece subject, category ve message'ı temizle, name ve email'i koru
      setFormData(prev => ({
        ...prev,
        subject: '',
        category: '',
        message: ''
      }));
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : MessageCircle;
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            İletişim
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* İletişim Bilgileri */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* İletişim Kartları */}
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                İletişim Bilgileri
              </h3>
              
              <div className="space-y-4">
                <a 
                  href="mailto:fatalsoft.inc@gmail.com?subject=Kiracılarım.com - İletişim&body=Merhaba,%0D%0A%0D%0AKiracılarım.com ile ilgili sorularım var.%0D%0A%0D%0AKonu: %0D%0A%0D%0ADetaylar:%0D%0A%0D%0A%0D%0Aİyi günler,%0D%0A"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors duration-300 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">fatalsoft.inc@gmail.com</p>
                    <p className="text-xs text-blue-500 mt-1">Tıklayarak email gönder</p>
                  </div>
                </a>


                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Adres</p>
                    <p className="font-semibold text-gray-800">Gebze, Kocaeli, Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Çalışma Saatleri */}
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                Çalışma Saatleri
              </h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex justify-between">
                  <span>Email Desteği</span>
                  <span className="font-semibold text-green-600">7/24</span>
                </p>
                <p className="flex justify-between">
                  <span>Yanıt Süresi</span>
                  <span className="font-semibold">24 saat içinde</span>
                </p>
                <p className="flex justify-between">
                  <span>Durum</span>
                  <span className="font-semibold text-green-600">Aktif</span>
                </p>
              </div>
            </div>

            {/* Hızlı Yanıt */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-gray-800">7/24 Email Desteği</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Her zaman email gönderebilirsiniz. 24 saat içinde size dönüş yapıyoruz.
              </p>
            </div>
          </motion.div>

          {/* İletişim Formu */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Mesaj Gönder</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Ad Soyad */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ad Soyad *
                    {user && <span className="text-xs text-green-600 ml-2"></span>}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                        user ? 'border-green-300 bg-green-50' : 'border-gray-300'
                      }`}
                      placeholder="Adınızı ve soyadınızı girin"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                    {user && <span className="text-xs text-green-600 ml-2"></span>}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 ${
                        user ? 'border-green-300 bg-green-50' : 'border-gray-300'
                      }`}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Konu */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Konu *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    placeholder="Mesajınızın konusunu yazın"
                    required
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <motion.button
                          key={category.value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                            formData.category === category.value
                              ? `bg-${category.color}-50 border-${category.color}-300 text-${category.color}-700`
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium text-sm">{category.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Mesaj */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Mesajınızı detaylı bir şekilde yazın..."
                    required
                  />
                </div>

                {/* Gönder Butonu */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Mesajı Gönder
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Alt Bilgi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/60 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Neden Kiracılarım.com?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 font-medium">7/24 Destek</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 font-medium">Güvenli Platform</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 font-medium">Hızlı Çözüm</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
