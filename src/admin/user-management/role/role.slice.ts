import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import roleService from './role.service';
import { Role } from './role.model';
import { Permission } from '../permission/permission.model';
import { User } from '../user/user.model';

interface State {
  selectedRole: Role | undefined;
  roleList: Role[];
  getRolesLoading: boolean;
  userOfRoleList: User[];
  getUserOfRoleLoading: boolean;
  permissionUIOfRoleList: Permission[];
  getPermissionUIOfRoleLoading: boolean;
  permissionResourceOfRoleList: Permission[];
  getPermissionResourceOfRoleLoading: boolean;
}

const initialState: State = {
  selectedRole: undefined,
  roleList: [],
  getRolesLoading: false,
  userOfRoleList: [],
  getUserOfRoleLoading: false,
  permissionUIOfRoleList: [],
  getPermissionUIOfRoleLoading: false,
  permissionResourceOfRoleList: [],
  getPermissionResourceOfRoleLoading: false,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;
const selectRoleCR: CR<Role | undefined> = (state, action) => ({
  ...state,
  selectedRole: action.payload,
});

const getRoles = createAsyncThunk(
  'admin/userManagement/role/getRoles',
  async () => {
    const result = await roleService.getRoles();
    return result;
  },
);

const getUsersOfRole = createAsyncThunk(
  'admin/userManagement/role/getUsersOfRole',
  async (roleId: string) => {
    const result = await roleService.getUsersOfRole(roleId);
    return result;
  },
);

const getPermissionsUIOfRole = createAsyncThunk(
  'admin/userManagement/role/getPermissionsUIOfRole',
  async (roleId: string) => {
    const result = await roleService.getPermissionsUIOfRole(roleId);
    return result;
  },
);

const getPermissionsResourceOfRole = createAsyncThunk(
  'admin/userManagement/role/getPermissionsResourceOfRole',
  async (roleId: string) => {
    const result = await roleService.getPermissionsResourceOfRole(roleId);
    return result;
  },
);

const slice = createSlice({
  name: 'admin/userManagement/role',
  initialState,
  reducers: {
    selectRole: selectRoleCR,
  },
  extraReducers: (builder) => {
    builder.addCase(getRoles.pending, (state) => ({
      ...state,
      getRolesLoading: true,
    }));
    builder.addCase(getRoles.fulfilled, (state, { payload }) => ({
      ...state,
      roleList: payload,
      getRolesLoading: false,
    }));
    builder.addCase(getRoles.rejected, (state) => ({
      ...state,
      getRolesLoading: false,
    }));
    builder.addCase(getUsersOfRole.pending, (state) => ({
      ...state,
      getUserOfRoleLoading: true,
    }));
    builder.addCase(getUsersOfRole.fulfilled, (state, { payload }) => ({
      ...state,
      userOfRoleList: payload,
      getUserOfRoleLoading: false,
    }));
    builder.addCase(getUsersOfRole.rejected, (state) => ({
      ...state,
      getUserOfRoleLoading: false,
    }));
    builder.addCase(getPermissionsUIOfRole.pending, (state) => ({
      ...state,
      getPermissionUIOfRoleLoading: true,
    }));
    builder.addCase(getPermissionsUIOfRole.fulfilled, (state, { payload }) => ({
      ...state,
      permissionUIOfRoleList: payload,
      getPermissionUIOfRoleLoading: false,
    }));
    builder.addCase(getPermissionsUIOfRole.rejected, (state) => ({
      ...state,
      getPermissionUIOfRoleLoading: false,
    }));
    builder.addCase(getPermissionsResourceOfRole.pending, (state) => ({
      ...state,
      getPermissionResourceOfRoleLoading: true,
    }));
    builder.addCase(
      getPermissionsResourceOfRole.fulfilled,
      (state, { payload }) => ({
        ...state,
        permissionResourceOfRoleList: payload,
        getPermissionResourceOfRoleLoading: false,
      }),
    );
    builder.addCase(getPermissionsResourceOfRole.rejected, (state) => ({
      ...state,
      getPermissionResourceOfRoleLoading: false,
    }));
  },
});

export const { selectRole } = slice.actions;
export {
  getRoles,
  getUsersOfRole,
  getPermissionsUIOfRole,
  getPermissionsResourceOfRole,
};

export default slice.reducer;
