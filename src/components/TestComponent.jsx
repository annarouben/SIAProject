// TestComponent.jsx - A minimal React component for testing rendering
import React from 'react';

const TestComponent = () => {
  console.log('TestComponent rendering...');
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'white',
      color: 'black',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px'
    }}>
      <h1>Hello World!</h1>
      <p>If you can see this, React is working properly.</p>
      <button 
        style={{
          padding: '10px 20px',
          background: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          marginTop: '20px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Click Me
      </button>
    </div>
  );
};

export default TestComponent;
