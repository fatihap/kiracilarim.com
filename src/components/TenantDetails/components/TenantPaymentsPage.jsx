import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const monthNames = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const TenantPaymentsPage = ({ tenant, payments, setPayments }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [amount, setAmount] = useState("");

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
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ödeme Geçmişi</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border">Ay</th>
              <th className="py-3 px-4 border">Tutar</th>
              <th className="py-3 px-4 border">Durum</th>
              <th className="py-3 px-4 border">Tarih</th>
            </tr>
          </thead>
<tbody>
  {payments
    .slice() // orijinali bozmamak için kopya
    .sort((a, b) => {
      // a ödenmiş mi?
      const aPaid = a.paid_amount >= tenant.rent_amount;
      const bPaid = b.paid_amount >= tenant.rent_amount;

      // Eğer a ödenmiş ve b ödenmemişse b önce gelsin
      if (aPaid && !bPaid) return 1;
      if (!aPaid && bPaid) return -1;

      // İkisi de aynı kategori ise -> month sırasına göre sırala
      return a.month - b.month;
    })
    .map((payment) => {
      const dueDate = new Date(startDate);
      dueDate.setMonth(startDate.getMonth() + (payment.month - 1));
      dueDate.setDate(20);

      let statusText = "";
      let statusClass = "";
      let rowBg = "";

      if (payment.paid_amount >= tenant.rent_amount) {
        statusText = "Tamamı Ödendi";
        statusClass = "text-green-600 font-semibold";
        rowBg = "bg-green-50";
      } else if (payment.paid_amount > 0) {
        statusText = `Eksik Ödendi (${payment.paid_amount.toLocaleString('tr-TR')} ₺)`;
        statusClass = "text-orange-500 font-semibold";
        rowBg = "bg-orange-50";
      } else if (dueDate > new Date()) {
        statusText = "Henüz Vadesi Gelmedi";
        statusClass = "text-gray-500 italic";
        rowBg = "bg-white";
      } else {
        statusText = "Ödenmedi";
        statusClass = "text-red-600 font-semibold";
        rowBg = "bg-red-50";
      }

      return (
        <tr
          key={payment.payment_id}
          className={`text-center hover:bg-gray-100 cursor-pointer transition ${rowBg}`}
          onClick={() => handleRowClick(payment)}
        >
          <td className="py-3 px-4 border">{getMonthName(payment.month)}</td>
          <td className="py-3 px-4 border">{tenant.rent_amount.toLocaleString('tr-TR')} ₺</td>
          <td className={`py-3 px-4 border ${statusClass}`}>{statusText}</td>
          <td className="py-3 px-4 border">
            Vade: {dueDate.toLocaleDateString("tr-TR")}
            <br />
            {payment.payment_date ? `Ödeme: ${payment.payment_date.slice(0, 10)}` : "-"}
          </td>
        </tr>
      );
    })}
</tbody>

        </table>
      </div>

    {/* Ödeme Modal */}
{selectedPayment && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-xl shadow-2xl p-6 w-96 animate-fadeIn">
      <h3 className="text-xl font-bold mb-3 text-blue-700">
        {getMonthName(selectedPayment.month)} Ayı Ödeme
      </h3>
      <p className="text-gray-600 mb-4">
        Kira Bedeli: <span className="font-semibold">{tenant.rent_amount.toLocaleString('tr-TR')} ₺</span>
      </p>
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
        className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Ödenen tutarı giriniz"
      />

      {/* Yeni Buton: Tamamı Ödendi */}
      <button
        onClick={() => setAmount(tenant.rent_amount)}
        className="w-full mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow transition"
      >
        ✅ Tamamı Ödendi
      </button>

      <div className="flex justify-between space-x-3">
        <button
          onClick={() => setSelectedPayment(null)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          İptal
        </button>

        <button
          onClick={() => {
            confirmAlert({
              customUI: ({ onClose }) => (
                <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm mx-auto text-center">
                  <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Ödemeyi Sil</h1>
                  <p className="text-gray-700 mb-6">
                    Bu işlem <span className="font-bold text-red-600">GERİ ALINAMAZ!</span><br/>
                    Silmek istediğinize emin misiniz?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">İptal</button>
                    <button
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
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow"
                    >
                      Evet, Sil
                    </button>
                  </div>
                </div>
              )
            });
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow"
        >
          Ödemeyi Sil
        </button>

        <button
          onClick={handlePaymentSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
        >
          Kaydet
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default TenantPaymentsPage;
