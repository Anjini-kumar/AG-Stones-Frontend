import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import logo from './assets/AG-LOGO.png'
import './index.css';
import Navbar from './nav_bar/nav';
import Dashboard from './dashboard/dashboard';
import Usermanagement from './usermanagement/usermanagement';
import Productmanagement from './productmanagement/productmanagement';
import Productmaster from './productmaster/productmaster';
import Warehouse from './warehouse/warehouse';
import Message from './message/message';
import ReorderList from './Reorder/Reorder';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh',data.refresh);
        localStorage.setItem('user_type',data.user_type);
        localStorage.setItem('user',data.user);

        navigate('/dashboard');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  return (

<div className="loginpage">
  <div className="login-page">
    <div className="login-form">
      <h1 className="login-heading">Login</h1>
      <img src={logo} alt="AG STONES Logo" className="logo" />
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="email" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
        <input type="password" name="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="captcha">
          <iframe title="reCAPTCHA" width="304" height="78" role="presentation" name="a-uy7pmjrk67zs" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LeM4iIqAAAAAAIMwMuFR6XdhxhJfAcPzSF7dCpl&amp;co=aHR0cHM6Ly9sdXhlY3JtLmVtZWRoYS5pbjo0NDM.&amp;hl=en&amp;type=image&amp;v=-ZG7BC9TxCVEbzIO2m429usb&amp;theme=light&amp;size=normal&amp;badge=bottomright&amp;cb=atmqm1r3gtpq"></iframe>
          {/* <div class="g-recaptcha recaptcha" data-sitekey="Your site key goes here"></div> */}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-button">LOGIN</button>  </form>
    </div>
  </div>
</div>
  );
};





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
      </Routes>
    </Router>
  );
}

export default App;


