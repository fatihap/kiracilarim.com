import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/app_icon.png';

const Navbar = ({ isLoggedIn, user, onLogout }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Kiracılarım', path: '/tenants' },
    { name: 'Profil', path: '/profile' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              className="h-9 w-9 rounded-full border-2 border-blue-600"
              src={logo}
              alt="Kiracılarım Logo"
            />
            <span className="text-2xl font-extrabold text-blue-700 tracking-wide">
              Kiracılarım
            </span>
          </Link>

          {/* Menü */}
          <div className="flex items-center space-x-6">
            {!isLoggedIn ? (
              <>
                {/* Giriş yapılmamışsa buraya Login/Register butonları eklenebilir */}
              </>
            ) : (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive(item.path)
                        ? 'text-blue-700 bg-blue-100'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Çıkış butonu */}
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition duration-300 shadow-sm hover:shadow-md"
                >
                  Çıkış
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
