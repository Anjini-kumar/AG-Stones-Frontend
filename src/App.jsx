import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './nav_bar/nav';
import Dashboard from './dashboard/dashboard';
import Usermanagement from './usermanagement/usermanagement';
import Productmanagement from './productmanagement/productmanagement';
import Productmaster from './productmaster/productmaster';
import Warehouse from './warehouse/warehouse';
import Message from './message/message';
import ReorderList from './Reorder/Reorder';
import ProductTable from './ConfirmedProducts/ConfirmedProduct';
import Login from './Login';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className={isLoginPage ? '' : 'layout'}>
      {!isLoginPage && <Navbar />}
      <div className={isLoginPage ? '' : 'content'}>
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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
