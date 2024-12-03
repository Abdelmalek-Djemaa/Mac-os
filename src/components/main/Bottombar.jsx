import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import finder from "../../assets/finder.svg";
import launchpad from "../../assets/launchpad.webp";
import Apps from './Apps';
import Folder from './Folder';

const Bottombar = () => {
  const [showApps, setShowApps] = useState(false);
  const [showFinder, setShowFinder] = useState(false);

  return (
    <div className='relative'>
      <div className='flex justify-center items-center bottom-0 fixed p-2 w-full z-[999]'>
        <nav className="flex justify-center items-center px-4 py-2 bg-black bg-opacity-50 text-white max-w-md rounded-3xl border border-gray-400">
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

      <AnimatePresence>
        {showApps && (
          <Apps />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bottombar;
