import React from 'react';
import HelperRoute from '@app/routers/HelperRoute';
import LoginPage from '@app/pages/login/LoginPage';
import RouterRender from '../RouterRender';
import AdminRouter from './admin/AdminRouter';
import AppLayout from '@app/components/app-layout';
import PageNotFound from '@app/pages/PageNotFound';
import PatronRouter, { patronNavData } from './patron/PatronRouter';
import LibrarianRouter, { librarianNavData } from './librarian/LibrarianRouter';

const routes: HelperRoute[] = [
  {
    component: LoginPage,
    path: '/',
    exact: true,
  },
  {
    component: LoginPage,
    path: '/login',
  },
  {
    component: AdminRouter,
    path: '/admin',
    layout: AppLayout,
  },
  {
    component: PatronRouter,
    path: '/patron',
    layout : AppLayout,
    navItems : patronNavData
  },
  {
    component: LibrarianRouter,
    path: '/librarian',
    layout : AppLayout,
    navItems : librarianNavData
  },
  {
    component: PageNotFound,
    path: '/notfound',
  },
];

const AppRouter: React.FC = () => {
  return <RouterRender isRoot helperRoutes={routes} />;
};

export default AppRouter;
