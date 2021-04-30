import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import axios from 'axios';
import {Auth} from '@lib/utils';
import {COLUMNS_CREATE} from '../actions/actions';
import {ColumnData} from '@lib/interfaces';
import {addColumn} from '@store/slices';
import {ColumnActionData} from 'lib/interfaces/ColumnActionData';

interface CreateColumnWorker {
  type: string;
  payload: ColumnActionData;
}

function* createColumnWorker({
  payload,
}: CreateColumnWorker): Generator<StrictEffect, void, ColumnData> {
  try {
    const column = yield call(() => fetchCreateColumn(payload));
    yield put(addColumn(column));
  } catch (e) {
    console.error(e);
  }
}

async function fetchCreateColumn(
  column: ColumnActionData,
): Promise<ColumnData> {
  const token = await Auth.getToken().then(res => res);

  return await axios
    .post('https://prayer.herokuapp.com/columns', column, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data)
    .catch(e => console.log(e));
}

export function* watchCreateColumn() {
  yield takeEvery(COLUMNS_CREATE, createColumnWorker);
}
