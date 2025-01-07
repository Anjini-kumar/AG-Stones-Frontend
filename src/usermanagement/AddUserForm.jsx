import React, { useState } from 'react';
import './AddUserForm.css';
import { createUser } from './../Apis/endpoints';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the required CSS for phone input styling

const AddUserForm = ({ onAddUser }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '', // This will now include the country code
    userType: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setUserData({ ...userData, mobile: value }); // Update mobile with country code
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      try {
        const userPayload = {
          username: userData.name,
          email: userData.email,
          user_type: userData.userType,
          mobile: userData.mobile, // Mobile already includes country code
          password: userData.password,
        };

        const newUser = await createUser(userPayload);
        onAddUser(newUser); // Add the new user to the list
      } catch (error) {
        setError('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="add-user-form">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>User Name:</label>
        <input type="text" name="name" value={userData.name} onChange={handleInputChange} required />

        <label>Email:</label>
        <input type="email" 
        name="email" 
        value={userData.email} 
        onChange={handleInputChange} 
        required 
        style={{
          width: '100%',
        }}/>

        <label>Mobile:</label>
        <div
  style={{
    width: '100%',
  }}
>
  <PhoneInput
    country={'us'} 
    value={userData.mobile}
    onChange={handlePhoneChange}
    inputProps={{
      name: 'mobile',
      required: true,
      autoFocus: true,
    }}
    containerStyle={{
      width: '100%',
      height: '45px',
    }}
    inputStyle={{
      width: '100%',
      height: '45px', 
      fontSize: '1rem', 
    }}
  />
</div>


        <label>User Type:</label>
        <select name="userType" value={userData.userType} onChange={handleInputChange} required
            style={{
              width: '100%',
              height:'45px',
            }}
                    >
          <option value="">Select User Type</option>
          <option value="Admin">Admin</option>
          <option value="Procurement">Procurement Team</option>
          <option value="Warehouse">Warehouse</option>
        </select>

        <label>Password:</label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              height:'45px'
            }}
          />
          <div className="eye-icon" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        <label>Re-enter Password:</label>
        <div className="password-input-container">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              height:'45px'
            }}
          />
          <div className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
            {confirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="add-user-button" style={{ backgroundColor: '#ffd200' }}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
