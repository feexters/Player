import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {Auth} from '@lib/utils';
import {COLUMNS_UPDATE, getAllColumns} from '../actions';
import {ColumnUpdateData} from 'lib/interfaces';

interface UpdateColumnWorker {
  type: string;
  payload: ColumnUpdateData;
}

function* updateColumnWorker({payload}: UpdateColumnWorker) {
  try {
    yield call(() => fetchUpdateColumn(payload));
    yield put(getAllColumns());
  } catch (e) {
    console.error(e);
  }
}

async function fetchUpdateColumn(column: ColumnUpdateData) {
  const token = await Auth.getToken().then(res => res);
  const {title, description} = column;

  return await axios
    .put(
      `https://prayer.herokuapp.com/columns/${column.id}`,
      {title, description},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch(e => console.log(e));
}

export function* watchUpdateColumn() {
  yield takeEvery(COLUMNS_UPDATE, updateColumnWorker);
}
