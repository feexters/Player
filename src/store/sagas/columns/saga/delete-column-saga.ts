import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {Auth} from '@lib/utils';
import {COLUMNS_DELETE, getAllColumns} from '../actions';

interface DeleteColumnWorker {
  type: string;
  payload: number;
}

function* deleteColumnWorker({payload}: DeleteColumnWorker) {
  try {
    yield call(() => fetchDeleteColumn(payload));
    yield put(getAllColumns());
  } catch (e) {
    console.error(e);
  }
}

async function fetchDeleteColumn(id: number) {
  const token = await Auth.getToken().then(res => res);

  return await axios
    .delete(`https://prayer.herokuapp.com/columns/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch(e => console.log(e));
}

export function* watchDeleteColumn() {
  yield takeEvery(COLUMNS_DELETE, deleteColumnWorker);
}
