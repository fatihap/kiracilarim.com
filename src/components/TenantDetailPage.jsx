import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TenantDetailPage = () => {
  const { state } = useLocation();
  const tenant = state?.tenant;
  const navigate = useNavigate();

  if (!tenant) {
    return <div className="text-center mt-10 text-red-500">Kiracı bilgisi bulunamadı.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 hover:underline text-sm"
        >
          ← Geri dön
        </button>
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          {tenant.tenant_name} {tenant.tenant_surname}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div><strong>Adres:</strong> {tenant.tenant_address}</div>
          <div><strong>Telefon:</strong> {tenant.tenant_phone}</div>
          <div><strong>Kira:</strong> {tenant.rent_amount.toLocaleString('tr-TR')} ₺</div>
          <div><strong>Sözleşme Süresi:</strong> {tenant.contract_duration} ay</div>
          <div><strong>Başlangıç Tarihi:</strong> {tenant.start_date?.slice(0, 10)}</div>
          <div><strong>Açıklama:</strong> {tenant.description}</div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Ödeme Geçmişi</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Ay</th>
                <th className="py-2 px-4 border">Tutar</th>
                <th className="py-2 px-4 border">Durum</th>
                <th className="py-2 px-4 border">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {tenant.payments.map((payment) => (
                <tr key={payment.payment_id} className="text-center">
                  <td className="py-2 px-4 border">{payment.month}</td>
                  <td className="py-2 px-4 border">{payment.amount.toLocaleString('tr-TR')} ₺</td>
                  <td className={`py-2 px-4 border ${payment.is_paid ? 'text-green-600' : 'text-red-600'}`}>
                    {payment.is_paid ? 'Ödendi' : 'Bekliyor'}
                  </td>
                  <td className="py-2 px-4 border">{payment.payment_date?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {tenant.files?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Ekli Dosyalar</h3>
            <ul className="list-disc ml-6">
              {tenant.files.map((file) => (
                <li key={file.file_id}>
                  <a href={file.accessible_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    {file.file_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantDetailPage;
