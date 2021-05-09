import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {COMMENTS_GET_ALL} from '../actions';
import {CommentData} from '@lib/interfaces';
import {loading, setComment} from '@store/slices';
import {fetchAllComments} from '../axios';

function* getAllCommentsWorker(): Generator<StrictEffect, void, CommentData[]> {
  try {
    yield put(loading(true));
    const comments = yield call(() => fetchAllComments());
    yield put(setComment(comments));
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchGetAllComments() {
  yield takeEvery(COMMENTS_GET_ALL, getAllCommentsWorker);
}
