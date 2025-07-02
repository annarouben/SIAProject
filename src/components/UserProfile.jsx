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
    // Here you would implement the password update logic
    console.log('Password update requested:', passwordData);
    
    // Clear the form after submission
    setPasswordData({
      currentPassword: '',
      newPassword: ''
    });
    
    // Show success message or handle response
    alert('Password updated successfully!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header section - unchanged */}
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
        
        {/* Profile header - unchanged */}
        <div className="bg-gray-750 p-6 flex items-center">
          <img 
            src={getImagePath(userInfo.avatar)}
            alt={userInfo.name}
            className="w-24 h-24 rounded-full border-4 border-blue-600"
            onError={(e) => {
              console.error("Image failed to load:", userInfo.avatar);
              e.target.src = getImagePath('/assets/img/persona/default.png');
            }}
          />
          <div className="ml-6">
            <h3 className="text-2xl font-bold text-white">{userInfo.name}</h3>
            <p className="text-gray-300">{userInfo.title}</p>
            <p className="text-gray-400 text-sm mt-1">{userInfo.department} • {userInfo.location}</p>
          </div>
        </div>
        
        {/* Tabs - unchanged */}
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
          {/* Profile tab content - unchanged */}
          {activeTab === 'profile' && (
            /* Profile tab content stays the same */
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
          
          {/* Preferences tab content - unchanged */}
          {activeTab === 'preferences' && (
            /* Preferences tab content stays the same */
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
          
          {/* Security tab - updated with password visibility toggle */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm text-gray-300 font-medium mb-2">Change Password</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Current Password</label>
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
                    <label className="block text-xs text-gray-500 mb-1">New Password</label>
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
                  
                  {/* Removed confirm password field */}
                  
                  <div className="pt-2">
                    <button 
                      onClick={handleUpdatePassword}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
                    >
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
              
              <div>
                <h4 className="text-sm text-gray-300 font-medium mb-2">Login Sessions</h4>
                <div className="bg-gray-750 rounded p-3 mb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-300 text-sm">Current Session</p>
                      <p className="text-gray-500 text-xs">San Francisco, CA • Chrome on macOS</p>
                      <p className="text-gray-500 text-xs">Started July 2, 2025</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded bg-green-900 text-green-100">Active</span>
                  </div>
                </div>
                <button className="text-red-400 hover:text-red-300 text-sm">
                  Log out of all other sessions
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