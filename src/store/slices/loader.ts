import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loader = createSlice({
  name: 'loader',
  initialState: {isLoading: false, counter: 0},
  reducers: {
    loading(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.counter++;
      } else {
        state.counter--;
      }

      state.isLoading = state.counter ? true : false;
    },
  },
});

export const {loading} = loader.actions;
