import {combineReducers} from 'redux';
import {columns, auth} from '@store/slices';

export const reducer = combineReducers({
  auth: auth.reducer,
  columns: columns.reducer,
});
