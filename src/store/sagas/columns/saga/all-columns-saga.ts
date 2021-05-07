import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {COLUMNS_GET_ALL} from '../actions/actions';
import {ColumnData} from '@lib/interfaces';
import {loading, setColumns} from '@store/slices';
import {instance} from '@lib/utils/instance';

function* getAllColumnsWorker(): Generator<StrictEffect, void, ColumnData[]> {
  try {
    yield put(loading(true));
    const columns = yield call(() => fetchAllColumns());
    yield put(setColumns(columns));
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

async function fetchAllColumns(): Promise<ColumnData[]> {
  return await (await instance())
    .get('columns')
    .then(response => response.data)
    .catch(e => console.log(e));
}

export function* watchGetAllColumns() {
  yield takeEvery(COLUMNS_GET_ALL, getAllColumnsWorker);
}
