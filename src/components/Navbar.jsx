import NewtonLogo from './icons/NewtonLogo';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
      <div className="h-16 flex items-center">
        <div className="w-[400px] px-6">
          <div className="flex items-center gap-2">
            <NewtonLogo />
            <span className="text-xl font-bold text-white">SIA</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Dashboard
          </a>
          <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Tasks
          </a>
          <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2">
            AI Assistant
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;