import { httpClient, apiLinks } from '@app/utils';
import { HolderType } from '@admin/user-management/utils/constants';
import { PermissionCM } from './permission.model';

// const getPermissionsUI = async (): Promise<Permission[]> => {
//   try {
//     const result = await httpClient.get({
//       url: `${apiLinks.admin.userManagement.permission.get}/Ui`,
//     });
//     return result.data as Permission[];
//   } catch (error) {
//     return [];
//   }
// };

// const getPermissionsResource = async (): Promise<Permission[]> => {
//   try {
//     const result = await httpClient.get({
//       url: `${apiLinks.admin.userManagement.permission.get}/Resource`,
//     });
//     return result.data as Permission[];
//   } catch (error) {
//     return [];
//   }
// };

const createPermission = async ({
  permission,
  holderId = '',
  isGroup = false,
  isRole = false,
  isUser = false,
  isPermissionUI = false,
  isPermissionResource = false,
  isPermissionData = false,
}: PermissionCM): Promise<void> => {
  let url = apiLinks.admin.userManagement.permission.create;
  let data = {};
  let holderType = 0;
  if (isGroup) {
    holderType = HolderType.GROUP;
  }
  if (isRole) {
    holderType = HolderType.ROLE;
  }
  if (isUser) {
    holderType = HolderType.USER;
  }
  if (isPermissionUI) {
    url += '/Ui';
    data = {
      permission,
      holderId,
      holderType,
    };
  }
  if (isPermissionResource) {
    url += '/Resource';
    data = {
      permission,
      holderId,
      holderType,
    };
  }
  if (isPermissionData) {
    url = apiLinks.admin.userManagement.permissionData.create;
    data = permission || {};
  }
  await httpClient.post({
    url,
    data,
  });
};

// const updatePermission = async (
//   data: Permission,
//   isPermissionUI: boolean,
//   isPermissionResource: boolean,
// ): Promise<void> => {
//   let url = apiLinks.admin.userManagement.permission.update;
//   if (isPermissionUI) {
//     url += '/Ui';
//   }
//   if (isPermissionResource) {
//     url += '/Resource';
//   }
//   await httpClient.put({ url, data });
// };

const deletePermission = async (
  id: string,
  holderId: string,
  holderType: number,
  isPermissionUI: boolean,
  isPermissionResource: boolean,
  isPermissionData: boolean,
): Promise<void> => {
  let url = apiLinks.admin.userManagement.permission.delete;
  if (isPermissionUI) {
    url += `/Ui/${id}`;
  }
  if (isPermissionResource) {
    url += `/Resource/${id}`;
  }
  if (isPermissionData) {
    url = `${apiLinks.admin.userManagement.permissionData.delete}/${id}`;
  }
  await httpClient.delete({
    url,
    params: { holderId, holderType },
  });
};

const addUserToPermissionUI = async (
  permissionId: string,
  userIds: string[],
): Promise<void> => {
  await httpClient.put({
    url: `${apiLinks.admin.userManagement.permission.addUser}/${permissionId}/Users`,
    data: {
      userIds,
    },
  });
};

const addUserToPermissionResource = async (
  permissionId: string,
  userIds: string[],
): Promise<void> => {
  await httpClient.put({
    url: `${apiLinks.admin.userManagement.permission.addUser}/${permissionId}/Users`,
    data: {
      userIds,
    },
  });
};

const permissionService = {
  // getPermissionsUI,
  // getPermissionsResource,
  createPermission,
  // updatePermission,
  deletePermission,
  addUserToPermissionUI,
  addUserToPermissionResource,
};

export default permissionService;
