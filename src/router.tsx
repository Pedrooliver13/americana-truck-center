// Packages
import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import { DefaultLayout } from 'components/layout';

// Pages
import { Dashboard } from 'pages/dashboard';
import { Tasks, TasksForm } from 'pages/tasks';
import { ClientsTable, ClientForm } from 'pages/clients';
import { PricesTable } from 'pages/prices';
import { Page404 } from 'pages/page404';

export const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/new" element={<TasksForm />} />
        <Route path="/clients" element={<ClientsTable />} />
        <Route path="/clients/new" element={<ClientForm />} />
        <Route path="/prices" element={<PricesTable />} />
      </Route>

      <Route path="*" element={<DefaultLayout />}>
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};
