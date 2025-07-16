import React, { useState } from 'react';

const TABS = [
  { key: 'login', label: 'Giriş Yap' },
  { key: 'register', label: 'Kaydol' },
];

const initialLogin = { email: '', password: '' };
const initialRegister = {
  name: '',
  surname: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const validateEmail = email => /\S+@\S+\.\S+/.test(email);
const validatePassword = password => password.length >= 6;

const AuthModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState(initialLogin);
  const [registerData, setRegisterData] = useState(initialRegister);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleTabChange = tab => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
  };

  const handleInput = (e, isRegister = false) => {
    const { name, value } = e.target;
    if (isRegister) {
      setRegisterData(prev => ({ ...prev, [name]: value }));
    } else {
      setLoginData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateEmail(loginData.email)) {
      setError('Geçerli bir e-posta girin.');
      return;
    }
    if (!validatePassword(loginData.password)) {
      setError('Şifre en az 6 karakter olmalı.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://kira.alikvkli.dev/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Giriş başarısız.');
      setSuccess('Giriş başarılı!');
      setTimeout(onClose, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validateEmail(registerData.email)) {
      setError('Geçerli bir e-posta girin.');
      return;
    }
    if (!validatePassword(registerData.password)) {
      setError('Şifre en az 6 karakter olmalı.');
      return;
    }
    if (registerData.password !== registerData.password_confirmation) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://kira.alikvkli.dev/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Kayıt başarısız.');
      setSuccess('Kayıt başarılı! Giriş yapabilirsiniz.');
      setTimeout(() => setActiveTab('login'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 focus:outline-none"
          onClick={onClose}
          aria-label="Kapat"
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClose()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="flex mb-6 border-b">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`flex-1 py-2 text-lg font-semibold focus:outline-none ${activeTab === tab.key ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500'}`}
              onClick={() => handleTabChange(tab.key)}
              aria-selected={activeTab === tab.key}
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="E-posta"
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={loginData.email}
              onChange={handleInput}
              required
              aria-label="E-posta"
            />
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={loginData.password}
              onChange={handleInput}
              required
              aria-label="Şifre"
            />
            {error && <div className="text-red-600 text-sm" role="alert">{error}</div>}
            {success && <div className="text-green-600 text-sm" role="status">{success}</div>}
            <button
              type="submit"
              className="w-full py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                placeholder="Ad"
                className="border rounded px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-400"
                value={registerData.name}
                onChange={e => handleInput(e, true)}
                required
                aria-label="Ad"
              />
              <input
                type="text"
                name="surname"
                placeholder="Soyad"
                className="border rounded px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-400"
                value={registerData.surname}
                onChange={e => handleInput(e, true)}
                required
                aria-label="Soyad"
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Telefon"
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={registerData.phone}
              onChange={e => handleInput(e, true)}
              required
              aria-label="Telefon"
            />
            <input
              type="email"
              name="email"
              placeholder="E-posta"
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={registerData.email}
              onChange={e => handleInput(e, true)}
              required
              aria-label="E-posta"
            />
            <input
              type="password"
              name="password"
              placeholder="Şifre (min. 6 karakter)"
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={registerData.password}
              onChange={e => handleInput(e, true)}
              required
              aria-label="Şifre"
            />
            <input
              type="password"
              name="password_confirmation"
              placeholder="Şifre Tekrar"
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={registerData.password_confirmation}
              onChange={e => handleInput(e, true)}
              required
              aria-label="Şifre Tekrar"
            />
            {error && <div className="text-red-600 text-sm" role="alert">{error}</div>}
            {success && <div className="text-green-600 text-sm" role="status">{success}</div>}
            <button
              type="submit"
              className="w-full py-2 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Kaydolunuyor...' : 'Kaydol'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal; 