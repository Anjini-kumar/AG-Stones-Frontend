// EditUserForm.jsx
import React, { useState } from 'react';
import './EditUserForm.css';

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [userData, setUserData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
  };

  return (
    <div className="edit-user-form">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>User Name:</label>
        <input type="text" name="name" value={userData.username} onChange={handleInputChange} required />

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
        <select name="role" value={userData.user_type} onChange={handleInputChange} required>
          <option value="">Select User Type</option>
          <option value="Admin">Admin</option>
          <option value="Procurement">Procurement Team</option>
          {/* <option value="Bidder">Bidder</option> */}
          <option value="Warehouse">Warehouse</option>
        </select>

        <div className="form-buttons">
          <button type="submit" className="save-button" style={{backgroundColor:"#ffd200"}}>Save</button>
          <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
