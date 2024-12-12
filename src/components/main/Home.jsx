import React from 'react';
import bg from "../../assets/ventura.jpg";
import Topbar from './Topbar';
import Bottombar from './Bottombar';
import Body from './Body';


const Home = () => {

  return (
    <div
      className="fixed h-full w-full bg-center bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Topbar/>
      <Body/>
      <Bottombar/>
    </div>
  );
};

export default Home;
