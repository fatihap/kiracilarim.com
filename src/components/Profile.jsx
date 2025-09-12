import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  CreditCard,
  TrendingUp,
  CheckCircle,
  XCircle,
  Users,
  Wallet,
  Calendar,
  FileText,
  Bell,
  ShieldCheck,
  Download,
  Database,
  Star,
  Award,
  BarChart3,
  Settings,
  Edit,
  Mail,
  Phone,
  MapPin,
  Crown,
  Zap,
  Activity
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const token = localStorage.getItem("token");

    const fetchTenants = async () => {
      try {
        const response = await fetch("https://kiracilarim.com/api/tenant?page=1", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) setTenants(data.payload || []);
      } catch (err) {
        console.error("Kiracılar alınamadı", err);
      }
    };

    const fetchSubscription = async () => {
      try {
        const response = await fetch("https://kiracilarim.com/api/subscription/current", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setSubscription(data);
        } 
      } catch (err) {
        console.error("Abonelik bilgisi alınamadı", err);
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
    fetchSubscription();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center shadow-2xl"
        >
          <User className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <p className="text-white text-lg">Kullanıcı bilgisi bulunamadı.</p>
        </motion.div>
      </div>
    );
  }

  const activeTenants = tenants.filter((t) => t.is_archived !== 1);
  const archivedTenants = tenants.filter((t) => t.is_archived === 1);
  const tenantCount = activeTenants.length;
  const totalTenantCount = tenants.length;
  const monthlyIncome = activeTenants.reduce(
    (sum, t) => sum + (t.rent_amount || 0),
    0
  );
  const yearlyIncome = monthlyIncome * 12;
  
  // Ödeme istatistikleri
  const totalPayments = activeTenants.reduce((sum, tenant) => {
    return sum + (tenant.payments?.length || 0);
  }, 0);
  
  const paidPayments = activeTenants.reduce((sum, tenant) => {
    return sum + (tenant.payments?.filter(p => p.is_paid === 1).length || 0);
  }, 0);
  
  const paymentRate = totalPayments > 0 ? Math.round((paidPayments / totalPayments) * 100) : 0;
  
  // Ortalama kira
  const averageRent = activeTenants.length > 0 ? Math.round(monthlyIncome / activeTenants.length) : 0;
  
  // En yüksek kira
  const maxRent = activeTenants.length > 0 ? Math.max(...activeTenants.map(t => t.rent_amount || 0)) : 0;
  
  // En düşük kira
  const minRent = activeTenants.length > 0 ? Math.min(...activeTenants.map(t => t.rent_amount || 0)) : 0;

  const features = subscription?.current_plan?.features || {};
  const featureList = [
    { name: "Sınırsız Kiracı", icon: Users, available: features.unlimited_tenants },
    { name: "Sınırsız Dosya", icon: FileText, available: features.unlimited_files },
    { name: "Bildirim Sistemi", icon: Bell, available: features.notification_system },
    { name: "Gelişmiş Raporlama", icon: TrendingUp, available: features.advanced_reporting },
    { name: "Öncelikli Destek", icon: ShieldCheck, available: features.priority_support },
    { name: "Veri Yedekleme", icon: Database, available: features.data_backup },
    { name: "Veri Dışa Aktarma", icon: Download, available: features.data_export },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 sm:p-8 lg:p-12 font-sans pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Profiliniz
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hesap ve abonelik bilgilerinizi kolayca görüntüleyin
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Kullanıcı Bilgileri Kartı */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Hesap Bilgileri</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Ad Soyad</p>
                  <p className="font-semibold text-gray-900">{user.name} {user.surname}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Telefon</p>
                  <p className="font-semibold text-gray-900">{user.phone || "Bilgi Yok"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  {user.is_premium ? <Crown className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Premium Durumu</p>
                  <div className="flex items-center gap-2">
                    {user.is_premium ? (
                      <span className="flex items-center font-bold text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" /> Aktif
                      </span>
                    ) : (
                      <span className="flex items-center font-bold text-red-500">
                        <XCircle className="w-4 h-4 mr-1" /> Aktif Değil
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Genişletilmiş İstatistikler Kartı */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Genel İstatistikler</h2>
            </div>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 text-lg">İstatistikler yükleniyor...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Aktif Kiracılar */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 mb-2">{tenantCount}</p>
                  <p className="text-gray-600 font-medium">Aktif Kiracı</p>
                  <p className="text-sm text-gray-500 mt-1">Toplam: {totalTenantCount}</p>
                </motion.div>

                {/* Aylık Gelir */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 mb-2">{monthlyIncome.toLocaleString("tr-TR")}₺</p>
                  <p className="text-gray-600 font-medium">Aylık Gelir</p>
                  <p className="text-sm text-gray-500 mt-1">Ortalama: {averageRent.toLocaleString("tr-TR")}₺</p>
                </motion.div>

                {/* Yıllık Gelir */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 mb-2">{yearlyIncome.toLocaleString("tr-TR")}₺</p>
                  <p className="text-gray-600 font-medium">Yıllık Gelir</p>
                  <p className="text-sm text-gray-500 mt-1">Tahmini gelir</p>
                </motion.div>

                {/* Ödeme Oranı */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <CheckCircle className="w-5 h-5 text-orange-400" />
                  </div>
                  <p className="text-3xl font-extrabold text-gray-900 mb-2">%{paymentRate}</p>
                  <p className="text-gray-600 font-medium">Ödeme Oranı</p>
                  <p className="text-sm text-gray-500 mt-1">{paidPayments}/{totalPayments} ödendi</p>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Kira İstatistikleri */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Kira Analizi</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900 mb-2">{maxRent.toLocaleString("tr-TR")}₺</p>
                <p className="text-gray-600 font-medium">En Yüksek Kira</p>
                <p className="text-sm text-gray-500 mt-1">Maksimum kira tutarı</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900 mb-2">{averageRent.toLocaleString("tr-TR")}₺</p>
                <p className="text-gray-600 font-medium">Ortalama Kira</p>
                <p className="text-sm text-gray-500 mt-1">Kiracı başına ortalama</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900 mb-2">{minRent.toLocaleString("tr-TR")}₺</p>
                <p className="text-gray-600 font-medium">En Düşük Kira</p>
                <p className="text-sm text-gray-500 mt-1">Minimum kira tutarı</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Abonelik Planı Kartı - En Alta Taşındı */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Abonelik Planı</h2>
            </div>
            {subscription?.current_plan ? (
              <div className="space-y-6">
                {/* Plan Info */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Plan Adı</p>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        {subscription.current_plan.name}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Süre</p>
                      <p className="font-semibold text-gray-800">{subscription.current_plan.duration_formatted}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Fiyat</p>
                      <p className="text-green-600 font-bold text-2xl">{subscription.current_plan.price}₺</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Plan Özellikleri
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featureList.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                            feature.available 
                              ? 'bg-green-50 border border-green-200' 
                              : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            feature.available ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-4 h-4 ${
                              feature.available ? 'text-green-600' : 'text-gray-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <span className={`text-sm font-medium ${
                              feature.available ? 'text-gray-700' : 'text-gray-400 line-through'
                            }`}>
                              {feature.name}
                            </span>
                          </div>
                          {feature.available ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Plan bilgisi bulunamadı.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;