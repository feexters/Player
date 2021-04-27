import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColumnData} from '@lib/interfaces';
import {getId} from '@lib/utils';

export const columns = createSlice({
  name: 'columns',
  initialState: {list: [] as ColumnData[]},
  reducers: {
    addColumn: (state, action: PayloadAction<{title: string}>) => {
      const {title} = action.payload;
      const newColumn: ColumnData = {
        id: getId(),
        description: '',
        title: title,
      };
      state.list.push(newColumn);
    },
  },
});

export const {addColumn} = columns.actions;
