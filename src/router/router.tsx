import { PrivateRoute } from './privateRoute/privateRoute';

// Packages
import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import { DefaultLayout } from 'components/layout';

// Pages
import { Login } from 'pages/login';
import { ForgotPassword } from 'pages/forgotPassword';
import { Dashboard } from 'pages/dashboard';
import { Tasks, TasksForm } from 'pages/tasks';
import { ClientsTable, ClientForm } from 'pages/clients';
import { DriversTable, DriversForm } from 'pages/drivers';
import { PricesTable, PricesForm } from 'pages/prices';
import { Settings } from 'pages/settings';
import { Page404 } from 'pages/page404';

// Contexts
import { TasksContextLayout } from 'contexts/tasksContext';
import { ClientsContextLayout } from 'contexts/clientContext';
import { PriceContextLayout } from 'contexts/priceContext';
import { DashboardContextLayout } from 'contexts/dashboardContext';
import { DriverContextLayout } from 'contexts/driversContext';

export const Router = (): ReactElement => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <DefaultLayout />
          </PrivateRoute>
        }
      >
        <Route element={<DashboardContextLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route element={<TasksContextLayout />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TasksForm />} />
          <Route path="/tasks/new" element={<TasksForm />} />
        </Route>

        <Route element={<ClientsContextLayout />}>
          <Route path="/clients" element={<ClientsTable />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/clients/:id" element={<ClientForm />} />
        </Route>

        <Route element={<DriverContextLayout />}>
          <Route path="/drivers" element={<DriversTable />} />
          <Route path="/drivers/new" element={<DriversForm />} />
          <Route path="/drivers/:id" element={<DriversForm />} />
        </Route>

        <Route element={<PriceContextLayout />}>
          <Route path="/prices" element={<PricesTable />} />
          <Route path="/prices/new" element={<PricesForm />} />
          <Route path="/prices/:id" element={<PricesForm />} />
        </Route>

        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route
        path="*"
        element={
          <PrivateRoute>
            <DefaultLayout />
          </PrivateRoute>
        }
      >
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};
