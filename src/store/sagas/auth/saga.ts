import {Alert} from 'react-native';
import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {authorized} from '@store/slices';
import {AUTH_SIGN_IN, AUTH_SIGN_UP} from './actions';
import {SignInData, SignUpData, SingInWorker, SingUpWorker} from './interfaces';
import axios from 'axios';

function* signUpWorker({
  payload,
}: SingUpWorker): Generator<StrictEffect, void, string> {
  try {
    const response = yield call(() => fetchSignUp(payload));

    if (response === 'QueryFailedError') {
      Alert.alert('This user already exist');
    } else {
      const {email, password} = payload;
      yield call(() => fetchSignIn({email, password}));
      yield put(authorized({status: true}));
    }
  } catch (e) {
    console.error(e);
  }
}

function* signInWorker({
  payload,
}: SingInWorker): Generator<StrictEffect, void, string> {
  try {
    const response = yield call(() => fetchSignIn(payload));

    if (response === 'EntityNotFound') {
      Alert.alert('The email or password is incorrect');
    } else {
      yield put(authorized({status: true}));
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

async function fetchSignIn(user: SignInData) {
  return await axios
    .post('https://prayer.herokuapp.com/auth/sign-in', user)
    .then(response => {
      const result: string = response.data.name;
      return result;
    });
}

export function* watchSignUp() {
  yield takeEvery(AUTH_SIGN_UP, signUpWorker);
}

export function* watchSignIn() {
  yield takeEvery(AUTH_SIGN_IN, signInWorker);
}
