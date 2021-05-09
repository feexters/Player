import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Auth} from '@lib/utils';
import {UserData} from '@lib/interfaces';

export const auth = createSlice({
  name: 'auth',
  initialState: {authorized: false, user: {} as UserData},
  reducers: {
    authorized(
      state,
      action: PayloadAction<{status: boolean; user: UserData}>,
    ) {
      const {status, user} = action.payload;
      Auth.setToken(user.token);
      state.authorized = status;
      state.user = user;
    },
    logout(state) {
      Auth.clearToken();
      state.user = {} as UserData;
      state.authorized = false;
    },
  },
});

export const {authorized, logout} = auth.actions;
