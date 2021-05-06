import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Auth} from '@lib/utils';

export const auth = createSlice({
  name: 'auth',
  initialState: {authorized: false, token: ''},
  reducers: {
    authorized(state, action: PayloadAction<{status: boolean; token: string}>) {
      const {status, token} = action.payload;
      Auth.setToken(token);
      state.authorized = status;
      state.token = token;
    },
    logout(state) {
      Auth.clearToken();
      state.token = '';
      state.authorized = false;
    },
  },
});

export const {authorized, logout} = auth.actions;
