import React, { useEffect, useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Loading from './components/Loading';
import Home from './components/main/Home';

const App = () => {

  return useRoutes([
    { path: "/", element: <Loading /> },
    { path: "/Home", element: <Home /> },
  ]);
};

export default App;
