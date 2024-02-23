// ChatWindow.jsx

import React from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages }) => {
    return (
        <div className="chat-window">
            {messages.length === 0 && (
                <div className="message bot">
                    <div className="icon">
                        <i className="fa-solid fa-headset" style={{ color: '#d74470' }}></i>
                    </div>
                    <div className="message-content">
                        Welcome! How can we assist you today?
                    </div>
                </div>
            )}
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
                >
                    {message.sender === 'bot' && (
                        <div className="icon">
                            <i className="fa-solid fa-headset" style={{ color: '#d74470' }}></i>
                        </div>
                    )}
                    {message.content}
                </div>
            ))}
        </div>
    );
};

export default ChatWindow;
