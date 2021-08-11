import { httpClient, apiLinks } from '@app/utils';
import { Permission } from '../permission/permission.model';
import { Role } from '../role/role.model';
import { User } from '../user/user.model';
import { Group, GroupCM } from './group.model';

const getGroups = async (): Promise<Group[]> => {
  try {
    const result = await httpClient.get({
      url: apiLinks.admin.userManagement.group.get,
    });
    return result.data as Group[];
  } catch (error) {
    return [];
  }
};

const createGroup = async (data: GroupCM): Promise<void> => {
  await httpClient.post({
    url: apiLinks.admin.userManagement.group.create,
    data,
  });
};

const updateGroup = async (data: Group): Promise<void> => {
  await httpClient.put({
    url: apiLinks.admin.userManagement.group.update,
    data,
  });
};

const deleteGroup = async (id: string): Promise<void> => {
  await httpClient.delete({
    url: apiLinks.admin.userManagement.group.delete,
    params: { id },
  });
};

const addUsersToGroup = async (
  userIds: string[],
  groupId: string,
): Promise<void> => {
  await httpClient.put({
    url: `${apiLinks.admin.userManagement.group.addUser}/${groupId}/Users`,
    data: {
      userIds,
    },
  });
};

const removeUserToGroup = async (
  userId: string,
  groupId: string,
): Promise<void> => {
  await httpClient.delete({
    url: `${apiLinks.admin.userManagement.group.removeUser}/${groupId}/Users/${userId}`,
  });
};

const getUsersOfGroup = async (groupId: string): Promise<User[]> => {
  try {
    const result = await httpClient.get({
      url: `${apiLinks.admin.userManagement.group.getUsers}/${groupId}/Users`,
      params: { groupId },
    });
    return result.data as User[];
  } catch (error) {
    return [];
  }
};

const getRolesOfGroup = async (groupId: string): Promise<Role[]> => {
  try {
    const result = await httpClient.get({
      url: `${apiLinks.admin.userManagement.group.getRoles}/${groupId}/Roles`,
      params: { groupId },
    });
    return result.data as Role[];
  } catch (error) {
    return [];
  }
};

const addRolesToGroup = async (
  roleIds: string[],
  groupId: string,
): Promise<void> => {
  await httpClient.put({
    url: `${apiLinks.admin.userManagement.group.addRoles}/${groupId}/Roles`,
    data: {
      roleIds,
    },
  });
};

const removeRoleToGroup = async (
  roleId: string,
  groupId: string,
): Promise<void> => {
  await httpClient.delete({
    url: `${apiLinks.admin.userManagement.group.removeRole}/${groupId}/Roles/${roleId}`,
  });
};

const getPermissionsUIOfGroup = async (
  groupId: string,
): Promise<Permission[]> => {
  try {
    const result = await httpClient.get({
      url: `${apiLinks.admin.userManagement.group.getPermissionsUI}/${groupId}/Permissions/Ui`,
    });
    return result.data as Permission[];
  } catch (error) {
    return [];
  }
};

const getPermissionsResourceOfGroup = async (
  groupId: string,
): Promise<Permission[]> => {
  try {
    const result = await httpClient.get({
      url: `${apiLinks.admin.userManagement.group.getPermissionsUI}/${groupId}/Permissions/Resource`,
    });
    return result.data as Permission[];
  } catch (error) {
    return [];
  }
};

const addPermissionsUiToGroup = async (
  permissionIds: string[],
  groupId: string,
): Promise<void> => {
  await httpClient.post({
    url: `${apiLinks.admin.userManagement.group.addPermissionsUI}/${groupId}/Permissions/Ui`,
    data: {
      permissionIds,
      groupId,
    },
  });
};

const addPermissionsResourceToGroup = async (
  permissionIds: string[],
  groupId: string,
): Promise<void> => {
  await httpClient.post({
    url: `${apiLinks.admin.userManagement.group.addPermissionsResource}/${groupId}/Permissions/Resource`,
    data: {
      permissionIds,
      groupId,
    },
  });
};

const groupService = {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  getRolesOfGroup,
  addRolesToGroup,
  getUsersOfGroup,
  getPermissionsUIOfGroup,
  getPermissionsResourceOfGroup,
  addPermissionsUiToGroup,
  addPermissionsResourceToGroup,
  addUsersToGroup,
  removeUserToGroup,
  removeRoleToGroup,
};

export default groupService;
