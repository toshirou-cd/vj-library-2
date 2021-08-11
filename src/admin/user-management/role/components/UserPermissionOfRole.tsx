/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

import DataList from '@app/components/data-list';
import AddPermissionToRole from '@admin/user-management/role/components/AddPermissionToRole';
import AddUserToRole from '@admin/user-management/role/components/AddUserToRole';
import { useConfirm, useDispatch, useFetchApi, useSelector } from '@app/hooks';

import {
  getUsersOfRole,
  getPermissionsUIOfRole,
  getPermissionsResourceOfRole,
} from '@admin/user-management/role/role.slice';
import { getUsers } from '@admin/user-management/user/user.slice';
import roleService from '@admin/user-management/role/role.service';
import permissionService from '@admin/user-management/permission/permission.service';
import { HolderType } from '@admin/user-management/utils/constants';

interface Props {
  isUser?: boolean;
  isPermissionUI?: boolean;
  isPermissionResource?: boolean;
}
interface UserOrPermissionType {
  id: string;
  username?: string;
  fullName?: string;
  name?: string;
  description?: string;
  url?: string;
  method?: string;
  code?: string;
}

const UserPermissionOfRole: React.FC<Props> = (props) => {
  const { isUser, isPermissionUI, isPermissionResource } = props;
  const [addUserModal, setAddUserModal] = useState(false);
  const [addPermissionModal, setAddPermissionModal] = useState(false);
  const {
    selectedRole,
    getRolesLoading,
    userOfRoleList,
    getUserOfRoleLoading,
    permissionUIOfRoleList,
    getPermissionUIOfRoleLoading,
    permissionResourceOfRoleList,
    getPermissionResourceOfRoleLoading,
  } = useSelector((state) => state.admin.userManagement.role);
  const title = useMemo(() => {
    if (selectedRole) {
      if (isUser) {
        return `Người dùng của ${selectedRole.name}`;
      }
    }
    return '';
  }, [isUser, selectedRole]);
  const data = useMemo(() => {
    if (isUser) {
      return userOfRoleList;
    }
    if (isPermissionUI) {
      return permissionUIOfRoleList;
    }
    if (isPermissionResource) {
      return permissionResourceOfRoleList;
    }
    return [];
  }, [
    isUser,
    userOfRoleList,
    isPermissionUI,
    permissionUIOfRoleList,
    isPermissionResource,
    permissionResourceOfRoleList,
  ]);
  const dispatch = useDispatch();
  const getData = useCallback(() => {
    if (selectedRole) {
      if (isUser) {
        dispatch(getUsers());
        dispatch(getUsersOfRole(selectedRole.id));
      }
      if (isPermissionUI) {
        dispatch(getPermissionsUIOfRole(selectedRole.id));
      }
      if (isPermissionResource) {
        dispatch(getPermissionsResourceOfRole(selectedRole.id));
      }
    }
  }, [isUser, isPermissionUI, isPermissionResource, selectedRole, dispatch]);
  useEffect(getData, [getData]);

  const confirm = useConfirm();
  const { fetch, fetching } = useFetchApi();
  const handleRemove = async (row: UserOrPermissionType) => {
    if (selectedRole) {
      if (isUser) {
        // remove user from role
        await fetch(roleService.removeUserToRole(row.id, selectedRole.id));
      }
      if (isPermissionUI) {
        // remove permission UI from role
        await fetch(
          permissionService.deletePermission(
            row.id,
            selectedRole.id,
            HolderType.ROLE,
            true,
            false,
            false,
          ),
        );
      }
      if (isPermissionResource) {
        // remove permission Resource from role
        await fetch(
          permissionService.deletePermission(
            row.id,
            selectedRole.id,
            HolderType.ROLE,
            false,
            true,
            false,
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
        data={data as UserOrPermissionType[]}
        loading={
          fetching ||
          getRolesLoading ||
          getUserOfRoleLoading ||
          getPermissionUIOfRoleLoading ||
          getPermissionResourceOfRoleLoading
        }
        listActions={[
          {
            title: 'Thêm',
            color: 'green',
            icon: <FiPlus />,
            onClick: (): void => {
              if (isUser) {
                setAddUserModal(true);
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
        getRowKey={(d): string => d?.id ?? ''}
        itemHeaderRender={
          (d): string => (isUser ? d?.username ?? '' : d?.name ?? '')
          // eslint-disable-next-line react/jsx-curly-newline
        }
        itemContentRender={
          (d): string =>
            isUser
              ? d?.fullName ?? ''
              : isPermissionResource
              ? `${d?.method ?? ''} - ${d?.url ?? ''}`
              : `Mã: ${d?.code ?? ''}`
          // eslint-disable-next-line react/jsx-curly-newline
        }
      />
      <AddUserToRole
        open={addUserModal}
        onClose={() => setAddUserModal(false)}
        onRefresh={getData}
      />
      <AddPermissionToRole
        open={addPermissionModal}
        onClose={() => setAddPermissionModal(false)}
        onRefresh={getData}
        isPermissionUI={isPermissionUI}
        isPermissionResource={isPermissionResource}
      />
    </>
  );
};

export default UserPermissionOfRole;
