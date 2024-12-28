import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaSearch, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/AG-LOGO.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh');
    try {
      await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ refresh }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      localStorage.removeItem('user_type')
      navigate('/');
    }
  };

  const userType = localStorage.getItem('user_type');

  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
        <img src={logo} alt="AG STONES Logo" />
      </div>
      <div className="navbar-links">
        {userType === 'Warehouse' ? (
          <ul className="navbar-menu">
            <li>
              <Link to="/warehouse" className={location.pathname === '/warehouse' ? 'active' : ''}>Offers</Link>
            </li>
            <li>
              <Link to="/record" className={location.pathname === '/record' ? 'active' :''}> Re Order </Link>
            </li>
            <li>
              <Link to="/message" className={location.pathname === '/message' ? 'active' : ''}>Message</Link>
            </li>
          </ul>
        ) : userType === 'Procurement' ? (
          <ul className="navbar-menu">
            <li>
              <Link to="/productManagement" className={location.pathname === '/productManagement' ? 'active' : ''}>ProductManagement</Link>
            </li>
            <li>
              <Link to="/productMaster" className={location.pathname === '/productMaster' ? 'active' : ''}>ProductMaster</Link>
            </li>
            <li>
              <Link to="/record" className={location.pathname === '/record' ? 'active' :''}> Re Order </Link>
            </li>
            <li>
              <Link to="/message" className={location.pathname === '/message' ? 'active' : ''}>Message</Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-menu">
            <li>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
            </li>
            <li>
              <Link to="/userManagement" className={location.pathname === '/userManagement' ? 'active' : ''}>User  Management</Link>
            </li>
            <li>
              <Link to="/productManagement" className={location.pathname === '/productManagement' ? 'active' : ''}>ProductManagement</Link>
            </li>
            <li>
              <Link to="/productMaster" className={location.pathname === '/productMaster' ? 'active' : ''}>ProductMaster</Link>
            </li>
            <li>
              <Link to="/warehouse" className={location.pathname === '/warehouse' ? 'active' : ''}>Offers</Link>
            </li>
            <li>
              <Link to="/record" className={location.pathname === '/record' ? 'active' :''}> Re Order </Link>
            </li>
            <li>
              <Link to="/message" className={location.pathname === '/message' ? 'active' : ''}>Message</Link>
            </li>
          </ul>
        )}
      </div>
      <button className="logout-button" onClick={handleLogout} style={{backgroundColor:"#ffd200"}}>
        <FaSignOutAlt /> Logout
      </button>
  </div>
  );
};

export default Navbar;