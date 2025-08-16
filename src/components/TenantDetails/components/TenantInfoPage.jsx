import React from "react";

const TenantInfoPage = ({ tenant }) => {
  if (!tenant) return <div className="text-center text-red-500">Kiracı Bilgileri Bulunamadı.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
      <div><strong>📍 Adres:</strong> {tenant.tenant_address}</div>
      <div><strong>📞 Telefon:</strong> {tenant.tenant_phone}</div>
      <div><strong>💰 Kira:</strong> {tenant.rent_amount.toLocaleString('tr-TR')} ₺</div>
      <div><strong>🕒 Sözleşme Süresi:</strong> {tenant.contract_duration} ay</div>
      <div><strong>📅 Başlangıç Tarihi:</strong> {tenant.start_date?.slice(0, 10)}</div>
      <div><strong>📝 Açıklama:</strong> {tenant.description}</div>
    </div>
  );
};

export default TenantInfoPage;
