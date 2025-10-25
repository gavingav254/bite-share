// src/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateKarmaPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.karmaPoints = (state.user.karmaPoints || 0) + action.payload;
      }
    },
  },
});

export const { setUser, clearUser, setLoading, updateKarmaPoints } = authSlice.actions;
export default authSlice.reducer;