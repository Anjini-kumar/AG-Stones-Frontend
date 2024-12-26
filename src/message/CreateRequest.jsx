import React, { useState } from "react";
import { createRequest } from "../Apis/endpoints";

const CreateRequest = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [subOption, setSubOption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest({ message, status, sub_option: subOption });
      setMessage("");
      setStatus("");
      setSubOption("");
      alert("Request created successfully!");
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Request</h2>
      <p>Select Request Type</p>
      <select value={status} onChange={(e) => {
        setStatus(e.target.value);
        setSubOption(""); // Reset sub-option when status changes
      }}>
        <option value="">Select</option>
        <option value="General">General</option>
        <option value="Re Order">Re Order</option>
        <option value="Product Concern">Product Concern</option>
      </select>
      <br /><br/>

      {status === "Re Order" && (
        <>
          <p>Select Sub Option</p>
          <select value={subOption} onChange={(e) => setSubOption(e.target.value)}>
            <option value="">Select</option>
            <option value="Item A">Item A</option>
            <option value="Item B">Item B</option>
            <option value="Item C">Item C</option>
          </select>
          <br /><br/>
        </>
      )}

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your request message"
        required
      ></textarea>
      <br />
      <br /><br/>

      <button type="submit">Submit Request</button>
    </form>
  );
};

export default CreateRequest;