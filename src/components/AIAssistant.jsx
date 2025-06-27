import { useState, useEffect, useRef } from 'react';
import NewtonLogo from './icons/NewtonLogo';
import SendIcon from './icons/SendIcon';

const AIAssistant = ({ onClose }) => {
  const [userInput, setUserInput] = useState('');
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: '👋 Hi there! I\'m Newton, a toucan with a PhD in task management (and fruit sorting). Unlike my feathered cousins who just collect shiny things, I help organize tasks and boost productivity. Need help?',
      timestamp: '10:00 AM'
    },
    {
      id: 2,
      sender: 'user',
      text: 'Hi! I need help organizing my tasks.',
      timestamp: '10:01 AM'
    },
    {
      id: 3,
      sender: 'ai',
      text: 'Of course! I can help you sort and prioritize your tasks. Would you like me to show you your current tasks or help create new ones? 🗂️',
      timestamp: '10:01 AM'
    },
    {
      id: 4,
      sender: 'user',
      text: 'Show me my current tasks please',
      timestamp: '10:02 AM'
    },
    {
      id: 5,
      sender: 'ai',
      text: 'Let me fetch your task list. In the meantime, did you know I can sort tasks faster than I can sort fruits? And that\'s saying something! 🍎✨',
      timestamp: '10:02 AM'
    }
  ]);

  const sidebarRef = useRef(null);
  const chatContainerRef = useRef(null);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    // Handle chat submission here
    setUserInput('');
  };

  useEffect(() => {
    // Focus the sidebar when it opens
    sidebarRef.current?.focus();
    // Add click outside listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    // Scroll to bottom when component mounts
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40">
      <div 
        ref={sidebarRef}
        className="fixed right-0 top-0 w-96 h-screen bg-gray-800 border-l border-gray-700 shadow-xl z-50 flex flex-col"
      >
        <div className="flex-1 overflow-hidden flex flex-col">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto"
          >
            <div className="p-4 space-y-4">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 mr-2 flex-shrink-0">
                      <img 
                        src="/assets/img/newtonLogo.png"
                        alt="Newton"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {message.timestamp}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 ml-2 flex-shrink-0">
                      <img 
                        src="/assets/img/persona/mina.png"
                        alt="Mina"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Keep the input form */}
        <div className="mt-auto border-t border-gray-700">
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <button
                type="submit"
                className="bg-gray-700 text-gray-300 hover:text-gray-100 p-3 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;