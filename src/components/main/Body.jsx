import React from 'react'
import folder from '../../assets/folder.svg'

const Body = () => {
  return (
    <div className='w-full h-full flex relative'>
        <div className='flex flex-col justify-center items-center absolute top-12 right-4'>
            <img src={folder} className='w-16' />
            <span className='text-white font-medium text-sm'>Abdelmalek</span>
        </div>
        
    </div>
  )
}

export default Body