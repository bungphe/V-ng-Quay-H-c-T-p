
import React from 'react';

interface WheelProps {
  items: { name: string }[];
  isSpinning: boolean;
  rotation: number;
  duration: number;
}

const sliceColors = ['#A2D9FF', '#FFE29A', '#E6C7F7', '#FFB5A7'];

export const Wheel: React.FC<WheelProps> = ({ items, isSpinning, rotation, duration }) => {
  const numItems = items.length;
  const sliceAngle = 360 / numItems;

  const conicGradient = React.useMemo(() => {
    if (numItems === 0) return 'radial-gradient(circle, white 50%, gray 51%)';
    const gradientParts = items
      .map((_, i) => {
        const color = sliceColors[i % sliceColors.length];
        const startAngle = i * sliceAngle;
        const endAngle = (i + 1) * sliceAngle;
        return `${color} ${startAngle}deg ${endAngle}deg`;
      })
      .join(', ');
    return `conic-gradient(${gradientParts})`;
  }, [items, sliceAngle, numItems]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-[90%] aspect-square rounded-full flex items-center justify-center">
        {/* Wheel Body */}
        <div
          className="absolute w-full h-full rounded-full border-[6px] border-white shadow-xl"
          style={{
            background: conicGradient,
            transition: isSpinning ? `transform ${duration}s ease-out` : 'none',
            transform: `rotate(${rotation}deg)`,
          }}
        ></div>

        {/* Labels Container */}
        <div className="absolute w-full h-full">
          {items.map((item, index) => {
            const angle = sliceAngle * index + sliceAngle / 2;
            return (
              <div
                key={index}
                className="absolute top-0 left-1/2 w-1/2 h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '0% 50%',
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center pl-4 pr-8"
                  style={{
                    transform: `rotate(${-90}deg)`,
                  }}
                >
                  <span className="text-gray-700 font-bold text-sm md:text-base text-center break-words" style={{ transform: 'translateX(-50%)'}}>
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Center bulls-eye icon */}
        <div className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
