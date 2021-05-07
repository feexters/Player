import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PrayerData} from '@lib/interfaces';

export const prayers = createSlice({
  name: 'prayers',
  initialState: {list: [] as PrayerData[], date: ''},
  reducers: {
    setPrayers(state, action: PayloadAction<PrayerData[]>) {
      state.list = action.payload;
    },
    addPrayer: (state, action: PayloadAction<PrayerData>) => {
      state.list.push(action.payload);
    },
    setDateForCurrentPrayer(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
  },
});

export const {setPrayers, addPrayer, setDateForCurrentPrayer} = prayers.actions;
