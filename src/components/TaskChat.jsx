import { useState, useRef, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { getImagePath } from '../utils/imagePath';

const TaskChat = ({ taskId, onClose }) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { sendChatMessage, chats } = useTaskContext();

  // Get messages for this task
  const taskMessages = chats[taskId] || [];

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [taskMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      sendChatMessage(taskId, { 
        sender: 'user', 
        text: message,
        timestamp: new Date().toISOString()
      });
      setMessage('');
    }
  };

  return (
    <div className="chat-window bg-gray-800 rounded-lg shadow-lg w-80 flex flex-col">
      <div className="chat-header bg-gray-700 p-3 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={getImagePath('/assets/img/ai-assistant.png')} 
            alt="AI Assistant" 
            className="w-6 h-6 rounded-full mr-2" 
          />
          <span className="font-medium text-white">Task Assistant</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          &times;
        </button>
      </div>
      
      <div className="chat-messages p-3 flex-1 overflow-y-auto max-h-80 bg-gray-800 space-y-3">
        {taskMessages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            {msg.sender === 'ai' && (
              <img 
                src={getImagePath('/assets/img/ai-assistant.png')} 
                alt="AI" 
                className="w-6 h-6 rounded-full self-end mr-2" 
              />
            )}
            <div 
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.sender === 'ai' 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-blue-600 text-white'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <img 
                src={getImagePath('/assets/img/user-avatar.png')} 
                alt="User" 
                className="w-6 h-6 rounded-full self-end ml-2" 
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input flex p-3 bg-gray-700 rounded-b-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-600 text-white rounded-l-md border-0 p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="bg-blue-600 text-white rounded-r-md px-4 py-2 disabled:bg-blue-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TaskChat;