import React from "react";
import CreateRequest from './CreateRequest';
import RequestsList from './RequestsList';
import './message.css'; // Import the CSS file for styling

const Message = () => {
    const userType = localStorage.getItem('user_type'); // Assuming user_type is stored in localStorage

    return (
        <div className="message">
            <div className="message__header">
                <h2 className="message__title">Message</h2>
            </div>
            <div className="message__body">
                <div className="request-container">
                    {userType === 'Warehouse' && <CreateRequest />} 
                    <hr />
                    <RequestsList />
                </div>
            </div>
        </div>
    );
}

export default Message;