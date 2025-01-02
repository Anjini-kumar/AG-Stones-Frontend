import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './index.css';
import Navbar from './nav_bar/nav';
import Dashboard from './dashboard/dashboard';
import Usermanagement from './usermanagement/usermanagement';
import Productmanagement from './productmanagement/productmanagement';
import Productmaster from './productmaster/productmaster';
import Warehouse from './warehouse/warehouse';
import Message from './message/message';
import ReorderList from './Reorder/Reorder';
import ProductTable from './ConfirmedProducts/ConfirmedProduct'
import Login from './Login'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home/*" element={<Navbar />} />
        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
        <Route path="/userManagement" element={<><Navbar /><Usermanagement /></>} />
        <Route path="/productManagement" element={<><Navbar /><Productmanagement /></>} />
        <Route path="/productMaster" element={<><Navbar /><Productmaster /></>} />
        <Route path="/warehouse" element={<><Navbar /><Warehouse /></>} />
        <Route path="/message" element={<><Navbar /><Message /></>} />
        <Route path="/record" element={<><Navbar /><ReorderList /></>} />
        <Route path="/approvedproducts" element={<><Navbar /><ProductTable /></>} />
      </Routes>
    </Router>
  );
}

export default App;


