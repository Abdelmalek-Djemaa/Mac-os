import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import finder from "../../assets/finder.webp";
import launchpad from "../../assets/launchpad.webp";
import Apps from './Apps';
import Folder from './Folder';
import Camera from '../Apps/Camera';
import Terminal from '../Apps/Terminal';

const Bottombar = () => {
  const [showApps, setShowApps] = useState(false);
  const [showFinder, setShowFinder] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleShowCamera = () => {
    setShowApps(false);
    setShowCamera(true);
  };
  const handleShowTerminal = () => {
    setShowApps(false);
    setShowTerminal(true);
  };
  const handleShowFinder = () => {
    setShowApps(false);
    setShowFinder(true);
  };

  return (
    <div className='relative'>
      <div className='flex justify-center items-center bottom-0 fixed p-2 w-full z-[999]'>
        <nav className="flex justify-center items-center px-4 py-2 bg-white bg-opacity-40 backdrop-blur-md max-w-md rounded-3xl border-white border-opacity-20">
          <div className="flex items-center">
            <ul className="flex items-center space-x-2">
              <li onClick={handleShowFinder}>
                <img src={finder} className='w-[60px]' />
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
      {showTerminal && (
        <div className="fixed top-0 bottom-0 right-0 left-0">
          <Terminal setShowTerminal={() => setShowTerminal(false)} />
        </div>
      )}

      <AnimatePresence>
        {showApps && (
          <Apps setShowCamera={handleShowCamera} setShowTerminal={handleShowTerminal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bottombar;
