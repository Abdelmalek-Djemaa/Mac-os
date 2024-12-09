import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/apple.svg";
import { IoBatteryCharging, IoBatteryDead, IoBatteryFull, IoBatteryHalf } from 'react-icons/io5';
import About from './About';

const Topbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [batteryCharging, setBatteryCharging] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [batteryInfoVisible, setBatteryInfoVisible] = useState(false);  // New state for battery info modal
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
        const updateBatteryStatus = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setBatteryCharging(battery.charging);
        };

        updateBatteryStatus();
        battery.addEventListener('levelchange', updateBatteryStatus);
        battery.addEventListener('chargingchange', updateBatteryStatus);

        return () => {
          battery.removeEventListener('levelchange', updateBatteryStatus);
          battery.removeEventListener('chargingchange', updateBatteryStatus);
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
    if (batteryCharging) return <IoBatteryCharging />;
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

  const handleAboutClick = () => {
    setMenuVisible(false);
    setShowAbout(true);
  };

  const handleBatteryClick = () => {
    setBatteryInfoVisible((prev) => !prev);  // Toggle the battery info modal visibility
  };

  const getBatterySource = () => {
    return batteryCharging ? "Charging" : "On Battery";
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
            <li>File</li>
          </ul>

          {menuVisible && (
            <div className="absolute top-7 -left-6 bg-black bg-opacity-40 backdrop-blur-md shadow-xl  border-black border-opacity-20 text-white w-52 rounded-lg sm:text-[12px] text-[10px] p-0.5">
              <ul className="p-1">
                <li
                  className="p-1 rounded-md hover:bg-blue-400 cursor-default"
                  onClick={handleAboutClick}
                >
                  About This Mac
                </li>

                <li
                  className="p-1 rounded-md hover:bg-blue-400 cursor-default"
                  onClick={handleLogout}
                >
                  Shut Down...
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="text-right text-sm flex items-center space-x-2">
          {batteryLevel !== null && (
            <div className="flex items-center space-x-1 cursor-default" onClick={handleBatteryClick}>
              <span className="text-2xl">
                {getBatteryIcon()}
              </span>
              <span className="text-xs">{batteryLevel}%</span>
            </div>
          )}
          <div>
            {formattedDate} . {formattedTime}
          </div>
        </div>
      </nav>

      {batteryInfoVisible && (
        <div className="absolute border w-56 border-black border-opacity-20 top-8 right-2 bg-black bg-opacity-30 backdrop-blur-md shadow-xl p-4 text-[12px] rounded-lg text-white z-20">
          <p className="flex justify-between">
            <span>Battery Level</span>
            <span>{batteryLevel}%</span>
          </p>
          <p>Power Source: {getBatterySource()}</p>
        </div>
      )}

      {showAbout && <About setShowAbout={() => setShowAbout(false)} />}
    </div>
  );
};

export default Topbar;
