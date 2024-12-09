import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/apple.svg';
import { RiShutDownLine } from 'react-icons/ri';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              navigate('/Home');
            }, 0);
            return 100;
          }
          return prev + 3.5;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [loading, navigate]);

  const startLoading = () => {
    setProgress(0);
    setLoading(true);
  };

  return (
    <div className="fixed w-full h-full flex flex-col justify-center items-center bg-black text-white px-12">
      <img src={logo} alt="Loading logo" className="sm:w-[80px] w-16 mb-16" />
      
      {!loading ? (
        <div
          onClick={startLoading}
          className="bg-white text-black sm:p-6 p-4 rounded-full hover:bg-gray-200 duration-200 hover:scale-105"
        >
          <RiShutDownLine size={26} />
        </div>
      ) : (
        <div className="sm:max-w-[280px] max-w-[180px] w-full bg-gray-700 sm:h-2 h-1 rounded-full">
          <div
            className="bg-white h-full rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Loading;
