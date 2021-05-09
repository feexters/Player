import {Alert} from 'react-native';
import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {authorized, loading} from '@store/slices';
import {AUTH_SIGN_IN} from '../actions';
import {SignInData, UserData} from '@lib/interfaces';
import {getAllColumns} from '@store/sagas/columns';
import {fetchSignIn} from '../axios';

export interface SingInWorker {
  type: string;
  payload: SignInData;
}

function* signInWorker({
  payload,
}: SingInWorker): Generator<StrictEffect, void, UserData> {
  try {
    yield put(loading(true));
    const user = yield call(() => fetchSignIn(payload));

    if (!user.token) {
      Alert.alert('The email or password is incorrect');
    } else {
      yield put(authorized({status: true, user}));
      yield put(getAllColumns());
    }
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

export function* watchSignIn() {
  yield takeEvery(AUTH_SIGN_IN, signInWorker);
}
