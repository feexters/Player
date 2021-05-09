import {put, takeEvery, call} from 'redux-saga/effects';
import {COLUMNS_DELETE, getAllColumns} from '../actions';
import {loading} from '@store/slices';
import {fetchDeleteColumn} from '../axios';

interface DeleteColumnWorker {
  type: string;
  payload: number;
}

function* deleteColumnWorker({payload}: DeleteColumnWorker) {
  try {
    yield put(loading(true));
    yield call(() => fetchDeleteColumn(payload));
    yield put(getAllColumns());
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchDeleteColumn() {
  yield takeEvery(COLUMNS_DELETE, deleteColumnWorker);
}
