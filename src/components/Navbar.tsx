import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="navbar">
      {isAuthenticated ? (
        <div className="navbar-menu">          
          {isAdmin && (
            <Link to="/dashboard/admin"></Link>
          )}
          
          {!isAdmin && (
            <Link to="/dashboard/member"></Link>
          )}
          
          {/* <div className="navbar-user">
            <span>Hi, {user?.username} ({user?.role})</span>
            <button onClick={handleLogout}>Logout</button>
          </div> */}
        </div>
      ) : (
       null
      )}
    </nav>
  );
};

export default Navbar;