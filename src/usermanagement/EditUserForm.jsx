import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import the required CSS for phone input styling
import './EditUserForm.css';

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [userData, setUserData] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setUserData({ ...userData, mobile: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userData);
  };

  return (
    <div className="edit-user-form">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            height:'45px',
          }}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
          style={{
            width: '100%',
            height:'45px',
          }}
        />

        <label>Mobile:</label>
        <PhoneInput
          country={'us'} // Set default country
          value={userData.mobile}
          onChange={handlePhoneChange}
          inputProps={{
            name: 'mobile',
            required: true,
          }}
          containerStyle={{
            marginBottom: '1rem',
            width: '100%',
          }}
          inputStyle={{
            width: '100%',
            height: '45px',
            fontSize: '1rem',
          }}
        />

        {/* <label>Password:</label>
        <input
          type="password"
          name="password"
          value={userData.password || ''}
          onChange={handleInputChange}
          style={{
            width: '100%',
            height:'45px',
          }}
        /> */}

        <label>User Type:</label>
        <select
          name="user_type"
          value={userData.user_type}
          onChange={handleInputChange}
          required
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

        <button type="submit" className="edit-user-button" style={{ backgroundColor: '#ffd200' }}>        
            Save
          </button>
          {/* <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button> */}
      </form>
    </div>
  );
};

export default EditUserForm;
