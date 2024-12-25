// // import React, { useState } from 'react';
// // import './Navbar.css';
// // import './sidebar.css';
// // import logo from '../assets/AG-LOGO.png';
// // import { FaSearch, FaSignOutAlt, FaHome, FaUserShield, FaBox, FaWarehouse, FaBars } from 'react-icons/fa';
// // import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// // import Usermanagement from '../usermanagement/usermanagement';
// // import Productmanagement from '../productmanagement/productmanagement';

// // //import Dashboard from '../dashboard/dashboard';
// // // import UserManagement from './UserManagement';
// // // import ProductManagement from './ProductManagement';
// // // import ProductMaster from './ProductMaster';
// // // import Warehouse from './Warehouse';
// // // const navi=useNavigate();
// // const Navbar = () => {

// //   let navigate = useNavigate();

// //   // const navtodashboard = () => {
// //   //   navigate('/dashboard');
// //   // };

// //   // const navtousermangement = () => {
// //   //   navigate('/userManagement');
// //   // };

// //   // const navtoproductmangement = () => {
// //   //   navigate('/productManagement');
// //   // };

// //   // const navtoproductmaster = () => {
// //   //   navigate('/productMaster');
// //   // };

// //   // const navtowarehouse = () => {
// //   //   navigate('/warehouse');
// //   // };

// //   const [isSearchVisible, setIsSearchVisible] = useState(false);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const toggleSearch = () => {
// //     setIsSearchVisible(!isSearchVisible);
// //   };

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //       {/* Sidebar */}
// //       <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
// //         <div className="sidebar-header" onClick={toggleSidebar}>
// //           <FaBars className="toggle-icon" />
// //         </div>
// //         <ul className="sidebar-menu">
// //           <li>
// //             <a href='/dashboard'><FaHome className="icon" /></a>
// //             {isSidebarOpen && <a href='/dashboard'>Dashboard</a>}
// //           </li>
// //           <li>
// //             <a href='/userManagement'><FaUserShield className="icon" /></a>
// //             {isSidebarOpen && <a href='/userManagement'>User Management</a>}
// //           </li>
// //           <li>
// //             <a href='/productManagement'><FaBox className="icon" /></a>
// //             {isSidebarOpen && <a href='/productManagement'>Product Management</a>}
// //           </li>
// //           <li>
// //             <a href='/productMaster'><FaBox className="icon" /></a>
// //             {isSidebarOpen && <a href='/productMaster'>Product Master</a>}
// //           </li>
// //           <li>
// //             <a href='/warehouse'><FaWarehouse className="icon" /></a>
// //             {isSidebarOpen && <a href='/warehouse'>Warehouse</a>}
// //           </li>
// //         </ul>
// //       </div>

// //       {/* Navbar */}
// //       <div className="navbar">
// //         <div className="logo-container">
// //           <img src={logo} alt="AG STONES Logo" className="nav-logo" />
// //         </div>
// //         <div className="search-container">
// //           <input
// //             type="text"
// //             className={`search-input ${isSearchVisible ? 'active' : ''}`}
// //             placeholder="Enter search term..."
// //           />
// //           <FaSearch className="search-icon" onClick={toggleSearch} />
// //         </div>
// //         <button className="logout-button">
// //           <FaSignOutAlt />
// //           Logout
// //         </button>
// //       </div>

// //       {/* Main Section */}
// //       <div className={`main-section ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //         <div>
// //           {/* Main Section */}
// //           <div >
// //             <div className="header">
// //               <h1 >Dashboard</h1>
// //               {true ? <Usermanagement />:<Productmanagement />}
// //             </div>
// //             {/* Add your main content here */}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;


// // import React, { useState } from 'react';
// // import './Navbar.css';
// // import './sidebar.css';
// // import logo from '../assets/AG-LOGO.png';
// // import { FaSearch, FaSignOutAlt, FaHome, FaUserShield, FaBox, FaWarehouse, FaBars } from 'react-icons/fa';
// // import { Route, Routes, Link } from 'react-router-dom';

// // import Dashboard from '../dashboard/dashboard';
// // import UserManagement from '../usermanagement/usermanagement';
// // import ProductManagement from '../productmanagement/productmanagement';
// // import ProductMaster from '../productmaster/productmaster';
// // import Warehouse from '../warehouse/warehouse';

// // const Navbar = () => {
// //   const [isSearchVisible, setIsSearchVisible] = useState(false);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const toggleSearch = () => {
// //     setIsSearchVisible(!isSearchVisible);
// //   };

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   return (
// //     <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //       {/* Sidebar */}
// //       <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
// //         <div className="sidebar-header" onClick={toggleSidebar}>
// //           <FaBars className="toggle-icon" />
// //         </div>
// //         <ul className="sidebar-menu">
// //           <li>
// //             <Link to="dashboard"><FaHome className="icon" /> {isSidebarOpen && 'Dashboard'}</Link>
// //           </li>
// //           <li>
// //             <Link to="userManagement"><FaUserShield className="icon" /> {isSidebarOpen && 'User Management'}</Link>
// //           </li>
// //           <li>
// //             <Link to="productManagement"><FaBox className="icon" /> {isSidebarOpen && 'Product Management'}</Link>
// //           </li>
// //           <li>
// //             <Link to="productMaster"><FaBox className="icon" /> {isSidebarOpen && 'Product Master'}</Link>
// //           </li>
// //           <li>
// //             <Link to="warehouse"><FaWarehouse className="icon" /> {isSidebarOpen && 'Warehouse'}</Link>
// //           </li>
// //         </ul>
// //       </div>

// //       {/* Navbar */}
// //       <div className="navbar">
// //         <div className="logo-container">
// //           <img src={logo} alt="AG STONES Logo" className="nav-logo" />
// //         </div>
// //         <div className="search-container">
// //           <input
// //             type="text"
// //             className={`search-input ${isSearchVisible ? 'active' : ''}`}
// //             placeholder="Enter search term..."
// //           />
// //           <FaSearch className="search-icon" onClick={toggleSearch} />
// //         </div>
// //         <button className="logout-button">
// //           <FaSignOutAlt />
// //           Logout
// //         </button>
// //       </div>

// //       {/* Main Section */}
// //   <div className={`main-section ${isSidebarOpen ? 'sidebar-open' : ''}`}>
// //     <Routes>
// //       <Route path="dashboard" element={<Dashboard />} />
// //       <Route path="userManagement" element={<UserManagement />} />
// //       <Route path="productManagement" element={<ProductManagement />} />
// //       <Route path="productMaster" element={<ProductMaster />} />
// //       <Route path="warehouse" element={<Warehouse />} />
// //     </Routes>
// //   </div>
// // </div>
// //   );
// // };

// // export default Navbar;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import './sidebar.css';
// import logo from '../assets/AG-LOGO.png';
// import { FaSearch, FaSignOutAlt, FaHome, FaUserShield, FaBox, FaWarehouse, FaBars } from 'react-icons/fa';
// import { Route, Routes, Link } from 'react-router-dom';

// import Dashboard from '../dashboard/dashboard';
// import UserManagement from '../usermanagement/usermanagement';
// import ProductManagement from '../productmanagement/productmanagement';
// import ProductMaster from '../productmaster/productmaster';
// import Warehouse from '../warehouse/warehouse';

// const Navbar = () => {
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate(); // Step 1: Use the navigate hook

//   const toggleSearch = () => {
//     setIsSearchVisible(!isSearchVisible);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleLogout = () => {
//     navigate("/"); // Step 3: Navigate to root path ("/") when logging out
//   };

//   return (
//     <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//         <div className="sidebar-header" onClick={toggleSidebar}>
//           <FaBars className="toggle-icon" />
//         </div>
//         <ul className="sidebar-menu">
//           <li>
//             <Link to="dashboard"><FaHome className="icon" /> {isSidebarOpen && 'Dashboard'}</Link>
//           </li>
//           <li>
//             <Link to="userManagement"><FaUserShield className="icon" /> {isSidebarOpen && 'User Management'}</Link>
//           </li>
//           <li>
//             <Link to="productManagement"><FaBox className="icon" /> {isSidebarOpen && 'Product Management'}</Link>
//           </li>
//           <li>
//             <Link to="productMaster"><FaBox className="icon" /> {isSidebarOpen && 'Product Master'}</Link>
//           </li>
//           <li>
//             <Link to="warehouse"><FaWarehouse className="icon" /> {isSidebarOpen && 'Warehouse'}</Link>
//           </li>
//         </ul>
//       </div>

//       {/* Navbar */}
//       <div className="navbar">
//         <div className="logo-container">
//           <img src={logo} alt="AG STONES Logo" className="nav-logo" />
//         </div>
//         <div className="search-container">
//           <input
//             type="text"
//             className={`search-input ${isSearchVisible ? 'active' : ''}`}
//             placeholder="Enter search term..."
//           />
//           <FaSearch className="search-icon" onClick={toggleSearch} />
//         </div>
//         <button className="logout-button" onClick={handleLogout}>
//           <FaSignOutAlt />
//           Logout
//         </button>
//       </div>

//       {/* Main Section */}
//       <div className={`main-section ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//         <Routes>
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="userManagement" element={<UserManagement />} />
//           <Route path="productManagement" element={<ProductManagement />} />
//           <Route path="productMaster" element={<ProductMaster />} />
//           <Route path="warehouse" element={<Warehouse />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React from 'react';
import {useNavigate, Link } from 'react-router-dom';
import { FaSearch, FaSignOutAlt} from 'react-icons/fa';
import './Navbar.css';
import logo from '../assets/AG-LOGO.png';
import axios from 'axios';



const Navbar = () => {
  const navigate=useNavigate();
  
  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh');
    try {
      await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ refresh }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      navigate('/');
    }
  };
  
  const userType = localStorage.getItem('user_type')
  // console.log(userType,"user")


  return (
    <div>
    {/* Main Section */}
    <div className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="AG STONES Logo" onClick={() => navigate("/dashboard")} />    
        </div>
        <div className="navbar-links">
          {(userType == 'Warehouse')?(
              <ul className="navbar-menu">
              {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
              <li><Link to="/warehouse">WareHouse</Link></li>
            </ul>

           ) : (userType == 'Procurement')?(
            <ul className="navbar-menu">
              {/* <li><Link to="/dashboard">Dashboard</Link></li> */}
              {/* <li><Link to="/userManagement">UserManagement</Link></li> */}
              <li><Link to="/productManagement">ProductManagement</Link></li>
              <li><Link to="/productMaster">ProductMaster</Link></li>
            </ul>
            ) :(
              <ul className="navbar-menu">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/userManagement">UserManagement</Link></li>
              <li><Link to="/productManagement">ProductManagement</Link></li>
              <li><Link to="/productMaster">ProductMaster</Link></li>
              <li><Link to="/warehouse">WareHouse</Link></li>
            </ul>
          )}
        </div>
        <button className="logout-button" onClick={handleLogout} ><FaSignOutAlt /> Logout</button>
    </div>
    </div>
    
  );
};

export default Navbar;
