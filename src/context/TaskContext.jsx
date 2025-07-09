import { createContext, useContext, useState } from 'react';
import { INITIAL_TASKS, INITIAL_CHATS } from './data';

const TaskContext = createContext();

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [chats, setChats] = useState(INITIAL_CHATS);

  // Function to find avatar for a given team member name
  const findAvatar = (name) => {
    const contact = INITIAL_TASKS.find(task => 
      task.assignee.name === name
    );
    return contact?.assignee.avatar || "/assets/img/persona/user.svg";
  };

  const addPurchaseOrder = (formData) => {
    // Find the contact's avatar based on the assignTo value
    const avatar = findAvatar(formData.assignTo);
    
    // Calculate the next available ID
    const highestId = Math.max(...tasks.map(task => 
      typeof task.id === 'number' ? task.id : 0
    ));
    
    // Create a new task object in the format expected by the Tasks table
    const newTask = {
      id: highestId + 1,
      title: formData.vendor ? `${formData.vendor} Purchase Order` : 'New Purchase Order',
      description: formData.description || 'No description provided',
      type: "Purchase Order",
      status: "Pending Review",
      urgency: formData.urgency === 'high' ? 'High Priority' : 
               formData.urgency === 'medium' ? 'Normal' : 'Low',
      assignee: {
        name: formData.assignTo || 'Unassigned',
        avatar: avatar
      },
      // Additional purchase order specific fields
      orderNumber: formData.orderNumber,
      vendor: formData.vendor || 'Unnamed Vendor',
      amount: formData.amount || '0.00',
      orderDate: formData.date,
      dueDate: formData.dueBy,
      observers: formData.observers,
      createdAt: new Date().toISOString() // Important for animation trigger
    };
    
    // Add the new task to the tasks array
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    // Initialize an empty chat array for this task
    setChats(prevChats => ({
      ...prevChats,
      [newTask.id]: []
    }));
    
    return newTask;
  };

  const updateTaskUrgency = (taskId, newUrgency) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, urgency: newUrgency }
          : task
      );
    });
  };

  const calculateTaskRisk = (task) => {
    // Risk calculation logic based on task properties
    // Returns an object with level, score, and factors
    
    // Example simplified implementation:
    if (task.urgency === "High Priority") {
      return {
        level: "High",
        score: 70,
        factors: ["Task marked as high priority", "Requires immediate attention"]
      };
    }
    
    if (task.type === "Purchase Order" && task.assignee.name === "Unassigned") {
      return {
        level: "High",
        score: 65,
        factors: ["Purchase order is unassigned", "Approval process cannot start"]
      };
    }
    
    // More logic here based on our discussed risk factors
    // Default low risk
    return {
      level: "Low",
      score: 25,
      factors: ["Task is on track", "No risk factors identified"]
    };
  };

  const value = {
    tasks,
    setTasks,
    chats,
    setChats,
    updateTaskUrgency,
    addPurchaseOrder,
    calculateTaskRisk
  };
  
  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;