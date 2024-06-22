import React from 'react';

const SimulateButton = ({ onClick, isSimulating }) => (
  <div className="flex justify-center mb-6">
    <button 
      onClick={onClick} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
      disabled={isSimulating}
    >
      {isSimulating ? 'Simulating...' : 'Run New Simulation'}
    </button>
  </div>
);

export default SimulateButton;
