import { httpClient, apiLinks } from '@app/utils';

import { Role } from '@admin/user-management/role/role.model';
import { Group } from '@admin/user-management/group/group.model';
import { Permission } from '@admin/user-management/permission/permission.model';
import { User, UserCM } from './user.model';

const getUsers = async (): Promise<User[]> => {
  try {
    const result = await httpClient.get({
      url: apiLinks.admin.userManagement.user.get,
    });
    return result.data as User[];
  } catch (error) {
    return [];
  }
};

const getGroupsOfUser = async (userId: string): Promise<Group[]> => {
  try {
    const result = await httpClient.get({
      url: `${apiLinks.admin.userManagement.user.get}/${userId}/Groups`,
    });
    return result.data as Group[];
  } catch (error) {
    return [];
  }
};

const getRolesOfUser = async (userId: string): Promise<Role[]> => {
  try {
    const result = await httpClient.get({
      url: `${apiLinks.admin.userManagement.user.get}/${userId}/Roles`,
    });
    return result.data as Role[];
  } catch (error) {
    return [];
  }
};

const getPermissionsUIOfUser = async (
  userId: string,
): Promise<Permission[]> => {
  try {
    const result = await httpClient.get({
      url: `${apiLinks.admin.userManagement.user.get}/${userId}/Permissions/Ui`,
    });
    return result.data as Permission[];
  } catch (error) {
    return [];
  }
};

const getPermissionsResourceOfUser = async (
  userId: string,
): Promise<Permission[]> => {
  try {
    const result = await httpClient.get({
      url: `${apiLinks.admin.userManagement.user.get}/${userId}/Permissions/Resource`,
    });
    return result.data as Permission[];
  } catch (error) {
    return [];
  }
};

const getPermissionsDataOfUser = async (
  userId: string,
): Promise<Permission[]> => {
  try {
    const result = await httpClient.get({
      url: `${apiLinks.admin.userManagement.permissionData.get}`,
      // url: `${apiLinks.admin.userManagement.dataPermission.get}/${userId}`,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return (result.data?.data ?? []) as Permission[];
  } catch (error) {
    return [];
  }
};

const createUser = async (data: UserCM): Promise<void> => {
  await httpClient.post({
    url: apiLinks.admin.userManagement.user.get,
    data: {
      ...data,
      securityQuestion: {
        id: '',
        answer: '',
      },
    },
  });
};

const resetPassword = async (username: string): Promise<void> => {
  try {
    await httpClient.get({
      url: apiLinks.admin.userManagement.user.resetPassword,
      params: {
        username,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  getUsers,
  createUser,
  resetPassword,
  getGroupsOfUser,
  getRolesOfUser,
  getPermissionsUIOfUser,
  getPermissionsResourceOfUser,
  getPermissionsDataOfUser,
};

export default userService;
