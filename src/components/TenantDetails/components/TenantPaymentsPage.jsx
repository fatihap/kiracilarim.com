import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Edit, 
  Trash2, 
  Save, 
  X,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus
} from 'lucide-react';
import 'react-confirm-alert/src/react-confirm-alert.css';

const monthNames = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const TenantPaymentsPage = ({ tenant, payments, setPayments }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startDate = new Date(tenant.start_date);

  const getMonthName = (monthIndex) => {
    const newDate = new Date(startDate);
    newDate.setMonth(startDate.getMonth() + (monthIndex - 1));
    return monthNames[newDate.getMonth()];
  };

  const handleRowClick = (payment) => {
    setSelectedPayment(payment);
    setAmount(payment.paid_amount || "");
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPayment) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://kiracilarim.com/api/payment/${selectedPayment.payment_id}`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          month: selectedPayment.month,
          amount: tenant.rent_amount,
          payment_date: new Date().toISOString().slice(0, 10),
          is_paid: amount >= tenant.rent_amount ? 1 : 0,
          paid_amount: Number(amount)
        })
      });

      if (response.ok) {
        toast.success("Ödeme güncellendi.");
        setPayments(prev =>
          prev.map(p =>
            p.payment_id === selectedPayment.payment_id
              ? { ...p, paid_amount: Number(amount), payment_date: new Date().toISOString().slice(0, 10) }
              : p
          )
        );
        setSelectedPayment(null);
      } else {
        const result = await response.json();
        toast.error(result.message || "Ödeme güncellenemedi.");
      }
    } catch (error) {
      console.error("Hata:", error);
      toast.error("Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const totalPayments = payments.length;
  const paidPayments = payments.filter(p => p.paid_amount >= tenant.rent_amount).length;
  const pendingPayments = totalPayments - paidPayments;
  const totalPaidAmount = payments.reduce((sum, p) => sum + (p.paid_amount || 0), 0);
  const totalExpectedAmount = totalPayments * tenant.rent_amount;
  const paymentRate = totalPayments > 0 ? (paidPayments / totalPayments) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
          <CreditCard className="w-8 h-8 text-blue-600" />
          Ödeme Geçmişi
        </h2>
        <p className="text-gray-600">Kiracının ödeme durumunu takip edin</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Toplam Ödeme</p>
              <p className="text-2xl font-bold">{totalPayments}</p>
            </div>
            <CreditCard className="w-8 h-8 text-blue-200" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Ödenen</p>
              <p className="text-2xl font-bold">{paidPayments}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-200" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Bekleyen</p>
              <p className="text-2xl font-bold">{pendingPayments}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-200" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Ödeme Oranı</p>
              <p className="text-2xl font-bold">{paymentRate.toFixed(0)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-200" />
          </div>
        </motion.div>
      </div>

      {/* Payments Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Ay</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Tutar</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700">Durum</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700">Tarih</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments
                .slice()
                .sort((a, b) => {
                  const aPaid = a.paid_amount >= tenant.rent_amount;
                  const bPaid = b.paid_amount >= tenant.rent_amount;
                  if (aPaid && !bPaid) return 1;
                  if (!aPaid && bPaid) return -1;
                  return a.month - b.month;
                })
                .map((payment, index) => {
                  const dueDate = new Date(startDate);
                  dueDate.setMonth(startDate.getMonth() + (payment.month - 1));
                  dueDate.setDate(20);

                  let statusConfig = {};
                  if (payment.paid_amount >= tenant.rent_amount) {
                    statusConfig = {
                      text: "Tamamı Ödendi",
                      icon: CheckCircle,
                      color: "text-green-600",
                      bgColor: "bg-green-50",
                      iconColor: "text-green-500"
                    };
                  } else if (payment.paid_amount > 0) {
                    statusConfig = {
                      text: `Eksik Ödendi (${payment.paid_amount.toLocaleString('tr-TR')} ₺)`,
                      icon: AlertCircle,
                      color: "text-orange-600",
                      bgColor: "bg-orange-50",
                      iconColor: "text-orange-500"
                    };
                  } else if (dueDate > new Date()) {
                    statusConfig = {
                      text: "Henüz Vadesi Gelmedi",
                      icon: Clock,
                      color: "text-gray-500",
                      bgColor: "bg-gray-50",
                      iconColor: "text-gray-400"
                    };
                  } else {
                    statusConfig = {
                      text: "Ödenmedi",
                      icon: XCircle,
                      color: "text-red-600",
                      bgColor: "bg-red-50",
                      iconColor: "text-red-500"
                    };
                  }

                  const StatusIcon = statusConfig.icon;

                  return (
                    <motion.tr
                      key={payment.payment_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`hover:bg-gray-50 transition-all duration-300 ${statusConfig.bgColor}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {payment.month}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{getMonthName(payment.month)}</p>
                            <p className="text-sm text-gray-500">2024</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-800">
                            {tenant.rent_amount.toLocaleString('tr-TR')} ₺
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${statusConfig.bgColor}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                          <span className={`text-sm font-medium ${statusConfig.color}`}>
                            {statusConfig.text}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Vade: {dueDate.toLocaleDateString("tr-TR")}</span>
                          </div>
                          {payment.payment_date && (
                            <div className="text-sm text-green-600 font-medium">
                              Ödeme: {payment.payment_date.slice(0, 10)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRowClick(payment)}
                          className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 shadow-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </motion.tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedPayment && (
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
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {getMonthName(selectedPayment.month)} Ayı Ödeme
                </h3>
                <p className="text-gray-600">
                  Kira Bedeli: <span className="font-semibold text-blue-600">{tenant.rent_amount.toLocaleString('tr-TR')} ₺</span>
                </p>
              </div>

              {/* Amount Input */}
              <div className="space-y-4 mb-6">
                <div className="relative group">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                  <input
                    type="text"
                    value={Number(amount || 0).toLocaleString('tr-TR')}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/\./g, ''));
                      if (val > tenant.rent_amount) {
                        toast.warning(`Ödeme miktarı (${tenant.rent_amount.toLocaleString('tr-TR')}) den fazla olamaz.`);
                        setAmount(tenant.rent_amount);
                      } else {
                        setAmount(val);
                      }
                    }}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    placeholder="Ödenen tutarı giriniz"
                  />
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAmount(tenant.rent_amount)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all duration-300 shadow-lg"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Tamamı Ödendi
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAmount(0)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-2xl hover:bg-gray-600 transition-all duration-300 shadow-lg"
                  >
                    <XCircle className="w-4 h-4" />
                    Sıfırla
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPayment(null)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-300 font-semibold"
                >
                  İptal
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    confirmAlert({
                      customUI: ({ onClose }) => (
                        <div className="bg-white/95 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl max-w-sm mx-auto text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-8 h-8 text-white" />
                          </div>
                          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ödemeyi Sil</h1>
                          <p className="text-gray-600 mb-6">
                            Bu işlem <span className="font-bold text-red-600">GERİ ALINAMAZ!</span><br />
                            Silmek istediğinize emin misiniz?
                          </p>
                          <div className="flex gap-3">
                            <motion.button 
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={onClose} 
                              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-300 font-semibold"
                            >
                              İptal
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={async () => {
                                try {
                                  const token = localStorage.getItem('token');
                                  const response = await fetch(`https://kiracilarim.com/api/payment/${selectedPayment.payment_id}`, {
                                    method: "DELETE",
                                    headers: { 'Authorization': `Bearer ${token}` },
                                  });

                                  if (response.ok) {
                                    toast.success("Ödeme silindi.");
                                    setPayments(prev => prev.filter(p => p.payment_id !== selectedPayment.payment_id));
                                    setSelectedPayment(null);
                                  } else {
                                    const result = await response.json();
                                    toast.error(result.message || "Ödeme silinemedi.");
                                  }
                                } catch (error) {
                                  console.error("Hata:", error);
                                  toast.error("Bir hata oluştu.");
                                }
                                onClose();
                              }}
                              className="flex-1 px-4 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 font-semibold shadow-lg"
                            >
                              Evet, Sil
                            </motion.button>
                          </div>
                        </div>
                      )
                    });
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 font-semibold shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  Sil
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePaymentSubmit}
                  disabled={isLoading}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Kaydet
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

export default TenantPaymentsPage;
