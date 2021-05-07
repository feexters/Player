import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {COLUMNS_CREATE} from '../actions/actions';
import {ColumnData} from '@lib/interfaces';
import {addColumn, loading} from '@store/slices';
import {ColumnActionData} from '@lib/interfaces/ColumnActionData';
import {instance} from '@lib/utils/instance';

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

async function fetchCreateColumn(
  column: ColumnActionData,
): Promise<ColumnData> {
  return await (await instance())
    .post('/columns', column)
    .then(response => response.data)
    .catch(e => console.log(e));
}

export function* watchCreateColumn() {
  yield takeEvery(COLUMNS_CREATE, createColumnWorker);
}
