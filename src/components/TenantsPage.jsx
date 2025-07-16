import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TenantsPage = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://kiracilarim.com/api/tenant?page=1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Kiracılar alınamadı');

        setTenants(data.payload);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-10">
          Kiracılarım
        </h1>

        {loading && <p className="text-center text-gray-500">Yükleniyor...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="text-right mb-6">
  <button
    onClick={() => navigate('/add-tenant')}
    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
  >
    + Yeni Kiracı Ekle
  </button>
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <div
              key={tenant.tenant_id}
              onClick={() => navigate(`/tenants/${tenant.tenant_id}`, { state: { tenant } })}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {tenant.tenant_name} {tenant.tenant_surname}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Adres:</span> {tenant.tenant_address}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Kira:</span> {tenant.rent_amount.toLocaleString('tr-TR')} ₺
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Sözleşme Süresi:</span> {tenant.contract_duration} ay
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantsPage;
