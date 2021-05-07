import {put, takeEvery, call} from 'redux-saga/effects';
import {PRAYERS_UPDATE, getAllPrayers} from '../actions';
import {PrayerUpdateData} from '@lib/interfaces';
import {loading} from '@store/slices';
import {instance} from '@lib/utils/instance';

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

async function fetchUpdatePrayer(prayer: PrayerUpdateData) {
  const {title, description, checked} = prayer;
  return await (await instance())
    .put(`prayers/${prayer.id}`, {title, description, checked})
    .catch(e => console.log(e));
}

export function* watchUpdatePrayer() {
  yield takeEvery(PRAYERS_UPDATE, updatePrayerWorker);
}
