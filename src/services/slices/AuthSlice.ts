import { loginUserApi, registerUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  profile: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isAuth: false,
  isLoading: false,
  profile: null,
  error: null
};

const registerUser = createAsyncThunk('user/register', registerUserApi);
const loginUser = createAsyncThunk('user/login', loginUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.profile = null;
      state.isAuth = false;
    }
  },
  selectors: {
    getIsAuth: (state) => state.isAuth,
    getUser: (state) => state.profile
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuth = true;
      state.profile = action.payload.user;
    });
  }
});

export const user = userSlice.reducer;
export const { logOutUser } = userSlice.actions;
export const { getUser, getIsAuth } = userSlice.selectors;
