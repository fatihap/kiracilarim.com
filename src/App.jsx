import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TenantsPage from './components/TenantsPage';
import TenantDetailPage from './components/TenantDetails/TenantDetailPage';
import AddTenantPage from './components/AddTenantPage';
import EditTenantPage from './components/EditTenantPage';
import Profile from './components/Profile';
import ContactPage from './components/ContactPage';
// Analytics
import { trackPageView } from './utils/analytics';

// Route tracking component
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Her route değişikliğinde sayfa görüntüleme event'i gönder
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Private route component
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Helmet>
        <html lang="tr" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <RouteTracker />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col">
        <Navbar
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUser(null);
          }}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login onLogin={setIsLoggedIn} setUser={setUser} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/tenants"
              element={
                <PrivateRoute>
                  <TenantsPage />
                </PrivateRoute>
              }
            />
            <Route path='/tenants/:id'
              element={
                <PrivateRoute>
                  <TenantDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-tenant"
              element={
                <PrivateRoute>
                  <AddTenantPage />
                </PrivateRoute>
              }
            />
            <Route
            path='/kiraci-duzenle'
            element={
              <PrivateRoute>
                <EditTenantPage/>
              </PrivateRoute>
            }
            ></Route>
            <Route path='/profile'
            element={
             <Profile/>

            }
            />
            <Route path='/contact' element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={2500} />
      </div>
    </Router>
  );
}

export default App;
