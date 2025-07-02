import { useState } from 'react';
import AIAssistant from './AIAssistant';
import UserProfile from './UserProfile';
import { getImagePath } from '../utils/imagePath';

const Navbar = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
        <div className="h-16 flex items-center justify-between">
          <div className="w-[400px] px-6">
            <span className="text-xl font-bold text-white">SIA</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-4 px-6">
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
              <button 
                onClick={() => setShowAIAssistant(true)}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
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
              {/* Admin link removed */}
              <button 
                onClick={() => setShowUserProfile(true)}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <img 
                  src={getImagePath('/assets/img/persona/mina.png')}
                  alt="Mina Chen"
                  className="w-8 h-8 rounded-full border-2 border-gray-600"
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
      
      {showAIAssistant && <AIAssistant onClose={() => setShowAIAssistant(false)} />}
      {showUserProfile && <UserProfile onClose={() => setShowUserProfile(false)} />}
    </>
  );
};

export default Navbar;