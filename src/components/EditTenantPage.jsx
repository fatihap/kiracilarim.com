import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { 
  User, 
  Phone, 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  FileText, 
  ArrowLeft,
  Save,
  CheckCircle,
  AlertCircle,
  Home,
  Store,
  Edit
} from "lucide-react";

import 'react-toastify/dist/ReactToastify.css';
const EditTenantPage = () => {
    const { state } = useLocation();
    const tenant = state?.tenant;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: tenant?.tenant_name || '',
        surname: tenant?.tenant_surname || '',
        phone: tenant?.tenant_phone || '',
        address: tenant?.tenant_address || '',
        contract_duration: tenant?.contract_duration || '',
        rent_amount: tenant?.rent_amount || '',
        start_date: tenant?.start_date?.slice(0, 10) || '',
        description: tenant?.description || '',
        type: tenant?.type || 1,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

   const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === 'phone') {
      processedValue = value.replace(/[^0-9]/g, '').slice(0, 11);
      if (processedValue.length > 0 && processedValue.startsWith('5') && !processedValue.startsWith('0')) {
        processedValue = '0' + processedValue;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'contract_duration' || name === 'rent_amount' || name === 'type'
        ? Number(processedValue)
        : processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Ad alanı zorunludur.';
    if (!formData.surname.trim()) newErrors.surname = 'Soyad alanı zorunludur.';
    if (!formData.phone.trim()) newErrors.phone = 'Telefon alanı zorunludur.';
    else if (!formData.phone.startsWith('05') || formData.phone.length !== 11) {
      newErrors.phone = 'Telefon numarası "05" ile başlamalı ve 11 haneli olmalıdır.';
    }
    if (!formData.address.trim()) newErrors.address = 'Adres alanı zorunludur.';
    if (!formData.contract_duration) newErrors.contract_duration = 'Sözleşme süresi zorunludur.';
    if (!formData.rent_amount) newErrors.rent_amount = 'Kira tutarı zorunludur.';
    if (!formData.start_date) newErrors.start_date = 'Başlangıç tarihi zorunludur.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://kiracilarim.com/api/tenant/${tenant.tenant_id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Kiracı bilgileri başarıyla güncellendi.");
        setTimeout(() => navigate('/tenants'), 2000);
      } else {
        const result = await response.json();
        toast.error(result.message || "Güncelleme başarısız oldu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      toast.error("Bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!tenant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center shadow-2xl"
        >
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg">Kiracı bilgisi alınamadı.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-10 px-4 relative overflow-hidden pt-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Edit className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Kiracı Düzenle
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {tenant.tenant_name} {tenant.tenant_surname} bilgilerini güncelleyin
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <User className="w-6 h-6 text-blue-400" />
                Kişisel Bilgiler
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 group-focus-within:text-blue-400 transition-colors duration-300" />
                    <input
                      name="name"
                      placeholder="Ad"
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${errors.name ? 'border-red-400' : formData.name ? 'border-green-400' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-300 text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 group-focus-within:text-blue-400 transition-colors duration-300" />
                    <input
                      name="surname"
                      placeholder="Soyad"
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${errors.surname ? 'border-red-400' : formData.surname ? 'border-green-400' : ''}`}
                      value={formData.surname}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.surname && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-300 text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.surname}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 group-focus-within:text-blue-400 transition-colors duration-300" />
                  <input
                    name="phone"
                    placeholder="Telefon (05XX XXX XX XX)"
                    type="tel"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${errors.phone ? 'border-red-400' : formData.phone ? 'border-green-400' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-300 text-sm flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 text-blue-300 group-focus-within:text-blue-400 transition-colors duration-300" />
                  <textarea
                    name="address"
                    placeholder="Adres"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none ${errors.address ? 'border-red-400' : formData.address ? 'border-green-400' : ''}`}
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                {errors.address && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-300 text-sm flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.address}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Property Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-purple-400" />
                Mülk Bilgileri
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="relative group">
                    {formData.type === 1 ? <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 group-focus-within:text-purple-400 transition-colors duration-300" /> : <Store className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 group-focus-within:text-purple-400 transition-colors duration-300" />}
                    <select
                      name="type"
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${errors.type ? 'border-red-400' : formData.type ? 'border-green-400' : ''}`}
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value={1} className="bg-gray-800 text-white">Konut</option>
                      <option value={2} className="bg-gray-800 text-white">İşyeri</option>
                    </select>
                  </div>
                  {errors.type && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-300 text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.type}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 group-focus-within:text-purple-400 transition-colors duration-300" />
                    <input
                      name="contract_duration"
                      placeholder="Sözleşme Süresi (Ay)"
                      type="number"
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${errors.contract_duration ? 'border-red-400' : formData.contract_duration ? 'border-green-400' : ''}`}
                      value={formData.contract_duration}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.contract_duration && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-300 text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.contract_duration}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 group-focus-within:text-purple-400 transition-colors duration-300" />
                    <input
                      name="rent_amount"
                      placeholder="Kira Tutarı (₺)"
                      type="number"
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${errors.rent_amount ? 'border-red-400' : formData.rent_amount ? 'border-green-400' : ''}`}
                      value={formData.rent_amount}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.rent_amount && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-300 text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.rent_amount}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 group-focus-within:text-purple-400 transition-colors duration-300" />
                  <input
                    name="start_date"
                    type="date"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${errors.start_date ? 'border-red-400' : formData.start_date ? 'border-green-400' : ''}`}
                    value={formData.start_date}
                    onChange={handleChange}
                  />
                </div>
                {errors.start_date && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-300 text-sm flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.start_date}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-green-400" />
                Ek Bilgiler
              </h3>
              
              <div className="space-y-2">
                <div className="relative group">
                  <FileText className="absolute left-4 top-4 text-green-300 group-focus-within:text-green-400 transition-colors duration-300" />
                  <textarea
                    name="description"
                    placeholder="Açıklama"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none ${errors.description ? 'border-red-400' : formData.description ? 'border-green-400' : ''}`}
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                {errors.description && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-300 text-sm flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Güncelleniyor...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Güncelle
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
      
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} />
    </div>
  );
};

export default EditTenantPage;