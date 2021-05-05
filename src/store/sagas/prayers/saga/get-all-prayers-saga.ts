import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import axios from 'axios';
import {Auth} from '@lib/utils';
import {PRAYERS_GET_ALL} from '../actions';
import {PrayerData} from '@lib/interfaces';
import {loading, setPrayers} from '@store/slices';

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
  const token = await Auth.getToken().then(res => res);
  console.log(token);
  return await axios
    .get('https://prayer.herokuapp.com/prayers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data)
    .catch(e => console.log(e));
}

export function* watchGetAllPrayers() {
  yield takeEvery(PRAYERS_GET_ALL, getAllPrayersWorker);
}
