import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Building2, 
  Users, 
  Calendar, 
  DollarSign, 
  MapPin, 
  TrendingUp,
  Archive,
  Eye,
  Edit,
  MoreVertical,
  Filter,
  Search,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  SortAsc,
  SortDesc,
  Home,
  Building,
  Store,
  Factory,
  SlidersHorizontal
} from 'lucide-react';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    propertyType: 'all',
    rentRange: { min: '', max: '' },
    sortBy: 'name',
    sortOrder: 'asc',
    paymentStatus: 'all',
    contractDuration: 'all'
  });
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

  // Artık payments verisi tenant objesinin içinde geldiği için ayrı fetch'e gerek yok

  const activeTenants = useMemo(() => tenants.filter(t => t.is_archived === 0), [tenants]);
  const archivedTenants = useMemo(() => tenants.filter(t => t.is_archived === 1), [tenants]);

  // Filtreleme ve sıralama logic
  const filteredAndSortedTenants = useMemo(() => {
    let filtered = activeTab === 'active' ? activeTenants : archivedTenants;

    // Arama filtresi
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(tenant => 
        tenant.tenant_name?.toLowerCase().includes(searchTerm) ||
        tenant.tenant_surname?.toLowerCase().includes(searchTerm) ||
        tenant.tenant_address?.toLowerCase().includes(searchTerm) ||
        tenant.tenant_phone?.includes(searchTerm)
      );
    }

    // Mülk tipi filtresi
    if (filters.propertyType !== 'all') {
      filtered = filtered.filter(tenant => {
        const address = tenant.tenant_address?.toLowerCase() || '';
        switch (filters.propertyType) {
          case 'apartment':
            return address.includes('daire') || address.includes('apartman');
          case 'house':
            return address.includes('ev') || address.includes('villa');
          case 'office':
            return address.includes('ofis') || address.includes('işyeri');
          case 'shop':
            return address.includes('dükkan') || address.includes('mağaza');
          default:
            return true;
        }
      });
    }

    // Kira aralığı filtresi
    if (filters.rentRange.min || filters.rentRange.max) {
      filtered = filtered.filter(tenant => {
        const rent = tenant.rent_amount || 0;
        const min = filters.rentRange.min ? Number(filters.rentRange.min) : 0;
        const max = filters.rentRange.max ? Number(filters.rentRange.max) : Infinity;
        return rent >= min && rent <= max;
      });
    }

    // Ödeme durumu filtresi
    if (filters.paymentStatus !== 'all') {
      filtered = filtered.filter(tenant => {
        const payments = tenant.payments || [];
        const paidCount = payments.filter(p => p?.is_paid === 1).length;
        const totalMonths = tenant.contract_duration || 12;
        
        switch (filters.paymentStatus) {
          case 'paid':
            return paidCount === totalMonths;
          case 'partial':
            return paidCount > 0 && paidCount < totalMonths;
          case 'unpaid':
            return paidCount === 0;
          default:
            return true;
        }
      });
    }

    // Sözleşme süresi filtresi
    if (filters.contractDuration !== 'all') {
      filtered = filtered.filter(tenant => {
        const duration = tenant.contract_duration || 12;
        switch (filters.contractDuration) {
          case 'short':
            return duration <= 6;
          case 'medium':
            return duration > 6 && duration <= 12;
          case 'long':
            return duration > 12;
          default:
            return true;
        }
      });
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = `${a.tenant_name} ${a.tenant_surname}`.toLowerCase();
          bValue = `${b.tenant_name} ${b.tenant_surname}`.toLowerCase();
          break;
        case 'rent':
          aValue = a.rent_amount || 0;
          bValue = b.rent_amount || 0;
          break;
        case 'startDate':
          aValue = new Date(a.start_date);
          bValue = new Date(b.start_date);
          break;
        case 'paymentProgress':
          const aPayments = a.payments || [];
          const bPayments = b.payments || [];
          const aPaid = aPayments.filter(p => p?.is_paid === 1).length;
          const bPaid = bPayments.filter(p => p?.is_paid === 1).length;
          const aTotal = a.contract_duration || 12;
          const bTotal = b.contract_duration || 12;
          aValue = (aPaid / aTotal) * 100;
          bValue = (bPaid / bTotal) * 100;
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [activeTenants, archivedTenants, activeTab, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRentRangeChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      rentRange: {
        ...prev.rentRange,
        [key]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      propertyType: 'all',
      rentRange: { min: '', max: '' },
      sortBy: 'name',
      sortOrder: 'asc',
      paymentStatus: 'all',
      contractDuration: 'all'
    });
  };

  const getPropertyTypeIcon = (type) => {
    switch (type) {
      case 'apartment': return Building;
      case 'house': return Home;
      case 'office': return Building2;
      case 'shop': return Store;
      default: return Building2;
    }
  };

  const renderTenantCard = (tenant, index) => {
    const startDate = parseDate(tenant.start_date);
    const paymentDay = startDate ? startDate.getDate() : '-';

    // toplam ay: contract_duration kullan
    const totalMonths = Number.isFinite(tenant.contract_duration) && tenant.contract_duration > 0
      ? tenant.contract_duration
      : 12;

    // payments verisini tenant.payments'dan al
    const payments = tenant.payments || [];
    
    // is_paid === 1 olanları say
    const paidCount = payments.filter(p => p?.is_paid === 1).length;

    const clampedPaid = Math.min(paidCount, totalMonths);
    const progress = Math.round((clampedPaid / (totalMonths || 1)) * 100);

    return (
      <motion.div
        key={tenant.tenant_id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onClick={() => navigate(`/tenants/${tenant.tenant_id}`, { state: { tenant } })}
        className="group bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:bg-white/90"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {tenant.tenant_name} {tenant.tenant_surname}
              </h2>
              <p className="text-sm text-gray-500">Kiracı</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {totalMonths} ay
            </span>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Adres</p>
              <p className="text-sm font-medium text-gray-800 truncate">{tenant.tenant_address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl group-hover:bg-green-50 transition-colors duration-300">
            <DollarSign className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Kira</p>
              <p className="text-sm font-bold text-gray-800">{tenant.rent_amount?.toLocaleString('tr-TR')} ₺</p>
            </div>
          </div>
        </div>

        {/* Payment Day */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4 group-hover:bg-purple-50 transition-colors duration-300">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-xs text-gray-500">Ödeme Günü</p>
            <p className="text-sm font-medium text-gray-800">
              {paymentDay === '-' ? 'Belirtilmemiş' : `Her ayın ${paymentDay}'i`}
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Ödeme İlerlemesi</span>
            <span className="text-sm font-bold text-blue-600">%{progress}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full shadow-sm"
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>{clampedPaid} / {totalMonths} ay ödendi</span>
            <span>{totalMonths - clampedPaid} ay kaldı</span>
          </div>

          {/* Monthly Progress Dots */}
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: totalMonths }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.7 + i * 0.05 }}
                className={`inline-block h-3 w-3 rounded-full ${
                  i < clampedPaid 
                    ? 'bg-green-500 shadow-sm' 
                    : 'bg-gray-300'
                }`}
                title={`Ay ${i + 1} ${i < clampedPaid ? 'ödendi' : 'beklemede'}`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full bg-green-500" /> Ödendi
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full bg-gray-300" /> Beklemede
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.div 
          className="mt-4 flex items-center justify-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          <span className="text-sm font-medium">Detayları Görüntüle</span>
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Kiracılarım
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tüm kiracılarınızı tek bir yerden yönetin ve kira takibinizi kolaylaştırın
          </p>
        </motion.div>

        {/* Loading and Error States */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg">Kiracılar yükleniyor...</p>
          </motion.div>
        )}
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-8"
          >
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-700 text-lg font-medium">{error}</p>
          </motion.div>
        )}

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          {/* Tab Buttons */}
          <div className="flex bg-white/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/20">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'active'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Users className="w-4 h-4" />
              Aktif Kiracılar
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {activeTenants.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'archived'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Archive className="w-4 h-4" />
              Arşivlenmiş
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                {archivedTenants.length}
              </span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-lg text-gray-700 px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold border border-white/20"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtrele
            </motion.button>

            {/* Add Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/add-tenant')}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Yeni Kiracı Ekle
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Kiracı</p>
                <p className="text-2xl font-bold text-gray-800">{tenants.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Aktif Kiracı</p>
                <p className="text-2xl font-bold text-gray-800">{activeTenants.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Aylık Gelir</p>
                <p className="text-2xl font-bold text-gray-800">
                  {activeTenants.reduce((sum, t) => sum + (t.rent_amount || 0), 0).toLocaleString('tr-TR')} ₺
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tenants Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredAndSortedTenants.map((tenant, index) => 
            renderTenantCard(tenant, index)
          )}
        </motion.div>

        {/* Empty State */}
        {!loading && !error && filteredAndSortedTenants.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {Object.values(filters).some(v => v !== '' && v !== 'all' && (typeof v !== 'object' || Object.values(v).some(x => x !== '')))
                ? 'Filtrelere uygun kiracı bulunamadı'
                : activeTab === 'active' 
                  ? 'Henüz kiracınız yok' 
                  : 'Arşivlenmiş kiracı yok'
              }
            </h3>
            <p className="text-gray-600 mb-8">
              {Object.values(filters).some(v => v !== '' && v !== 'all' && (typeof v !== 'object' || Object.values(v).some(x => x !== '')))
                ? 'Filtreleri değiştirerek tekrar deneyin'
                : activeTab === 'active' 
                  ? 'İlk kiracınızı ekleyerek başlayın' 
                  : 'Arşivlenmiş kiracı bulunmuyor'
              }
            </p>
            {Object.values(filters).some(v => v !== '' && v !== 'all' && (typeof v !== 'object' || Object.values(v).some(x => x !== ''))) ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mr-4"
              >
                Filtreleri Temizle
              </motion.button>
            ) : activeTab === 'active' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/add-tenant')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                İlk Kiracınızı Ekleyin
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Filter Modal */}
        <AnimatePresence>
          {showFilterModal && (
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
                className="bg-white/95 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <SlidersHorizontal className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Filtrele ve Sırala</h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFilterModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </motion.button>
                </div>

                <div className="space-y-6">
                  {/* Arama */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Arama</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        placeholder="Ad, soyad, adres veya telefon ile ara..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Mülk Tipi */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mülk Tipi</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'all', label: 'Tümü', icon: Building2 },
                        { value: 'apartment', label: 'Daire', icon: Building },
                        { value: 'house', label: 'Ev', icon: Home },
                        { value: 'office', label: 'Ofis', icon: Building2 },
                        { value: 'shop', label: 'Dükkan', icon: Store }
                      ].map(({ value, label, icon: Icon }) => (
                        <motion.button
                          key={value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleFilterChange('propertyType', value)}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                            filters.propertyType === value
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Kira Aralığı */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kira Aralığı (₺)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="number"
                          value={filters.rentRange.min}
                          onChange={(e) => handleRentRangeChange('min', e.target.value)}
                          placeholder="Min"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          value={filters.rentRange.max}
                          onChange={(e) => handleRentRangeChange('max', e.target.value)}
                          placeholder="Max"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ödeme Durumu */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ödeme Durumu</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'all', label: 'Tümü', icon: CheckCircle },
                        { value: 'paid', label: 'Tamamı Ödendi', icon: CheckCircle },
                        { value: 'partial', label: 'Kısmen Ödendi', icon: Clock },
                        { value: 'unpaid', label: 'Ödenmedi', icon: AlertCircle }
                      ].map(({ value, label, icon: Icon }) => (
                        <motion.button
                          key={value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleFilterChange('paymentStatus', value)}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                            filters.paymentStatus === value
                              ? 'bg-green-50 border-green-300 text-green-700'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Sözleşme Süresi */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sözleşme Süresi</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'all', label: 'Tümü' },
                        { value: 'short', label: 'Kısa (≤6 ay)' },
                        { value: 'medium', label: 'Orta (7-12 ay)' },
                        { value: 'long', label: 'Uzun (>12 ay)' }
                      ].map(({ value, label }) => (
                        <motion.button
                          key={value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleFilterChange('contractDuration', value)}
                          className={`p-3 rounded-xl border transition-all duration-300 ${
                            filters.contractDuration === value
                              ? 'bg-purple-50 border-purple-300 text-purple-700'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <span className="font-medium">{label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Sıralama */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sıralama</label>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      >
                        <option value="name">Ad Soyad</option>
                        <option value="rent">Kira Miktarı</option>
                        <option value="startDate">Başlangıç Tarihi</option>
                        <option value="paymentProgress">Ödeme İlerlemesi</option>
                      </select>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange('sortOrder', 'asc')}
                          className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                            filters.sortOrder === 'asc'
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <SortAsc className="w-4 h-4" />
                          <span className="font-medium">Artan</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFilterChange('sortOrder', 'desc')}
                          className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                            filters.sortOrder === 'desc'
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <SortDesc className="w-4 h-4" />
                          <span className="font-medium">Azalan</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearFilters}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-300 font-semibold"
                  >
                    Temizle
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowFilterModal(false)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold"
                  >
                    Uygula
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TenantsPage;
