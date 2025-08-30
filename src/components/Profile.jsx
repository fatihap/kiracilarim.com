import React, { useEffect, useState } from "react";
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800">
        <p className="p-6 bg-white rounded-lg shadow-md">Kullanıcı bilgisi bulunamadı.</p>
      </div>
    );
  }

  const activeTenants = tenants.filter((t) => t.is_archived !== 1);
  const tenantCount = activeTenants.length;
  const monthlyIncome = activeTenants.reduce(
    (sum, t) => sum + (t.rent_amount || 0),
    0
  );
  const yearlyIncome = monthlyIncome * 12;

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
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 sm:p-8 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-20 mb-4 text-center">
          Profiliniz
        </h1>
        <p className="text-center text-gray-500 mb-12 text-lg font-light tracking-wide">
          Hesap ve abonelik bilgilerinizi kolayca görüntüleyin.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kullanıcı Bilgileri Kartı */}
          <div className="lg:col-span-1 p-8 rounded-3xl bg-white shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <User className="w-10 h-10 text-blue-500 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Hesap</h2>
            </div>
            <ul className="space-y-4 text-gray-600">
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-500">Ad Soyad</span>
                <span className="font-semibold text-gray-900">{user.name} {user.surname}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-500">Telefon</span>
                <span>{user.phone || "Bilgi Yok"}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-500">Email</span>
                <span>{user.email}</span>
              </li>
              <li className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="font-medium text-gray-500">Premium</span>
                {user.is_premium ? (
                  <span className="flex items-center font-bold text-green-600">
                    <CheckCircle className="w-5 h-5 mr-1" /> Aktif
                  </span>
                ) : (
                  <span className="flex items-center font-bold text-red-500">
                    <XCircle className="w-5 h-5 mr-1" /> Aktif Değil
                  </span>
                )}
              </li>
            </ul>
          </div>

          {/* Abonelik Planı Kartı */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-white shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <CreditCard className="w-10 h-10 text-purple-500 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Abonelik</h2>
            </div>
            {subscription?.current_plan ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Plan Adı</span>
                    <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
                      {subscription.current_plan.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Süre</span>
                    <span>{subscription.current_plan.duration_formatted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Fiyat</span>
                    <span className="text-green-600 font-bold text-2xl">{subscription.current_plan.price}₺</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Plan Özellikleri</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {featureList.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-2">
                          {feature.available ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${feature.available ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                            {feature.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Plan bilgisi bulunamadı.</p>
            )}
          </div>

          {/* İstatistikler Kartı */}
          <div className="lg:col-span-3 p-8 rounded-3xl bg-white shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
            <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
              <TrendingUp className="w-10 h-10 text-blue-500 mr-4" />
              <h2 className="text-2xl font-bold text-gray-800">Genel İstatistikler</h2>
            </div>
            {loading ? (
              <p className="text-gray-500 text-center py-4">Yükleniyor...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div className="p-6 rounded-2xl bg-gray-100 transform hover:scale-105 transition-all duration-300">
                  <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <p className="text-4xl font-extrabold text-gray-900">{tenantCount}</p>
                  <p className="text-gray-500 mt-1">Aktif Kiracı</p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-100 transform hover:scale-105 transition-all duration-300">
                  <Wallet className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <p className="text-4xl font-extrabold text-gray-900">{monthlyIncome.toLocaleString("tr-TR")}₺</p>
                  <p className="text-gray-500 mt-1">Aylık Gelir</p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-100 transform hover:scale-105 transition-all duration-300">
                  <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <p className="text-4xl font-extrabold text-gray-900">{yearlyIncome.toLocaleString("tr-TR")}₺</p>
                  <p className="text-gray-500 mt-1">Yıllık Gelir</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;