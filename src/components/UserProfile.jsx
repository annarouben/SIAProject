import { useState } from 'react';
import { getImagePath } from '../utils/imagePath';

const UserProfile = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });
  
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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = () => {
    console.log('Password update requested:', passwordData);
    
    setPasswordData({
      currentPassword: '',
      newPassword: ''
    });
    
    alert('Password updated successfully!');
  };

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-gray-900 overflow-auto z-40">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Page header with back button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={onClose}
            className="mr-4 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-white">User Profile</h1>
        </div>
        
        {/* Profile header */}
        <div className="bg-gray-800 rounded-lg shadow-lg mb-6 p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img 
              src={getImagePath(userInfo.avatar)}
              alt={userInfo.name}
              className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4 md:mb-0"
              onError={(e) => {
                console.error("Image failed to load:", userInfo.avatar);
                e.target.src = getImagePath('/assets/img/persona/user.svg');
              }}
            />
            <div className="md:ml-8 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white">{userInfo.name}</h2>
              <p className="text-xl text-gray-300 mb-2">{userInfo.title}</p>
              <div className="flex flex-wrap justify-center md:justify-start space-x-4 text-gray-400">
                <span>{userInfo.department}</span>
                <span>•</span>
                <span>{userInfo.location}</span>
                <span>•</span>
                <span>Joined {userInfo.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="flex space-x-8">
            <button
              className={`pb-4 text-sm font-medium ${
                activeTab === 'profile' 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`pb-4 text-sm font-medium ${
                activeTab === 'preferences' 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
            <button
              className={`pb-4 text-sm font-medium ${
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
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Profile tab content */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">About</h3>
                <p className="text-gray-300">{userInfo.bio}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start text-sm">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-500 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">Created purchase order <span className="text-blue-400">PO-87523</span></p>
                      <p className="text-gray-500 text-xs mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-500 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">Commented on <span className="text-blue-400">Office Equipment Order</span></p>
                      <p className="text-gray-500 text-xs mt-1">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start text-sm">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900/30 text-blue-500 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300">Approved <span className="text-blue-400">Server Infrastructure</span> task</p>
                      <p className="text-gray-500 text-xs mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Preferences tab content */}
          {activeTab === 'preferences' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox rounded bg-gray-700 border-gray-600 text-blue-500" defaultChecked />
                    <span className="ml-3 text-gray-300">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox rounded bg-gray-700 border-gray-600 text-blue-500" defaultChecked />
                    <span className="ml-3 text-gray-300">Desktop notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox rounded bg-gray-700 border-gray-600 text-blue-500" />
                    <span className="ml-3 text-gray-300">SMS notifications</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Theme Preferences</h3>
                <div className="flex space-x-4">
                  <button className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-900 rounded-full border-2 border-blue-500 mb-2"></div>
                    <span className="text-sm text-gray-300">Dark</span>
                  </button>
                  <button className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-900 rounded-full mb-2"></div>
                    <span className="text-sm text-gray-300">Indigo</span>
                  </button>
                  <button className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full mb-2"></div>
                    <span className="text-sm text-gray-300">Light</span>
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Language</h3>
                <select className="w-full max-w-xs bg-gray-700 border border-gray-600 text-white text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div className="pt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
          
          {/* Security tab content */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                <div className="max-w-lg space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-200"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter your current password to confirm your identity</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">New Password</label>
                    <div className="relative">
                      <input 
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-200"
                      >
                        {showNewPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Use at least 8 characters with a mix of letters, numbers & symbols</p>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      onClick={handleUpdatePassword}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
                  <div className="bg-gray-750 rounded-lg p-4">
                    <p className="text-gray-300 mb-3">Protect your account with an extra layer of security. When 2FA is enabled, you'll be required to provide a code in addition to your password when logging in.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Login Sessions</h3>
                  <div className="bg-gray-750 rounded-lg p-4 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-gray-300">Current Session</p>
                        <p className="text-gray-500 text-xs">San Francisco, CA • Chrome on macOS</p>
                      </div>
                      <span className="px-2 py-1 text-xs rounded bg-green-900 text-green-100">Active</span>
                    </div>
                    <p className="text-gray-500 text-xs">Started July 2, 2025</p>
                  </div>
                  <button className="text-red-400 hover:text-red-300 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Log out of all other sessions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;