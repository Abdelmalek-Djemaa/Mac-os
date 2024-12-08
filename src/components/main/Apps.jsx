import React from 'react';
import { motion } from 'framer-motion';
import bg from "../../assets/ventura.webp";
import photobooth from "../../assets/photobooth.png"
import { FaSearch } from 'react-icons/fa';

const Apps = ({setShowCamera}) => {
  return (
    <motion.div 
      className="fixed w-full top-0 left-0 right-0 bottom-0 h-full flex justify-center items-center z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className='absolute top-0 bottom-0 left-0 right-0 blur-sm bg-cover bg-center' style={{ backgroundImage: `url(${bg})` }}></div>
      <motion.div
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        className="w-full h-full flex flex-col justify-center items-center relative"
      >
        <div className='absolute top-5 sm:w-[250px] w-[220px]'>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="placeholder:text-gray-200 placeholder:text-center text-sm w-full px-8 py-1 text-white border-gray-300 border rounded-lg shadow-lg bg-black bg-opacity-20 focus:outline-none"
              />
              <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white" />
            </div>
        </div>
        <div className='flex flex-wrap justify-start items-start w-full h-full sm:p-32 py-32 px-8'>
            <div className='flex flex-col justify-center items-center' onClick={setShowCamera}>
                <img src={photobooth} className='sm:w-[70px] w-16' />
                <span className='text-white font-medium text-sm'>Photo Booth</span>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Apps;
