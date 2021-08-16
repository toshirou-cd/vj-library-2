import React, { ReactNode } from 'react';
import TopBar from './top-bar/TopBar';
import SideBar from './side-bar/SideBar';
import { NavItem } from '@app/models/side-bar-tab-item';

export interface AppLayoutProps {
  children: ReactNode;
  routerPath: string;
  navItems?: NavItem[];
}

const AppLayout: React.FC<AppLayoutProps> = (
  props,
) => {
  const { children,routerPath,navItems } = props;

  return (
    <>
      <SideBar routerPath={routerPath} 
                items={navItems}
              />
      <TopBar />
      <div className="page-container">{children}</div>
    </>
  );
};

export default AppLayout;
