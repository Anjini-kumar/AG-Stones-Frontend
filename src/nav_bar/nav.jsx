import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/AG-LOGO.png';
import API_BASE_URL from './../Apis/endpoints';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [passwordPopupOpen, setPasswordPopupOpen] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });


  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const userType = localStorage.getItem('user_type');
  const username = localStorage.getItem('user');

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };


  const togglePopup = () => {
    setPopupOpen(!popupOpen);
  };

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const togglePasswordPopup = () => {
    setPasswordPopupOpen(!passwordPopupOpen);
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Adjust based on how you're storing the token

      const response = await fetch(`${API_BASE_URL}/change-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      if (response.ok) {
        alert('Password changed successfully!');
        setPasswordPopupOpen(false);
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        localStorage.clear();
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.detail || 'Failed to change password.');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleNotifications = () => {
    // Logic for showing notifications
    alert('Notifications functionality goes here.');
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
            <Link to="/approvedproducts" className={location.pathname === '/approvedproducts' ? 'active' : ''} onClick={handleMenuItemClick}>Confirmed Orders</Link>
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
              <Link to="/approvedproducts" className={location.pathname === '/approvedproducts' ? 'active' : ''} onClick={handleMenuItemClick}>Confirmed Orders </Link>
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
              <Link to="/approvedproducts" className={location.pathname === '/approvedproducts' ? 'active' : ''} onClick={handleMenuItemClick}>Confirmed Orders</Link>
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
      <div className="user-icon-wrapper" style={{marginRight:"20px"}}>
      <div className="user-initial" onClick={togglePopup}>
        {username.charAt(0).toUpperCase()}
      </div>
      {popupOpen && (
        <div className="user-popup">
          <ul>
            <li onClick={togglePasswordPopup}>Change Password</li>
            <li onClick={() => alert('Notifications feature Coming soon...')}>Notifications</li>
            <li onClick={handleLogout}>
              Logout <FaSignOutAlt />
            </li>
          </ul>
        </div>
      )}

      {/* Password Change Popup */}
      {passwordPopupOpen && (
        <div className="password-popup">
          <div className="password-popup-content">
            <h2>Change Password</h2>
            <div className="form-group">
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handleInputChange}
                placeholder="Enter old password"
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
              />
            </div>
            <div className="popup-actions">
              <button className="btn-cancel" onClick={togglePasswordPopup} style={{backgroundColor:"#d32f2f",}}>
                Cancel
              </button>
              <button className="btn-submit" onClick={handleChangePassword} style={{backgroundColor:"#ffd200",}}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Navbar;
