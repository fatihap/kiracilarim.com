import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// Components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TenantsPage from './components/TenantsPage';
import TenantDetailPage from './components/TenantDetails/TenantDetailPage';
import AddTenantPage from './components/AddTenantPage'; 
import EditTenantPage from './components/EditTenantPage';
import Profile from './components/Profile';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
        <Navbar
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={() => {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUser(null);
          }}
        />
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
        </Routes>
                <ToastContainer position="top-right" autoClose={2500} />

      </div>
    </Router>
  );
}

export default App;
