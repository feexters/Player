import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loader = createSlice({
  name: 'loader',
  initialState: {isLoading: false},
  reducers: {
    loading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {loading} = loader.actions;
