import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import Poster from './pages/Poster';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Main/> },
      { path: 'poster', element: <Poster/> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
