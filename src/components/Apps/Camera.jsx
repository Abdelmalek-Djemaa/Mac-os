import React, { useEffect, useRef } from 'react';
import { FaXmark } from 'react-icons/fa6';

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
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative bg-black max-w-xl w-full min-h-[400px] flex flex-col items-center justify-center rounded-xl">
        <div className="absolute top-0 left-0 mb-2 p-2.5 flex w-full bg-gray-800 rounded-t-xl">
            <div
              className="group sm:h-3 sm:w-3 h-2.5 w-2.5 bg-red-500 rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => setShowCamera(false)}
            >
              <span className="hidden group-hover:block sm:text-[10px] text-[8px] text-gray-900 font-bold">
                <FaXmark />
              </span>
            </div>
            <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-orange-300 rounded-full"></div>
            <div className="ml-2 sm:h-3 sm:w-3 h-2.5 w-2.5 bg-green-500 rounded-full"></div>
        </div>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default Camera;
