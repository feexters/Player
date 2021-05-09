import {put, takeEvery, call} from 'redux-saga/effects';
import {PRAYERS_DELETE, getAllPrayers} from '../actions';
import {loading} from '@store/slices';
import {fetchDeletePrayer} from '../axios';

interface DeletePrayerWorker {
  type: string;
  payload: number;
}

function* deletePrayerWorker({payload}: DeletePrayerWorker) {
  try {
    yield put(loading(true));
    yield call(() => fetchDeletePrayer(payload));
    yield put(getAllPrayers());
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchDeletePrayer() {
  yield takeEvery(PRAYERS_DELETE, deletePrayerWorker);
}
