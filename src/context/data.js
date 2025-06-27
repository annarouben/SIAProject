export const INITIAL_TASKS = [
  {
    id: 1,
    title: "Wood Pulp Supply",
    description: "Review and approve wood pulp supplier quotes for Q3",
    type: "Purchase Order",
    status: "Pending Review",
    urgency: "Normal",
    assignee: {
      name: "Astrid",
      avatar: "/assets/img/persona/astrid.png"
    }
  },
  {
    id: 2,
    title: "Senior Developer Position",
    description: "Review applications and schedule interviews for the frontend lead position",
    type: "Hire",
    status: "In Progress",
    urgency: "High Priority",
    assignee: {
      name: "Ben",
      avatar: "/assets/img/persona/ben.png"
    }
  },
  {
    id: 3,
    title: "New Supplier Materials",
    description: "Evaluate sample materials from the new packaging supplier",
    type: "Evaluate Product",
    status: "Pending Approval",
    urgency: "Normal",
    assignee: {
      name: "Amber",
      avatar: "/assets/img/persona/amber.png"
    }
  },
  {
    id: 4,
    title: "Office Equipment Order",
    description: "Process equipment order for new engineering team: laptops, monitors, and peripherals",
    type: "Purchase Order",
    status: "In Progress",
    urgency: "Normal",
    assignee: {
      name: "Mina",
      avatar: "/assets/img/persona/mina.png"
    }
  },
  {
    id: 5,
    title: "UX Designer Position",
    description: "Review portfolios and conduct interviews for senior UX designer role",
    type: "Hire",
    status: "Pending Review",
    urgency: "High Priority",
    assignee: {
      name: "Sally",
      avatar: "/assets/img/persona/sally.png"
    }
  },
  {
    id: 6,
    title: "Software License Renewal",
    description: "Review and renew design tool licenses for the product team",
    type: "Purchase Order",
    status: "Pending Approval",
    urgency: "Low",
    assignee: {
      name: "Hugo",
      avatar: "/assets/img/persona/hugo.png"
    }
  },
  {
    id: 7,
    title: "Team Lead Position",
    description: "Internal promotion review for project team lead position",
    type: "Hire",
    status: "In Progress",
    urgency: "Normal",
    assignee: {
      name: "Ben",
      avatar: "/assets/img/persona/ben.png"
    }
  },
  {
    id: 8,
    title: "Server Infrastructure",
    description: "Evaluate cloud service providers for new infrastructure setup",
    type: "Evaluate Product",
    status: "Pending Review",
    urgency: "High Priority",
    assignee: {
      name: "Amber",
      avatar: "/assets/img/persona/amber.png"
    }
  }
];

export const INITIAL_CHATS = {
  1: [
    {
      id: 1,
      userId: 'astrid',
      userName: 'Astrid',
      userAvatar: '/assets/img/persona/astrid.png',
      text: "I've reviewed the quotes from Northern Mills. Their pricing is competitive but we should negotiate delivery terms.",
      timestamp: '2025-06-19T14:30:00Z'
    },
    {
      id: 2,
      userId: 'ben',
      userName: 'Ben',
      userAvatar: '/assets/img/persona/ben.png',
      text: "Agreed. I'll schedule a call with their rep to discuss shipping costs.",
      timestamp: '2025-06-19T15:45:00Z'
    }
  ],
  2: [
    {
      id: 3,
      userId: 'ben',
      userName: 'Ben',
      userAvatar: '/assets/img/persona/ben.png',
      text: "First round of interviews completed. Three strong candidates identified.",
      timestamp: '2025-06-20T09:15:00Z'
    },
    {
      id: 4,
      userId: 'sally',
      userName: 'Sally',
      userAvatar: '/assets/img/persona/sally.png',
      text: "Great! Let's schedule technical assessments for next week.",
      timestamp: '2025-06-20T10:30:00Z'
    }
  ],
  5: [
    {
      id: 5,
      userId: 'sally',
      userName: 'Sally',
      userAvatar: '/assets/img/persona/sally.png',
      text: "Portfolio review complete. Found two promising candidates with fintech experience.",
      timestamp: '2025-06-20T11:00:00Z'
    }
  ]
};