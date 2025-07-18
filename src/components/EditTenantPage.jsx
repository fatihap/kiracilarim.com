import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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

   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'contract_duration' || name === 'rent_amount' || name === 'type'
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setTimeout(()=> navigate('/tenants'), 2000); 


      } else {
        const result = await response.json();
            toast.error(result.message || "Güncelleme başarısız oldu.");

      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  if (!tenant) {
    return <div className="text-center mt-10 text-red-500">Kiracı bilgisi alınamadı.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Kiracı Bilgilerini Güncelle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleChange} required
              className="border rounded px-3 py-2 w-full" placeholder="Ad" />
            <input name="surname" value={formData.surname} onChange={handleChange} required
              className="border rounded px-3 py-2 w-full" placeholder="Soyad" />
          </div>

          <input name="phone" value={formData.phone} onChange={handleChange} required
            className="border rounded px-3 py-2 w-full" placeholder="Telefon" />

          <input name="address" value={formData.address} onChange={handleChange} required
            className="border rounded px-3 py-2 w-full" placeholder="Adres" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="number" name="contract_duration" value={formData.contract_duration} onChange={handleChange} required
              className="border rounded px-3 py-2 w-full" placeholder="Sözleşme Süresi (ay)" />
            <input type="number" name="rent_amount" value={formData.rent_amount} onChange={handleChange} required
              className="border rounded px-3 py-2 w-full" placeholder="Kira Tutarı (₺)" />
          </div>

          <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required
            className="border rounded px-3 py-2 w-full" />

          <textarea name="description" value={formData.description} onChange={handleChange}
            className="border rounded px-3 py-2 w-full" placeholder="Açıklama" rows={3} />

          <select name="type" value={formData.type} onChange={handleChange} required
            className="border rounded px-3 py-2 w-full">
            <option value={1}>Konut</option>
            <option value={2}>İşyeri</option>
          </select>

          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => navigate(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
              Geri Dön
            </button>
            <button type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Güncelle
            </button>
          </div>
        </form>
        
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} />
      </div>
    </div>
  );
};

export default EditTenantPage;