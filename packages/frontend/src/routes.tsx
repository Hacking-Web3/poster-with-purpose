import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import Poster from './pages/Poster';
import AllPosters from './pages/AllPosters';
import Topic from './pages/Topic';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Main /> },
      { path: 'allPosters', element: <AllPosters /> },
      { path: 'topic/:topic', element: <Topic /> },
      { path: 'poster/:id', element: <Poster /> },
      { path: 'profile/:id', element: <Profile />},
      { path: '404', element: <Error404 /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
