import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from "../../assets/apple.svg";
import { IoBatteryDead, IoBatteryFull, IoBatteryHalf } from 'react-icons/io5';
import About from './About';

const Topbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const getBattery = async () => {
      try {
        const battery = await navigator.getBattery();
        const updateBatteryLevel = () => {
          setBatteryLevel(Math.round(battery.level * 100));
        };

        updateBatteryLevel();
        battery.addEventListener('levelchange', updateBatteryLevel);

        return () => {
          battery.removeEventListener('levelchange', updateBatteryLevel);
        };
      } catch (error) {
        console.error("Battery API not supported or failed to fetch:", error);
      }
    };

    getBattery();
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const getBatteryIcon = () => {
    if (batteryLevel === null) return <IoBatteryDead />;
    if (batteryLevel > 75) return <IoBatteryFull />;
    if (batteryLevel > 25) return <IoBatteryHalf />;
    return <IoBatteryDead />;
  };

  const handleLogoClick = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleLogout = () => {
    navigate('/');
  };


  return (
    <div>
      <nav className="flex justify-between items-center px-4 py-0.5 bg-black bg-opacity-50 text-white fixed top-0 w-full z-10">
        <div className="relative flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="w-4 h-4 object-contain"
            onClick={handleLogoClick}
          />
          <ul className="flex items-center space-x-3 text-sm">
            <li className="font-bold">Finder</li>
            <li className="">File</li>
          </ul>

          {menuVisible && (
            <div className="absolute top-6 -left-6 bg-black bg-opacity-50 border border-gray-400 text-white w-52 shadow-lg rounded-lg sm:text-sm text-[10px] p-0.5">
              <ul className="p-1">
                <li className="px-1 py-0.5 rounded-md hover:bg-blue-400 cursor-default"
                onClick={() => setShowAbout(true)}
                >
                  About This Mac
                </li>
                <div className="h-px bg-gray-400 my-1"></div>

                <li
                  className="px-1 py-0.5 rounded-md hover:bg-blue-400 cursor-pointer"
                  onClick={handleLogout}
                >
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="text-right text-sm flex items-center space-x-2">
          {batteryLevel !== null && (
            <div className="flex items-center space-x-1">
              <span className="text-2xl">{getBatteryIcon()}</span>
              <span className="text-xs">{batteryLevel}%</span>
            </div>
          )}
          <div>
            {formattedDate} . {formattedTime}
          </div>
        </div>
      </nav>
      {showAbout && <About setShowAbout={()=>setShowAbout(false)} />}
    </div>
  );
};

export default Topbar;
