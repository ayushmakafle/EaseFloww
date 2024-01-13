// ChatWindow.jsx

import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages }) => {
    return (
        <div className="chat-window">
<h4>Welcome! How can we assist you today?</h4>
            <hr style={{ borderTop: '5px solid #d74470', width: '100%', marginBottom: '5px' }} />
                   {messages.map((message, index) => (
                <div
                    key={index}
                    className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
                >
                    {message.content}
                </div>
            ))}
        </div>
    );
};

export default ChatWindow;
