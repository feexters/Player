import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {PRAYERS_GET_BY_ID} from '../actions';
import {loading, setDateForCurrentPrayer} from '@store/slices';
import {fetchPrayer} from '../axios';

interface GetPrayerWorker {
  type: string;
  payload: number;
}

function* getPrayerWorker({
  payload,
}: GetPrayerWorker): Generator<StrictEffect, void, string> {
  try {
    yield put(loading(true));
    const date = yield call(() => fetchPrayer(payload));
    yield put(setDateForCurrentPrayer(date));
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchGetPrayer() {
  yield takeEvery(PRAYERS_GET_BY_ID, getPrayerWorker);
}
