import React from 'react';
import { Tab } from 'semantic-ui-react';

import UserRolePermissionOfGroup from './UserRolePermissionOfGroup';

const panes = [
  {
    menuItem: 'UI',
    render: () => <UserRolePermissionOfGroup isPermissionUI />,
  },
  {
    menuItem: 'API',
    render: () => <UserRolePermissionOfGroup isPermissionResource />,
  },
];

const PermissionOfGroup: React.FC = () => (
  <Tab
    panes={panes}
    renderActiveOnly
    menu={{ secondary: true, pointing: true }}
  />
);

export default PermissionOfGroup;
