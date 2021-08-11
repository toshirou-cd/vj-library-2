import {
  CaseReducer,
  // createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
// import permissionService from './permission.service';
import { Permission } from './permission.model';

interface State {
  selectedPermission?: Permission;
  // permissionUIList: Permission[];
  // getPermissionsUILoading: boolean;
  // permissionResourceList: Permission[];
  // getPermissionsResourceLoading: boolean;
}

const initialState: State = {
  selectedPermission: undefined,
  // permissionUIList: [],
  // getPermissionsUILoading: false,
  // permissionResourceList: [],
  // getPermissionsResourceLoading: false,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;
const selectPermissionCR: CR<Permission | undefined> = (
  state,
  { payload },
) => ({
  ...state,
  selectedPermission: payload,
});

// const getPermissionsUI = createAsyncThunk(
//   'admin/userManagement/permission/getPermissionsUI',
//   async () => {
//     const result = await permissionService.getPermissionsUI();
//     return result;
//   },
// );

// const getPermissionsResource = createAsyncThunk(
//   'admin/userManagement/permission/getPermissionsResource',
//   async () => {
//     const result = await permissionService.getPermissionsResource();
//     return result;
//   },
// );

const slice = createSlice({
  name: 'admin/userManagement/permission',
  initialState,
  reducers: {
    selectPermission: selectPermissionCR,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getPermissionsUI.pending, (state) => ({
  //     ...state,
  //     getPermissionsUILoading: true,
  //   }));
  //   builder.addCase(getPermissionsUI.fulfilled, (state, { payload }) => ({
  //     ...state,
  //     permissionUIList: payload,
  //     getPermissionsUILoading: false,
  //   }));
  //   builder.addCase(getPermissionsUI.rejected, (state) => ({
  //     ...state,
  //     getPermissionsUILoading: false,
  //   }));
  //   builder.addCase(getPermissionsResource.pending, (state) => ({
  //     ...state,
  //     getPermissionsResourceLoading: true,
  //   }));
  //   builder.addCase(getPermissionsResource.fulfilled, (state, { payload }) => ({
  //     ...state,
  //     permissionResourceList: payload,
  //     getPermissionsResourceLoading: false,
  //   }));
  //   builder.addCase(getPermissionsResource.rejected, (state) => ({
  //     ...state,
  //     getPermissionsResourceLoading: false,
  //   }));
  // },
});

// export { getPermissionsUI, getPermissionsResource };
export const { selectPermission } = slice.actions;
export default slice.reducer;
