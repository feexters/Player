import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {PRAYERS_CREATE} from '../actions';
import {PrayerData} from '@lib/interfaces';
import {addPrayer, loading} from '@store/slices';
import {PrayerActionData} from '@lib/interfaces';
import {fetchCreatePrayer} from '../axios';

interface CreatePrayerWorker {
  type: string;
  payload: PrayerActionData;
}

function* createPrayerWorker({
  payload,
}: CreatePrayerWorker): Generator<StrictEffect, void, PrayerData> {
  try {
    yield put(loading(true));
    const prayer = yield call(() => fetchCreatePrayer(payload));
    yield put(addPrayer(prayer));
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchCreatePrayer() {
  yield takeEvery(PRAYERS_CREATE, createPrayerWorker);
}
