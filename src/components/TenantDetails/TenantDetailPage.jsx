import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUser, FiCreditCard, FiFileText } from 'react-icons/fi';

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

  if (!tenant) {
    return <div className="text-center mt-10 text-red-500">Kiracı bilgisi bulunamadı.</div>;
  }

  const handleEditTenant = () => {
    navigate('/kiraci-duzenle', { state: { tenant } });
  };

  const confirmDeleteTenant = async () => {
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
      setShowDeleteDialog(false);
    }
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
              onClick={() => setShowDeleteDialog(true)}
              className="bg-red-500 hover:bg-red-800 text-white px-5 py-2 rounded-lg shadow"
            >
              Sil
            </button>
            <button
              onClick={handleEditTenant}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
            >
              Düzenle
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-4">
          <button
            className={`flex items-center px-4 py-2 -mb-px border-b-2 ${activeTab === 0 ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab(0)}
          >
            <FiUser className="mr-2" /> Bilgiler
          </button>
          <button
            className={`flex items-center px-4 py-2 -mb-px border-b-2 ${activeTab === 1 ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab(1)}
          >
            <FiCreditCard className="mr-2" /> Ödemeler
          </button>
          <button
            className={`flex items-center px-4 py-2 -mb-px border-b-2 ${activeTab === 2 ? 'border-blue-500 text-blue-600 font-semibold' : 'border-transparent text-gray-600'}`}
            onClick={() => setActiveTab(2)}
          >
            <FiFileText className="mr-2" /> Belgeler
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 0 && <TenantInfoPage tenant={tenant} />}
        {activeTab === 1 && <TenantPaymentsPage tenant={tenant} payments={payments} setPayments={setPayments} />}
        {activeTab === 2 && <TenantDocsPage tenant={tenant} />}
      </div>

    {/* Silme Diyaloğu */}
{showDeleteDialog && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md transform transition-all scale-95 animate-fadeIn">
      {/* Uyarı İkonu */}
      <div className="flex items-center justify-center mb-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600">
          ⚠️
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
        Kiracıyı Sil
      </h2>
      <p className="text-gray-600 text-center mb-4">
        <span className="font-semibold">{tenant.tenant_name} {tenant.tenant_surname}</span> isimli kiracıyı silmek istediğinize emin misiniz?
      </p>

      {/* Geri alınamaz uyarısı */}
      <p className="text-center text-red-600 font-medium mb-6">
        ⚠️ Bu işlem geri alınamaz!
      </p>

      <div className="flex justify-center space-x-3">
        <button
          onClick={() => setShowDeleteDialog(false)}
          className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
        >
          İptal
        </button>
        <button
          onClick={confirmDeleteTenant}
          className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md transition"
        >
          Evet, Sil
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default TenantDetailPage;
