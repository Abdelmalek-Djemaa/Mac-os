import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../../assets/apple.svg";
import { IoBatteryCharging, IoBatteryDead, IoBatteryFull, IoBatteryHalf } from 'react-icons/io5';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import About from './About';

const Topbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [batteryCharging, setBatteryCharging] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [batteryInfoVisible, setBatteryInfoVisible] = useState(false);
  const [dateTimePanelVisible, setDateTimePanelVisible] = useState(false);
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
  const handleMenuClick = (menu) => {
    setOpenMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleAboutClick = () => {
    setOpenMenu(null);
    setShowAbout(true);
  };

  const handleBatteryClick = () => {
    setBatteryInfoVisible((prev) => !prev);
  };

  const handleDateTimeClick = () => {
    setDateTimePanelVisible((prev) => !prev);
  };

  const getTimeDifference = (timeZone) => {
    const userTime = currentTime;
    const zoneTime = new Date(
      userTime.toLocaleString('en-US', { timeZone })
    );

    const diffInMs = zoneTime - userTime;
    const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));

    return diffInHours >= 0 ? `+${diffInHours}h` : `${diffInHours}h`;
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-4 py-0.5 bg-black bg-opacity-50 text-white fixed top-0 w-full z-10">
      <div className="relative flex items-center space-x-3">
          {/* Apple Logo Menu */}
          <img
            src={logo}
            alt="Logo"
            className="w-4 h-4 object-contain cursor-default"
            onClick={() => handleMenuClick('apple')}
          />

          {/* Finder Menu */}
          <ul className="flex items-center space-x-3 text-sm">
            <li className="font-bold cursor-pointer" onClick={() => handleMenuClick('finder')}>Finder</li>
            <li className="cursor-pointer" onClick={() => handleMenuClick('file')}>File</li>
          </ul>

          {/* Dropdown Menus */}
          {openMenu === 'apple' && (
            <div className="absolute top-7 -left-5 bg-black bg-opacity-40 backdrop-blur-md shadow-xl border-black border-opacity-20 text-white w-52 rounded-lg text-sm p-0.5">
              <ul className="p-1">
                <li className="p-1 rounded-md hover:bg-blue-400 cursor-default" onClick={handleAboutClick}>About This Mac</li>
                <li className="p-1 rounded-md hover:bg-blue-400 cursor-default" onClick={handleLogout}>Shut Down...</li>
              </ul>
            </div>
          )}

          {openMenu === 'finder' && (
            <div className="absolute top-7 left-4 bg-black bg-opacity-40 backdrop-blur-md shadow-xl border-black border-opacity-20 text-white w-52 rounded-lg text-sm p-0.5">
              <ul className="p-1">
                <li className="p-1 rounded-md hover:bg-blue-400 cursor-default">New Window</li>
                <li className="p-1 rounded-md hover:bg-blue-400 cursor-default">Close Window</li>
              </ul>
            </div>
          )}

          {openMenu === 'file' && (
            <div className="absolute top-7 left-16 bg-black bg-opacity-40 backdrop-blur-md shadow-xl border-black border-opacity-20 text-white w-52 rounded-lg text-sm p-0.5">
              <ul className="p-1">
                <li className="p-1 rounded-md hover:bg-blue-400 cursor-default">New File</li>
                <li className="p-1 rounded-md hover:bg-blue-400 cursor-default">Save File</li>
              </ul>
            </div>
          )}
        </div>

        <div className="text-right text-sm flex items-center space-x-2">
          {batteryLevel !== null && (
            <div className="flex items-center space-x-1 cursor-default" onClick={handleBatteryClick}>
              <span className="text-2xl">{getBatteryIcon()}</span>
              <span className="text-xs">{batteryLevel}%</span>
            </div>
          )}
          <div className="cursor-default" onClick={handleDateTimeClick}>
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
          <p>Power Source: {batteryCharging ? "Charging" : "On Battery"}</p>
        </div>
      )}

      <AnimatePresence>
        {dateTimePanelVisible && (
          <motion.div
            className="absolute top-8 right-2 w-[300px] space-y-2 shadow-xl rounded-3xl text-white p-4 z-20"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-[130px] flex flex-row space-x-4">
              {/* First Card: Complete Date */}
              <div className="mb-2 p-4 bg-black bg-opacity-70 backdrop-blur-xl w-1/2 rounded-3xl">
                <p className="text-sm text-red-600 font-medium">{currentTime.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <p className="text-3xl pb-4 font-medium">{currentTime.toLocaleDateString('en-US', { day: 'numeric' })}</p>
                <p className="text-sm">{currentTime.toLocaleDateString('en-US', { month: 'long' })}</p>
              </div>

              {/* Second Card: Country and Region */}
              <div className="mb-2 p-4 bg-blue-400 bg-opacity-70 backdrop-blur-xl w-1/2 rounded-3xl">
                <p className="text-2xl pb-10 font-medium">{Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[0]}</p>
                <p className="text-sm font-medium">{Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1]}</p>
              </div>
            </div>

            {/* Third Card: Different Time Zones with Clocks */}
            <div className="p-2 bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-3xl">
              <div className="flex flex-row space-x-2">
                <div className="flex flex-col items-center w-1/4">
                  <Clock value={currentTime} size={55} timeZone="America/New_York" />
                  <p className="text-[10px] font-medium pt-2">New York</p>
                  <p className="text-[10px] font-medium">{getTimeDifference('America/New_York')}</p>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  <Clock value={currentTime} size={55} timeZone="Europe/London" />
                  <p className="text-[10px] font-medium pt-2">London</p>
                  <p className="text-[10px] font-medium">{getTimeDifference('Europe/London')}</p>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  <Clock value={currentTime} size={55} timeZone="Asia/Tokyo" />
                  <p className="text-[10px] font-medium pt-2">Tokyo</p>
                  <p className="text-[10px] font-medium">{getTimeDifference('Asia/Tokyo')}</p>
                </div>
                <div className="flex flex-col items-center w-1/4">
                  <Clock value={currentTime} size={55} timeZone="Australia/Sydney" />
                  <p className="text-[10px] font-medium pt-2">Sydney</p>
                  <p className="text-[10px] font-medium">{getTimeDifference('Australia/Sydney')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAbout && <About setShowAbout={() => setShowAbout(false)} />}
    </div>
  );
};

export default Topbar;
