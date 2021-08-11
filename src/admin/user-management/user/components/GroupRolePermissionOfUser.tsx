import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

import DataList from '@app/components/data-list';
import AddGroupRoleModal from '@admin/user-management/user/components/AddGroupRoleToUserModal';
import AddPermissionToUserModal from '@admin/user-management/user/components/AddPermissionToUser';

import { useConfirm, useFetchApi, useDispatch, useSelector } from '@app/hooks';
import {
  getGroupsOfUser,
  getRolesOfUser,
  getPermissionsUIOfUser,
  getPermissionsResourceOfUser,
  getPermissionsDataOfUser,
} from '@admin/user-management/user/user.slice';

import groupService from '@admin/user-management/group/group.service';
import roleService from '@admin/user-management/role/role.service';
import permissionService from '@admin/user-management/permission/permission.service';
import { HolderType } from '@admin/user-management/utils/constants';
import { permissionDataTypeList } from '@admin/user-management/utils/helpers';

interface Props {
  isGroup?: boolean;
  isRole?: boolean;
  isPermissionUI?: boolean;
  isPermissionResource?: boolean;
  isPermissionData?: boolean;
}
interface GroupRolePermission {
  id: string;
  name: string;
  description: string;
  username?: string;
  fullName?: string;
  // Permission UI
  code?: string;
  // Permision API
  url?: string;
  method?: string;
  permissionType?: number;
  // Permission Data
  provinceId?: string;
  indicatorId?: string;
  type?: number;
}

const GroupRolePermissionOfUser: React.FC<Props> = (props) => {
  const {
    isGroup = false,
    isRole = false,
    isPermissionUI = false,
    isPermissionResource = false,
    isPermissionData = false,
  } = props;
  const {
    selectedUser,
    getUsersLoading,
    groupsOfUserList,
    getGroupsOfUserLoading,
    rolesOfUserList,
    getRolesOfUserLoading,
    permissionsUIOfUserList,
    getPermissionUIOfUserLoading,
    permissionsResourceOfUserList,
    getPermissionResourceOfUserLoading,
    permissionsDataOfUserList,
    getPermissionDataOfUserLoading,
  } = useSelector((state) => state.admin.userManagement.user);

  const [data, setData] = useState<GroupRolePermission[]>([]);
  const dispatch = useDispatch();
  const getData = useCallback(() => {
    if (selectedUser) {
      if (isGroup) {
        dispatch(getGroupsOfUser(selectedUser.id));
      }
      if (isRole) {
        dispatch(getRolesOfUser(selectedUser.id));
      }
      if (isPermissionUI) {
        dispatch(getPermissionsUIOfUser(selectedUser.id));
      }
      if (isPermissionResource) {
        dispatch(getPermissionsResourceOfUser(selectedUser.id));
      }
      if (isPermissionData) {
        dispatch(getPermissionsDataOfUser(selectedUser.id));
      }
    }
  }, [
    dispatch,
    selectedUser,
    isGroup,
    isRole,
    isPermissionUI,
    isPermissionResource,
    isPermissionData,
  ]);
  useEffect(getData, [getData]);

  useEffect(() => {
    if (isGroup) {
      setData(groupsOfUserList);
    }
    if (isRole) {
      setData(rolesOfUserList);
    }
    if (isPermissionUI) {
      setData(permissionsUIOfUserList);
    }
    if (isPermissionResource) {
      setData(permissionsResourceOfUserList);
    }
    if (isPermissionData) {
      setData(
        (permissionsDataOfUserList || []).filter(
          (o) => (o?.username ?? '') === (selectedUser?.username ?? ''),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isGroup,
    isRole,
    isPermissionUI,
    isPermissionResource,
    isPermissionData,
    groupsOfUserList,
    rolesOfUserList,
    permissionsUIOfUserList,
    permissionsResourceOfUserList,
    permissionsDataOfUserList,
  ]);

  const title = useMemo(() => {
    if (selectedUser) {
      if (isGroup) {
        return `Nhóm của ${selectedUser.fullName}`;
      }
      if (isRole) {
        return `Vai trò của ${selectedUser.fullName}`;
      }
    }
    return '';
  }, [isGroup, isRole, selectedUser]);

  const [addGroupRoleModal, setAddGroupRoleModal] = useState(false);
  const [addPermissionModal, setAddPermissionModal] = useState(false);

  const confirm = useConfirm();
  const { fetch, fetching } = useFetchApi();

  const handleRemove = async (row: GroupRolePermission) => {
    if (selectedUser) {
      if (isGroup) {
        // remove user from role
        await fetch(groupService.removeUserToGroup(selectedUser.id, row.id));
      }
      if (isRole) {
        // remove user from role
        await fetch(roleService.removeUserToRole(selectedUser.id, row.id));
      }
      if (isPermissionUI) {
        // remove permission UI from user
        await fetch(
          permissionService.deletePermission(
            row.id,
            selectedUser.id,
            HolderType.USER,
            true,
            false,
            false,
          ),
        );
      }
      if (isPermissionResource) {
        // remove permission Resource from user
        await fetch(
          permissionService.deletePermission(
            row.id,
            selectedUser.id,
            HolderType.USER,
            false,
            true,
            false,
          ),
        );
      }
      if (isPermissionData) {
        // remove permission data from user
        await fetch(
          permissionService.deletePermission(
            row.id,
            selectedUser.id,
            HolderType.USER,
            false,
            false,
            true,
          ),
        );
      }
      getData();
    }
  };

  return (
    <>
      <DataList
        search
        title={title}
        data={data}
        loading={
          fetching ||
          getUsersLoading ||
          getGroupsOfUserLoading ||
          getRolesOfUserLoading ||
          getPermissionUIOfUserLoading ||
          getPermissionResourceOfUserLoading ||
          getPermissionDataOfUserLoading
        }
        listActions={[
          {
            title: 'Thêm',
            color: 'green',
            icon: <FiPlus />,
            onClick: (): void => {
              if (isGroup || isRole) {
                setAddGroupRoleModal(true);
              } else {
                setAddPermissionModal(true);
              }
            },
          },
        ]}
        itemActions={[
          {
            title: 'Xoá',
            color: 'red',
            icon: <FiTrash2 />,
            onClick: (row) => confirm('Xác nhận xóa?', () => handleRemove(row)),
          },
        ]}
        itemHeaderRender={(d): string => {
          let header = d?.name ?? '';
          
          return header;
        }}
        itemContentRender={(d): string => 
          ''
        }
        getRowKey={(d): string => d.id}
      />

      <AddGroupRoleModal
        open={addGroupRoleModal}
        isGroup={isGroup}
        isRole={isRole}
        onRefresh={getData}
        onClose={(): void => setAddGroupRoleModal(false)}
      />

      <AddPermissionToUserModal
        open={addPermissionModal}
        onRefresh={getData}
        isPermissionUI={isPermissionUI}
        isPermissionResource={isPermissionResource}
        isPermissionData={isPermissionData}
        onClose={(): void => setAddPermissionModal(false)}
      />
    </>
  );
};

export default GroupRolePermissionOfUser;
