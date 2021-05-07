import {all} from '@redux-saga/core/effects';
import {watchSignIn, watchSignUp} from './auth';
import {
  watchGetAllColumns,
  watchCreateColumn,
  watchDeleteColumn,
  watchUpdateColumn,
} from './columns';
import {
  watchCreateComment,
  watchDeleteComment,
  watchGetAllComments,
  watchUpdateComment,
} from './comments';
import {
  watchGetPrayer,
  watchGetAllPrayers,
  watchCreatePrayer,
  watchDeletePrayer,
  watchUpdatePrayer,
} from './prayers';

export default function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchGetAllColumns(),
    watchCreateColumn(),
    watchDeleteColumn(),
    watchUpdateColumn(),
    watchGetAllPrayers(),
    watchCreatePrayer(),
    watchDeletePrayer(),
    watchUpdatePrayer(),
    watchGetPrayer(),
    watchGetAllComments(),
    watchCreateComment(),
    watchDeleteComment(),
    watchUpdateComment(),
  ]);
}
