import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTenantPage = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: '',
    surname: '',
    phone: '',
    address: '',
    type: '1',
    contract_duration: '',
    rent_amount: '',
    start_date: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      value = value.replace(/[^0-9]/g, '').slice(0, 11);
      if (value.length > 0 && value.startsWith('5') && !value.startsWith('0')) {
        value = '0' + value;
      }
    }
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Ad alanı zorunludur.';
    if (!form.surname.trim()) newErrors.surname = 'Soyad alanı zorunludur.';
    if (!form.phone.trim()) newErrors.phone = 'Telefon alanı zorunludur.';
    else if (!form.phone.startsWith('05') || form.phone.length !== 11) {
      newErrors.phone = 'Telefon numarası "05" ile başlamalı ve 11 haneli olmalıdır.';
    }
    if (!form.address.trim()) newErrors.address = 'Adres alanı zorunludur.';
    if (!form.contract_duration) newErrors.contract_duration = 'Sözleşme süresi zorunludur.';
    if (!form.rent_amount) newErrors.rent_amount = 'Kira tutarı zorunludur.';
    if (!form.start_date) newErrors.start_date = 'Başlangıç tarihi zorunludur.';
    if (!form.type) newErrors.type = 'Tip seçimi zorunludur.';
    if (!form.description.trim()) newErrors.description = 'Açıklama alanı zorunludur.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validateForm()) return;

    const payload = {
      name: form.name,
      surname: form.surname,
      phone: form.phone,
      address: form.address,
      type: parseInt(form.type),
      contract_duration: parseInt(form.contract_duration),
      rent_amount: parseInt(form.rent_amount),
      start_date: form.start_date,
      description: form.description
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://kiracilarim.com/api/tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(' ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Ekleme başarısız');
      }

      navigate('/tenants');
    } catch (err) {
      setApiError(err.message);
    }
  };

  const getBorderColor = (field) => {
    if (errors[field]) return 'border-red-400 focus:ring-red-300';
    if (form[field]) return 'border-green-400 focus:ring-green-200';
    return 'border-gray-300 focus:ring-blue-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-3xl bg-white p-12 rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-2">Yeni Kiracı Ekle</h2>
        <p className="text-gray-500 text-center mb-8">Formu doldurarak hızlıca yeni bir kiracı kaydı oluşturun.</p>

        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-6 text-center">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Ad"
              className={`p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${getBorderColor('name')} transition duration-200`}
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

            <input
              name="surname"
              placeholder="Soyad"
              className={`p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${getBorderColor('surname')} transition duration-200`}
              value={form.surname}
              onChange={handleChange}
            />
            {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
          </div>

          <input
            name="phone"
            placeholder="Telefon (05XX XXX XX XX)"
            type="tel"
            className={`w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${getBorderColor('phone')} transition duration-200`}
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

          <textarea
            name="address"
            placeholder="Adres"
            className={`w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 resize-none ${getBorderColor('address')} transition duration-200`}
            rows={3}
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              name="type"
              className={`p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${getBorderColor('type')} transition duration-200`}
              value={form.type}
              onChange={handleChange}
            >
              <option value="1">Daire</option>
              <option value="2">Dükkan</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}

            <input
              name="contract_duration"
              placeholder="Sözleşme Süresi (Ay)"
              type="number"
              className={`p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${getBorderColor('contract_duration')} transition duration-200`}
              value={form.contract_duration}
              onChange={handleChange}
            />
            {errors.contract_duration && <p className="text-red-500 text-sm mt-1">{errors.contract_duration}</p>}

            <input
              name="rent_amount"
              placeholder="Kira Tutarı (₺)"
              type="number"
              className={`p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${getBorderColor('rent_amount')} transition duration-200`}
              value={form.rent_amount}
              onChange={handleChange}
            />
            {errors.rent_amount && <p className="text-red-500 text-sm mt-1">{errors.rent_amount}</p>}
          </div>

          <input
            name="start_date"
            type="date"
            className={`w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 ${getBorderColor('start_date')} transition duration-200`}
            value={form.start_date}
            onChange={handleChange}
          />
          {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}

          <textarea
            name="description"
            placeholder="Açıklama"
            className={`w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 resize-none ${getBorderColor('description')} transition duration-200`}
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          >
            Kiracıyı Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTenantPage;
