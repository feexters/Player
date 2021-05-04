import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loader = createSlice({
  name: 'loader',
  initialState: {loading: false},
  reducers: {
    loading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {loading} = loader.actions;
