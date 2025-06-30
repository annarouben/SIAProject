import { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import SearchIcon from './icons/SearchIcon';
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
        {/* Updated search container with icon */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-gray-700 text-gray-300 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
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