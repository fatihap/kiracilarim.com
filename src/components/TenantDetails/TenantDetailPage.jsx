import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  CreditCard, 
  FileText, 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Building2, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign,
  AlertTriangle,
  X,
  MoreVertical,
  Settings
} from 'lucide-react';

import TenantInfoPage from './components/TenantInfoPage';
import TenantPaymentsPage from './components/TenantPaymentsPage';
import TenantDocsPage from './components/TenantDocsPage';

const TenantDetailPage = () => {
  const { state } = useLocation();
  const tenant = state?.tenant;
  const navigate = useNavigate();

  const [payments, setPayments] = useState(tenant?.payments || []);
  const [activeTab, setActiveTab] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center shadow-2xl"
        >
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg">Kiracı bilgisi bulunamadı.</p>
        </motion.div>
      </div>
    );
  }

  const handleEditTenant = () => {
    navigate('/kiraci-duzenle', { state: { tenant } });
  };

  const confirmDeleteTenant = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://kiracilarim.com/api/tenant/${tenant.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Kiracı başarıyla silindi.");
        navigate("/tenants");
      } else {
        toast.error("Kiracı silinemedi!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Bir hata oluştu.");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const tabs = [
    { id: 0, name: 'Bilgiler', icon: User, color: 'blue' },
    { id: 1, name: 'Ödemeler', icon: CreditCard, color: 'green' },
    { id: 2, name: 'Belgeler', icon: FileText, color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4 relative overflow-hidden pt-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl text-gray-700 hover:bg-white/90 transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Geri Dön
            </motion.button>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeleteDialog(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
                Sil
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditTenant}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-lg"
              >
                <Edit className="w-4 h-4" />
                Düzenle
              </motion.button>
            </div>
          </div>

          {/* Tenant Info Card */}
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {tenant.tenant_name} {tenant.tenant_surname}
                </h1>
                <p className="text-gray-600 text-lg">Kiracı Detayları</p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Telefon</p>
                  <p className="font-semibold text-gray-800">{tenant.phone || 'Belirtilmemiş'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Kira</p>
                  <p className="font-semibold text-gray-800">{tenant.rent_amount?.toLocaleString('tr-TR')} ₺</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Süre</p>
                  <p className="font-semibold text-gray-800">{tenant.contract_duration || 12} ay</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Adres</p>
                  <p className="font-semibold text-gray-800 truncate">{tenant.tenant_address || 'Belirtilmemiş'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl"
        >
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 text-white shadow-lg`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 0 && <TenantInfoPage tenant={tenant} />}
              {activeTab === 1 && <TenantPaymentsPage tenant={tenant} payments={payments} setPayments={setPayments} />}
              {activeTab === 2 && <TenantDocsPage tenant={tenant} />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Delete Dialog */}
      <AnimatePresence>
        {showDeleteDialog && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white/95 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl"
            >
              {/* Warning Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                Kiracıyı Sil
              </h2>
              <p className="text-gray-600 text-center mb-6">
                <span className="font-semibold text-gray-800">{tenant.tenant_name} {tenant.tenant_surname}</span> isimli kiracıyı silmek istediğinize emin misiniz?
              </p>

              {/* Warning */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                <p className="text-center text-red-600 font-medium flex items-center justify-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Bu işlem geri alınamaz!
                </p>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteDialog(false)}
                  className="flex-1 px-6 py-3 rounded-2xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-all duration-300"
                >
                  İptal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmDeleteTenant}
                  disabled={isDeleting}
                  className="flex-1 px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Siliniyor...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Evet, Sil
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default TenantDetailPage;
