import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {PRAYERS_GET_BY_ID} from '../actions';
import {loading, setDateForCurrentPrayer} from '@store/slices';
import {instance} from '@lib/utils/instance';

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

async function fetchPrayer(id: number): Promise<string> {
  return await (await instance())
    .get(`prayers/${id}`)
    .then(response => response.headers.date)
    .catch(e => console.log(e));
}

export function* watchGetPrayer() {
  yield takeEvery(PRAYERS_GET_BY_ID, getPrayerWorker);
}
