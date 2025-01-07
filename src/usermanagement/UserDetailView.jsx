import React from 'react';
import './UserDetailView.css';

const UserDetailView = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="user-detail-view">
      <div className="user-detail-header">
        <h2>User Details</h2>
      </div>
      <div className="user-detail-body">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <div className="user-detail-footer">
        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailView;
