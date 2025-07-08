import { useState, useEffect, useRef } from 'react';
import { getImagePath } from '../utils/imagePath';
import SendIcon from './icons/SendIcon';
import PurchaseOrder from './PurchaseOrder';  // Import the PurchaseOrder component
import { useTaskContext } from '../context/TaskContext';

// Updated team member data - only including the main contacts from your system
const TEAM_MEMBERS = [
  { name: "Amber", role: "Finance Manager", avatar: "/assets/img/persona/amber.png" },
  { name: "Astrid", role: "Finance Specialist", avatar: "/assets/img/persona/astrid.png" },
  { name: "Ben", role: "Procurement Lead", avatar: "/assets/img/persona/ben.png" },
  { name: "Hugo", role: "Product Manager", avatar: "/assets/img/persona/hugo.png" },
  { name: "Mina", role: "Project Manager", avatar: "/assets/img/persona/mina.png" }
  // Blake removed as requested
];

const AIAssistant = ({ onClose }) => {
  const { tasks, setTasks } = useTaskContext();
  const [userInput, setUserInput] = useState('');
  const [isCommandsOpen, setIsCommandsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null); // State to track active component
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

  // Define the ChevronDownIcon using the same SVG from Task.jsx
  const ChevronDownIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor" 
      className={`w-4 h-4 transition-transform duration-200 ${
        isCommandsOpen ? 'transform rotate-180' : ''
      }`}
    >
      <path 
        fillRule="evenodd" 
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
        clipRule="evenodd" 
      />
    </svg>
  );

  const sidebarRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [lastCreatedTaskId, setLastCreatedTaskId] = useState(null);

  // Common tasks that users might want to initiate
  const commonTasks = [
    { id: 1, name: 'Purchase Order', prompt: 'Help me create a purchase order', component: 'PurchaseOrder' },
    { id: 2, name: 'Schedule Meeting', prompt: 'I need to schedule a team meeting' },
    { id: 3, name: 'Task Priority', prompt: 'Help me prioritize my tasks for today' },
    { id: 4, name: 'Find Document', prompt: 'I need to find a document' }
  ];

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    sendMessage(userInput);
  };

  // Function to handle sending a message - extracted for reuse
  const sendMessage = (text) => {
    // Add user message
    setMessages(prev => [...prev, { 
      id: prev.length + 1,
      sender: 'user', 
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    // AI response (simplified for this example)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: prev.length + 1,
        sender: 'ai', 
        text: `I'm processing your request: "${text}". This is a placeholder response.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
    
    setUserInput('');
  };

  // Function to generate assignment suggestions based on task details
  const generateAssignmentSuggestions = (task) => {
    // Extract relevant details from the task
    const title = task.title?.toLowerCase() || '';
    const description = task.description?.toLowerCase() || '';
    const vendor = task.vendor?.toLowerCase() || '';
    const amount = parseFloat(task.amount || '0');
    const urgency = task.urgency;
    
    // Score each team member based on task details
    const scoredMembers = TEAM_MEMBERS.map(member => {
      let score = 0;
      let reasons = [];
      
      // Check amount thresholds
      if (amount > 10000 && member.name === "Amber") {
        score += 30;
        reasons.push("handles high-value purchases over $10,000");
      } else if (amount > 5000 && amount <= 10000 && member.name === "Astrid") {
        score += 25;
        reasons.push("specializes in mid-range purchases ($5,000-$10,000)");
      } else if (amount <= 5000 && member.name === "Mina") {
        score += 20;
        reasons.push("regularly processes smaller purchases under $5,000");
      }
      
      // Check for technology-related purchases
      if ((title.includes('tech') || description.includes('tech') || 
           vendor.includes('tech') || title.includes('software') || 
           description.includes('software')) && member.name === "Ben") {
        score += 25;
        reasons.push("specializes in technology and software procurement");
      }
      
      // Check for office supplies - reassigned from Blake to Mina
      if ((title.includes('office') || description.includes('office') || 
           title.includes('supplies') || description.includes('supplies')) && 
          member.name === "Mina") {
        score += 25;
        reasons.push("manages office supply acquisitions");
      }
      
      // Check for service contracts or subscriptions
      if ((description.includes('service') || description.includes('subscription') || 
           description.includes('contract')) && member.name === "Hugo") {
        score += 20;
        reasons.push("has expertise in service contracts and subscriptions");
      }
      
      // Check for equipment purchases
      if ((title.includes('equipment') || description.includes('equipment')) && 
          member.name === "Mina") {
        score += 20;
        reasons.push("specializes in equipment procurement");
      }
      
      // Urgency considerations
      if (urgency === "High Priority" && member.name === "Amber") {
        score += 15;
        reasons.push("prioritizes urgent purchase requests");
      }
      
      // Additional considerations for specific team members
      if (member.name === "Astrid") {
        score += 10;
        reasons.push("has strong vendor relationship management skills");
      }

      if (member.name === "Hugo" && 
         (title.includes('software') || description.includes('software'))) {
        score += 15;
        reasons.push("oversees software product purchases");
      }
      
      // Add a small random factor to avoid same recommendations every time
      score += Math.random() * 5;
      
      return {
        ...member,
        score,
        reasons
      };
    });
    
    // Sort by score (highest first) and take top 3
    const topSuggestions = scoredMembers
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(member => ({
        name: member.name,
        role: member.role,
        avatar: member.avatar,
        reason: member.reasons[0] || `has experience with similar tasks`
      }));
    
    return topSuggestions;
  };

  // Handle clicking on a common task button with enhanced component display
  const handleTaskClick = (prompt, component) => {
    sendMessage(prompt);
    setIsCommandsOpen(false); // Close commands after selecting one
    
    // If this task has an associated component, activate it
    if (component === 'PurchaseOrder') {
      // Add a specific AI response for purchase order
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: prev.length + 1,
          sender: 'ai', 
          text: "I'll help you create a purchase order. I've opened the form for you below. Please fill in the details and I'll assist you with completing the process.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        
        // Set the active component
        setActiveComponent('PurchaseOrder');
      }, 1500);
    }
  };

  // Function to assign a task to a suggested team member
  const assignTaskFromSuggestion = (taskId, suggestion) => {
    // Update the task in the tasks state
    setTasks(prevTasks => {
      return prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              assignee: {
                name: suggestion.name,
                avatar: suggestion.avatar
              }
            }
          : task
      );
    });
    
    // Add a confirmation message to the AI chat
    setMessages(prev => [...prev, { 
      id: prev.length + 1,
      sender: 'ai', 
      text: `✓ I've assigned this purchase order to ${suggestion.name}. They ${suggestion.reason}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  // Function to handle purchase order submission
  const handlePurchaseOrderSubmit = (formData) => {
    // Calculate the next available ID
    const highestId = Math.max(...tasks.map(task => 
      typeof task.id === 'number' ? task.id : 0
    ), 0);
    
    // Generate order number if not provided
    const orderNumber = formData.orderNumber || 'PO-' + Math.floor(10000 + Math.random() * 90000);
    
    // Create new task object
    const newTask = {
      id: highestId + 1,
      title: formData.vendor ? `${formData.vendor} Purchase Order` : 'New Purchase Order',
      description: formData.description || 'No description provided',
      type: "Purchase Order",
      status: "Pending Review",
      urgency: formData.urgency === 'high' ? 'High Priority' : 
               formData.urgency === 'medium' ? 'Normal' : 'Low',
      assignee: {
        name: formData.assignTo || 'Unassigned',
        avatar: formData.assignTo ? "/assets/img/persona/user.svg" : "/assets/img/persona/user.svg"
      },
      // Additional purchase order specific fields
      orderNumber: orderNumber,
      vendor: formData.vendor || 'Unnamed Vendor',
      amount: formData.amount || '0.00',
      orderDate: formData.date,
      dueDate: formData.dueBy,
      createdAt: new Date().toISOString()
    };
    
    // Add the new task to tasks
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    // Save the ID for suggestion generation
    setLastCreatedTaskId(newTask.id);
    
    // Add a message showing the purchase order was created
    setMessages(prev => [...prev, { 
      id: prev.length + 1,
      sender: 'ai', 
      text: `✅ Purchase Order #${orderNumber} has been created successfully for ${formData.vendor || 'the specified vendor'}. The order has been sent for approval.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    // Close the purchase order form
    setActiveComponent(null);
    
    // If task is unassigned, add suggestion message after a short delay
    if (!formData.assignTo || formData.assignTo === 'Unassigned') {
      setTimeout(() => {
        const suggestions = generateAssignmentSuggestions(newTask);
        
        // Create AI suggestion message
        setMessages(prev => [...prev, { 
          id: prev.length + 1,
          sender: 'ai', 
          text: `I noticed this purchase order is unassigned. Based on the details, here are some team members who might be good fits:`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions,
          taskId: newTask.id
        }]);
      }, 1000);
    }
  };

  // Toggle commands visibility
  const toggleCommands = () => {
    setIsCommandsOpen(prev => !prev);
  };

  // Add keyboard handler for Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      // If there's an active component, close it first
      if (activeComponent) {
        setActiveComponent(null);
      } else {
        onClose();
      }
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
  }, [onClose, activeComponent]);

  useEffect(() => {
    // Scroll to bottom when component mounts or messages update
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
            className="text-gray-400 hover:text-white"
            aria-label="Close AI Assistant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className="mb-4"
              >
                {/* Message bubble */}
                <div className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
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
                
                {/* Suggestions section if this message has them */}
                {message.sender === 'ai' && message.suggestions && (
                  <div className="ml-10 mt-2 space-y-2">
                    {message.suggestions.map((suggestion, i) => (
                      <div 
                        key={i}
                        className="bg-gray-700/60 rounded-lg p-2 flex items-center justify-between border border-gray-600"
                      >
                        <div className="flex items-center">
                          <img
                            src={getImagePath(suggestion.avatar)}
                            alt={suggestion.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <div className="ml-2">
                            <p className="text-xs font-medium text-white">{suggestion.name}</p>
                            <p className="text-xs text-gray-400">{suggestion.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-300 hidden sm:block max-w-[100px] truncate">
                            {suggestion.reason}
                          </p>
                          <button
                            onClick={() => assignTaskFromSuggestion(message.taskId, suggestion)}
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded transition-colors"
                          >
                            Assign
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
            
            {/* Display active component if exists */}
            {activeComponent === 'PurchaseOrder' && (
              <div className="mb-4 mt-6 bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-medium">Create Purchase Order</h3>
                  <button 
                    onClick={() => setActiveComponent(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <PurchaseOrder onSubmit={handlePurchaseOrderSubmit} />
              </div>
            )}
          </div>
        </div>

        {/* Input form and collapsible quick commands section */}
        <div className="border-t border-gray-700">
          {/* Input form */}
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
          
          {/* Collapsible common tasks section */}
          <div className="px-4 pb-4">
            {/* Header with toggle button */}
            <button 
              onClick={toggleCommands}
              className="flex items-center justify-between w-full mb-2 text-xs text-gray-400 font-medium hover:text-gray-300"
            >
              <span>QUICK COMMANDS</span>
              {ChevronDownIcon}
            </button>
            
            {/* Quick commands content - conditionally shown */}
            <div 
              className={`transition-all duration-300 overflow-hidden ${
                isCommandsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex flex-wrap gap-2 pt-1">
                {commonTasks.map(task => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskClick(task.prompt, task.component)}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white py-1 px-3 rounded-full transition-colors"
                  >
                    {task.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;