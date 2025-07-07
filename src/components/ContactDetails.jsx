import { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { getImagePath } from '../utils/imagePath';

const ContactDetails = ({ contact, onClose, onNavigate, currentIndex, totalContacts }) => {
  const [activeTab, setActiveTab] = useState('info'); // 'info', 'activity', 'tasks'

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Arrow keys for navigation
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        onNavigate('next');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNavigate, onClose]);

  // Sample recent activities for the contact
  const recentActivities = [
    { id: 1, type: 'task_completed', description: 'Completed the UI design review', timestamp: new Date(Date.now() - 3600000 * 2) },
    { id: 2, type: 'comment_added', description: 'Left feedback on product roadmap', timestamp: new Date(Date.now() - 3600000 * 5) },
    { id: 3, type: 'meeting_scheduled', description: 'Scheduled client presentation meeting', timestamp: new Date(Date.now() - 3600000 * 24) },
    { id: 4, type: 'document_uploaded', description: 'Uploaded new project specifications', timestamp: new Date(Date.now() - 3600000 * 48) },
  ];

  // Sample task ratings
  const taskRatings = [
    { id: 1, task: 'UI Design for Customer Dashboard', rating: 4.5, date: 'Jul 2, 2025' },
    { id: 2, task: 'API Integration Documentation', rating: 5, date: 'Jun 29, 2025' },
    { id: 3, task: 'Stakeholder Presentation', rating: 4, date: 'Jun 25, 2025' },
    { id: 4, task: 'User Testing Session', rating: 4.5, date: 'Jun 20, 2025' },
  ];

  const getStressLevelColor = (stress) => {
    switch (stress) {
      case 'High stress':
        return 'bg-red-500';
      case 'Moderate stress':
        return 'bg-yellow-500';
      case 'Low stress':
        return 'bg-green-500';
      case 'Bored':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'task_completed':
        return (
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case 'comment_added':
        return (
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
          </svg>
        );
      case 'meeting_scheduled':
        return (
          <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with navigation controls, contact count, and close button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
        <div className="flex items-center">
          <h2 className="text-lg font-medium text-white mr-4">
            Contact Details 
            <span className="ml-2 text-sm text-gray-400">
              {currentIndex + 1} of {totalContacts}
            </span>
          </h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => onNavigate('prev')}
              className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors prev-contact-btn"
              aria-label="Previous contact"
              title="Previous contact (← / ↑ keys)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => onNavigate('next')}
              className="p-1.5 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors next-contact-btn"
              aria-label="Next contact"
              title="Next contact (→ / ↓ keys)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 hover:text-white"
          title="Close details (Esc)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Contact header information */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <img 
            src={getImagePath(contact.avatar)} 
            alt={contact.name} 
            className="w-16 h-16 rounded-full mr-4 border-2 border-gray-700 object-cover"
          />
          <div>
            <h3 className="text-xl font-medium text-white">{contact.name}</h3>
            <p className="text-gray-400">{contact.title}</p>
            <div className="mt-1">
              <StarRating rating={contact.rating} />
            </div>
          </div>
        </div>

        {/* Capacity indicator */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex-1 mr-4">
            <div className="text-sm text-gray-400 flex justify-between mb-1">
              <span>Work Capacity</span>
              <span>{contact.capacityPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${Math.min(contact.capacityPercentage, 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full">
            <span className={`w-2 h-2 rounded-full ${getStressLevelColor(contact.workCapacity.stress)}`} />
            <span className="text-sm text-gray-300">{contact.workCapacity.stress}</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button 
          className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'info' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('info')}
        >
          Info
        </button>
        <button 
          className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'activity' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button 
          className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'tasks' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('tasks')}
        >
          Task Ratings
        </button>
      </div>
      
      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm uppercase text-gray-500 font-medium mb-1">Email</h4>
              <p className="text-gray-300">{contact.email}</p>
            </div>
            <div>
              <h4 className="text-sm uppercase text-gray-500 font-medium mb-1">Phone</h4>
              <p className="text-gray-300">{contact.phone}</p>
            </div>
            <div>
              <h4 className="text-sm uppercase text-gray-500 font-medium mb-1">Department</h4>
              <p className="text-gray-300">{contact.department}</p>
            </div>
            <div>
              <h4 className="text-sm uppercase text-gray-500 font-medium mb-1">Best at</h4>
              <div className="mt-1">
                <span className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full">
                  {contact.goodAtTask}
                </span>
              </div>
            </div>
          </div>
        )}
        
        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="p-4">
            <ul className="space-y-4">
              {recentActivities.map(activity => (
                <li key={activity.id} className="flex items-start">
                  <div className="bg-gray-700 rounded-full p-1 mr-3 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Task Ratings Tab */}
        {activeTab === 'tasks' && (
          <div className="p-4">
            <ul className="space-y-4">
              {taskRatings.map(task => (
                <li key={task.id} className="bg-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-gray-200 font-medium">{task.task}</h5>
                      <p className="text-xs text-gray-400 mt-1">{task.date}</p>
                    </div>
                    <div className="mt-1">
                      <StarRating rating={task.rating} size="sm" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 mt-auto">
        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Message
          </button>
          <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;

/* Usage example with suggested code change:
<ContactDetails 
  contact={{
    ...selectedContact,
    avatar: selectedContact.avatar
  }}
  onClose={() => setActivePanel(null)}
  onNavigate={handleContactNavigation}
  currentIndex={currentContactIndex}
  totalContacts={allContacts.length}
/>
*/