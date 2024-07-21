import {
  user,
  initialState,
  loginUser,
  logOut,
  registerUser,
  userUpdate
} from '../../services/slices/AuthSlice';

const mockData = {
  setLoginUser: {
    pending: {
      type: loginUser.pending.type,
      payload: null
    },
    fulfilled: {
      type: loginUser.fulfilled.type,
      payload: { user: { name: 'Igor', email: 'sas.1800@mail.ru' } }
    },
    rejected: {
      type: loginUser.rejected.type,
      error: { message: 'ERROR' }
    }
  },
  logoutUser: {
    pending: {
      type: logOut.pending.type,
      payload: null
    },
    fulfilled: {
      type: logOut.fulfilled.type,
      payload: null
    },
    rejected: {
      type: logOut.rejected.type,
      error: { message: 'ERROR' }
    }
  },
  setRegisterUser: {
    pending: {
      type: registerUser.pending.type,
      payload: null
    },
    fulfilled: {
      type: registerUser.fulfilled.type,
      payload: { user: { name: 'Igor', email: 'sas.1800@mail.ru' } }
    },
    rejected: {
      type: registerUser.rejected.type,
      error: { message: 'ERROR' }
    }
  },
  updateUser: {
    pending: {
      type: userUpdate.pending.type,
      payload: null
    },
    fulfilled: {
      type: userUpdate.fulfilled.type,
      payload: { user: { name: 'Igor2', email: 'sas.1800@mail.ru2' } }
    },
    rejected: {
      type: userUpdate.rejected.type,
      error: { message: 'ERROR' }
    }
  }
};

describe('Проверяем работу user.extraReducers', () => {
  describe('Проверяем работу setLoginUser', () => {
    it('Проверяем setLoginUser.pending', () => {
      const res = user(initialState, mockData.setLoginUser.pending);
      expect(res.request).toBe(true);
      expect(res.isAuth).toBe(false);
    });
    it('Проверяем setLoginUser.fulfilled', () => {
      const res = user(initialState, mockData.setLoginUser.fulfilled);
      expect(res.request).toBe(false);
      expect(res.isAuth).toBe(true);
      expect(res.profile).toBe(mockData.setLoginUser.fulfilled.payload.user);
    });
    it('Проверяем setLoginUser.rejected', () => {
      const res = user(initialState, mockData.setLoginUser.rejected);
      expect(res.request).toBe(false);
      expect(res.isAuth).toBe(false);
      expect(res.error).toBe(mockData.setLoginUser.rejected.error.message);
    });
  });
  describe('Проверяем работу logoutUser', () => {
    it('Проверяем logoutUser.pending', () => {
      const res = user(initialState, mockData.setLoginUser.pending);
      expect(res.request).toBe(true);
    });
    it('Проверяем logoutUser.fulfilled', () => {
      const res = user(initialState, mockData.logoutUser.fulfilled);
      expect(res.request).toBe(false);
      expect(res.isAuth).toBe(true);
    });
    it('Проверяем logoutUser.rejected', () => {
      const res = user(initialState, mockData.logoutUser.rejected);
      expect(res.request).toBe(false);
      expect(res.isAuth).toBe(false);
      expect(res.error).toBe(mockData.logoutUser.rejected.error.message);
    });
  });
  describe('Проверяем работу setRegisterUser', () => {
    it('Проверяем setRegisterUser.pending', () => {
      const res = user(initialState, mockData.setRegisterUser.pending);
      expect(res.request).toBe(true);
      expect(res.isAuth).toBe(false);
    });
    it('Проверяем setRegisterUser.fulfilled', () => {
      const res = user(initialState, mockData.setRegisterUser.fulfilled);
      expect(res.request).toBe(false);
      expect(res.isAuth).toBe(true);
      expect(res.profile).toBe(mockData.setRegisterUser.fulfilled.payload.user);
    });
    it('Проверяем setRegisterUser.rejected', () => {
      const res = user(initialState, mockData.setRegisterUser.rejected);
      expect(res.request).toBe(false);
      expect(res.isAuth).toBe(false);
      expect(res.error).toBe(mockData.setRegisterUser.rejected.error.message);
    });
  });
  describe('Проверяем работу updateUser', () => {
    it('Проверяем updateUser.pending', () => {
      const res = user(initialState, mockData.updateUser.pending);
      expect(res.request).toBe(true);
    });
    it('Проверяем updateUser.fulfilled', () => {
      const res = user(initialState, mockData.updateUser.fulfilled);
      expect(res.request).toBe(false);
      expect(res.isAuth).toBe(true);
      expect(res.profile).toBe(mockData.updateUser.fulfilled.payload.user);
    });
    it('Проверяем updateUser.rejected', () => {
      const res = user(initialState, mockData.updateUser.rejected);
      expect(res.request).toBe(false);
      expect(res.error).toBe(mockData.updateUser.rejected.error.message);
    });
  });
});
