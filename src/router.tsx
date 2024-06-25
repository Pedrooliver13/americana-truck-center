// Packages
import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import { DefaultLayout } from 'components/layout';

// Pages
import { Dashboard } from 'pages/dashboard';
import { Tasks } from 'pages/tasks';
import { Page404 } from 'pages/page404';

export const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>

      <Route path="*" element={<DefaultLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};
