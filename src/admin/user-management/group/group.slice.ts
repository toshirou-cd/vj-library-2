import {
  createAsyncThunk,
  createSlice,
  CaseReducer,
  PayloadAction,
} from '@reduxjs/toolkit';
import groupService from './group.service';
import { Group } from './group.model';
import { Role } from '../role/role.model';
import { Permission } from '../permission/permission.model';
import { User } from '../user/user.model';

interface State {
  selectedGroup?: Group;
  groupList: Group[];
  getGroupsLoading: boolean;
  userOfGroupList: User[];
  roleOfGroupList: Role[];
  getUsersOfGroupLoading: boolean;
  getRolesOfGroupLoading: boolean;
  permissionUIOfGroupList: Permission[];
  getPermissionsUIOfGroupLoading: boolean;
  permissionResourceOfGroupList: Permission[];
  getPermissionsResourceOfGroupLoading: boolean;
}

const initialState: State = {
  selectedGroup: undefined,
  groupList: [],
  getGroupsLoading: false,
  userOfGroupList: [],
  roleOfGroupList: [],
  getUsersOfGroupLoading: false,
  getRolesOfGroupLoading: false,
  permissionUIOfGroupList: [],
  getPermissionsUIOfGroupLoading: false,
  permissionResourceOfGroupList: [],
  getPermissionsResourceOfGroupLoading: false,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const selectGroupCR: CR<Group | undefined> = (state, action) => ({
  ...state,
  selectedGroup: action.payload,
});

const getGroups = createAsyncThunk(
  'admin/userManagement/group/getGroups',
  async () => {
    const result = await groupService.getGroups();
    return result;
  },
);

const getUsersOfGroup = createAsyncThunk(
  'admin/userManagement/group/getUsersOfGroup',
  async (groupId: string) => {
    const result = await groupService.getUsersOfGroup(groupId);
    return result;
  },
);

const getRolesOfGroup = createAsyncThunk(
  'admin/userManagement/group/getRolesOfGroup',
  async (groupId: string) => {
    const result = await groupService.getRolesOfGroup(groupId);
    return result;
  },
);

const getPermissionsUIOfGroup = createAsyncThunk(
  'admin/userManagement/group/getPermissionsUiOfGroup',
  async (groupId: string) => {
    const result = await groupService.getPermissionsUIOfGroup(groupId);
    return result;
  },
);

const getPermissionsResourceOfGroup = createAsyncThunk(
  'admin/userManagement/group/getPermissionsResourceOfGroup',
  async (groupId: string) => {
    const result = await groupService.getPermissionsResourceOfGroup(groupId);
    return result;
  },
);

const slice = createSlice({
  name: 'admin/userManagement/group',
  initialState,
  reducers: {
    selectGroup: selectGroupCR,
  },
  extraReducers: (builder) => {
    builder.addCase(getGroups.pending, (state) => ({
      ...state,
      getGroupsLoading: true,
    }));
    builder.addCase(getGroups.fulfilled, (state, { payload }) => ({
      ...state,
      groupList: payload,
      getGroupsLoading: false,
    }));
    builder.addCase(getGroups.rejected, (state) => ({
      ...state,
      getGroupsLoading: false,
    }));
    builder.addCase(getUsersOfGroup.pending, (state) => ({
      ...state,
      getUsersOfGroupLoading: true,
    }));
    builder.addCase(getUsersOfGroup.fulfilled, (state, { payload }) => ({
      ...state,
      userOfGroupList: payload,
      getUsersOfGroupLoading: false,
    }));
    builder.addCase(getUsersOfGroup.rejected, (state) => ({
      ...state,
      getUsersOfGroupLoading: false,
    }));
    builder.addCase(getRolesOfGroup.pending, (state) => ({
      ...state,
      getRolesOfGroupLoading: true,
    }));
    builder.addCase(getRolesOfGroup.fulfilled, (state, { payload }) => ({
      ...state,
      roleOfGroupList: payload,
      getRolesOfGroupLoading: false,
    }));
    builder.addCase(getRolesOfGroup.rejected, (state) => ({
      ...state,
      getRolesOfGroupLoading: false,
    }));
    builder.addCase(getPermissionsUIOfGroup.pending, (state) => ({
      ...state,
      getPermissionsUIOfGroupLoading: true,
    }));
    builder.addCase(
      getPermissionsUIOfGroup.fulfilled,
      (state, { payload }) => ({
        ...state,
        permissionUIOfGroupList: payload,
        getPermissionsUIOfGroupLoading: false,
      }),
    );
    builder.addCase(getPermissionsUIOfGroup.rejected, (state) => ({
      ...state,
      getPermissionsUIOfGroupLoading: false,
    }));
    builder.addCase(getPermissionsResourceOfGroup.pending, (state) => ({
      ...state,
      getPermissionsResourceOfGroupLoading: true,
    }));
    builder.addCase(
      getPermissionsResourceOfGroup.fulfilled,
      (state, { payload }) => ({
        ...state,
        permissionResourceOfGroupList: payload,
        getPermissionsResourceOfGroupLoading: false,
      }),
    );
    builder.addCase(getPermissionsResourceOfGroup.rejected, (state) => ({
      ...state,
      getPermissionsResourceOfGroupLoading: false,
    }));
  },
});

export const { selectGroup } = slice.actions;
export {
  getGroups,
  getUsersOfGroup,
  getRolesOfGroup,
  getPermissionsUIOfGroup,
  getPermissionsResourceOfGroup,
};

export default slice.reducer;
