import React, { useEffect, useState } from "react";
import { fetchRequests, createReply } from "../Apis/endpoints";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filterId, setFilterId] = useState("");
  const userType = localStorage.getItem("user_type");

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

  return (
    <div style={{ margin: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Requests</h1>
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <input
          type="text"
          value={filterId}
          onChange={handleFilterChange}
          placeholder="Filter by ID"
          style={{
            padding: "0.5rem",
            width: "50%",
            maxWidth: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {filteredRequests.length === 0 ? (
        <p style={{ textAlign: "center" }}>No requests found.</p>
      ) : (
        filteredRequests.map((request) => (
          <div
            key={request.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2 style={{ marginBottom: "0.5rem" }}>Request id :{request.id}</h2>
            <h3>Request by: {request.raised_by_name}</h3>
            <p>Request Type: {request.status}</p>
            <p>{request.message}</p>
            <p>Created At: {new Date(request.created_at).toLocaleString()}</p>

            <div style={{ marginTop: "1rem" }}>
              <h4>Replies:</h4>
              {request.replies.length === 0 ? (
                <p>No replies yet.</p>
              ) : (
                request.replies.map((reply) => (
                  <div key={reply.id} style={{ marginBottom: "0.5rem" }}>
                    <p>
                      <strong>{reply.replied_by}:</strong> {reply.message}
                    </p>
                    <p>{new Date(reply.created_at).toLocaleString()}</p>
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
                    backgroundColor: "#007bff",
                    color: "#fff",
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

      <style jsx>{`
        @media (max-width: 768px) {
          h3 {
            font-size: 1.2rem;
          }
          p {
            font-size: 0.9rem;
          }
          button {
            font-size: 0.9rem;
          }
          input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default RequestsList;
