import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { formatDistanceToNow } from 'date-fns';

const TaskChat = ({ taskId }) => {
  const [message, setMessage] = useState('');
  const { chats } = useTaskContext();
  const taskChats = chats[taskId] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add message handling logic here
    console.log('Sending message for task:', taskId, message);
    setMessage('');
  };

  return (
    <div className="p-4 border-t border-gray-700 pl-24"> {/* Added pl-24 for left padding */}
      <div className="max-h-60 overflow-y-auto mb-4 border-l-2 border-gray-600 pl-4"> {/* Added border and padding */}
        {taskChats.map(chat => (
          <div key={chat.id} className="mb-4">
            <div className="flex items-start gap-2">
              <img 
                src={chat.userAvatar}
                alt={chat.userName} 
                className="w-6 h-6 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-300">{chat.userName}</span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(chat.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{chat.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="flex gap-2 pl-4"> {/* Added pl-4 to align with messages */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 text-gray-300 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <button 
          type="submit"
          className="px-4 py-2 text-sm rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default TaskChat;