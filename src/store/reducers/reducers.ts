import {combineReducers} from 'redux';
import {columns, auth, loader, prayers} from '@store/slices';

export const reducer = combineReducers({
  auth: auth.reducer,
  columns: columns.reducer,
  loader: loader.reducer,
  prayers: prayers.reducer,
});
