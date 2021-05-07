import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {PRAYERS_CREATE} from '../actions';
import {PrayerData} from '@lib/interfaces';
import {addPrayer, loading} from '@store/slices';
import {PrayerActionData} from '@lib/interfaces';
import {instance} from '@lib/utils/instance';

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

async function fetchCreatePrayer(
  prayer: PrayerActionData,
): Promise<PrayerData> {
  const postPrayer = {
    title: prayer.title,
    description: prayer.description,
    checked: prayer.checked,
  };
  return await (await instance())
    .post(`columns/${prayer.columnId}/prayers`, postPrayer)
    .then(response => response.data)
    .catch(e => console.log(e));
}

export function* watchCreatePrayer() {
  yield takeEvery(PRAYERS_CREATE, createPrayerWorker);
}
