import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { FiPlus, FiRefreshCcw } from 'react-icons/fi';
import { Grid, Tab } from 'semantic-ui-react';
import DataList from '@app/components/data-list';
import UserModal from '@admin/user-management/user/components/UserModal';
import PermissionOfUser from '@admin/user-management/user/components/PermissionOfUser';
import GroupRolePermissionOfUser from '@admin/user-management/user/components/GroupRolePermissionOfUser';

import { useDispatch, useSelector, useConfirm, useFetchApi } from '@app/hooks';
import { User } from './user.model';
import userService from './user.service';
import { getUsers, selectUser } from './user.slice';

const StyledPane = styled(Tab.Pane)`
  padding-top: 0 !important;
`;

const panes = [
  {
    menuItem: 'Nhóm',
    render: (): JSX.Element => (
      <Tab.Pane attached={false}>
        <GroupRolePermissionOfUser isGroup />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Vai trò',
    render: (): JSX.Element => (
      <Tab.Pane attached={false}>
        <GroupRolePermissionOfUser isRole />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Phân quyền',
    render: (): JSX.Element => (
      <StyledPane attached={false}>
        <PermissionOfUser />
      </StyledPane>
    ),
  },
];

const UserPage: React.FC = () => {
  const { userList, selectedUser, getUsersLoading } = useSelector(
    (state) => state.admin.userManagement.user,
  );

  const dispatch = useDispatch();
  const confirm = useConfirm();
  const { fetch, fetching } = useFetchApi();

  const [userModal, setUserModal] = useState(false);

  const getData = useCallback(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(getData, [getData]);

  return (
    <Grid>
      <Grid.Column width={selectedUser?.id ? 8 : 16}>
        <DataList
          search
          toggle
          title="Danh sách người dùng"
          data={userList}
          loading={fetching || getUsersLoading}
          listActions={[
            {
              title: 'Tạo người dùng',
              color: 'green',
              icon: <FiPlus />,
              onClick: (): void => setUserModal(true),
            },
          ]}
          itemActions={[
            {
              title: 'Đổi mật khẩu',
              color: 'yellow',
              icon: <FiRefreshCcw />,
              onClick: (row): void => {
                confirm('Reset mật khẩu?', () => {
                  fetch(userService.resetPassword(row.username));
                });
              },
            },
          ]}
          onRowClick={(row: User): void => {
            if (selectedUser?.id === row?.id) {
              dispatch(selectUser(undefined));
            } else {
              dispatch(selectUser(row));
            }
          }}
          itemHeaderRender={(d): string => d.username}
          itemContentRender={(d): string => `Email: ${d.email}`}
          getRowKey={(d): string => d.id}
        />
      </Grid.Column>
      {selectedUser?.id && (
        <Grid.Column width={8}>
          <Tab
            panes={panes}
            renderActiveOnly
            menu={{ secondary: true, pointing: true }}
          />
        </Grid.Column>
      )}
      <UserModal
        open={userModal}
        onClose={(): void => setUserModal(false)}
        onRefresh={getData}
      />
    </Grid>
  );
};

export default UserPage;
