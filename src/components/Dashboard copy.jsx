import TaskList from './TaskList';
import ContactList from './ContactList';

const Dashboard = () => {
  
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100%',
      paddingTop: '64px',
      boxSizing: 'border-box',
      background: '#111827',
      overflow: 'hidden'
    }}>
      {/* Column 1: Contacts (fixed width) */}
      <div style={{
        width: '250px',
        minWidth: '250px',
        background: '#1F2937',
        overflow: 'auto',
        borderRight: '1px solid #374151'
      }}>
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '500', 
          color: 'white', 
          margin: '16px'
        }}>Contacts</h2>
        <ContactList onSelectContact={(contact) => {
          console.log('Contact selected:', contact);
        }} />
      </div>
      
      {/* Column 2: Tasks (flexible width) */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <header style={{
          background: '#1F2937',
          borderBottom: '1px solid #374151',
          padding: '16px'
        }}>
          <h1 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            color: 'white',
            margin: 0
          }}>Workflow Dashboard</h1>
        </header>
        
        <div style={{ 
          flex: '1',
          overflow: 'auto',
          padding: '16px'
        }}>
          <h2 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '500', 
            color: 'white', 
            marginBottom: '16px'
          }}>Tasks</h2>
          <TaskList />
        </div>
      </div>
      
      {/* Column 3: Activity (fixed width) */}
      <div 
        ref={thirdColumnRef}
        style={{
          width: '250px',
          minWidth: '250px',
          background: '#1F2937',
          overflow: 'auto',
          borderLeft: '1px solid #374151'
        }}
      >
        <h2 style={{ 
          fontSize: '1.125rem', 
          fontWeight: '500', 
          color: 'white', 
          margin: '16px'
        }}>Activity</h2>
        <div style={{ 
          padding: '0 16px 16px',
          color: '#9CA3AF' 
        }}>
          <p>Recent activity will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;