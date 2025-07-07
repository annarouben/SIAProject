import { useState } from 'react';

const RecentActivities = () => {
  
  // Sample data for recent activities
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'purchase',
      action: 'Created purchase order',
      item: 'PO-87523',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 2,
      type: 'comment',
      action: 'Commented on',
      item: 'Office Equipment Order',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 3,
      type: 'task',
      action: 'Approved',
      item: 'Server Infrastructure',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 4,
      type: 'meeting',
      action: 'Scheduled meeting with',
      item: 'Design Team',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 5,
      type: 'review',
      action: 'Completed review for',
      item: 'Q2 Product Roadmap',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      )
    }
  ]);

  // Function to format timestamp relative to current time
  const formatTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - timestamp) / 1000);
    
    let interval = seconds / 31536000; // seconds in a year
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000; // seconds in a month
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400; // seconds in a day
    if (interval > 1) {
      const days = Math.floor(interval);
      return days === 1 ? 'Yesterday' : days + ' days ago';
    }
    
    interval = seconds / 3600; // seconds in an hour
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60; // seconds in a minute
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return 'Just now';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
      </div>
      
      {/* Activities list */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start text-sm">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-500 mr-3 mt-1">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-gray-300">
                    {activity.action} <span className="text-blue-400">{activity.item}</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{formatTimeAgo(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4">
        <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded-lg transition-colors">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;
