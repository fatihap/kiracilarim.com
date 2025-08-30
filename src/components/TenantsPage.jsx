import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function monthsDiffInclusive(start, end) {
  // start, end: Date objeleri
  if (!start || !end || isNaN(start) || isNaN(end)) return null;
  const y = end.getFullYear() - start.getFullYear();
  const m = end.getMonth() - start.getMonth();
  const diff = y * 12 + m + 1; // inclusive
  return diff > 0 ? diff : null;
}

function parseDate(d) {
  if (!d) return null;
  const dt = new Date(d);
  return isNaN(dt) ? null : dt;
}

const TenantsPage = () => {
  const [tenants, setTenants] = useState([]);
  const [paymentsByTenant, setPaymentsByTenant] = useState({}); // { [tenantId]: Payment[] }
  const [loading, setLoading] = useState(true);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://kiracilarim.com/api/tenant?page=1', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Kiracılar alınamadı');
        setTenants(data.payload || []);
      } catch (err) {
        setError(err.message || 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  useEffect(() => {
    const fetchAllPayments = async () => {
      if (!tenants.length) return;
      setPaymentsLoading(true);
      const token = localStorage.getItem('token');

      const headers = { Authorization: `Bearer ${token}` };

      const tryFetch = async (urls) => {
        for (const url of urls) {
          try {
            const r = await fetch(url, { headers });
            const j = await r.json();
            if (r.ok && j && (Array.isArray(j.payload) || Array.isArray(j.data) || Array.isArray(j))) {
              // dönen dizi nerede ise onu al
              return Array.isArray(j.payload) ? j.payload : Array.isArray(j.data) ? j.data : j;
            }
          } catch (_) { /* diğer url’i dene */ }
        }
        return [];
      };

      const entries = await Promise.all(
        tenants.map(async (t) => {
          const urls = [
            `https://kiracilarim.com/api/payment?tenant_id=${t.tenant_id}`,
            `https://kiracilarim.com/api/tenant/${t.tenant_id}/payments`,
          ];
          const list = await tryFetch(urls);
          return [t.tenant_id, list || []];
        })
      );

      const map = Object.fromEntries(entries);
      setPaymentsByTenant(map);
      setPaymentsLoading(false);
    };
    fetchAllPayments();
  }, [tenants]);

  const activeTenants = useMemo(() => tenants.filter(t => t.is_archived === 0), [tenants]);
  const archivedTenants = useMemo(() => tenants.filter(t => t.is_archived === 1), [tenants]);

  const renderTenantCard = (tenant) => {
    const startDate = parseDate(tenant.contract_start_date);
    const endDate = parseDate(tenant.contract_end_date);
    const paymentDay = startDate ? startDate.getDate() : '-';

    // toplam ay: önce start-end, yoksa contract_duration, yoksa 12
    const totalMonthsByDates = monthsDiffInclusive(startDate, endDate);
    const totalMonths =
      totalMonthsByDates ??
      (Number.isFinite(tenant.contract_duration) && tenant.contract_duration > 0
        ? tenant.contract_duration
        : 12);

    const payments = paymentsByTenant[tenant.tenant_id] || [];
    // ödenmiş say: farklı şemalara toleranslı
    const paidCount = payments.filter(p =>
      p?.is_paid === 1 || p?.paid === true || (typeof p?.status === 'string' && p.status.toUpperCase() === 'PAID')
    ).length;

    const clampedPaid = Math.min(paidCount, totalMonths);
    const progress = Math.round((clampedPaid / (totalMonths || 1)) * 100);

    return (
      <div
        key={tenant.tenant_id}
        onClick={() => navigate(`/tenants/${tenant.tenant_id}`, { state: { tenant } })}
        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 cursor-pointer border border-gray-100 hover:border-blue-300"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-800">
            {tenant.tenant_name} {tenant.tenant_surname}
          </h2>
          <div className="flex items-center gap-2">
            {totalMonthsByDates && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {startDate?.toLocaleDateString('tr-TR')} → {endDate?.toLocaleDateString('tr-TR')}
              </span>
            )}
            {!totalMonthsByDates && (
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {totalMonths} ay
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Adres:</span> {tenant.tenant_address}
        </p>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Kira:</span> {tenant.rent_amount?.toLocaleString('tr-TR')} ₺
        </p>
        <p className="text-gray-600 text-sm mb-4">
          <span className="font-medium">Ödeme Günü:</span> {paymentDay === '-' ? '-' : `Her ayın ${paymentDay}’i`}
        </p>

        {/* Ödeme ilerleme (metrik + bar) */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>{clampedPaid} / {totalMonths} ay ödendi</span>
            <span>%{progress}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Segmentli aylık gösterim */}
        <div className="mt-2">
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: totalMonths }).map((_, i) => (
              <span
                key={i}
                className={`inline-block h-2.5 w-4 rounded ${i < clampedPaid ? 'bg-green-500' : 'bg-gray-300'}`}
                title={`Ay ${i + 1} ${i < clampedPaid ? 'ödendi' : 'beklemede'}`}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-500">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded bg-green-500" /> Ödendi
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded bg-gray-300" /> Beklemede
            </span>
            {paymentsLoading && <span>Ödemeler yükleniyor…</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mt-20 mb-10">
          Kiracılarım
        </h1>

        {loading && <p className="text-center text-gray-500">Yükleniyor...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'active'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Aktif Kiracılar
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === 'archived'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Arşivlenmiş Kiracılar
            </button>
          </div>

          <button
            onClick={() => navigate('/add-tenant')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Yeni Kiracı Ekle
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'active' ? activeTenants : archivedTenants).map(renderTenantCard)}
        </div>
      </div>
    </div>
  );
};

export default TenantsPage;
