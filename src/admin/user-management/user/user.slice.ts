import {
  CaseReducer,
  PayloadAction,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { Group } from '@admin/user-management/group/group.model';
import { Role } from '@admin/user-management/role/role.model';
import { Permission } from '@admin/user-management/permission/permission.model';
import { User } from './user.model';
import userService from './user.service';

interface State {
  userList: User[];
  selectedUser?: User;
  getUsersLoading: boolean;
  groupsOfUserList: Group[];
  getGroupsOfUserLoading: boolean;
  rolesOfUserList: Role[];
  getRolesOfUserLoading: boolean;
  permissionsUIOfUserList: Permission[];
  getPermissionUIOfUserLoading: boolean;
  permissionsResourceOfUserList: Permission[];
  getPermissionResourceOfUserLoading: boolean;
  permissionsDataOfUserList: Permission[];
  getPermissionDataOfUserLoading: boolean;
}

const initialState: State = {
  userList: [],
  selectedUser: undefined,
  getUsersLoading: false,
  groupsOfUserList: [],
  getGroupsOfUserLoading: false,
  rolesOfUserList: [],
  getRolesOfUserLoading: false,
  permissionsUIOfUserList: [],
  getPermissionUIOfUserLoading: false,
  permissionsResourceOfUserList: [],
  getPermissionResourceOfUserLoading: false,
  permissionsDataOfUserList: [],
  getPermissionDataOfUserLoading: false,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const selectUserCR: CR<User | undefined> = (state, action) => ({
  ...state,
  selectedUser: action.payload,
});

const getUsers = createAsyncThunk(
  'admin/userManagement/user/getUsers',
  async () => {
    const result = await userService.getUsers();
    return result;
  },
);

const getGroupsOfUser = createAsyncThunk(
  'admin/userManagement/user/getGroupsOfUser',
  async (userId: string) => {
    const result = await userService.getGroupsOfUser(userId);
    return result;
  },
);

const getRolesOfUser = createAsyncThunk(
  'admin/userManagement/user/getRolesOfUser',
  async (userId: string) => {
    const result = await userService.getRolesOfUser(userId);
    return result;
  },
);

const getPermissionsUIOfUser = createAsyncThunk(
  'admin/userManagement/user/getPermissionsUIOfUser',
  async (userId: string) => {
    const result = await userService.getPermissionsUIOfUser(userId);
    return result;
  },
);

const getPermissionsResourceOfUser = createAsyncThunk(
  'admin/userManagement/user/getPermissionsResourceOfUser',
  async (userId: string) => {
    const result = await userService.getPermissionsResourceOfUser(userId);
    return result;
  },
);

const getPermissionsDataOfUser = createAsyncThunk(
  'admin/userManagement/user/getPermissionsDataOfUser',
  async (userId: string) => {
    const result = await userService.getPermissionsDataOfUser(userId);
    return result;
  },
);

const slice = createSlice({
  name: 'admin/userManagement/user',
  initialState,
  reducers: {
    selectUser: selectUserCR,
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => ({
      ...state,
      getUsersLoading: true,
    }));
    builder.addCase(getUsers.fulfilled, (state, { payload }) => ({
      ...state,
      getUsersLoading: false,
      userList: payload,
    }));
    builder.addCase(getUsers.rejected, (state) => ({
      ...state,
      getUsersLoading: false,
    }));
    builder.addCase(getGroupsOfUser.pending, (state) => ({
      ...state,
      getGroupsOfUserLoading: true,
    }));
    builder.addCase(getGroupsOfUser.fulfilled, (state, { payload }) => ({
      ...state,
      getGroupsOfUserLoading: false,
      groupsOfUserList: payload,
    }));
    builder.addCase(getGroupsOfUser.rejected, (state) => ({
      ...state,
      getGroupsOfUserLoading: false,
    }));
    builder.addCase(getRolesOfUser.pending, (state) => ({
      ...state,
      getRolesOfUserLoading: true,
    }));
    builder.addCase(getRolesOfUser.fulfilled, (state, { payload }) => ({
      ...state,
      getRolesOfUserLoading: false,
      rolesOfUserList: payload,
    }));
    builder.addCase(getRolesOfUser.rejected, (state) => ({
      ...state,
      getRolesOfUserLoading: false,
    }));
    builder.addCase(getPermissionsUIOfUser.pending, (state) => ({
      ...state,
      getPermissionUIOfUserLoading: true,
    }));
    builder.addCase(getPermissionsUIOfUser.fulfilled, (state, { payload }) => ({
      ...state,
      getPermissionUIOfUserLoading: false,
      permissionsUIOfUserList: payload,
    }));
    builder.addCase(getPermissionsUIOfUser.rejected, (state) => ({
      ...state,
      getPermissionUIOfUserLoading: false,
    }));
    builder.addCase(getPermissionsResourceOfUser.pending, (state) => ({
      ...state,
      getPermissionResourceOfUserLoading: true,
    }));
    builder.addCase(
      getPermissionsResourceOfUser.fulfilled,
      (state, { payload }) => ({
        ...state,
        getPermissionResourceOfUserLoading: false,
        permissionsResourceOfUserList: payload,
      }),
    );
    builder.addCase(getPermissionsResourceOfUser.rejected, (state) => ({
      ...state,
      getPermissionResourceOfUserLoading: false,
    }));
    builder.addCase(getPermissionsDataOfUser.pending, (state) => ({
      ...state,
      getPermissionDataOfUserLoading: true,
    }));
    builder.addCase(
      getPermissionsDataOfUser.fulfilled,
      (state, { payload }) => ({
        ...state,
        getPermissionDataOfUserLoading: false,
        permissionsDataOfUserList: payload,
      }),
    );
    builder.addCase(getPermissionsDataOfUser.rejected, (state) => ({
      ...state,
      getPermissionDataOfUserLoading: false,
    }));
  },
});

export const { selectUser } = slice.actions;
export {
  getUsers,
  getGroupsOfUser,
  getRolesOfUser,
  getPermissionsUIOfUser,
  getPermissionsResourceOfUser,
  getPermissionsDataOfUser,
};

export default slice.reducer;
