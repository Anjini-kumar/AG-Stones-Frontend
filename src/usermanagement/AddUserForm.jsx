import React, { useState } from 'react';
import './AddUserForm.css';

const AddUserForm = ({ onAddUser }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    userType: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/create-user/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            username: userData.name,
            email: userData.email,
            user_type: userData.userType,
            mobile: userData.mobile,
            gender: userData.gender,
            password: userData.password,
          })
        });
        if (response.ok) {
          onAddUser(await response.json());
        } else {
          setError('Failed to add user');
        }
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
        <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />

        <label>Mobile:</label>
        <input type="text" name="mobile" value={userData.mobile} onChange={handleInputChange} required />

        <label>Gender:</label>
        <select name="gender" value={userData.gender} onChange={handleInputChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>User Type:</label>
        <select name="userType" value={userData.userType} onChange={handleInputChange} required>
          <option value="">Select User Type</option>
          <option value="Admin">Admin</option>
          <option value="Procurement">Procurement Team</option>
          <option value="Warehouse">Warehouse</option>
        </select>

        <label>Password:</label>
        <input type="password" name="password" value={userData.password} onChange={handleInputChange} required />

        <label>Re-enter Password:</label>
        <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} required />

        {error && <p className="error">{error}</p>}

        <button type="submit" className="add-user-button">Add User</button>
      </form>
    </div>
  );
};

export default AddUserForm;
