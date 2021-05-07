import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {PRAYERS_GET_ALL} from '../actions';
import {PrayerData} from '@lib/interfaces';
import {loading, setPrayers} from '@store/slices';
import {instance} from '@lib/utils/instance';

function* getAllPrayersWorker(): Generator<StrictEffect, void, PrayerData[]> {
  try {
    yield put(loading(true));
    const prayers = yield call(() => fetchAllPrayers());
    yield put(setPrayers(prayers));
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

async function fetchAllPrayers(): Promise<PrayerData[]> {
  return await (await instance())
    .get('prayers')
    .then(response => response.data)
    .catch(e => console.log(e));
}

export function* watchGetAllPrayers() {
  yield takeEvery(PRAYERS_GET_ALL, getAllPrayersWorker);
}
