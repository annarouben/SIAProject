import React from 'react';

const DebugInfo = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-4">
      <h2 className="text-xl font-bold">Debug Information</h2>
      <p>Application is loading...</p>
      <p>If you see this message, React is rendering properly.</p>
    </div>
  );
};

export default DebugInfo;
