import React, { ReactNode, useMemo } from 'react';
import { Route, Redirect, match } from 'react-router-dom';

import { useAuth } from '../hooks';

export interface RouteRenderProps {
  component?: React.FC<{ match: match }>;
  layout?: React.FC<{ children: ReactNode; routerPath: string }>;
  path?: string;
  exact?: boolean;
  isPrivate?: boolean;
  routerPath?: string;
  redirectTo?: string;
}

const renderRoute = (props: RouteRenderProps) => {
  const {
    component: Component,
    layout: Layout,
    path,
    exact,
    routerPath,
    isPrivate = false,
    redirectTo,
  } = props;

  // const { isAuthenticated } = useAuth();
  // const isAuth = useMemo(() => isAuthenticated(), [isAuthenticated]);
  const isAuth = true;

  if (!Component && !redirectTo) {
    return <Redirect key="" to="/notfound" />;
  }

  return (
    <Route
      key={`${routerPath}${path}`}
      path={`${routerPath}${path}`}
      exact={exact}
      render={(componentProps): JSX.Element => {
        if (Component) {
          if ((isPrivate && isAuth) || !isPrivate) {
            if (Layout) {
              return (
                <Layout routerPath={componentProps.match.path}>
                  <Component match={componentProps.match} />
                </Layout>
              );
            }
            return <Component match={componentProps.match} />;
          }
        }
        if (redirectTo) {
          return <Redirect to={`${routerPath}${redirectTo}`} />;
        }
        return <Redirect to="/notfound" />;
      }}
    />
  );
};

export default renderRoute;
