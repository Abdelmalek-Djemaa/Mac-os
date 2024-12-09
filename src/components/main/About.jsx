import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { FaXmark } from 'react-icons/fa6';
import macbook from '../../assets/macbook.png'

const About = ({ setShowAbout }) => {
  const [processor, setProcessor] = useState('Unknown');
  const [graphics, setGraphics] = useState('Unknown');
  const [memory, setMemory] = useState('Unknown');
  const aboutRef = useRef(null);

  useEffect(() => {
    if (navigator.deviceMemory) {
      setMemory(`${navigator.deviceMemory} GB`);
    }

    const getGraphicsInfo = () => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const fullInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            
            // Extract the graphics card name using a regular expression
            const match = fullInfo.match(/\((?:[^,]+), ([^,]+),/);
            if (match && match[1]) {
              setGraphics(match[1].trim());
            } else {
              setGraphics(fullInfo);
            }
          } else {
            setGraphics('Graphics info not available');
          }
        } else {
          setGraphics('WebGL not supported');
        }
      };
      getGraphicsInfo();

    const userAgent = navigator.userAgent;

    if (/Intel/i.test(userAgent)) {
      setProcessor('Intel-based Processor');
    } else if (/AMD/i.test(userAgent)) {
      setProcessor('AMD-based Processor');
    } else if (/ARM/i.test(userAgent)) {
      setProcessor('ARM-based Processor');
    } else if (/Snapdragon/i.test(userAgent)) {
      setProcessor('Qualcomm Snapdragon Processor');
    } else if (/Exynos/i.test(userAgent)) {
      setProcessor('Samsung Exynos Processor');
    } else if (/AppleWebKit/i.test(userAgent) && /iPhone|iPad|iPod/i.test(userAgent)) {
      setProcessor('Apple A-series Processor');
    } else if (/Kirin/i.test(userAgent)) {
      setProcessor('Huawei Kirin Processor');
    } else if (/Mediatek/i.test(userAgent) || /MT\d+/i.test(userAgent)) {
      setProcessor('MediaTek Processor');
    } else {
      setProcessor('CPU info not available');
    }
  }, []);

  return (
    <div className="fixed w-full h-full top-0 left-0 flex justify-center items-center z-20 p-4">
        <Draggable nodeRef={aboutRef} cancel=".interactive">
            <div className=" text-white max-w-[270px] text-[12px] p-6 rounded-lg shadow-xl relative bg-black bg-opacity-30 backdrop-blur-md" ref={aboutRef}>
                <div className="interactive absolute top-0 left-0 p-2.5 flex w-full z-[999]">
                    <div
                        className="group sm:h-3 sm:w-3 h-2.5 w-2.5 bg-red-500 rounded-full flex justify-center items-center cursor-pointer z-[1000]"
                        onClick={setShowAbout}
                    >
                        <span className="hidden group-hover:block sm:text-[10px] text-[8px] text-gray-900 font-bold">
                        <FaXmark />
                        </span>
                    </div>
                    <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-orange-300 rounded-full"></div>
                    <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-green-500 rounded-full"></div>
                </div>
                <div className='flex flex-col justify-center items-center mb-8'>
                    <img src={macbook} className='w-32' />
                    <span className="text-lg text-center font-bold">Macbook Pro</span>
                    <span className="text-[10px] text-gray-300">macOS Ventura </span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-left">Processor</span>
                        <span className="text-gray-300 text-right">{processor}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-left">Graphics</span>
                        <span className="text-gray-300 w-[60%]  text-right">{graphics}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-left">Memory</span>
                        <span className="text-gray-300 text-right">{memory}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-left">Operating System</span>
                        <span className="text-gray-300 text-right">{navigator.platform}</span>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center mt-8 text-[10px] text-gray-300 interactive'>
                    <span>Copyright © All rights reserved.</span>
                    <a href="https://abdelmalek-djemaa.vercel.app" className="underline">
                    <span> djemaa abdelmalek </span>
                    </a>
                </div>
            </div>
        </Draggable>
    </div>
  );
};

export default About;
