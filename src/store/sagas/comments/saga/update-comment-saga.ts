import {put, takeEvery, call} from 'redux-saga/effects';
import {COMMENTS_UPDATE, getAllComments} from '../actions';
import {CommentUpdateData} from '@lib/interfaces';
import {loading} from '@store/slices';
import {instance} from '@lib/utils/instance';

interface UpdateCommentWorker {
  type: string;
  payload: CommentUpdateData;
}

function* updateCommentWorker({payload}: UpdateCommentWorker) {
  try {
    yield put(loading(true));
    yield call(() => fetchUpdateComment(payload));
    yield put(getAllComments());
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

async function fetchUpdateComment(comment: CommentUpdateData) {
  return await (await instance())
    .put(`comments/${comment.id}`, {body: comment.body})
    .catch(e => console.log(e));
}

export function* watchUpdateComment() {
  yield takeEvery(COMMENTS_UPDATE, updateCommentWorker);
}
