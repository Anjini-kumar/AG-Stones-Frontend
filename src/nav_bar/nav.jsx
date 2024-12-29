import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/AG-LOGO.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const userType = localStorage.getItem('user_type');

  // Function to close the menu when a link is clicked
  const handleMenuItemClick = () => {
    setMenuOpen(false); // Close the menu
  };

  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => 
                {if (data.user_type === "Admin") {
                  navigate("/dashboard");
                } else if (data.user_type === "Procurement") {
                  navigate("/productManagement");
                } else if (data.user_type === "Warehouse") {
                  navigate("/warehouse");
                }}}>
        <img src={logo} alt="Logo" />
      </div>
      <button
        className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          backgroundColor: 'white',
        }}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        {userType === 'Warehouse' ? (
          <ul className="navbar-menu">
            <li>
              <Link to="/warehouse" className={location.pathname === '/warehouse' ? 'active' : ''} onClick={handleMenuItemClick}>Offers</Link>
            </li>
            <li>
              <Link to="/record" className={location.pathname === '/record' ? 'active' : ''} onClick={handleMenuItemClick}>Re Order</Link>
            </li>
            <li>
              <Link to="/message" className={location.pathname === '/message' ? 'active' : ''} onClick={handleMenuItemClick}>Message</Link>
            </li>
          </ul>
        ) : userType === 'Procurement' ? (
          <ul className="navbar-menu">
            <li>
              <Link to="/productManagement" className={location.pathname === '/productManagement' ? 'active' : ''} onClick={handleMenuItemClick}>Product Management</Link>
            </li>
            <li>
              <Link to="/productMaster" className={location.pathname === '/productMaster' ? 'active' : ''} onClick={handleMenuItemClick}>Product Master</Link>
            </li>
            <li>
              <Link to="/record" className={location.pathname === '/record' ? 'active' : ''} onClick={handleMenuItemClick}>Re Order</Link>
            </li>
            <li>
              <Link to="/message" className={location.pathname === '/message' ? 'active' : ''} onClick={handleMenuItemClick}>Message</Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-menu">
            <li>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''} onClick={handleMenuItemClick}>Dashboard</Link>
            </li>
            <li>
              <Link to="/userManagement" className={location.pathname === '/userManagement' ? 'active' : ''} onClick={handleMenuItemClick}>User Management</Link>
            </li>
            <li>
              <Link to="/productManagement" className={location.pathname === '/productManagement' ? 'active' : ''} onClick={handleMenuItemClick}>Product Management</Link>
            </li>
            <li>
              <Link to="/productMaster" className={location.pathname === '/productMaster' ? 'active' : ''} onClick={handleMenuItemClick}>Product Master</Link>
            </li>
            <li>
              <Link to="/warehouse" className={location.pathname === '/warehouse' ? 'active' : ''} onClick={handleMenuItemClick}>Offers</Link>
            </li>
            <li>
              <Link to="/record" className={location.pathname === '/record' ? 'active' : ''} onClick={handleMenuItemClick}>Re Order</Link>
            </li>
            <li>
              <Link to="/message" className={location.pathname === '/message' ? 'active' : ''} onClick={handleMenuItemClick}>Message</Link>
            </li>
          </ul>
        )}
      </div>
      <button className="logout-button" onClick={handleLogout} style={{ backgroundColor: "#ffd200" }}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Navbar;
