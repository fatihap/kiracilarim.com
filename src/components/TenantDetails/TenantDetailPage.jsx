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

  if (!tenant) {
    return <div className="text-center mt-10 text-red-500">Kiracı bilgisi bulunamadı.</div>;
  }

  const handleEditTenant = () => {
    navigate('/kiraci-duzenle', { state: { tenant } });
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
            <button onClick={handleEditTenant} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow">Düzenle</button>
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
    </div>
  );
};

export default TenantDetailPage;
