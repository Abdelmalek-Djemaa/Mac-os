import React, { useEffect, useRef } from 'react';
import { FaCamera, FaXmark } from 'react-icons/fa6';

const Camera = ({ setShowCamera }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleExit = () => {
    stopCamera();
    setShowCamera(false);
  };

  return (
    <div className="relative bg-black max-w-xl w-full h-full sm:max-h-[430px] max-h-[330px]  flex flex-col items-center justify-center rounded-xl z-[998]">
      <div className="absolute top-2 w-full flex justify-center items-center">
        <span className="font-medium text-sm text-white z-[1000]">
          Photo Booth
        </span>
      </div>
      <div className="absolute top-0 left-0 p-2.5 flex w-full bg-gray-800 rounded-t-xl z-[999]">
        <div
          className="group sm:h-3 sm:w-3 h-2.5 w-2.5 bg-red-500 rounded-full flex justify-center items-center cursor-pointer"
          onClick={handleExit}
        >
          <span className="hidden group-hover:block sm:text-[10px] text-[8px] text-gray-900 font-bold">
            <FaXmark />
          </span>
        </div>
        <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-orange-300 rounded-full"></div>
        <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-green-500 rounded-full"></div>
      </div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: '100%', height: '100%', borderRadius: '0.75rem' }}
      />
      <div className="absolute bottom-0 left-0 sm:py-3 py-2 flex justify-center items-center w-full bg-gray-800 rounded-b-xl z-[999]">
        <div className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[35px] h-[35px] rounded-full bg-red-500">
          <FaCamera className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Camera;
