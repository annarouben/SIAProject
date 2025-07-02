import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { HashRouter } from 'react-router-dom';
import './index.css';
import './App.css';

function App() {
  console.log('App component rendering with full functionality');
  return (
    <TaskProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-900 text-gray-200">
          <Navbar />
          <Dashboard />
        </div>
      </HashRouter>
    </TaskProvider>
  );
}

export default App;
