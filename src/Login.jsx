import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/AG-LOGO.png";
// import { RECAPTCHA_SITE_KEY } from "./config"; // Import the key
import "./Login.css";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const RECAPTCHA_SITE_KEY = "6LfYXqkqAAAAAMZ15DAXg87lnHrNG_OTeakXqHUU"; 


  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          recaptcha: recaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("user_type", data.user_type);
        localStorage.setItem("user", data.user);

        if (data.user_type === "Admin") {
          navigate("/dashboard");
        } else if (data.user_type === "Procurement") {
          navigate("/productManagement");
        } else if (data.user_type === "Warehouse") {
          navigate("/warehouse");
        } else 
          navigate("/dashboard");

        window.location.reload();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="loginpage">
      <div className="login-page">
        <div className="login-form">
          <img src={logo} alt="AG STONES Logo" className="logo" />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group captcha">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY} // Reference the key here
                onChange={handleRecaptchaChange}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-button"
            style={{
                marginTop:'2rem',
                backgroundColor: "#ffd200",
            }}>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
