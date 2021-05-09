import {put, takeEvery, call} from 'redux-saga/effects';
import {COLUMNS_UPDATE, getAllColumns} from '../actions';
import {ColumnUpdateData} from '@lib/interfaces';
import {loading} from '@store/slices';
import {fetchUpdateColumn} from '../axios';

interface UpdateColumnWorker {
  type: string;
  payload: ColumnUpdateData;
}

function* updateColumnWorker({payload}: UpdateColumnWorker) {
  try {
    yield put(loading(true));
    yield call(() => fetchUpdateColumn(payload));
    yield put(getAllColumns());
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchUpdateColumn() {
  yield takeEvery(COLUMNS_UPDATE, updateColumnWorker);
}
