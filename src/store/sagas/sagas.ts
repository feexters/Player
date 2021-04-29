import {all} from '@redux-saga/core/effects';
import {watchSignIn, watchSignUp} from './auth';

export default function* rootSaga() {
  yield all([watchSignUp(), watchSignIn()]);
}
