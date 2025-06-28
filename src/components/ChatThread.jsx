import { formatDistanceToNow } from 'date-fns';
import { getImagePath } from '../utils/imagePath';

const ChatThread = ({ messages = [] }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400 text-sm">
        No messages yet. Start a conversation!
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {messages.map((message) => (
        <div key={message.id} className="flex items-start gap-3">
          <img
            src={getImagePath(message.userAvatar)}
            alt={message.userName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-sm text-gray-200">
                {message.userName}
              </span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-gray-300 mt-1">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatThread;