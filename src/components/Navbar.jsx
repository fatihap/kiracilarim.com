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

         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
