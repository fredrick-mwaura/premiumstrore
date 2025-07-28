import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 23,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center">
      <span className="text-xs mr-2 text-gray-600 font-medium">Ends in:</span>
      <div className="flex space-x-1">
        <div className="bg-gray-800 text-white py-1 px-2 rounded text-xs font-medium">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-xs text-gray-800">:</span>
        <div className="bg-gray-800 text-white py-1 px-2 rounded text-xs font-medium">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-xs text-gray-800">:</span>
        <div className="bg-gray-800 text-white py-1 px-2 rounded text-xs font-medium">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;