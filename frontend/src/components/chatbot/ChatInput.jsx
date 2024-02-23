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
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '20px' }}>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                style={{ flex: '1', padding: '10px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid pink' }}
            />
            <button type="submit" style={{ padding: '10px', borderRadius: '5px', color: '#fff', border: 'none' }}>
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </form>


    );
};

export default ChatInput;
