import React from 'react';
import { Circle } from 'lucide-react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center">
        {/* Animated circles using pure CSS */}
        <div className="flex gap-2">
          <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
            <Circle className="w-3 h-3 text-purple-600" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '150ms' }}>
            <Circle className="w-3 h-3 text-purple-600" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '300ms' }}>
            <Circle className="w-3 h-3 text-purple-600" />
          </div>
        </div>
        
        {/* Premium text with CSS animation */}
        <div className="mt-4 relative overflow-hidden">
          <h2 
            className="text-4xl font-black text-purple-600 tracking-wider animate-pulse"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            PREMIUM THRIFT
          </h2>
        </div>
        
        {/* Animated underline using CSS */}
        <div className="relative w-48 h-0.5 mt-2 bg-purple-200 overflow-hidden">
          <div className="absolute inset-0 animate-[slide_1s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add keyframes for slide animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slide {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
document.head.appendChild(style);

export default Loader;