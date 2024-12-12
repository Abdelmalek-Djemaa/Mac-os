import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bg from "../../assets/ventura.webp";
import photobooth from "../../assets/photo-booth.webp";
import preview from "../../assets/preview.webp";
import terminal from "../../assets/terminal.webp";
import calendar from "../../assets/calendar.webp";
import { FaSearch } from 'react-icons/fa';

const Apps = ({ setShowCamera, setShowTerminal }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // List of apps with names and click handlers
  const apps = [
    {
      name: 'Photo Booth',
      image: photobooth,
      onClick: setShowCamera,
    },
    {
      name: 'Terminal',
      image: terminal,
      onClick: setShowTerminal,
    },
    {
      name: 'preview',
      image: preview,
      onClick: setShowCamera,
    },
    {
      name: 'calendar',
      image: calendar,
      onClick: setShowTerminal,
    },
    {
      name: 'Photo Booth',
      image: photobooth,
      onClick: setShowCamera,
    },
    {
      name: 'Terminal',
      image: terminal,
      onClick: setShowTerminal,
    },
    {
      name: 'preview',
      image: preview,
      onClick: setShowCamera,
    },
    {
      name: 'calendar',
      image: calendar,
      onClick: setShowTerminal,
    },
    
  ];

  // Filter apps based on the search term
  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="fixed w-full top-0 left-0 right-0 bottom-0 h-full flex justify-center items-center z-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        className="w-full h-full flex flex-col items-center relative bg-white bg-opacity-5 backdrop-blur-md"
      >
        {/* Search Input */}
        <div className="absolute top-5 sm:w-[250px] w-[220px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder:text-gray-200 placeholder:text-center text-sm w-full px-8 py-1 text-white border-gray-300 border rounded-lg shadow-lg bg-black bg-opacity-20 focus:outline-none"
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
        </div>

        {/* Filtered Apps */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-8 w-full sm:px-32 px-8 pt-24 sm:pt-32">
          {filteredApps.map((app, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={app.onClick}
            >
              <img src={app.image} className="w-[70px]" alt={app.name} />
              <span className="text-white font-medium text-[12px] mt-2">{app.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Apps;
