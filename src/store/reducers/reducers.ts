import {combineReducers} from 'redux';
import {columns, auth, loader} from '@store/slices';

export const reducer = combineReducers({
  auth: auth.reducer,
  columns: columns.reducer,
  loader: loader.reducer,
});
