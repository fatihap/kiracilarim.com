import { Link } from 'react-router-dom';
import logo from '../assets/app_icon.png';

const Navbar = ({ isLoggedIn, user, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
              <img 
                className="h-8 w-8 rounded-full border-2 border-blue-600" 
                src={logo} 
                alt="Kiracılarım Logo" 
              />
              <span className="text-xl font-bold text-blue-700">Kiracılarım</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
               

              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Hoş geldiniz, {user?.name}</span>
                  <button
                    onClick={onLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300 shadow-sm hover:shadow-md"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
