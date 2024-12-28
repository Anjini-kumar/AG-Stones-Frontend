import React, { useEffect, useState } from 'react';
import './usermanagement.css';
import { FaEllipsisV } from 'react-icons/fa';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import ViewUserModal from './ViewUserModal';
import axios from 'axios';

const Usermanagement = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Add searchTerm state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { 
          // If token is not found, 
          // redirect to login page 
          window.location.href = '/';
          return; 
        }
        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 401) { 
          // If token is expired or invalid, redirect to login page 
          window.location.href = '/'; 
          return;
        }

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleAddUserForm = () => {
    setIsAddUserFormOpen(!isAddUserFormOpen);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setIsAddUserFormOpen(false);
  };

  const toggleDropdown = (userId) => {
    setDropdownOpen(dropdownOpen === userId ? null : userId);
  };

  const handleView = (user) => {
    setViewingUser(user);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:8000/api/users/${userId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 204) {
          setUsers(users.filter((user) => user.id !== userId));
          alert('User successfully deleted.');
        }
      } catch (error) {
        console.error('Error deleting user:', error.response?.data || error.message);
        alert(error.response?.data?.detail || 'Failed to delete user.');
      }
    }
  };  

  const handleSaveUser = async (updatedUser) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:8000/api/users/${updatedUser.id}/`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map((user) => (user.id === updatedUser.id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleCloseView = () => {
    setViewingUser(null);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <h1>User Management</h1>
      <div className="search-and-add">
        <input 
          type="text" 
          placeholder="Search by User Name..." 
          style={{
            padding: "0.8rem",
            width: "50%",
            maxWidth: "400px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}  
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={toggleAddUserForm} 
        style={{
            padding: "0.8rem 1.2rem",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}>
            Add User
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.gender}</td>
              <td>{user.user_type}</td>
              <td>
                <button onClick={() => toggleDropdown(user.id)} className="action-btn" style={{
                  backgroundColor:"white",
                  color:"#3498db",
                }}>
                  <FaEllipsisV />
                </button>
                {dropdownOpen === user.id && (
                  <div className="dropdown-menu">
                    <div onClick={() => handleView(user)} className="dropdown-item">View</div>
                    <div onClick={() => handleEdit(user)} className="dropdown-item">Edit</div>
                    <div onClick={() => handleDelete(user.id)} className="dropdown-item">Delete</div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddUserFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={toggleAddUserForm} className="close-btn">×</button>
            <AddUserForm onAddUser={handleAddUser} />
          </div>
        </div>
      )}

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={handleCancelEdit} className="close-btn">×</button>
            <EditUserForm user={editingUser} onSave={handleSaveUser} onCancel={handleCancelEdit} />
          </div>
        </div>
      )}

      {viewingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ViewUserModal user={viewingUser} onClose={handleCloseView} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Usermanagement;
