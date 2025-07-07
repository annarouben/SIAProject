import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import Task from './Task';

const TaskList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactsExpanded, setContactsExpanded] = useState(true);
  const { tasks } = useTaskContext();

  useEffect(() => {
    // Listen for changes to the contacts panel
    const handleResize = (e) => {
      setContactsExpanded(e.detail.isExpanded);
    };

    window.addEventListener('contactsPanelResize', handleResize);
    
    // Get initial state
    const contactsWidth = getComputedStyle(document.documentElement)
      .getPropertyValue('--contacts-panel-width');
    setContactsExpanded(contactsWidth === '400px');

    return () => {
      window.removeEventListener('contactsPanelResize', handleResize);
    };
  }, []);

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="fixed right-0 top-16 h-[calc(100vh-64px)] bg-gray-900 overflow-y-auto transition-all duration-300" 
      style={{ 
        width: `calc(100% - var(--contacts-panel-width, 400px))` 
      }}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-100 mb-4">Tasks</h2>
        {/* Search tasks field - Updated for visual consistency */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-gray-700 text-sm text-white px-8 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {/* Search icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          
          {/* Clear search button */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-white"
              aria-label="Clear search"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Workflow</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTasks.map(task => (
                <Task key={task.id} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;