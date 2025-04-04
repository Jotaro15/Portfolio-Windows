import React from 'react';
import { SheetTrigger } from '../ui/sheet';

export const StartButton = () => {
  return (
    <SheetTrigger asChild>
      <button className="h-full px-4 flex items-center space-x-2 bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold rounded-sm mx-1">
        <img 
          src="/assets/Windows_Smiley.png" 
          alt="Start" 
          className="w-6 h-6" 
        />
        <span>start</span>
      </button>
    </SheetTrigger>
  );
};