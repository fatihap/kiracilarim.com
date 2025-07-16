import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTenantPage = () => {
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

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      name: form.name,
      surname: form.surname,
      phone: form.phone,
      address: form.address,
      type: parseInt(form.type),
      contract_duration: parseInt(form.contract_duration),
      rent_amount: parseInt(form.rent_amount),
      start_date: form.start_date,
      description: form.description || null
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://kiracilarim.com/api/tenant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Ekleme başarısız');

      navigate('/tenants');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Yeni Kiracı Ekle</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              name="name"
              placeholder="Ad"
              required
              className="w-1/2 p-3 border rounded"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="surname"
              placeholder="Soyad"
              required
              className="w-1/2 p-3 border rounded"
              value={form.surname}
              onChange={handleChange}
            />
          </div>

          <input
            name="phone"
            placeholder="Telefon (05XXXXXXXXX)"
            required
            className="w-full p-3 border rounded"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Adres"
            required
            className="w-full p-3 border rounded"
            rows={2}
            value={form.address}
            onChange={handleChange}
          />

          <select
            name="type"
            required
            className="w-full p-3 border rounded"
            value={form.type}
            onChange={handleChange}
          >
            <option value="1">Daire</option>
            <option value="2">Dükkan</option>
          </select>

          <input
            name="contract_duration"
            placeholder="Sözleşme Süresi (Ay)"
            type="number"
            required
            className="w-full p-3 border rounded"
            value={form.contract_duration}
            onChange={handleChange}
          />

          <input
            name="rent_amount"
            placeholder="Kira Tutarı (₺)"
            type="number"
            required
            className="w-full p-3 border rounded"
            value={form.rent_amount}
            onChange={handleChange}
          />

          <input
            name="start_date"
            type="date"
            required
            className="w-full p-3 border rounded"
            value={form.start_date}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Açıklama (İsteğe bağlı)"
            className="w-full p-3 border rounded"
            rows={2}
            value={form.description}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Kiracıyı Ekle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTenantPage;
