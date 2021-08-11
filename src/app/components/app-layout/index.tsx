import React, { ReactNode } from 'react';
import TopBar from './top-bar/TopBar';
import SideBar from './side-bar/SideBar';

const AppLayout: React.FC<{ children: ReactNode; routerPath: string }> = (
  props,
) => {
  const { children } = props;

  return (
    <>
      <SideBar routerPath={props.routerPath} />
      <TopBar />
      <div className="page-container">{children}</div>
    </>
  );
};

export default AppLayout;
