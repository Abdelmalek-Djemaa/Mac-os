import React, { useEffect, useRef } from 'react';
import { FaCamera, FaXmark } from 'react-icons/fa6';
import Draggable from "react-draggable";

const Camera = ({ setShowCamera }) => {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

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

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;

      // Set canvas dimensions equal to the video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Create a download link for the image
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'captured-photo.png';
      link.click();
    }
  };

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center p-4'>
      <Draggable nodeRef={cameraRef} cancel=".iteractive">
        <div className="relative bg-black max-w-xl w-full h-full sm:max-h-[430px] max-h-[330px] flex flex-col items-center justify-center rounded-xl z-[998]" ref={cameraRef}>
          <div className="absolute top-2 w-full flex justify-center items-center">
            <span className="font-medium text-sm text-black z-[1000]">
              Photo Booth
            </span>
          </div>
          <div className="iteractive absolute top-0 left-0 p-2.5 flex w-full bg-white rounded-t-xl z-[999]">
            <div
              className="group sm:h-3 sm:w-3 h-2.5 w-2.5 bg-red-500 rounded-full flex justify-center items-center cursor-pointer z-[1000]"
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
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div className="absolute bottom-0 left-0 sm:py-3 py-2 flex justify-center items-center w-full bg-white bg-opacity-90 backdrop-blur-md rounded-b-xl z-[999]">
            <div
              className="iteractive flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[35px] h-[35px] rounded-full bg-red-500 cursor-pointer"
              onClick={takePhoto}
            >
              <FaCamera className="text-white" />
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default Camera;
