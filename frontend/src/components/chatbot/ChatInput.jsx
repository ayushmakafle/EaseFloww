// ChatInput.jsx

import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputMessage.trim() !== '') {
            onSendMessage(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="What's up?"
                style={{ flex: '1', padding: '10px', backgroundColor: '#f38dbc' }}
            />
            <button type="submit" style={{ padding: '10px', borderRadius: '5px', color: '#ccc', border: 'none' }}>
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </form>

    );
};

export default ChatInput;
