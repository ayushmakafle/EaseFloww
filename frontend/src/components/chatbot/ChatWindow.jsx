import React, { useEffect, useRef } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages }) => {
    const chatWindowRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat window when messages change
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    return (
        <div className="chat-window" ref={chatWindowRef} style={{ overflowY: 'auto', maxHeight: '300px', scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch', scrollbarColor: '#d74470' }}>
            {messages.length === 0 && (
                <>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <div className="icon" style={{ marginRight: '10px' }} title="EaseFlow's chatbot: Will help you with common menstrual health questions">
                            <i className="fa-solid fa-headset" style={{ color: '#d74470' }}></i>
                        </div>
                        <div className="message bot">
                            <div className="message-bubble">
                                <div className="message-content">
                                    Welcome! How can we assist you today?
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}
            {messages.map((message, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-end' }}>
                    {message.sender === 'bot' && (
                        <div className="icon" style={{ marginRight: '10px' }} title="EaseFlow's chatbot: Will help you with common menstrual health questions">
                            <i className="fa-solid fa-headset" style={{ color: '#d74470' }}></i>
                        </div>
                    )}
                    <div className={`message ${message.sender === 'user' ? 'user' : 'bot'}`} style={{ marginLeft: message.sender === 'user' ? 'auto' : '0' }}>
                        <div className="message-bubble">
                            <div className="message-content">
                                {message.content}
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }


        </div >
    );
};

export default ChatWindow;
