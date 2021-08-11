import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Grid, Tab } from 'semantic-ui-react';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

import DataList from '@app/components/data-list';
import GroupModal from '@admin/user-management/group/components/GroupModal';
import PermissionOfGroup from '@admin/user-management/group/components/PermissionOfGroup';
import UserRolePermissionOfGroup from '@admin/user-management/group/components/UserRolePermissionOfGroup';
import { useDispatch, useSelector, useConfirm, useFetchApi } from '@app/hooks';
import { Group } from '@admin/user-management/group/group.model';
import {
  getGroups,
  selectGroup,
} from '@admin/user-management/group/group.slice';
import groupService from '@admin/user-management/group/group.service';

const StyledPane = styled(Tab.Pane)`
  padding-top: 0 !important;
`;

const panes = [
  {
    menuItem: 'Người dùng',
    render: (): JSX.Element => (
      <Tab.Pane attached={false}>
        <UserRolePermissionOfGroup isUser />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Vai trò',
    render: (): JSX.Element => (
      <Tab.Pane attached={false}>
        <UserRolePermissionOfGroup isRole />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Phân quyền',
    render: (): JSX.Element => (
      <StyledPane attached={false}>
        <PermissionOfGroup />
      </StyledPane>
    ),
  },
];

const GroupPage: React.FC = () => {
  const { groupList, selectedGroup, getGroupsLoading } = useSelector(
    (state) => state.admin.userManagement.group,
  );

  const dispatch = useDispatch();
  const { fetch, fetching } = useFetchApi();
  const confirm = useConfirm();

  const [groupModal, setGroupModal] = useState(false);
  const [selected, setSelected] = useState<Group>();

  const getData = useCallback(() => {
    dispatch(getGroups());
  }, [dispatch]);
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Grid>
      <Grid.Column width={selectedGroup?.id ? 8 : 16}>
        <DataList
          search
          toggle
          title="Danh sách nhóm"
          data={groupList}
          loading={fetching || getGroupsLoading}
          listActions={[
            {
              title: 'Tạo',
              color: 'green',
              icon: <FiPlus />,
              onClick: (): void => {
                setSelected(undefined);
                setGroupModal(true);
              },
            },
          ]}
          itemActions={[
            {
              title: 'Sửa',
              color: 'violet',
              icon: <FiEdit2 />,
              onClick: (row): void => {
                setSelected(row);
                setGroupModal(true);
              },
            },
            {
              title: 'Xóa',
              color: 'red',
              icon: <FiTrash2 />,
              onClick: (row): void => {
                confirm('Xác nhận xóa?', () => {
                  fetch(groupService.deleteGroup(row.id));
                });
              },
            },
          ]}
          onRowClick={(row: Group): void => {
            if (selectedGroup?.id === row?.id) {
              dispatch(selectGroup(undefined));
            } else {
              dispatch(selectGroup(row));
            }
          }}
          getRowKey={(d): string => d.id}
          itemHeaderRender={(d): string => d.name}
          itemContentRender={(d): string => `Miêu tả: ${d.description}`}
        />
      </Grid.Column>
      {selectedGroup?.id && (
        <Grid.Column width={8}>
          <Tab
            panes={panes}
            renderActiveOnly
            menu={{ secondary: true, pointing: true }}
          />
        </Grid.Column>
      )}
      <GroupModal
        open={groupModal}
        onClose={(): void => setGroupModal(false)}
        onRefresh={getData}
        data={selected}
      />
    </Grid>
  );
};

export default GroupPage;
