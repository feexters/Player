import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PrayerData} from '@lib/interfaces';

export const prayers = createSlice({
  name: 'prayers',
  initialState: {list: [] as PrayerData[]},
  reducers: {
    setPrayers(state, action: PayloadAction<PrayerData[]>) {
      state.list = action.payload;
    },
    addPrayer: (state, action: PayloadAction<PrayerData>) => {
      state.list.push(action.payload);
    },
  },
});

export const {setPrayers, addPrayer} = prayers.actions;
