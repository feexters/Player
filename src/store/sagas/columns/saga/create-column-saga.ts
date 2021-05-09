import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {COLUMNS_CREATE} from '../actions/actions';
import {ColumnData} from '@lib/interfaces';
import {addColumn, loading} from '@store/slices';
import {ColumnActionData} from '@lib/interfaces/ColumnActionData';
import {fetchCreateColumn} from '../axios';

interface CreateColumnWorker {
  type: string;
  payload: ColumnActionData;
}

function* createColumnWorker({
  payload,
}: CreateColumnWorker): Generator<StrictEffect, void, ColumnData> {
  try {
    yield put(loading(true));
    const column = yield call(() => fetchCreateColumn(payload));
    yield put(addColumn(column));
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchCreateColumn() {
  yield takeEvery(COLUMNS_CREATE, createColumnWorker);
}
