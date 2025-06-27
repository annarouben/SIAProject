import { createContext, useContext, useState } from 'react';
import { INITIAL_TASKS, INITIAL_CHATS } from './data';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  console.log('TaskProvider initializing...');
  console.log('INITIAL_TASKS:', INITIAL_TASKS);
  console.log('INITIAL_CHATS:', INITIAL_CHATS);
  
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [chats, setChats] = useState(INITIAL_CHATS);

  const updateTaskUrgency = (taskId, newUrgency) => {
    console.group('Task Urgency Update');
    console.log('Before update - tasks:', tasks);
    console.log('Updating taskId:', taskId);
    console.log('New urgency:', newUrgency);
    
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, urgency: newUrgency }
          : task
      );
      console.log('After update - tasks:', updatedTasks);
      console.groupEnd();
      return updatedTasks;
    });
  };

  const value = {
    tasks,
    setTasks,
    chats,
    setChats,
    updateTaskUrgency,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}