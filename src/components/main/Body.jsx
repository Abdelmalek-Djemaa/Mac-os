import React, { useState } from 'react'
import folder from '../../assets/folder.svg'
import Folder from './Folder';

const Body = () => {
  const [showFolder , setShowFolder] = useState(false);
  return (
    <div className='w-full h-full flex relative'>
        <div className='flex flex-col justify-center items-center absolute top-12 right-4'
        onClick={()=>setShowFolder(true)}>
            <img src={folder} className='w-16' />
            <span className='text-white font-medium text-sm'>Abdelmalek</span>
        </div>
        {showFolder && <Folder setShowFolder={()=>setShowFolder(false)}/>}
        
    </div>
  )
}

export default Body