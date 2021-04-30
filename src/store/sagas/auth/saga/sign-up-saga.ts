import {Alert} from 'react-native';
import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {AUTH_SIGN_UP} from '../actions/actions';
import {SignUpData} from '@lib/interfaces';
import axios from 'axios';
import {authSingIn} from '../actions';

export interface SingUpWorker {
  type: string;
  payload: SignUpData;
}

function* signUpWorker({
  payload,
}: SingUpWorker): Generator<StrictEffect, void, string> {
  try {
    const response = yield call(() => fetchSignUp(payload));

    if (response === 'QueryFailedError') {
      Alert.alert('This user already exist');
    } else {
      const {email, password} = payload;
      yield put(authSingIn({email, password}));
    }
  } catch (e) {
    console.error(e);
  }
}

async function fetchSignUp(user: SignUpData) {
  return await axios
    .post('https://prayer.herokuapp.com/auth/sign-up', user)
    .then(response => {
      const result: string = response.data.name;
      return result;
    });
}

export function* watchSignUp() {
  yield takeEvery(AUTH_SIGN_UP, signUpWorker);
}
