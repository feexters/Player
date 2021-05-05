import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {Auth} from '@lib/utils';
import {PRAYERS_DELETE, getAllPrayers} from '../actions';
import {loading} from '@store/slices';

interface DeletePrayerWorker {
  type: string;
  payload: number;
}

function* deletePrayerWorker({payload}: DeletePrayerWorker) {
  try {
    yield put(loading(true));
    yield call(() => fetchDeletePrayer(payload));
    yield put(getAllPrayers());
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

async function fetchDeletePrayer(id: number) {
  const token = await Auth.getToken().then(res => res);

  return await axios
    .delete(`https://prayer.herokuapp.com/prayers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(e => console.log(e));
}

export function* watchDeletePrayer() {
  yield takeEvery(PRAYERS_DELETE, deletePrayerWorker);
}
