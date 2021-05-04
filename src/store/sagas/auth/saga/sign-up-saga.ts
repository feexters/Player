import {Alert} from 'react-native';
import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {AUTH_SIGN_UP} from '../actions/actions';
import {SignUpData} from '@lib/interfaces';
import axios from 'axios';
import {authSingIn} from '../actions';
import {loading} from '@store/slices';

export interface SingUpWorker {
  type: string;
  payload: SignUpData;
}

function* signUpWorker({
  payload,
}: SingUpWorker): Generator<StrictEffect, void, string> {
  try {
    yield put(loading(true));
    const response = yield call(() => fetchSignUp(payload));

    if (response === 'QueryFailedError') {
      Alert.alert('This user already exist');
    } else {
      const {email, password} = payload;
      yield put(authSingIn({email, password}));
    }
    yield put(loading(false));
  } catch (e) {
    console.error(e);
  }
}

async function fetchSignUp(user: SignUpData) {
  return await axios
    .post('https://prayer.herokuapp.com/auth/sign-up', user)
    .then(response => {
      return response.data.name;
    })
    .catch(e => console.log(e));
}

export function* watchSignUp() {
  yield takeEvery(AUTH_SIGN_UP, signUpWorker);
}
