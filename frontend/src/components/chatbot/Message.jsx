// Message.jsx

import React from 'react';
//import './Message.css'; // Import your CSS file for styling

const Message = ({ content, sender }) => {
    return (
        <div className={`message ${sender}`}>
            <p>{content}</p>
        </div>
    );
};

export default Message;
