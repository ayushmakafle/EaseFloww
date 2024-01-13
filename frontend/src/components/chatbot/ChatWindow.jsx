// ChatWindow.jsx

import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages }) => {
    return (
        <div className="chat-window">
            <h1>hfjhfjhg</h1>
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
