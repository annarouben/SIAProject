import { useState, useEffect } from 'react';
import { getImagePath } from '../utils/imagePath';
import Contact from './Contact';

const WORK_CAPACITY = {
  OVER_CAPACITY: {
    label: 'Over capacity',
    range: '> 100%',
    stress: 'High stress'
  },
  AT_CAPACITY: {
    label: 'At capacity',
    range: '95-100%',
    stress: 'Moderate stress'
  },
  AVAILABLE: {
    label: 'Available',
    range: '60-94%',
    stress: 'Low stress'  // Changed from 'Normal'
  },
  LOW_LOAD: {
    label: 'Low workload',
    range: '< 60%',
    stress: 'Bored'
  }
};

// SVGs from Heroicons (outline) - Replacing Up/Down with Left/Right
const ChevronLeftIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const ContactList = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const contacts = [
    {
      id: 1,
      name: "Amber",
      avatar: "/assets/img/persona/amber.png",
      rating: 5,
      workCapacity: WORK_CAPACITY.OVER_CAPACITY,
      capacityPercentage: 120,
      goodAtTask: "Evaluate Product"
    },
    {
      id: 2,
      name: "Astrid",
      avatar: "/assets/img/persona/astrid.png",
      rating: 4,
      workCapacity: WORK_CAPACITY.AT_CAPACITY,
      capacityPercentage: 98,
      goodAtTask: "Purchase Order"
    },
    {
      id: 3,
      name: "Ben",
      avatar: "/assets/img/persona/ben.png",
      rating: 3,
      workCapacity: WORK_CAPACITY.AVAILABLE,
      capacityPercentage: 75,
      goodAtTask: "Hire"
    },
    {
      id: 4,
      name: "Hugo",
      avatar: "/assets/img/persona/hugo.png",
      rating: 4,
      workCapacity: WORK_CAPACITY.LOW_LOAD,
      capacityPercentage: 45,
      goodAtTask: "Evaluate Product"
    },
    {
      id: 5,
      name: "Mina",
      avatar: "/assets/img/persona/mina.png",
      rating: 5,
      workCapacity: WORK_CAPACITY.AT_CAPACITY,
      capacityPercentage: 95,
      goodAtTask: "Purchase Order"
    },
    {
      id: 6,
      name: "Sally",
      avatar: "/assets/img/persona/sally.png",
      rating: 3,
      workCapacity: WORK_CAPACITY.AVAILABLE,
      capacityPercentage: 80,
      goodAtTask: "Hire"
    }
  ];

  const toggleContacts = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Update main layout when contacts panel changes
  useEffect(() => {
    // Set a CSS variable that other components can use to adjust their layout
    document.documentElement.style.setProperty(
      '--contacts-panel-width', 
      isExpanded ? '400px' : '80px'
    );
    
    // Dispatch a custom event that TasksList can listen for
    window.dispatchEvent(new CustomEvent('contactsPanelResize', {
      detail: { isExpanded }
    }));
  }, [isExpanded]);

  return (
    <div 
      className={`fixed left-0 top-16 bg-gray-900 transition-all duration-300 z-10 ${
        isExpanded ? 'w-[400px]' : 'w-[80px]'
      } h-[calc(100vh-64px)]`}
    >
      {isExpanded ? (
        /* Expanded View */
        <>
          {/* Toggle Button - Right aligned with content */}
          <div className="relative">
            <div className="absolute right-6 top-6">
              <button
                onClick={toggleContacts}
                className="bg-gray-800 rounded-full p-1 border border-gray-700 z-20"
                aria-label="Collapse contacts"
              >
                <div className="text-gray-300 hover:text-white">
                  {ChevronLeftIcon}
                </div>
              </button>
            </div>
          </div>
          
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-100 mb-4">Contacts</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <Contact 
                    key={contact.id} 
                    contact={{
                      ...contact,
                      avatar: getImagePath(contact.avatar)
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Collapsed View - Vertically stacked avatars with consistent left padding */
        <div className="flex flex-col py-6 pl-6 items-center">
          {/* Toggle Button at the top */}
          <button
            onClick={toggleContacts}
            className="mb-6 bg-gray-800 rounded-full p-1 border border-gray-700"
            aria-label="Expand contacts"
          >
            <div className="text-gray-300 hover:text-white">
              {ChevronRightIcon}
            </div>
          </button>
          
          {/* Vertically stacked avatars with negative margin */}
          <div className="flex flex-col -space-y-2">
            {contacts.slice(0, 5).map((contact, index) => (
              <div 
                key={contact.id} 
                className="group relative" 
                style={{ zIndex: 50 - index }}
              >
                <img 
                  src={getImagePath(contact.avatar)}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full border-2 border-gray-700 object-cover transition-transform hover:scale-110"
                  title={contact.name}
                />
                <div className="absolute -right-28 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 px-2 py-1 text-xs rounded whitespace-nowrap z-50">
                  {contact.name}
                </div>
              </div>
            ))}
            
            {contacts.length > 5 && (
              <div className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center text-xs font-medium text-white z-10">
                +{contacts.length - 5}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;