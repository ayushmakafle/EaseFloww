import {useState,useEffect,useContext,createContext} from  'react';
import axios from 'axios';

const ChatContext = createContext()

const ChatProvider = ({children}) => {
     const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleChatToggle = () => {
    setChatVisible(!chatVisible);
  };

  const handleChatSendMessage = async (message) => {
    try {
      // API call to the chatbot server
      const response = await fetch('http://localhost:5000/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Add the chat message to the state
      setChatMessages([...chatMessages, { content: message, sender: 'user' }, { content: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(chatMessages)
  // Function to clear chat history
  const clearChatHistory = () => {
    setChatMessages([]);
  };
/* return {handleChatSendMessage,handleChatToggle,clearChatHistory,chatMessages,chatVisible}
 */
    return(
        <ChatContext.Provider value={{chatMessages, chatVisible, setChatVisible,handleChatSendMessage,handleChatToggle,clearChatHistory}}>
            {children}
        </ChatContext.Provider>
    )
}

//custom hook
const useChat = () => useContext(ChatContext)

export {useChat,ChatProvider}