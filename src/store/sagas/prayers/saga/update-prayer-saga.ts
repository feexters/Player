import {put, takeEvery, call} from 'redux-saga/effects';
import {PRAYERS_UPDATE, getAllPrayers} from '../actions';
import {PrayerUpdateData} from '@lib/interfaces';
import {loading} from '@store/slices';
import {fetchUpdatePrayer} from '../axios';

interface UpdatePrayerWorker {
  type: string;
  payload: PrayerUpdateData;
}

function* updatePrayerWorker({payload}: UpdatePrayerWorker) {
  try {
    yield put(loading(true));
    yield call(() => fetchUpdatePrayer(payload));
    yield put(getAllPrayers());
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchUpdatePrayer() {
  yield takeEvery(PRAYERS_UPDATE, updatePrayerWorker);
}
