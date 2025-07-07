import { useState, useEffect, useRef } from 'react';
import { getImagePath } from '../utils/imagePath';
import Contact from './Contact';
import ContactDetails from './ContactDetails';

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
    stress: 'Low stress'
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

const ContactList = ({ onSelectContact, selectedContactId, isDetailsPanelOpen }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [overlayPosition, setOverlayPosition] = useState({ top: 0 });
  const contactRefs = useRef({});
  
  const contacts = [
    {
      id: 1,
      name: "Amber",
      avatar: "/assets/img/persona/amber.png",
      rating: 5,
      workCapacity: WORK_CAPACITY.OVER_CAPACITY,
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
      workCapacity: WORK_CAPACITY.AT_CAPACITY,
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
      workCapacity: WORK_CAPACITY.AVAILABLE,
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
      workCapacity: WORK_CAPACITY.LOW_LOAD,
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
      workCapacity: WORK_CAPACITY.AT_CAPACITY,
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
      workCapacity: WORK_CAPACITY.AVAILABLE,
      capacityPercentage: 80,
      goodAtTask: "Hire",
      title: "Talent Acquisition",
      department: "Human Resources",
      email: "sally@example.com",
      phone: "(555) 678-9012"
    }
  ];

  const toggleContacts = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Update main layout when contacts panel changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--contacts-panel-width', 
      isExpanded ? '400px' : '80px'
    );
    
    window.dispatchEvent(new CustomEvent('contactsPanelResize', {
      detail: { isExpanded }
    }));
  }, [isExpanded]);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.goodAtTask.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handler for contact click with position calculation
  const handleContactClick = (contact, e) => {
    console.log('Contact clicked:', contact);
    
    // Calculate position for overlay based on the clicked element
    const contactElement = contactRefs.current[contact.id];
    if (contactElement) {
      const rect = contactElement.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Position the overlay next to the contact
      setOverlayPosition({
        top: rect.top + scrollTop,
      });
    }
    
    if (typeof onSelectContact === 'function') {
      onSelectContact(contact);
    } else {
      console.error('onSelectContact is not a function or not provided');
    }
  };
  
  // Get selected contact object
  const selectedContact = contacts.find(contact => contact.id === selectedContactId);
  
  return (
    <div 
      className={`fixed left-0 top-16 bg-gray-900 transition-all duration-300 z-10 ${
        isExpanded ? 'w-[400px]' : 'w-[80px]'
      } h-[calc(100vh-64px)]`}
    >
      {/* The main contact list */}
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
              
              {/* Search bar */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-4">
                {filteredContacts.map((contact) => (
                  <div 
                    key={contact.id} 
                    ref={el => contactRefs.current[contact.id] = el}
                    onClick={(e) => handleContactClick(contact, e)}
                    className={`cursor-pointer ${
                      selectedContactId === contact.id && isDetailsPanelOpen
                        ? 'ring-2 ring-blue-500 ring-opacity-75 rounded-lg'
                        : ''
                    }`}
                  >
                    <Contact 
                      contact={{
                        ...contact,
                        avatar: getImagePath(contact.avatar)
                      }}
                      isSelected={selectedContactId === contact.id && isDetailsPanelOpen}
                    />
                  </div>
                ))}
                
                {filteredContacts.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No contacts found</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Collapsed View - Vertically stacked avatars */
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
                ref={el => contactRefs.current[contact.id] = el}
                className={`group relative cursor-pointer ${
                  selectedContactId === contact.id && isDetailsPanelOpen
                    ? 'ring-2 ring-blue-500 ring-opacity-75 rounded-full'
                    : ''
                }`}
                style={{ zIndex: 50 - index }}
                onClick={(e) => handleContactClick(contact, e)}
              >
                <img 
                  src={getImagePath(contact.avatar)}
                  alt={contact.name}
                  className={`w-12 h-12 rounded-full border-2 ${
                    selectedContactId === contact.id && isDetailsPanelOpen
                      ? 'border-blue-500'
                      : 'border-gray-700'
                  } object-cover transition-transform hover:scale-110`}
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
      
      {/* Contact Details Overlay */}
      {isDetailsPanelOpen && selectedContact && (
        <div 
          className="fixed left-[400px] bg-gray-800 border-gray-700 border shadow-xl rounded-lg w-[400px] max-h-[80vh] overflow-auto z-50 transform transition-all duration-300"
          style={{ 
            top: `${overlayPosition.top}px`, 
            maxHeight: 'calc(100vh - 80px - 16px)',  // Account for header and some padding
          }}
        >
          <ContactDetails 
            contact={{
              ...selectedContact,
              avatar: getImagePath(selectedContact.avatar)
            }}
            onClose={() => onSelectContact(selectedContact)} // Toggle off when closing
          />
        </div>
      )}
    </div>
  );
};

export default ContactList;