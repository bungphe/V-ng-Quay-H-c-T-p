
import React from 'react';
import { Wheel } from './Wheel';

interface CenterPanelProps {
  items: { name: string }[];
  isSpinning: boolean;
  rotation: number;
  duration: number;
  onSpin: () => void;
  title: string;
}

export const CenterPanel: React.FC<CenterPanelProps> = ({
  items,
  isSpinning,
  rotation,
  duration,
  onSpin,
  title,
}) => {
  return (
    <div className="h-full flex flex-col items-center justify-between p-4 space-y-4">
       <h2 className="text-2xl font-bold text-gray-800 text-center">{title}</h2>
      <div className="relative w-full flex-grow flex items-center justify-center">
        {/* Pointer */}
        <div className="absolute top-[-10px] z-10" style={{ filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.3))' }}>
           <div className="w-0 h-0 
              border-l-[20px] border-l-transparent
              border-r-[20px] border-r-transparent
              border-t-[30px] border-t-red-500">
           </div>
        </div>

        <Wheel items={items} isSpinning={isSpinning} rotation={rotation} duration={duration} />
      </div>
      <button
        onClick={onSpin}
        disabled={isSpinning || items.length === 0}
        className="w-full max-w-xs font-bold text-2xl text-white py-4 rounded-full shadow-lg bg-gradient-to-r from-green-400 to-orange-400 hover:from-green-500 hover:to-orange-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        QUAY NGAY!
      </button>
    </div>
  );
};
