import React from "react";
import RequestsList from './RequestsList';
import './message.css'; 

const Message = () => {


    return (
        <div className="message">
            <div className="message__body">
                <div className="request-container">

                    <RequestsList />
                </div>
            </div>
        </div>
    );
}

export default Message;
