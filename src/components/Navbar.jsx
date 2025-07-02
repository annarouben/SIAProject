import { useState } from 'react';
import AIAssistant from './AIAssistant';
import UserProfile from './UserProfile';
import { getImagePath } from '../utils/imagePath';

const Navbar = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const handleProfileClick = () => {
    setShowUserProfile(true);
    setShowAIAssistant(false);
    setActiveView('profile');
  };

  const handleDashboardClick = () => {
    // Close any open views and show dashboard
    setShowUserProfile(false);
    setShowAIAssistant(false);
    setActiveView('dashboard');
  };

  const handleAIAssistantClick = () => {
    setShowAIAssistant(true);
    setActiveView('ai');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
        <div className="h-16 flex items-center justify-between">
          <div className="w-[400px] px-6">
            <span className="text-xl font-bold text-white">SIA</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-4 px-6">
              <button 
                onClick={handleDashboardClick}
                className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium
                  ${activeView === 'dashboard' ? 'bg-gray-700 text-white' : ''}
                `}
              >
                Dashboard
              </button>
              <button 
                onClick={handleAIAssistantClick}
                className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2
                  ${activeView === 'ai' ? 'bg-gray-700 text-white' : ''}
                `}
              >
                <img 
                  src={getImagePath('/assets/img/newtonLogo.png')}
                  alt="AI Assistant"
                  className="w-6 h-6"
                />
                AI Assistant
              </button>
            </div>
            <div className="border-l border-gray-700 h-16 flex items-center px-6">
              <button 
                onClick={handleProfileClick} 
                className={`flex items-center hover:opacity-80 transition-opacity
                  ${activeView === 'profile' ? 'opacity-100' : 'opacity-80'}
                `}
                aria-label="View user profile"
              >
                <img 
                  src={getImagePath('/assets/img/persona/mina.png')}
                  alt="Mina Chen"
                  className={`w-8 h-8 rounded-full border-2 ${activeView === 'profile' ? 'border-blue-500' : 'border-gray-600'}`}
                />
                <div className="ml-2 text-left hidden md:block">
                  <p className="text-sm text-gray-200 font-medium">Mina Chen</p>
                  <p className="text-xs text-gray-400">Product Manager</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Render the correct view based on state */}
      {showAIAssistant && <AIAssistant onClose={() => {
        setShowAIAssistant(false);
        setActiveView('dashboard');
      }} />}
      
      {showUserProfile && <UserProfile onClose={() => {
        setShowUserProfile(false);
        setActiveView('dashboard');
      }} />}

      {/* The Dashboard view will be shown by default when other components are hidden */}
    </>
  );
};

export default Navbar;