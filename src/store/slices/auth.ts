import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const auth = createSlice({
  name: 'auth',
  initialState: {authorized: false},
  reducers: {
    authorized(state, action: PayloadAction<{status: true}>) {
      const {status} = action.payload;
      state.authorized = status;
    },
  },
});

export const {authorized} = auth.actions;
