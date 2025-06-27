import { useState } from 'react';
import CogIcon from './icons/CogIcon';
import AIAssistant from './AIAssistant';

const Navbar = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);

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
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Tasks
              </a>
              <button 
                onClick={() => setShowAIAssistant(true)}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
              >
                <img 
                  src="/assets/img/newtonLogo.png" 
                  alt="AI Assistant"
                  className="w-6 h-6"
                />
                AI Assistant
              </button>
            </div>
            <div className="border-l border-gray-700 h-16 flex items-center px-6">
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                <CogIcon />
                Admin
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {showAIAssistant && <AIAssistant onClose={() => setShowAIAssistant(false)} />}
    </>
  );
};

export default Navbar;