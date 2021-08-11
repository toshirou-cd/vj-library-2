import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import renderRoute, { RouteRenderProps } from './RouteRender';
import HelperRoute from '@app/routers/HelperRoute';

interface RouterRenderProps {
  helperRoutes: HelperRoute[];
  isRoot?: boolean;
  routerPath?: string;
}

const RouterRender: React.FC<RouterRenderProps> = (props) => {
  const { helperRoutes, isRoot = false, routerPath = '' } = props;
  let routes: any[] = [];

  helperRoutes.map((r) => {
    const props: RouteRenderProps = {
      path: r.path,
      exact: r.exact,
      component: r.component,
      isPrivate: r.isPrivate,
      layout: r.layout,
      routerPath: routerPath,
      redirectTo: r.redirectTo,
    };
    routes.push(renderRoute(props));
  });
  routes.push(renderRoute({}));

  if (isRoot) {
    return (
      <BrowserRouter>
        <Switch>{routes}</Switch>
      </BrowserRouter>
    );
  } else {
    return <Switch>{routes}</Switch>;
  }
};

export default RouterRender;
