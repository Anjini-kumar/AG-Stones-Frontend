import React, { useEffect, useState } from "react";
import { fetchRequests, createReply } from "../Apis/endpoints";
import CreateRequest from './CreateRequest';


const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterId, setFilterId] = useState("");
  const userType = localStorage.getItem("user_type");
  const user = localStorage.getItem("user");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
        setFilteredRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    getRequests();
  }, []);

  const handleFilterChange = (e) => {
    const id = e.target.value;
    setFilterId(id);
    if (id === "") {
      setFilteredRequests(requests);
    } else {
      const filtered = requests.filter((req) => req.id.toString().includes(id));
      setFilteredRequests(filtered);
    }
  };

  const handleReplySubmit = async (requestId) => {
    try {
      await createReply({ request: requestId, message: replyMessage });
      setReplyMessage("");
      setSelectedRequest(null);
      const updatedRequests = await fetchRequests(); // Refresh the data
      setRequests(updatedRequests);
      setFilteredRequests(updatedRequests);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const togglePopup = () => {
  setShowPopup(!showPopup);
};

  return (
    <div style={{  fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "1.5rem" }}>
        Welcome to the Message <span style={{color:"#ffd200"}}>{user}</span> !!
      </h1>

      {/* Filter Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          value={filterId}
          onChange={handleFilterChange}
          placeholder="Filter by Request ID"
          style={{
            padding: "0.8rem",
            width: "50%",
            maxWidth: "400px",
            borderRadius: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginLeft:"1rem"

          }}
        />
        {userType === 'Warehouse' && <button
          style={{
            padding: "0.8rem 1.2rem",
            backgroundColor: "#ffd200",
            color: "#000",
            border: "1px solid #000",
            borderRadius: "10px",
            fontSize:"16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            marginRight:"1.5rem"

          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ffd0009e")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ffd200")}
          onClick={togglePopup}
        >
          Add Request
        </button>}
      </div>

      {/* Requests Section */}
      {filteredRequests.length === 0 ? (
        <p style={{ textAlign: "center", color: "#7f8c8d", fontSize: "1.2rem" }}>No requests found.</p>
      ) : (
        filteredRequests.map((request) => (
          <div
            key={request.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ecf0f1")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ marginBottom: "0.5rem", color: "#34495e" }}>Request ID: {request.id}</h2>
                <h3 style={{ marginBottom: "0.5rem", color: "#2c3e50" }}>Requested by: {request.raised_by_name}</h3>
                <p style={{ marginBottom: "0.5rem", color: "#2c3e50" }}>Subject: {request.subject}</p>
                <p style={{ color: "#95a5a6" }}>Status: {request.status}</p>
              </div>
              <p style={{ color: "#bdc3c7", fontSize: "0.9rem" }}>
                {new Date(request.created_at).toLocaleString()}
              </p>
            </div>

            <p style={{ color: "#2c3e50", margin: "1rem 0" }}>{request.message}</p>

            {/* Replies Section */}
            <div>
              <h4 style={{ color: "#34495e", marginBottom: "1rem" }}>Replies:</h4>
              {request.replies.length === 0 ? (
                <p style={{ color: "#7f8c8d" }}>No replies yet.</p>
              ) : (
                request.replies.map((reply) => (
                  <div
                    key={reply.id}
                    style={{
                      padding: "0.8rem",
                      marginBottom: "0.8rem",
                      backgroundColor: "#ecf0f1",
                      borderRadius: "5px",
                    }}
                  >
                    <p style={{ color: "#2c3e50", marginBottom: "0.3rem" }}>
                      <strong>{reply.replied_by}:</strong> {reply.message}
                    </p>
                    <p style={{ color: "#95a5a6", fontSize: "0.9rem" }}>
                      {new Date(reply.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            {userType !== "Admin" && (
              <>
                <button
                  style={{
                    padding: "0.5rem 1rem",
                    margin: "0.5rem 0",
                    backgroundColor: "#ffd200",
                    color: "#333",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setSelectedRequest(
                      selectedRequest === request.id ? null : request.id
                    )
                  }
                >
                  {selectedRequest === request.id ? "Cancel Reply" : "Reply"}
                </button>

                {selectedRequest === request.id && (
                  <div style={{ marginTop: "1rem" }}>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply here..."
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        resize: "none",
                        marginBottom: "0.5rem",
                      }}
                    ></textarea>
                    <button
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleReplySubmit(request.id)}
                    >
                      Submit Reply
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
      {/* Popup for CreateRequest */}
      {showPopup && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>

            <p style={{
              color:"gray"

            }}>*click outside the popup to close*</p>
            <CreateRequest />
          </div>
        </div>
      )}

<style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          position: relative;
        }
      `}</style>
    </div>
  );
};


export default RequestsList;
