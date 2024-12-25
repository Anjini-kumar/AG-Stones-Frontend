import React, { useEffect, useState } from "react";
import { fetchRequests, createReply } from "../Apis/endpoints"

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    getRequests();
  }, []);

  const handleReplySubmit = async (requestId) => {
    try {
      await createReply({ request: requestId, message: replyMessage });
      setReplyMessage("");
      setSelectedRequest(null);
      const updatedRequests = await fetchRequests(); // Refresh the data
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <div>
      <h1>Requests</h1>
      {requests.map((request) => (
        <div key={request.id} className="request-card">
          <h3>Request by: {request.raised_by_name}</h3>
          <p>Request Type: {request.status}</p>
          <p>{request.message}</p>
          <p>Created At: {new Date(request.created_at).toLocaleString()}</p>

          <div className="replies">
            <h4>Replies:</h4>
            {request.replies.length === 0 ? (
              <p>No replies yet.</p>
            ) : (
              request.replies.map((reply) => (
                <div key={reply.id}>
                  <p>
                    <strong>{reply.replied_by}:</strong> {reply.message}
                  </p>
                  <p>{new Date(reply.created_at).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() =>
              setSelectedRequest(
                selectedRequest === request.id ? null : request.id
              )
            }
          >
            {selectedRequest === request.id ? "Cancel Reply" : "Reply"}
          </button>

          {selectedRequest === request.id && (
            <div>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
              ></textarea>
              <button onClick={() => handleReplySubmit(request.id)}>
                Submit Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RequestsList;
