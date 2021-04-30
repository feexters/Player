import {all} from '@redux-saga/core/effects';
import {watchSignIn, watchSignUp} from './auth';
import {watchGetAllColumns, watchCreateColumn} from './columns';

export default function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchGetAllColumns(),
    watchCreateColumn(),
  ]);
}
