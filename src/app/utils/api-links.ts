const authUrl = 'https://user.bakco.vn';

const apiLinks = {
  authentication: {
    token: 'abc',
  },
  authorization: {
    user: {
      get:'abc',
    }
  },
  auth: {
    userInfo: 'abc',
  },
  admin: {
    userManagement: {
      user: {
        get: `${authUrl}/api/Users`,
        create: `${authUrl}/api/Users`,
        resetPassword: `${authUrl}/api/Users/Tools/ResetDefaultPassword`,
        getGroups: `${authUrl}/api/Users/Groups`,
        getRoles: `${authUrl}/api/Users/Roles`,
        getPermissionsUI: `${authUrl}/api/Users/Permissions/Ui`,
        getPermissionsResource: `${authUrl}/api/Users/Permissions/Resource`,
      },
      group: {
        get: `${authUrl}/api/Groups`,
        create: `${authUrl}/api/Groups`,
        update: `${authUrl}/api/Groups`,
        delete: `${authUrl}/api/Groups`,
        getUsers: `${authUrl}/api/Groups`,
        getRoles: `${authUrl}/api/Groups`,
        getPermissionsUI: `${authUrl}/api/Groups`,
        getPermissionsResource: `${authUrl}/api/Groups`,
        addUser: `${authUrl}/api/Groups`,
        removeUser: `${authUrl}/api/Groups`,
        addRoles: `${authUrl}/api/Groups`,
        removeRole: `${authUrl}/api/Groups`,
        addPermissionsUI: `${authUrl}/api/Groups`,
        addPermissionsResource: `${authUrl}/api/Groups`,
      },
      role: {
        get: `${authUrl}/api/Roles`,
        create: `${authUrl}/api/Roles`,
        update: `${authUrl}/api/Roles`,
        delete: `${authUrl}/api/Roles`,
        addUser: `${authUrl}/api/Roles`,
        removeUser: `${authUrl}/api/Roles`,
        addPermissionsUI: `${authUrl}/api/Roles`,
        addPermissionsResource: `${authUrl}/api/Roles`,
        getUsers: `${authUrl}/api/Roles`,
        getPermissionsUI: `${authUrl}/api/Roles`,
        getPermissionsResource: `${authUrl}/api/Roles`,
      },
      permission: {
        get: `${authUrl}/api/Permissions`,
        create: `${authUrl}/api/Permissions`,
        update: `${authUrl}/api/Permissions`,
        delete: `${authUrl}/api/Permissions`,
        addUser: `${authUrl}/api/Permissions`,
      },
      permissionData: {
        create: 'abc',
        delete: 'abc',
        get:'abc',
      },
    },
  },
};

export default apiLinks;
