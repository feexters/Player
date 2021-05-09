import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {COMMENTS_CREATE} from '../actions';
import {CommentData} from '@lib/interfaces';
import {addComment, loading} from '@store/slices';
import {CommentActionData} from '@lib/interfaces';
import {fetchCreateComment} from '../axios';

interface CreateCommentWorker {
  type: string;
  payload: CommentActionData;
}

function* createCommentWorker({
  payload,
}: CreateCommentWorker): Generator<StrictEffect, void, CommentData> {
  try {
    yield put(loading(true));
    const comment = yield call(() => fetchCreateComment(payload));
    yield put(addComment(comment));
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchCreateComment() {
  yield takeEvery(COMMENTS_CREATE, createCommentWorker);
}
