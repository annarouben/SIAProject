import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { getImagePath } from '../utils/imagePath';
import ChatThread from './ChatThread'; // Import ChatThread

const Task = ({ task }) => {
  const [showUrgencyDropdown, setShowUrgencyDropdown] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { updateTaskUrgency, chats, calculateTaskRisk } = useTaskContext();

  // Calculate risk for this task
  const risk = calculateTaskRisk(task);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUrgencyDropdown) {
        setShowUrgencyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUrgencyDropdown]);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High Priority':
        return 'bg-red-500';
      case 'Normal':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDefaultAction = (status) => {
    switch (status) {
      case 'Pending Review':
        return 'Review';
      case 'Pending Approval':
        return 'Approve';
      case 'In Progress':
        return 'Complete';
      case 'Completed':
        return 'Archive';
      default:
        return 'Action';
    }
  };

  const handleUrgencyChange = (newUrgency) => {
    console.log('handleUrgencyChange triggered'); // Debug log
    console.group('Handling Urgency Change');
    console.log('Task:', task);
    console.log('New urgency:', newUrgency);
    updateTaskUrgency(task.id, newUrgency);
    setShowUrgencyDropdown(false);
    console.groupEnd();
  };

  const handleUrgencyOptionClick = (e, option) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log('Option clicked with event:', e.type);
    handleUrgencyChange(option);
  };

  const hasChatMessages = chats && chats[task.id]?.length > 0;

  const ChatIcon = (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className="w-4 h-4"
      fill={hasChatMessages ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" 
      />
    </svg>
  );

  const EllipsisIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 6a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
    </svg>
  );

  const ChevronDownIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  // Get chat messages for this task
  const taskMessages = chats[task.id] || [];

  // Get color for risk indicator dot
  const getRiskColor = (level) => {
    switch(level) {
      case "Low": return "bg-green-500";
      case "Moderate": return "bg-yellow-500";
      case "High": return "bg-orange-500";
      case "Critical": return "bg-red-600";
      default: return "bg-gray-500";
    }
  };

  const handleSetUrgency = (urgency) => {
    updateTaskUrgency(task.id, urgency);
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Main task row - removing bottom border with more specificity */}
      <tr className="bg-gray-800 hover:bg-gray-700 transition-colors border-b-0 !border-b-0" style={{ borderBottom: 'none' }}>
        {/* All your existing columns */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            {task.assignee && task.assignee.avatar ? (
              <img 
                src={getImagePath(task.assignee.avatar)}
                alt={task.assignee.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <img 
                  src="/assets/img/persona/user.svg"
                  alt="Unassigned"
                  className="w-full h-full"
                />
              </div>
            )}
            <span className="ml-3 text-sm text-gray-300">
              {task.assignee && task.assignee.name ? task.assignee.name : "Unassigned"}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{task.type}</td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-300">{task.title}</div>
          <div className="text-xs text-gray-400 mt-1 line-clamp-3">{task.description}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap relative">
          {/* Urgency dropdown */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowUrgencyDropdown(!showUrgencyDropdown);
            }}
            className="w-32 px-2 py-1 inline-flex items-center justify-between text-xs leading-5 font-semibold rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${getUrgencyColor(task.urgency)}`} />
              <span>{task.urgency}</span>
            </div>
            {ChevronDownIcon}
          </button>
          
          {/* Urgency dropdown menu */}
          {showUrgencyDropdown && (
            <div className="absolute mt-2 w-32 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {['High Priority', 'Normal', 'Low'].map((option) => (
                  <button
                    key={option}
                    onMouseDown={(e) => handleUrgencyOptionClick(e, option)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      option === task.urgency ? 'bg-gray-600' : ''
                    } text-gray-300 hover:bg-gray-600 transition-colors`}
                    role="menuitem"
                  >
                    <div className="flex items-center">
                      <span className={`w-2.5 h-2.5 rounded-full mr-2 ${getUrgencyColor(option)}`} />
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          {task.status}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
          <div className="flex items-center justify-end gap-2">
            <button 
              className="w-24 px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            >
              {getDefaultAction(task.status)}
            </button>
            <button 
              onClick={handleChatToggle}
              className={`p-1 rounded-full transition-colors ${
                showChat ? 'bg-gray-600 text-gray-200' : 
                hasChatMessages ? 'text-gray-200' : 'text-gray-400'
              } hover:bg-gray-600`}
              aria-label={`${hasChatMessages ? 'View chat' : 'Start chat'}`}
            >
              {ChatIcon}
            </button>
          </div>
        </td>
      </tr>

      {/* Always visible compact risk row - with nested appearance and no top border */}
        <tr 
          className="bg-gray-850 border-t-0 border-b border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer"
          style={{ borderTop: 'none' }}
          onClick={() => setShowRiskDetails(!showRiskDetails)}
        >
          <td colSpan="6" className="py-3 px-6" style={{ paddingBottom: '2rem' }}>
            <div className="flex items-center pl-4 border-l-2" style={{ borderLeftColor: risk.level === "Low" ? "#10B981" : risk.level === "Moderate" ? "#F59E0B" : risk.level === "High" ? "#F97316" : risk.level === "Critical" ? "#EF4444" : "#6B7280" }}>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-xs font-medium text-gray-300">
              {risk.level} Risk 
            </span>
            {/* Score display */}
              <span className="text-xs font-medium text-gray-400 ml-2">
                Score: {risk.score}/100
              </span>
              {risk.factors && risk.factors.length > 0 && (
                <span className="text-xs text-gray-400 ml-2">
                  • {risk.factors[0]}
                  {risk.factors.length > 1 && ` + ${risk.factors.length - 1} more factors`}
                </span>
              )}
            </div>
            <div className="ml-auto">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 text-gray-400 transition-transform ${showRiskDetails ? 'transform rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </td>
      </tr>

      {/* Expanded risk details - visible only when expanded */}
      {showRiskDetails && (
        <tr className="bg-gray-900">
          <td colSpan="6" className="px-6 py-4">
            <div className="bg-gray-800 rounded-md p-4 border-l-4" 
                 style={{ borderLeftColor: risk.level === "Low" ? "#10B981" : 
                                       risk.level === "Moderate" ? "#F59E0B" : 
                                       risk.level === "High" ? "#F97316" : 
                                       risk.level === "Critical" ? "#EF4444" : "#6B7280" }}>
              <div className="flex items-center mb-3">
                <div className={`h-3 w-3 rounded-full ${getRiskColor(risk.level)} mr-2`}></div>
                <h3 className="text-sm font-medium text-white">{risk.level} Risk Assessment</h3>
                {risk.score && (
                  <div className="ml-auto">
                    <span className="text-sm font-medium text-gray-300">
                      Score: {risk.score}/100
                    </span>
                  </div>
                )}
              </div>
              
              <h4 className="text-xs font-medium text-gray-300 mb-2">Risk Factors:</h4>
              <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                {risk.factors.map((factor, idx) => (
                  <li key={idx}>{factor}</li>
                ))}
              </ul>
              
              {/* Optional: Recommended Actions */}
              <h4 className="text-xs font-medium text-gray-300 mt-4 mb-2">Recommended Actions:</h4>
              <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                {risk.level === "Critical" && (
                  <>
                    <li>Escalate to management immediately</li>
                    <li>Schedule emergency review meeting</li>
                  </>
                )}
                {risk.level === "High" && (
                  <>
                    <li>Schedule review with team lead within 24 hours</li>
                    <li>Document mitigation steps in next status update</li>
                  </>
                )}
                {risk.level === "Moderate" && (
                  <li>Monitor for changes in status or additional risk factors</li>
                )}
                {risk.level === "Low" && (
                  <li>Continue with standard workflow</li>
                )}
              </ul>
            </div>
          </td>
        </tr>
      )}

      {/* Chat row - unchanged */}
      {showChat && (
        <tr>
          <td colSpan="6" className="bg-gray-800">
            <div className="bg-gray-800 p-4">
              <ChatThread messages={taskMessages} />
              
              {/* Add comment input */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default Task;