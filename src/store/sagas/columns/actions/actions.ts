// import {SignInData, SignUpData} from './interfaces';

import {ColumnActionData} from '@lib/interfaces/ColumnActionData';

export const COLUMNS_GET_ALL = 'columns/get-all';
export const COLUMNS_GET_BY_ID = 'columns/get-by-id';
export const COLUMNS_CREATE = 'columns/create';
export const COLUMNS_DELETE = 'columns/delete-column';

export const getAllColumns = () => {
  return {type: COLUMNS_GET_ALL};
};

export const getColumnById = (payload: number) => {
  return {type: COLUMNS_GET_BY_ID, payload: payload};
};

export const createColumn = (payload: ColumnActionData) => {
  return {type: COLUMNS_CREATE, payload: payload};
};

export const deleteColumn = (payload: ColumnActionData) => {
  return {type: COLUMNS_DELETE, payload: payload};
};
