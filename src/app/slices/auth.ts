import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  CaseReducer,
} from '@reduxjs/toolkit';

import { Token } from '@app/models/token';
import { UserInfo } from '@app/models/user-info';
import { Permission } from '@app/models/permission';

import authService from '@app/services/auth';
import userService from '@admin/user-management/user/user.service';

interface State {
  token: Token | null;
  tokenExpiredTime: Date | null;
  loginLoading: boolean;
  userInfo: UserInfo | null;
  getUserInfoLoading: boolean;
  permissionList: Permission[];
  getPermissionsOfUserLoading: boolean;
}

const initialState: State = {
  token: null,
  tokenExpiredTime: null,
  loginLoading: false,
  userInfo: null,
  getUserInfoLoading: false,
  permissionList: [],
  getPermissionsOfUserLoading: false,
};

type CR<T> = CaseReducer<State, PayloadAction<T>>;

const login = createAsyncThunk(
  'auth/login',
  async (arg: { username: string; password: string }) => {
    const { username, password } = arg;
    const result = await authService.login(username, password);
    return result;
  },
);

const setTokenCR: CR<{
  token: Token;
  tokenExpiredTime: Date;
}> = (state, action) => ({
  ...state,
  token: action.payload.token,
  tokenExpiredTime: action.payload.tokenExpiredTime,
});

const getUserInfo = createAsyncThunk('auth/getUserInfo', async () => {
  const result = await authService.getUserInfo();
  window.document.title = result.Name;
  return result;
});

const getPermissionsOfUser = createAsyncThunk(
  'auth/getPermissionOfUser',
  async (userId: string) => {
    const result = await userService.getPermissionsUIOfUser(userId);
    return result as Permission[];
  },
);

const logoutCR: CR<void> = () => ({
  ...initialState,
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: setTokenCR,
    logout: logoutCR,
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => ({
      ...state,
      loginLoading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      loginLoading: false,
      token: payload,
      tokenExpiredTime: new Date(
        new Date().getTime() + payload.expires_in * 1000,
      ),
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loginLoading: false,
    }));

    // get user info
    builder.addCase(getUserInfo.pending, (state) => ({
      ...state,
      getUserInfoLoading: true,
    }));
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => ({
      ...state,
      userInfo: payload,
      getUserInfoLoading: false,
    }));
    builder.addCase(getUserInfo.rejected, (state) => ({
      ...state,
      getUserInfoLoading: false,
    }));

    // get permission of user
    builder.addCase(getPermissionsOfUser.pending, (state) => ({
      ...state,
      getPermissionsOfUserLoading: true,
    }));
    builder.addCase(getPermissionsOfUser.fulfilled, (state, { payload }) => ({
      ...state,
      permissionList: payload,
      getPermissionsOfUserLoading: false,
    }));
    builder.addCase(getPermissionsOfUser.rejected, (state) => ({
      ...state,
      getPermissionsOfUserLoading: false,
    }));
  },
});

export { login, getUserInfo, getPermissionsOfUser };
export const { setToken, logout } = slice.actions;

export default slice.reducer;
