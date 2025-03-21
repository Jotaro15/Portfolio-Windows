import React from 'react';

export const BottomActions = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-r from-[#2277d9] to-[#5aa1ff] border-t border-gray-300 flex justify-end gap-2">
      <button className="text-white hover:bg-[#2f71cd] px-3 py-1.5 rounded flex items-center space-x-2 transition-colors duration-200">
        <img 
          src="/assets/Log_Off.png" 
          alt="Log Off" 
          className="w-8 h-8"
        />
        <span className="text-sm">Log Off</span>
      </button>
      <button className="text-white hover:bg-[#2f71cd] px-3 py-1.5 rounded flex items-center space-x-2 transition-colors duration-200">
        <img 
          src="/assets/Turn_Off.png" 
          alt="Turn Off Computer" 
          className="w-8 h-8"
        />
        <span className="text-sm">Turn Off Computer</span>
      </button>
    </div>
  );
};