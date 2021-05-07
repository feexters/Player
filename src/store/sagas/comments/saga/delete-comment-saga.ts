import {put, takeEvery, call} from 'redux-saga/effects';
import {COMMENTS_DELETE, getAllComments} from '../actions';
import {loading} from '@store/slices';
import {instance} from '@lib/utils/instance';

interface DeleteCommentWorker {
  type: string;
  payload: number;
}

function* deleteCommentWorker({payload}: DeleteCommentWorker) {
  try {
    yield put(loading(true));
    yield call(() => fetchDeleteComment(payload));
    yield put(getAllComments());
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

async function fetchDeleteComment(id: number) {
  return await (await instance())
    .delete(`comments/${id}`)
    .catch(e => console.log(e));
}

export function* watchDeleteComment() {
  yield takeEvery(COMMENTS_DELETE, deleteCommentWorker);
}
