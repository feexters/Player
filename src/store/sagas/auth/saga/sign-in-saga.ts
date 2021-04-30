import {Alert} from 'react-native';
import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {authorized} from '@store/slices';
import {AUTH_SIGN_IN} from '../actions';
import {SignInData} from '@lib/interfaces';
import axios from 'axios';
import {getAllColumns} from '@store/sagas/columns';

export interface SingInWorker {
  type: string;
  payload: SignInData;
}

function* signInWorker({
  payload,
}: SingInWorker): Generator<StrictEffect, void, string> {
  try {
    const token = yield call(() => fetchSignIn(payload));

    if (!token) {
      Alert.alert('The email or password is incorrect');
    } else {
      yield put(authorized({status: true, token}));
      yield put(getAllColumns());
    }
  } catch (e) {
    console.error(e);
  }
}

async function fetchSignIn(user: SignInData) {
  return await axios
    .post('https://prayer.herokuapp.com/auth/sign-in', user)
    .then(response => {
      const token: string = response.data.token;
      return token;
    });
}

export function* watchSignIn() {
  yield takeEvery(AUTH_SIGN_IN, signInWorker);
}
