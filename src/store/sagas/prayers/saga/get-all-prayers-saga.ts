import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {PRAYERS_GET_ALL} from '../actions';
import {PrayerData} from '@lib/interfaces';
import {loading, setPrayers} from '@store/slices';
import {fetchAllPrayers} from '../axios';

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

export function* watchGetAllPrayers() {
  yield takeEvery(PRAYERS_GET_ALL, getAllPrayersWorker);
}
