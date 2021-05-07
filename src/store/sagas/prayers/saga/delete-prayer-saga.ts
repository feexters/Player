import {put, takeEvery, call} from 'redux-saga/effects';
import {PRAYERS_DELETE, getAllPrayers} from '../actions';
import {loading} from '@store/slices';
import {instance} from '@lib/utils/instance';

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
  return await (await instance())
    .delete(`prayers/${id}`)
    .catch(e => console.log(e));
}

export function* watchDeletePrayer() {
  yield takeEvery(PRAYERS_DELETE, deletePrayerWorker);
}
