import {combineReducers} from 'redux';
import {columns} from '@store/slices';

export const reducer = combineReducers({
  columns: columns.reducer,
});
