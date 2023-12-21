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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default ChatInput;
