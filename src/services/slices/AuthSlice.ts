import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  profile: TUser;
  request: boolean;
  error: string | undefined;
}

export const initialState: UserState = {
  isAuth: false,
  isLoading: false,
  profile: {
    email: '',
    name: ''
  },
  request: false,
  error: undefined
};

export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const userProfileUser = createAsyncThunk('user/getUser', getUserApi);
export const loginUser = createAsyncThunk(
  'user/login',
  async function (loginData: TLoginData) {
    const data = await loginUserApi(loginData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);
export const logOut = createAsyncThunk('user/logout', async function () {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
  });
});
export const userUpdate = createAsyncThunk('user/update', updateUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.profile = { email: '', name: '' };
      state.isAuth = false;
    }
  },
  selectors: {
    getIsAuth: (state) => state.isAuth,
    getUser: (state) => state.profile
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.request = true;
      state.isAuth = false;
    }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.request = false;
        state.isAuth = true;
        state.profile = action.payload.user;
      }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.request = false;
        state.isAuth = false;
        state.error = action.error.message;
      });
    builder.addCase(userProfileUser.pending, (state) => {
      state.request = true;
      state.isAuth = false;
    }),
      builder.addCase(userProfileUser.fulfilled, (state, action) => {
        state.request = false;
        state.isAuth = true;
        state.profile = action.payload.user;
      }),
      builder.addCase(userProfileUser.rejected, (state, action) => {
        state.request = false;
        state.isAuth = false;
        state.error = action.error.message;
      });
    builder.addCase(registerUser.pending, (state) => {
      state.request = true;
      state.isAuth = false;
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.request = false;
        state.isAuth = true;
        state.profile = action.payload.user;
      }),
      builder.addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.isAuth = false;
        state.error = action.error.message;
      });
    builder.addCase(logOut.pending, (state) => {
      state.request = true;
    }),
      builder.addCase(logOut.fulfilled, (state) => {
        state.request = false;
        state.isAuth = true;
      }),
      builder.addCase(logOut.rejected, (state, action) => {
        state.request = false;
        state.isAuth = false;
        state.error = action.error.message;
      });
    builder.addCase(userUpdate.pending, (state) => {
      state.request = true;
    }),
      builder.addCase(userUpdate.fulfilled, (state, action) => {
        state.request = false;
        state.isAuth = true;
        state.profile = action.payload.user;
      }),
      builder.addCase(userUpdate.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message;
      });
  }
});

export const user = userSlice.reducer;
export const { logOutUser } = userSlice.actions;
export const { getUser, getIsAuth } = userSlice.selectors;
