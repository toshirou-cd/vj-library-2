import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userService from './user.service';
import { User } from './user.model';

interface State {
  userList: User[];
  getUsersLoading: boolean;
}

const initialState: State = {
  userList: [],
  getUsersLoading: false,
};

const getUsers = createAsyncThunk('authorization/user/getUsers', async () => {
  const result = await userService.getUsers();
  return result;
});

const slice = createSlice({
  name: 'authorization/user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => ({
      ...state,
      getUsersLoading: true,
    }));
    builder.addCase(getUsers.fulfilled, (state, action) => ({
      ...state,
      userList: action.payload,
      getUsersLoading: false,
    }));
    builder.addCase(getUsers.rejected, (state) => ({
      ...state,
      getUsersLoading: false,
    }));
  },
});

export { getUsers };

export default slice.reducer;
