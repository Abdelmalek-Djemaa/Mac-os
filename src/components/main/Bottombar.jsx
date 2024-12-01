import React from 'react'
import finder from "../../assets/finder.svg"
import launchpad from "../../assets/launchpad.webp"

const Bottombar = () => {
  return (
    <div className='flex justify-center items-center bottom-0 fixed p-2 w-full'>
        <nav className="flex justify-center items-center px-4 py-2 bg-black bg-opacity-50 text-white max-w-md rounded-3xl border border-gray-400">
        <div className="flex items-center">
          <ul className="flex items-center space-x-4">
            <li className="cursor-pointer">
                <img src={finder} className='w-12 rounded-xl' />
            </li>
            <li className="cursor-pointer">
                <img src={launchpad} className='w-[60px]' />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Bottombar