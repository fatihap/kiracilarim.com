import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


const Login = ({ onLogin, setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    navigate('/tenants')

    try {
      const response = await fetch('https://kiracilarim.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Giriş başarısız');

      localStorage.setItem('token', data.token);
      onLogin(true);
      setUser(data.user);
      navigate('/tenants');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-1">Kiracılarım.com</h1>
          <p className="text-gray-500 text-sm">Kiranı kolayca takip et.</p>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Giriş Yap</h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Hesabınız yok mu?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Hemen kayıt olun
          </Link>
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E-posta adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              id="password"
              name="password"
              type={passwordShown ? "text" : "password"}
              required
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faEye}
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
