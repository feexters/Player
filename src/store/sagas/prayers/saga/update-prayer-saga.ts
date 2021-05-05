import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {Auth} from '@lib/utils';
import {PRAYERS_UPDATE, getAllPrayers} from '../actions';
import {PrayerUpdateData} from '@lib/interfaces';
import {loading} from '@store/slices';

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
  const token = await Auth.getToken().then(res => res);
  const {title, description, checked} = prayer;

  return await axios
    .put(
      `https://prayer.herokuapp.com/prayers/${prayer.id}`,
      {title, description, checked},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch(e => console.log(e));
}

export function* watchUpdatePrayer() {
  yield takeEvery(PRAYERS_UPDATE, updatePrayerWorker);
}
