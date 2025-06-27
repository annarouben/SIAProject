import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import ContactList from './components/ContactList';
import Navbar from './components/Navbar';
import { HashRouter } from 'react-router-dom';
import './index.css';
import './App.css';

function App() {
  console.log('App component rendering with full functionality');
  return (
    <TaskProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <div className="pt-16">
            <ContactList />
            <TaskList />
          </div>
        </div>
      </HashRouter>
    </TaskProvider>
  );
}

export default App;
