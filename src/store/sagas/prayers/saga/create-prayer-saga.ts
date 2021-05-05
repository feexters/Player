import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import axios from 'axios';
import {Auth} from '@lib/utils';
import {PRAYERS_CREATE} from '../actions';
import {PrayerData} from '@lib/interfaces';
import {addPrayer, loading} from '@store/slices';
import {PrayerActionData} from '@lib/interfaces';

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
  const token = await Auth.getToken().then(res => res);

  const postPrayer = {
    title: prayer.title,
    description: prayer.description,
    checked: prayer.checked,
  };

  return await axios
    .post(
      `https://prayer.herokuapp.com/columns/${prayer.columnId}/prayers`,
      postPrayer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then(response => response.data)
    .catch(e => console.log(e));
}

export function* watchCreatePrayer() {
  yield takeEvery(PRAYERS_CREATE, createPrayerWorker);
}
