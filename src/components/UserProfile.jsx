import { useState } from 'react';
import { getImagePath } from '../utils/imagePath';

const UserProfile = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const userInfo = {
    name: 'Mina Chen',
    title: 'Product Manager',
    email: 'mina.chen@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Product Development',
    location: 'San Francisco, CA',
    avatar: '/assets/img/persona/mina.png',
    joinDate: 'January 2022',
    bio: 'Product manager with 8+ years of experience in enterprise software development. Focused on creating intuitive interfaces for complex workflows.'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-white">User Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Profile header */}
        <div className="bg-gray-750 p-6 flex items-center">
          <img 
            src={getImagePath(userInfo.avatar)}
            alt={userInfo.name}
            className="w-24 h-24 rounded-full border-4 border-blue-600"
          />
          <div className="ml-6">
            <h3 className="text-2xl font-bold text-white">{userInfo.name}</h3>
            <p className="text-gray-300">{userInfo.title}</p>
            <p className="text-gray-400 text-sm mt-1">{userInfo.department} • {userInfo.location}</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-700">
          <nav className="flex -mb-px px-4">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'profile' 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'preferences' 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'security' 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </nav>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <p className="text-gray-300">{userInfo.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">Email</h4>
                  <p className="text-gray-300">{userInfo.email}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">Phone</h4>
                  <p className="text-gray-300">{userInfo.phone}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">Department</h4>
                  <p className="text-gray-300">{userInfo.department}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">Location</h4>
                  <p className="text-gray-300">{userInfo.location}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase text-gray-500 font-semibold mb-1">Joined</h4>
                  <p className="text-gray-300">{userInfo.joinDate}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-300 font-medium mb-2">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-8 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">Created purchase order <span className="text-blue-400">PO-87523</span></p>
                      <p className="text-gray-500 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-8 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">Commented on <span className="text-blue-400">Office Equipment Order</span></p>
                      <p className="text-gray-500 text-xs">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-300 font-medium mb-2">Notification Settings</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox rounded bg-gray-700 border-gray-600 text-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-300">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox rounded bg-gray-700 border-gray-600 text-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-300">Desktop notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox rounded bg-gray-700 border-gray-600 text-blue-500" />
                    <span className="ml-2 text-sm text-gray-300">SMS notifications</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-300 font-medium mb-2">Theme Preferences</h4>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 bg-gray-900 rounded-full border-2 border-blue-500"></button>
                  <button className="w-8 h-8 bg-indigo-900 rounded-full"></button>
                  <button className="w-8 h-8 bg-gray-100 rounded-full"></button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm text-gray-300 font-medium mb-2">Change Password</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Confirm Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm text-gray-300 font-medium mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-400 mb-2">Add an extra layer of security to your account</p>
                <button className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm py-2 px-4 rounded transition-colors">
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-700 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm py-2 px-4 rounded transition-colors mr-2"
          >
            Close
          </button>
          {activeTab !== 'profile' && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;