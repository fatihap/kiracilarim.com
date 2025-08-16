import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// React bileşeni için ana container
const Register = () => {
  const navigate = useNavigate();
  
  // Form verilerini yönetmek için state
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Hata mesajlarını ve alanların geçerlilik durumunu tutmak için state'ler
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  
  // E-posta ve şifre alanlarının geçerliliğini anlık kontrol etmek için state'ler
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(null);

  // Şifre alanlarının görünürlüğünü kontrol etmek için state'ler
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  // E-posta formatını anlık kontrol etme
  useEffect(() => {
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(formData.email));
    } else {
      setIsEmailValid(null);
    }
  }, [formData.email]);

  // Şifrelerin eşleşip eşleşmediğini anlık kontrol etme
  useEffect(() => {
    if (formData.password_confirmation) {
      setDoPasswordsMatch(formData.password === formData.password_confirmation);
    } else {
      setDoPasswordsMatch(null);
    }
  }, [formData.password, formData.password_confirmation]);


  const handleChange = (e) => {
    let { name, value } = e.target;

    // Telefon numarası alanı için özel mantık
    if (name === 'phone') {
      // Sadece rakamlara izin ver ve 11 karakterle sınırla
      value = value.replace(/[^0-9]/g, '').slice(0, 11);
      // Kullanıcı 5 ile başlayan bir numara girerse, otomatik olarak başına '0' ekle
      // Bu, `05`'li numaralar için kullanıcı dostu bir yaklaşımdır.
      if (value.length > 0 && value.startsWith('5') && !value.startsWith('0')) {
        value = '0' + value;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Kullanıcı yazmaya başladığında ilgili hatayı temizle
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Telefon numarası kontrolü (zorunlu değil, ancak girildiyse geçerli olmalı)
    // Telefon numarası boş değilse, "05" ile başlamalı ve 11 haneli olmalıdır.
    if (formData.phone.length > 0 && (!formData.phone.startsWith('05') || formData.phone.length !== 11)) {
      newErrors.phone = 'Telefon numarası "05" ile başlamalı ve 11 haneli olmalıdır.';
    }

    // E-posta formatı kontrolü
    if (!isEmailValid) {
      newErrors.email = 'Lütfen geçerli bir e-posta adresi girin.';
    }

    // Şifre eşleşme kontrolü
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Şifreler uyuşmuyor.';
    }
    
    // Şifre uzunluk kontrolü (isteğe bağlı ama önerilir)
    if (formData.password.length < 6) {
        newErrors.password = 'Şifre en az 6 karakter olmalıdır.';
    }

    setErrors(newErrors);
    // Eğer newErrors nesnesi boş ise, form geçerlidir.
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return; // Form geçerli değilse gönderme
    }

    try {
      const response = await fetch('https://kiracilarim.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // API'den gelen spesifik hata mesajlarını yakala
        if (data.errors) {
            const errorMessages = Object.values(data.errors).flat().join(' ');
            throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Kayıt işlemi sırasında bir hata oluştu.');
      }

      // Başarılı kayıt sonrası login sayfasına yönlendir
      navigate('/login');

    } catch (err) {
      setApiError(err.message);
    }
  };
  
  // Alanların kenarlık rengini belirleyen yardımcı fonksiyon
  const getBorderColor = (isValid) => {
    if (isValid === null) return 'border-gray-300';
    return isValid ? 'border-green-500 focus:ring-green-500' : 'border-red-500 focus:ring-red-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-1">Kiracılarım.com</h1>
          <p className="text-gray-500 text-sm">Yeni bir hesap oluşturun.</p>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Kayıt Ol</h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Zaten bir hesabınız var mı?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Giriş yapın
          </Link>
        </p>

        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ad ve Soyad Alanları */}
          <div className="flex gap-4">
            <div className="relative w-1/2">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input name="name" type="text" required placeholder="Ad" value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="relative w-1/2">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input name="surname" type="text" required placeholder="Soyad" value={formData.surname} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Telefon Numarası Alanı - Artık zorunlu değil */}
          <div className="relative">
            <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input name="phone" type="tel" placeholder="Telefon (05XX XXX XX XX)" value={formData.phone} onChange={handleChange} onBlur={validateForm} className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} />
            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
          </div>

          {/* E-posta Alanı */}
          <div className="relative">
            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input name="email" type="email" required placeholder="E-posta adresi" value={formData.email} onChange={handleChange} className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${getBorderColor(isEmailValid)}`} />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
          </div>

          {/* Şifre Alanı */}
          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input name="password" type={passwordShown ? "text" : "password"} required placeholder="Şifre" value={formData.password} onChange={handleChange} className={`w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`} />
            <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} onClick={() => setPasswordShown(!passwordShown)} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-600" />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>

          {/* Şifre Tekrarı Alanı */}
          <div className="relative">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input name="password_confirmation" type={confirmPasswordShown ? "text" : "password"} required placeholder="Şifre Tekrar" value={formData.password_confirmation} onChange={handleChange} className={`w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${getBorderColor(doPasswordsMatch)}`} />
            <FontAwesomeIcon icon={confirmPasswordShown ? faEyeSlash : faEye} onClick={() => setConfirmPasswordShown(!confirmPasswordShown)} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-600" />
            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password_confirmation}</p>}
          </div>

          {/* Submit Butonu */}
          <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Hesap Oluştur
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
