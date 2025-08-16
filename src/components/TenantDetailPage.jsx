import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';

const monthNames = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

const TenantDetailPage = () => {
  const { state } = useLocation();
  const tenant = state?.tenant;
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [amount, setAmount] = useState("");
  const [payments, setPayments] = useState(tenant?.payments || []);


  const handleDelete = () => {
    if (!tenant) return;

    confirmAlert({
      title: 'Kiracı Sil',
      message: 'Bu kiracıyı silmek istediğinize emin misiniz?',
      buttons: [
        {
          label: 'Evet, Sil',
          onClick: async () => {
            try {
              const token = localStorage.getItem('token');
              const response = await fetch(`https://kiracilarim.com/api/tenant/${tenant.tenant_id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
              });

              if (response.ok) {
                toast.success("Kiracı başarıyla silindi.");
                navigate('/tenants');
              } else {
                const result = await response.json();
                toast.error(result.message || 'Silme işlemi başarısız oldu.');
              }
            } catch (error) {
              console.error("Hata: ", error);
              toast.error("Bir hata oluştu.");
            }
          }
        },
        { label: 'İptal' }
      ]
    });
  };

  const handleEdit = () => {
    navigate('/kiraci-duzenle', { state: { tenant } });
  };

  const handleRowClick = (payment) => {
    setSelectedPayment(payment);
    setAmount(payment.paid_amount || "");
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPayment) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("https://kiracilarim.com/api/payment", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tenant_id: tenant.tenant_id,
          month: selectedPayment.month,
          amount: tenant.rent_amount,
          payment_date: new Date().toISOString().slice(0, 10),
          is_paid: amount >= tenant.rent_amount ? 1 : 0,
          paid_amount: Number(amount)
        })
      });

      if (response.ok) {
        toast.success("Ödeme kaydedildi.");

        // ödeme listesini güncelleme 
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
        toast.error(result.message || "Ödeme eklenemedi.");
      }
    } catch (error) {
      console.error("Hata:", error);
      toast.error("Bir hata oluştu.");
    }
  };

  if (!tenant) {
    return <div className="text-center mt-10 text-red-500">Kiracı bilgisi bulunamadı.</div>;
  }

  // Başlangıç tarihine göre ay isimleri hesapla
  const startDate = new Date(tenant.start_date);
  const getMonthName = (monthIndex) => {
    const newDate = new Date(startDate);
    newDate.setMonth(startDate.getMonth() + (monthIndex - 1));
    return monthNames[newDate.getMonth()];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline text-sm"
        >
          ← Geri dön
        </button>

        <div className='flex justify-between items-center mb-8'>
          <h1 className="text-3xl font-bold text-blue-700">
            {tenant.tenant_name} {tenant.tenant_surname}
          </h1>

          <div className="space-x-3">
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
            >
              Düzenle
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
            >
              Sil
            </button>
          </div>
        </div>

        {/* Kiracı bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-gray-700">
          <div><strong>📍 Adres:</strong> {tenant.tenant_address}</div>
          <div><strong>📞 Telefon:</strong> {tenant.tenant_phone}</div>
          <div><strong>💰 Kira:</strong> {tenant.rent_amount.toLocaleString('tr-TR')} ₺</div>
          <div><strong>🕒 Sözleşme Süresi:</strong> {tenant.contract_duration} ay</div>
          <div><strong>📅 Başlangıç Tarihi:</strong> {tenant.start_date?.slice(0, 10)}</div>
          <div><strong>📝 Açıklama:</strong> {tenant.description}</div>
        </div>

        {/* Ödeme Geçmişi */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Ödeme Geçmişi</h2>
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
              {payments.map((payment) => {
                let statusText = "";
                let statusClass = "";
                let rowBg = "";

                // vade tarihi ekledik kira baslangıcdan itibaren bir ay olarak artacak  
                const dueDate =  new Date(startDate);
                dueDate.setMonth(startDate.getMonth() + (payment.month - 1));
                dueDate.setDate(20);

                 const today = new Date();

                if(today < dueDate){
                    // ödeme günüün gelmediği senaryo 

                    statusText = "Beklemede";
                    statusClass = "text-gray-500 font-semibold";
                    rowBg = "bg-white";
                }else{
                  // vade günü geldi veya üzerinden vakit geçti 
                  if(payment.paid_amount>= tenant.rent_amount){
                       statusText = "Tamamı Ödendi";
                  statusClass = "text-green-600 font-semibold";
                  rowBg = "bg-green-50";
                  
                }else if 
                (payment.paid_amount < tenant.rent_amount && payment.paid_amount != 0){
                  statusText = `Eksik Ödendi(${payment.paid_amount.toLocaleString('tr-TR')} ₺)`;
                  statusClass = "text-orange-500 font-semibold";
                  rowBg = "bg-orange-50";
                }
                else {
                  statusText = "Ödenmedi";
                  statusClass = "text-red-600 font-semibold";
                  rowBg = "bg-red-50";
                }
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
                type="number"
                value={amount}
                min="0"
                max = {tenant.rent_amount}

                onChange={(e)=>{
                   const val = Number(e.target.value);
                   if(val > tenant.rent_amount){
                    toast.warning(`Ödeme miktarı (${tenant.rent_amount.toLocaleString('tr-TR')}) den fazla olamaz. `)
                    setAmount(tenant.rent_amount);

                   }else{
                    setAmount(val);
                   }
                }}
                className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Ödenen tutarı giriniz"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  İptal
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
    </div>
  );
};

export default TenantDetailPage;
