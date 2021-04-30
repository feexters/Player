import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import axios from 'axios';
import {Auth} from '@lib/utils';
import {COLUMNS_GET_ALL} from '../actions/actions';
import {ColumnData} from '@lib/interfaces';
import {setColumns} from '@store/slices';

function* getAllColumnsWorker(): Generator<StrictEffect, void, ColumnData[]> {
  try {
    const columns = yield call(() => fetchAllColumns());
    yield put(setColumns(columns));
  } catch (e) {
    console.error(e);
  }
}

async function fetchAllColumns(): Promise<ColumnData[]> {
  const token = await Auth.getToken().then(res => res);
  return await axios
    .get('https://prayer.herokuapp.com/columns', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
}

export function* watchGetAllColumns() {
  yield takeEvery(COLUMNS_GET_ALL, getAllColumnsWorker);
}
