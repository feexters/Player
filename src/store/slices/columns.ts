import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColumnData} from '@lib/interfaces';

export const columns = createSlice({
  name: 'columns',
  initialState: {list: [] as ColumnData[]},
  reducers: {
    setColumns(state, action: PayloadAction<ColumnData[]>) {
      state.list = action.payload;
    },
    addColumn: (state, action: PayloadAction<ColumnData>) => {
      state.list.push(action.payload);
    },
  },
});

export const {setColumns, addColumn} = columns.actions;
