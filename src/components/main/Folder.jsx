import React from 'react';
import { FaXmark, FaFolder} from 'react-icons/fa6';
import { RiInformation2Line } from 'react-icons/ri';

const Folder = ({ setShowFolder,folderName }) => {
  const items = [
    { id: 1, icon: <FaFolder className="text-blue-500" />, label: 'AI & DS' },
    { id: 2, icon: <FaFolder className="text-blue-500" />, label: 'Web Dev' },
    { id: 3, icon: <FaFolder className="text-blue-500" />, label: 'Optimization' },
  ];

  return (
    <div className="fixed w-full h-full flex justify-center items-center p-4">
      <div className="flex flex-row justify-center items-center h-full w-full">
        <div className="flex flex-col justify-start items-start sm:max-w-[200px] max-w-[100px] shadow-sm shadow-black w-full min-h-[50%] rounded-l-xl bg-gray-700">
          <div className="top-0 left-0 mb-2 p-4 flex">
            <div
              className="group sm:h-3 sm:w-3 h-2.5 w-2.5 bg-red-500 rounded-full flex justify-center items-center cursor-pointer"
              onClick={setShowFolder}
            >
              <span className="hidden group-hover:block sm:text-[10px] text-[8px] text-gray-900 font-bold">
                <FaXmark />
              </span>
            </div>
            <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-orange-300 rounded-full"></div>
            <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-green-500 rounded-full"></div>
          </div>
          <ul className="w-full">
            <li className="w-full py-2 px-3 text-white">
                <div className="sm:text-[10px] text-[7px] text-gray-500 font-medium">Skills</div>
            </li>
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center w-full py-2 sm:px-4 px-2 text-white cursor-pointer hover:bg-gray-600 rounded-md"
              >
                <div className="mr-2">{item.icon}</div>
                <span className="sm:text-[12px] text-[9px]">{item.label}</span>
              </li>
            ))}
            
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center max-w-lg relative w-full text-white min-h-[50%] rounded-r-xl bg-gray-800 shadow-sm shadow-black">
            <nav className='flex flex-row top-0 justify-between items-center w-full px-3 py-4 absolute border-b border-opacity-30 border-black'>
                <span className='font-bold text-sm'>{folderName}</span>
                <ul className="flex items-center space-x-3 text-lg">
                    <li className="cursor-pointer font-bold"><RiInformation2Line /></li>
                </ul>
            </nav>
        </div>
      </div>
    </div>
  );
};

export default Folder;
