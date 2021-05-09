import {put, takeEvery, call} from 'redux-saga/effects';
import {COMMENTS_DELETE, getAllComments} from '../actions';
import {loading} from '@store/slices';
import {fetchDeleteComment} from '../axios';

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

export function* watchDeleteComment() {
  yield takeEvery(COMMENTS_DELETE, deleteCommentWorker);
}
