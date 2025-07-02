import { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import './index.css';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-900 text-gray-200">
        <Navbar />
        <Dashboard />
        {/* Dashboard is always rendered, but will be hidden behind other components when needed */}
      </div>
    </TaskProvider>
  );
}

export default App;
