// ViewUserModal.jsx
import React from 'react';
import './ViewUserModal.css';

const ViewUserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="view-user-modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn" style={{backgroundColor:"#fff", color:"#000"}}>×</button>
        <h2>User Details</h2>
        <div className="user-info">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>User Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Role:</strong> {user.user_type}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
