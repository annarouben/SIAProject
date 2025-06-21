import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import ContactList from './components/ContactList';
import Navbar from './components/Navbar';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="pt-16">
          <ContactList />
          <TaskList />
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
