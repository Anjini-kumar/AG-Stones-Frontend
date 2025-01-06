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
      <div className="layout">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/userManagement" element={<Usermanagement />} />
            <Route path="/productManagement" element={<Productmanagement />} />
            <Route path="/productMaster" element={<Productmaster />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/message" element={<Message />} />
            <Route path="/record" element={<ReorderList />} />
            <Route path="/approvedproducts" element={<ProductTable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;


