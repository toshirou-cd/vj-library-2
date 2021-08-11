import PageNotFound from '@app/pages/PageNotFound';
import LoginPage from '@app/pages/login/LoginPage';
import HomePage from '@app/pages/HomePage';
import HelperRoute from '@app/routers/HelperRoute';
import RouterRender from '@app/routers/RouterRender';
import React from 'react';
import { match } from 'react-router-dom';
import {
  AccountPage,
  DashboardPage,
  RequestPage,
  StoragePage,
} from '@app/pages/admin';
import UserManagementPage from '@app/pages/user-management/UsermanagementPage';

const routes: HelperRoute[] = [
  {
    path: '/',
    exact: true,
    redirectTo: '/dashboard',
  },
  {
    component: DashboardPage,
    path: '/dashboard',
  },
  {
    component: StoragePage,
    path: '/storage',
  },
  {
    component: UserManagementPage,
    path: '/account',
  },
  {
    component: RequestPage,
    path: '/request',
  },
  {
    component: PageNotFound,
    path: '/notfound',
  },
];

const AdminRouter: React.FC<{ match: match }> = (props) => {
  return (
    <RouterRender
      routerPath={props.match?.path}
      helperRoutes={routes}
    />
  );
};

export default AdminRouter;
