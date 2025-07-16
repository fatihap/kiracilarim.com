import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);

  useEffect(() => {
    // API'den verileri çek
    const fetchDashboardData = async () => {
      try {
        // Mülkleri getir
        const propertiesResponse = await fetch('https://kira.alikvkli.dev/api/properties');
        const propertiesData = await propertiesResponse.json();
        setProperties(propertiesData);

        // Kiracıları getir
        const tenantsResponse = await fetch('https://kira.alikvkli.dev/api/tenants');
        const tenantsData = await tenantsResponse.json();
        setTenants(tenantsData);

        // Bekleyen ödemeleri getir
        const paymentsResponse = await fetch('https://kira.alikvkli.dev/api/pending-payments');
        const paymentsData = await paymentsResponse.json();
        setPendingPayments(paymentsData);
      } catch (error) {
        console.error('Dashboard verileri yüklenirken hata:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Merhaba, {user?.name}</h1>
        <p className="mt-2 text-gray-600">Kira takip panonuz</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Bekleyen Ödemeler */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Bekleyen Ödemeler</h3>
              <p className="text-3xl font-bold text-red-600">{pendingPayments.length}</p>
            </div>
          </div>
        </div>

        {/* Toplam Mülk */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Toplam Mülk</h3>
              <p className="text-3xl font-bold text-blue-600">{properties.length}</p>
            </div>
          </div>
        </div>

        {/* Toplam Kiracı */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">Toplam Kiracı</h3>
              <p className="text-3xl font-bold text-green-600">{tenants.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Geçen Ay Ödemeleri */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Geçen Ay Ödemeleri</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mülk Adı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kiracı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ödeme Tutarı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Örnek veri */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Daire 1</td>
                <td className="px-6 py-4 whitespace-nowrap">Ahmet Yılmaz</td>
                <td className="px-6 py-4 whitespace-nowrap">₺1.500</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Ödendi
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Daire 2</td>
                <td className="px-6 py-4 whitespace-nowrap">Ayşe Kocaman</td>
                <td className="px-6 py-4 whitespace-nowrap">₺1.800</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Bekliyor
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hızlı Erişim Butonları */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/properties" className="bg-white rounded-lg shadow p-6 text-center hover:bg-gray-50 transition">
            <svg className="w-8 h-8 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="mt-3 text-sm font-medium text-gray-900">Mülkler</h3>
          </Link>
          <Link to="/tenants" className="bg-white rounded-lg shadow p-6 text-center hover:bg-gray-50 transition">
            <svg className="w-8 h-8 mx-auto text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-3 text-sm font-medium text-gray-900">Kiracılar</h3>
          </Link>
          <Link to="/payments" className="bg-white rounded-lg shadow p-6 text-center hover:bg-gray-50 transition">
            <svg className="w-8 h-8 mx-auto text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-3 text-sm font-medium text-gray-900">Ödemeler</h3>
          </Link>
          <Link to="/reminders" className="bg-white rounded-lg shadow p-6 text-center hover:bg-gray-50 transition">
            <svg className="w-8 h-8 mx-auto text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-3 text-sm font-medium text-gray-900">Bildirimler</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
