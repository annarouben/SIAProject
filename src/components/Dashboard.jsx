import { useState, useEffect } from 'react';
import TaskList from './TaskList';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import PurchaseOrder from './PurchaseOrder';
import { TaskProvider } from '../context/TaskContext';
import RecentActivities from './RecentActivities';
import { getImagePath } from '../utils/imagePath';

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [allContacts, setAllContacts] = useState([]);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  
  // Load contact data
  useEffect(() => {
    // This would normally come from an API call, but for now we'll use static data
    const contacts = [
      {
        id: 1,
        name: "Amber",
        avatar: "/assets/img/persona/amber.png",
        rating: 5,
        workCapacity: {
          label: 'Over capacity',
          range: '> 100%',
          stress: 'High stress'
        },
        capacityPercentage: 120,
        goodAtTask: "Evaluate Product",
        title: "Product Specialist",
        department: "Product",
        email: "amber@example.com",
        phone: "(555) 123-4567"
      },
      {
        id: 2,
        name: "Astrid",
        avatar: "/assets/img/persona/astrid.png",
        rating: 4,
        workCapacity: {
          label: 'At capacity',
          range: '95-100%',
          stress: 'Moderate stress'
        },
        capacityPercentage: 98,
        goodAtTask: "Purchase Order",
        title: "Procurement Officer",
        department: "Finance",
        email: "astrid@example.com",
        phone: "(555) 234-5678"
      },
      {
        id: 3,
        name: "Ben",
        avatar: "/assets/img/persona/ben.png",
        rating: 3,
        workCapacity: {
          label: 'Available',
          range: '60-94%',
          stress: 'Low stress'
        },
        capacityPercentage: 75,
        goodAtTask: "Hire",
        title: "HR Manager",
        department: "Human Resources",
        email: "ben@example.com",
        phone: "(555) 345-6789"
      },
      {
        id: 4,
        name: "Hugo",
        avatar: "/assets/img/persona/hugo.png",
        rating: 4,
        workCapacity: {
          label: 'Low workload',
          range: '< 60%',
          stress: 'Bored'
        },
        capacityPercentage: 45,
        goodAtTask: "Evaluate Product",
        title: "Product Analyst",
        department: "Product",
        email: "hugo@example.com",
        phone: "(555) 456-7890"
      },
      {
        id: 5,
        name: "Mina",
        avatar: "/assets/img/persona/mina.png",
        rating: 5,
        workCapacity: {
          label: 'At capacity',
          range: '95-100%',
          stress: 'Moderate stress'
        },
        capacityPercentage: 95,
        goodAtTask: "Purchase Order",
        title: "Product Manager",
        department: "Product",
        email: "mina@example.com",
        phone: "(555) 567-8901"
      },
      {
        id: 6,
        name: "Sally",
        avatar: "/assets/img/persona/sally.png",
        rating: 3,
        workCapacity: {
          label: 'Available',
          range: '60-94%',
          stress: 'Low stress'
        },
        capacityPercentage: 80,
        goodAtTask: "Hire",
        title: "Talent Acquisition",
        department: "Human Resources",
        email: "sally@example.com",
        phone: "(555) 678-9012"
      }
    ];
    
    setAllContacts(contacts);
  }, []);
  
  // Function to handle contact navigation
  const handleContactNavigation = (direction) => {
    if (!selectedContact || allContacts.length === 0) return;
    
    // Find the current index
    const currentIndex = allContacts.findIndex(c => c.id === selectedContact.id);
    if (currentIndex === -1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % allContacts.length;
    } else {
      newIndex = (currentIndex - 1 + allContacts.length) % allContacts.length;
    }
    
    // Add visual feedback by briefly highlighting the navigation button
    const buttonSelector = direction === 'next' ? '.next-contact-btn' : '.prev-contact-btn';
    const navButton = document.querySelector(buttonSelector);
    if (navButton) {
      navButton.classList.add('bg-gray-700', 'text-white');
      setTimeout(() => {
        navButton.classList.remove('bg-gray-700', 'text-white');
      }, 200);
    }
    
    setSelectedContact(allContacts[newIndex]);
  };
  
  // Function to handle contact selection
  const handleContactSelect = (contact) => {
    // If this contact is already selected, toggle the panel off
    if (selectedContact && selectedContact.id === contact.id && activePanel === 'contact-details') {
      setActivePanel(null);
    } else {
      // Otherwise, select this contact and show the panel
      setSelectedContact(contact);
      setActivePanel('contact-details');
    }
  };
  
  // Function to toggle panels
  const handlePanelToggle = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  // Get current contact index
  const currentContactIndex = selectedContact 
    ? allContacts.findIndex(c => c.id === selectedContact.id)
    : -1;
  
  // Add this function to your Dashboard component
  const handleKeyboardNavigation = (e) => {
    // Only process keyboard events when appropriate
    // Ignore keyboard events when user is typing in input fields
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable) {
      return;
    }
    
    // Navigation shortcuts
    if (activePanel === 'contact-details') {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handleContactNavigation('prev');
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleContactNavigation('next');
      } else if (e.key === 'Escape') {
        setActivePanel(null);
      } else if (e.key === 'Home') {
        // Jump to first contact
        setSelectedContact(allContacts[0]);
      } else if (e.key === 'End') {
        // Jump to last contact
        setSelectedContact(allContacts[allContacts.length - 1]);
      } else if (e.key >= '1' && e.key <= '9') {
        // Jump to contact by number (1-9)
        const index = parseInt(e.key) - 1;
        if (index < allContacts.length) {
          setSelectedContact(allContacts[index]);
        }
      }
    }
    
    // Global shortcuts
    if (e.key === 'c' && e.ctrlKey && !activePanel) {
      // Toggle contact details panel with Ctrl+C
      if (selectedContact) {
        setActivePanel('contact-details');
      }
    } else if (e.key === 'p' && e.ctrlKey) {
      // Toggle purchase order panel with Ctrl+P
      e.preventDefault(); // Prevent browser print dialog
      handlePanelToggle('purchase-order');
    }
  };

  // Add this useEffect to set up the keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardNavigation);
    return () => window.removeEventListener('keydown', handleKeyboardNavigation);
  }, [selectedContact, activePanel, allContacts]);
  
  // Add this component inside your Dashboard component
  const KeyboardShortcutsHelp = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-white">Keyboard Shortcuts</h2>
          <button 
            onClick={() => setShowKeyboardHelp(false)}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="text-white font-medium mb-2">Contact Navigation</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Previous contact</span>
                <span className="text-gray-400">← or ↑ key</span>
              </li>
              <li className="flex justify-between">
                <span>Next contact</span>
                <span className="text-gray-400">→ or ↓ key</span>
              </li>
              <li className="flex justify-between">
                <span>First contact</span>
                <span className="text-gray-400">Home key</span>
              </li>
              <li className="flex justify-between">
                <span>Last contact</span>
                <span className="text-gray-400">End key</span>
              </li>
              <li className="flex justify-between">
                <span>Jump to contact #</span>
                <span className="text-gray-400">1-9 keys</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-2">Panel Controls</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between">
                <span>Close panel</span>
                <span className="text-gray-400">Esc key</span>
              </li>
              <li className="flex justify-between">
                <span>Toggle contact panel</span>
                <span className="text-gray-400">Ctrl + C</span>
              </li>
              <li className="flex justify-between">
                <span>Toggle purchase order</span>
                <span className="text-gray-400">Ctrl + P</span>
              </li>
            </ul>
          </div>
        </div>
        
        <button
          onClick={() => setShowKeyboardHelp(false)}
          className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="pt-16 flex h-screen bg-gray-900">
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white">Workflow Dashboard</h1>
            <div className="space-x-2 flex items-center">
              <button
                onClick={() => setShowKeyboardHelp(true)}
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                title="Keyboard shortcuts"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </button>
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
            activePanel === 'purchase-order' ? 'mr-[400px]' : ''
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
        </div>
      </div>
      
      {/* Contact List component */}
      <ContactList 
        contacts={allContacts}
        onSelectContact={handleContactSelect} 
        selectedContactId={selectedContact?.id}
        isDetailsPanelOpen={activePanel === 'contact-details'}
      />
      
      {/* Contact details panel with navigation */}
      {activePanel === 'contact-details' && selectedContact && (
        <div 
          className="fixed top-16 bottom-0 left-[400px] w-[calc(50%-200px)] bg-gray-800 border-l border-r border-gray-700 shadow-lg z-30 overflow-y-auto"
          style={{ boxShadow: "5px 0 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.1)" }}
        >
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
        </div>
      )}
      
      {/* Purchase order panel */}
      <div className={`fixed top-16 right-0 bottom-0 w-[400px] bg-gray-800 border-l border-gray-700 transition-transform transform ${
        activePanel === 'purchase-order' ? 'translate-x-0' : 'translate-x-full'
      } z-50`}>
        {activePanel === 'purchase-order' && (
          <PurchaseOrderPanel onClose={() => setActivePanel(null)} />
        )}
      </div>

      {/* Add the help dialog at the end of your component */}
      {showKeyboardHelp && <KeyboardShortcutsHelp />}
    </div>
  );
};

export default Dashboard;