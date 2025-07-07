import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import PurchaseOrder from './PurchaseOrder';
import { TaskProvider } from '../context/TaskContext';
import RecentActivities from './RecentActivities';

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  
  // Debug useEffect to monitor state changes
  useEffect(() => {
    console.log('Selected Contact:', selectedContact);
    console.log('Active Panel:', activePanel);
  }, [selectedContact, activePanel]);
  
  const handlePanelToggle = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };
  
  // Function to handle contact selection with toggle behavior
  const handleContactSelect = (contact) => {
    console.log('Contact clicked:', contact);
    
    // If this contact is already selected, toggle the panel off
    if (selectedContact && selectedContact.id === contact.id && activePanel === 'contact-details') {
      setActivePanel(null);
    } else {
      // Otherwise, select this contact and show the panel
      setSelectedContact(contact);
      setActivePanel('contact-details');
    }
  };
  
  // PurchaseOrderPanel component
  const PurchaseOrderPanel = ({ onClose }) => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-white">Create Purchase Order</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <PurchaseOrder />
    </div>
  );
  
  return (
    <div className="pt-16 flex h-screen bg-gray-900">
      {/* Contacts sidebar - on the left */}
      <div className="w-[250px] min-w-[250px] bg-gray-800 overflow-auto">
        <div className="p-4">
          <h2 className="text-lg font-medium text-white mb-4">Contacts</h2>
          <ContactList 
            onSelectContact={handleContactSelect} 
            selectedContactId={selectedContact?.id}
            isDetailsPanelOpen={activePanel === 'contact-details'}
          />
        </div>
      </div>
      
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
          
          {/* Recent Activities - in the main content area */}
          <div className="w-[250px] min-w-[250px] bg-gray-800 overflow-auto">
            <div className="p-4">
              <h2 className="text-lg font-medium text-white mb-4">Recent Activities</h2>
              <RecentActivities />
            </div>
          </div>
          
          {/* Side panel */}
          <div className={`fixed top-16 right-0 bottom-0 w-[400px] bg-gray-800 border-l border-gray-700 transition-transform transform ${
            activePanel ? 'translate-x-0' : 'translate-x-full'
          } z-50`}>
            {activePanel === 'purchase-order' && (
              <PurchaseOrderPanel onClose={() => setActivePanel(null)} />
            )}
            {activePanel === 'contact-details' && selectedContact && (
              <ContactDetails 
                contact={selectedContact}
                onClose={() => setActivePanel(null)} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;