import { useState, useEffect, useRef } from 'react';
import { getImagePath } from '../utils/imagePath';
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
    },
    // Additional messages to test scrolling
    {
      id: 6,
      sender: 'ai',
      text: 'I see you have 3 high priority tasks that need your attention today. Would you like me to show those first?',
      timestamp: '10:03 AM'
    },
    {
      id: 7,
      sender: 'user',
      text: 'Yes, please show me the high priority tasks first.',
      timestamp: '10:03 AM'
    },
    {
      id: 8,
      sender: 'ai',
      text: 'Here are your high priority tasks:\n\n1. Complete quarterly report (due today)\n2. Review design mockups for client meeting\n3. Prepare presentation for tomorrow\'s team meeting',
      timestamp: '10:04 AM'
    },
    {
      id: 9,
      sender: 'user',
      text: 'Thanks! Can you help me organize these by estimated completion time?',
      timestamp: '10:05 AM'
    },
    {
      id: 10,
      sender: 'ai',
      text: 'Based on your past work patterns, here\'s how I\'d organize these tasks by estimated completion time:\n\n1. Review design mockups (30 mins)\n2. Prepare presentation (1.5 hours)\n3. Complete quarterly report (2.5 hours)\n\nWould you like to tackle them in this order?',
      timestamp: '10:06 AM'
    },
    {
      id: 11,
      sender: 'user',
      text: 'That sounds perfect. I\'ll start with the mockups right away.',
      timestamp: '10:07 AM'
    },
    {
      id: 12,
      sender: 'ai',
      text: 'Great choice! I\'ve marked "Review design mockups" as In Progress. Would you like me to set a reminder for when you should move to the next task?',
      timestamp: '10:07 AM'
    }
  ]);

  const sidebarRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    // Add user message
    setMessages([...messages, { 
      id: messages.length + 1,
      sender: 'user', 
      text: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    // AI response (simplified for this example)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: prev.length + 1,
        sender: 'ai', 
        text: 'I\'m processing your request. This is a placeholder response.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
    
    setUserInput('');
  };

  // Add keyboard handler for Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    // Focus the sidebar when it opens
    sidebarRef.current?.focus();
    // Add click outside listener and keyboard listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup listeners on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 flex justify-end">
      <div 
        ref={sidebarRef}
        className="w-96 bg-gray-800 border-l border-gray-700 shadow-xl z-50 flex flex-col mt-16 h-[calc(100vh-64px)]"
        tabIndex={0}
      >
        {/* Small compact header with title and close button */}
        <div className="bg-gray-700 py-2 px-4 border-b border-gray-600 flex items-center justify-between">
          <span className="font-medium text-white text-sm">AI Assistant</span>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white text-lg bg-gray-600 hover:bg-gray-500 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Chat container without the sticky close button */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex mb-4 ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 mr-2 flex-shrink-0">
                    <img 
                      src={getImagePath('/assets/img/newtonLogo.png')} 
                      alt="AI" 
                      className="w-full h-full rounded-full"
                    />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 ml-2 flex-shrink-0">
                    <img 
                      src={getImagePath('/assets/img/persona/mina.png')}
                      alt="Mina"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input form remains the same */}
        <div className="border-t border-gray-700 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;