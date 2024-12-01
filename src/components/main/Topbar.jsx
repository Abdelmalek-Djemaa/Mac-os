import React,{ useState, useEffect } from 'react'
import logo from "../../assets/apple.svg";
import { IoBatteryDead, IoBatteryFull, IoBatteryHalf} from 'react-icons/io5';

const Topbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const getBattery = async () => {
      try {
        const battery = await navigator.getBattery();
        const updateBatteryLevel = () => {
          setBatteryLevel(Math.round(battery.level * 100));
        };

        // Initial fetch
        updateBatteryLevel();

        // Listen for battery level changes
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

  // Format date and time
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short', // Short weekday name
    day: 'numeric', // Numeric day
    month: 'short', // Short month name
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // 12-hour clock format
  });

  // Determine battery icon based on level
  const getBatteryIcon = () => {
    if (batteryLevel === null) return <IoBatteryDead />;
    if (batteryLevel > 75) return <IoBatteryFull />;
    if (batteryLevel > 25) return <IoBatteryHalf />;
  };
  return (
    <div>
        <nav className="flex justify-between items-center px-2 py-1 bg-black bg-opacity-50 text-white fixed top-0 w-full">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-4 object-contain cursor-pointer" />
          <ul className="flex items-center space-x-3 text-sm">
            <li className="cursor-pointer font-bold">Finder</li>
            <li className="cursor-pointer">File</li>
          </ul>
        </div>
        <div className="text-right text-sm flex items-center space-x-2">
          {batteryLevel !== null && (
            <div className="flex items-center space-x-1">
              <span className="text-2xl">{getBatteryIcon()}</span>
              <span className="text-xs">
                {batteryLevel}%
              </span>
            </div>
          )}
          <div>
            {formattedDate} . {formattedTime}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Topbar