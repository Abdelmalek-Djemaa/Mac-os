import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Laoding';
import Splash from './components/Splash';
import Home from './components/main/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/Splash" element={<Splash />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
