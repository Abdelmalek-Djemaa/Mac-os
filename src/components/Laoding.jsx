import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/apple.svg';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Defer navigation to the next tick
          setTimeout(() => {
            navigate('/Splash'); // Navigate to Home page when progress is 100%
          }, 0);
          return 100; // Ensure it stops at 100%
        }
        return prev + 3.5; // Increment progress
      });
    }, 100); // Updates every 100ms, completing in ~4 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [navigate]);

  return (
    <div className="fixed w-full h-full flex flex-col justify-center items-center bg-black text-white px-12">
      <img src={logo} alt="Loading logo" className="sm:w-24 w-20 mb-12" />
      <div className="max-w-sm w-full bg-gray-700 sm:h-2.5 h-2 rounded-full">
        <div
          className="bg-white h-full rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
