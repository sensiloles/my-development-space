import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Home, Test } from 'pages';

interface InternalRoute {
  key: number;
  path: string;
  PageComponent: () => JSX.Element;
}

const routersData: InternalRoute[] = [
  { key: 1, path: '/home', PageComponent: Home },
  { key: 2, path: '/test', PageComponent: Test }
];

const renderRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      {routersData.map(({ key, path, PageComponent }) => (
        <Route key={key} path={path} element={<PageComponent />} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default renderRoutes;
