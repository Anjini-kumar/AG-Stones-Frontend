import React, { useState } from "react";
import { createRequest } from "../Apis/endpoints";

const CreateRequest = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest({ message, status, subject });
      setMessage("");
      setStatus("");
      setSubject("");
      alert("Request created successfully!");
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  // Inline styles
  const formStyle = {
    maxWidth: '40rem', // Maximum width of the form
    margin: '0 auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '0.5rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    width: '90%', // Responsive width
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#333',
    fontSize: '1.5rem',
  };

  const paragraphStyle = {
    fontWeight: 'bold',
    marginBottom: '1rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '0.25rem',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>Create New Request</h2>
      <p style={paragraphStyle}>Select Request Type</p>
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        style={inputStyle}
      >
        <option value="">Select</option>
        <option value="General">General</option>
        <option value="Product Concern">Product Concern</option>
      </select>

      {/* Subject Input Field */}
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
        required
        style={inputStyle}
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your request message"
        required
        style={{ ...inputStyle, height: '10rem' }} // Adjust height for textarea
      ></textarea>

      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
      >
        Submit Request
      </button>
    </form>
  );
};

export default CreateRequest;