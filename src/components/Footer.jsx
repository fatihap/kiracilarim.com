import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Download,
  Star,
  Shield,
  Award
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Logo ve Açıklama */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Kiracılarım.com
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              Kira takibinizi kolaylaştıran, modern ve güvenilir çözüm. 
              Kiracılarınızı profesyonelce yönetin.
            </p>
          </motion.div>

          {/* Hızlı Linkler */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-3 text-blue-400">Hızlı Linkler</h4>
            <ul className="space-y-2">
              {[
                { name: 'Ana Sayfa', href: '/' },
                { name: 'Kiracılarım', href: '/tenants' },
                { name: 'Profil', href: '/profile' },
                { name: 'İletişim', href: '/contact' }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="transition-all duration-300"
                >
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Özellikler */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-3 text-blue-400">Özellikler</h4>
            <ul className="space-y-2">
              {[
                'Kira Takibi',
                'Ödeme Geçmişi',
                'Dosya Yönetimi',
                'Bildirim Sistemi',
                'Raporlama'
              ].map((feature, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  <Star className="w-3 h-3 text-yellow-400" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* İletişim */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-3 text-blue-400">İletişim</h4>
            <div className="space-y-2">
              <a 
                href="mailto:fatalsoft.inc@gmail.com?subject=Kiracılarım.com - İletişim&body=Merhaba,%0D%0A%0D%0AKiracılarım.com ile ilgili sorularım var.%0D%0A%0D%0AKonu: %0D%0A%0D%0ADetaylar:%0D%0A%0D%0A%0D%0Aİyi günler,%0D%0A"
                className="flex items-center gap-3 text-gray-300 text-sm hover:text-blue-400 transition-colors duration-300 cursor-pointer group"
              >
                <Mail className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <span>fatalsoft.inc@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Gebze-Kocaeli, Türkiye</span>
              </div>
            </div>

        
          </motion.div>
        </div>

        {/* Alt Kısım */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-4 pt-4"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Award className="w-4 h-4" />
              <span>© 2024 Kiracılarım.com. Tüm hakları saklıdır.</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <a href="https://kiracilarim.com/gizlilik-politikasi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Kullanım Şartları
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Çerez Politikası
              </a>
            </div>
          </div>

          {/* Uygulama İndirme */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-3 text-center"
          >
            <p className="text-gray-400 text-sm mb-2">Mobil uygulamayı indirin</p>
            <div className="flex justify-center gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Google Play</span>
              </motion.a>
              <motion.div
                className="flex items-center gap-2 bg-gray-600 px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">App Store</span>
                <span className="text-xs text-gray-400">(Yakında)</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
