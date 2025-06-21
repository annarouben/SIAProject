import { useState } from 'react';
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

// SVGs from Heroicons (outline)
const ChevronUpIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" />
  </svg>
);

const ChevronDownIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ContactList = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const contacts = [
    {
      id: 1,
      name: "Amber",
      avatar: "assets/img/persona/amber.png",
      rating: 5,
      workCapacity: WORK_CAPACITY.OVER_CAPACITY,
      capacityPercentage: 120,
      goodAtTask: "Evaluate Product"
    },
    {
      id: 2,
      name: "Astrid",
      avatar: "assets/img/persona/astrid.png",
      rating: 4,
      workCapacity: WORK_CAPACITY.AT_CAPACITY,
      capacityPercentage: 98,
      goodAtTask: "Purchase Order"
    },
    {
      id: 3,
      name: "Ben",
      avatar: "assets/img/persona/ben.png",
      rating: 3,
      workCapacity: WORK_CAPACITY.AVAILABLE,
      capacityPercentage: 75,
      goodAtTask: "Hire"
    },
    {
      id: 4,
      name: "Hugo",
      avatar: "assets/img/persona/hugo.png",
      rating: 4,
      workCapacity: WORK_CAPACITY.LOW_LOAD,
      capacityPercentage: 45,
      goodAtTask: "Evaluate Product"
    },
    {
      id: 5,
      name: "Mina",
      avatar: "assets/img/persona/mina.png",
      rating: 5,
      workCapacity: WORK_CAPACITY.AT_CAPACITY,
      capacityPercentage: 95,
      goodAtTask: "Purchase Order"
    },
    {
      id: 6,
      name: "Sally",
      avatar: "assets/img/persona/sally.png",
      rating: 3,
      workCapacity: WORK_CAPACITY.AVAILABLE,
      capacityPercentage: 80,
      goodAtTask: "Hire"
    }
  ];

  // Avatar group component
  const AvatarGroup = () => (
    <div className="flex -space-x-4">
      {contacts.map(contact => (
        <img
          key={contact.id}
          src={contact.avatar}
          alt={contact.name}
          className="w-12 h-12 rounded-full border-2 border-gray-700 bg-gray-600"
          title={contact.name}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed left-0 top-16 w-[400px] h-[calc(100vh-64px)] bg-gray-900 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-100 mb-4">Contacts</h2>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactList;