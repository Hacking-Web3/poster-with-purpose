import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import Poster from './pages/Poster';
import AllPosters from './pages/AllPosters';
import Error404 from './pages/Error404';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Main /> },
      { path: 'allPosters', element: <AllPosters /> },
      { path: 'poster', element: <Poster /> },
      { path: '404', element: <Error404 /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
