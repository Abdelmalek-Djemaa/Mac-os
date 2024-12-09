import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import finder from "../../assets/finder.svg";
import launchpad from "../../assets/launchpad.webp";
import Apps from './Apps';
import Folder from './Folder';
import Camera from '../Apps/Camera';

const Bottombar = () => {
  const [showApps, setShowApps] = useState(false);
  const [showFinder, setShowFinder] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handleShowCamera = () => {
    setShowApps(false); // Close apps when showing the camera
    setShowCamera(true);
  };

  return (
    <div className='relative'>
      <div className='flex justify-center items-center bottom-0 fixed p-2 w-full z-[999]'>
        <nav className="flex justify-center items-center px-4 py-2 shadow-xl bg-black bg-opacity-40 backdrop-blur-md max-w-md rounded-3xl border border-gray-400">
          <div className="flex items-center">
            <ul className="flex items-center space-x-4">
              <li onClick={() => setShowFinder(true)}>
                <img src={finder} className='w-12 rounded-xl' />
              </li>
              <li onClick={() => setShowApps(!showApps)}>
                <img src={launchpad} className='w-[60px]' />
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {showFinder && (
        <div className="fixed top-0 bottom-0 right-0 left-0">
          <Folder setShowFolder={() => setShowFinder(false)} folderName={"Finder"} />
        </div>
      )}
      {showCamera && (
        <div className="fixed top-0 bottom-0 right-0 left-0">
          <Camera setShowCamera={() => setShowCamera(false)} />
        </div>
      )}

      <AnimatePresence>
        {showApps && (
          <Apps setShowCamera={handleShowCamera} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bottombar;
