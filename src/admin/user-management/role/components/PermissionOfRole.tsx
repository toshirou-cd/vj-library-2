import React from 'react';
import { Tab } from 'semantic-ui-react';

import UserPermissionOfRole from './UserPermissionOfRole';

const panes = [
  {
    menuItem: 'UI',
    render: () => <UserPermissionOfRole isPermissionUI />,
  },
  {
    menuItem: 'API',
    render: () => <UserPermissionOfRole isPermissionResource />,
  },
];

const PermissionOfUser: React.FC = () => (
  <Tab
    panes={panes}
    renderActiveOnly
    menu={{ secondary: true, pointing: true }}
  />
);

export default PermissionOfUser;
