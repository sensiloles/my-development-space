import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home, Test } from '../pages';

const routersData = [
  { key: 1, path: '/home', Component: Home },
  { key: 2, path: '/test', Component: Test }
];

const renderRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      {routersData.map(({ key, path, Component }) => (
        <Route key={key} path={path} element={<Component />} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default renderRoutes;
