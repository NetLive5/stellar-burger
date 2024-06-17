import { registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
}

const registerUser = createAsyncThunk('user/register', registerUserApi);

const initialState: UserState = {
  isAuth: false,
  isLoading: false,
  user: {
    email: '',
    name: ''
  },
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {
    builder.addCase,
      (registerUser.pending,
      (state) => {
        state.isLoading = true;
        state.error = null;
      });
    builder.addCase,
      (registerUser.rejected,
      (state) => {
        state.isAuth = false;
      });
    builder.addCase, (registerUser.fulfilled, (state, action) => {});
  }
});
