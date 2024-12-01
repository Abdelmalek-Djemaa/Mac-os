import React, { useState } from 'react';
import bg from "../assets/ventura.webp";
import profile from "../assets/profile.webp";
import { FiArrowRightCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === 'malek') {
      navigate('/Home');
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300); // Remove shake class after animation duration
    }
  };

  return (
    <div
      className="fixed flex flex-col justify-center items-center h-full w-full bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className="w-36 h-36 rounded-full bg-cover bg-center"
        style={{ backgroundImage: `url(${profile})` }}
      ></div>
      <span className="font-medium text-white text-xl pt-3">Mac OS</span>

      <form
        onSubmit={handleSubmit}
        className="relative mt-5 w-44"
      >
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
          className={`w-full px-3 py-1.5 text-sm rounded-full text-black pr-12 focus:outline-none select-none bg-gray-100 bg-opacity-70 ${
            isShaking ? 'animate-shake' : ''
          }`}
        />
        {password.length > 0 && (
          <button
            type="submit"
            className="absolute top-0 right-0 h-full pr-1 text-white rounded-full"
          >
            <FiArrowRightCircle size={25} />
          </button>
        )}
      </form>
    </div>
  );
};

export default Splash;
