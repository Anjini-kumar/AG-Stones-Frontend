import React, { useEffect, useState } from 'react';
import './usermanagement.css';
import { FaEllipsisV } from 'react-icons/fa';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import ViewUserModal from './ViewUserModal';
import axios from 'axios';
import { fetchUsers ,deleteUser, updateUser  } from "./../Apis/endpoints";


const Usermanagement = () => {
  const [users, setUsers] = useState([]);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers(); // Call the refactored function
        if (users) {
          setUsers(users); // Set users only if data is returned
        }
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };
  
    loadUsers();
  }, []);


  const toggleAddUserForm = () => {
    setIsAddUserFormOpen(!isAddUserFormOpen);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setIsAddUserFormOpen(false);
  };

  // const toggleDropdown = (userId) => {
  //   setDropdownOpen(dropdownOpen === userId ? null : userId);
  // };

  const handleView = (user) => {
    setViewingUser(user);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const success = await deleteUser(userId);
        if (success) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          alert("User successfully deleted.");
        }
      } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        alert(error.response?.data?.detail || "Failed to delete user.");
      }
    }
  };  

  const toggleDropdown = (userId, event) => {
    const dropdown = document.getElementById(`dropdown-menu-${userId}`);
    const button = event.currentTarget;
    
    if (dropdown) {
      const buttonRect = button.getBoundingClientRect(); // Get button position on the screen
      const dropdownWidth = 150; // Set dropdown width
      const dropdownHeight = dropdown.offsetHeight;
      
      let left = buttonRect.left;
      let top = buttonRect.bottom;
      
      // Prevent dropdown from being cut off on the right
      if (left + dropdownWidth > window.innerWidth) {
        left = window.innerWidth - dropdownWidth - 10; // Adjust to fit within viewport
      }
      
      // Prevent dropdown from being cut off on the bottom
      if (top + dropdownHeight > window.innerHeight) {
        top = buttonRect.top - dropdownHeight - 10; // Adjust to fit above the button
      }
      
      dropdown.style.left = `${left}px`;
      dropdown.style.top = `${top}px`;
      dropdown.classList.add("show"); // Show dropdown
    }
  
    setDropdownOpen(dropdownOpen === userId ? null : userId); // Toggle dropdown state
  };
  

  const handleSaveUser = async (updatedUser) => {
    try {
      const savedUser = await updateUser(updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? savedUser : user))
      );
      setEditingUser(null); // Exit editing mode
      alert("User successfully updated.");
    } catch (error) {
      console.error("Error updating user:", error);
      alert(error.response?.data?.detail || "Failed to update user.");
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
            padding: "0.8rem 3rem",
            maxWidth: "400px",
            borderRadius: "10px",
            fontSize: "16px",
            marginLeft: "5px",
            border: "1px solid #000",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}  
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={toggleAddUserForm} 
        style={{
          padding: "0.8rem 3rem",
          backgroundColor: "#ffd200",
          fontSize: "16px",
          marginLeft: "5px",
          color: "#000",
          border: "1px solid #000",
          borderRadius: "10px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ffd0009e")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ffd200")}>
            Add User
        </button>
      </div>
      <div className="user-table-container">

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Mobile</th>
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
              <td>{user.user_type}</td>
              <td style={{ position: 'relative' }} className="action-btn-container">
              <button
                id={`action-btn-${user.id}`}
                onClick={(e) => toggleDropdown(user.id, e)}
                className="action-btn"
                style={{
                  backgroundColor: "white",
                  color: "#ffd200",
                }}
              >
                <FaEllipsisV />
              </button>

                {dropdownOpen === user.id && (
                  <div
                    id={`dropdown-menu-${user.id}`}
                    className="dropdown-menu show"
                  >
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
      </div>

      {isAddUserFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={toggleAddUserForm} className="close-btn" style={{backgroundColor:"#fff", color:"#000"}}>×</button>
            <AddUserForm onAddUser={handleAddUser} />
          </div>
        </div>
      )}

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={handleCancelEdit} className="close-btn" style={{backgroundColor:"#fff", color:"#000"}}>×</button>
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
