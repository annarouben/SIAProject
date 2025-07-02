import { useState } from 'react';
import TaskList from './TaskList';
import ContactList from './ContactList';
import PurchaseOrder from './PurchaseOrder';
import { TaskProvider } from '../context/TaskContext';

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState(null);
  
  const handlePanelToggle = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  
  return (
    <div className="pt-16 flex h-screen bg-gray-900">
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white">Workflow Dashboard</h1>
            <div className="space-x-2">
              <button
                onClick={() => handlePanelToggle('purchase-order')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activePanel === 'purchase-order' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                Create Purchase Order
              </button>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Main task area */}
          <div className={`flex-1 overflow-auto p-4 transition-all ${
            activePanel ? 'mr-[400px]' : ''
          }`}>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-white mb-4">Tasks</h2>
              <TaskList />
            </div>
          </div>
          
          {/* Side panel */}
          <div className={`fixed top-16 right-0 bottom-0 w-[400px] bg-gray-800 border-l border-gray-700 transition-transform transform ${
            activePanel ? 'translate-x-0' : 'translate-x-full'
          }`}>
            {activePanel === 'purchase-order' && (
              <PurchaseOrderPanel onClose={() => setActivePanel(null)} />
            )}
            {activePanel === 'contact-details' && (
              <ContactDetailPanel onClose={() => setActivePanel(null)} />
            )}
          </div>
        </div>
      </div>
      
      {/* Contacts sidebar */}
      <div className="w-[400px] border-l border-gray-700 bg-gray-800 overflow-auto">
        <div className="p-4">
          <h2 className="text-lg font-medium text-white mb-4">Contacts</h2>
          <ContactList onSelectContact={(contact) => {
            setActivePanel('contact-details');
            // Set selected contact details here
          }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;