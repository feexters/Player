import {Alert} from 'react-native';
import {put, takeEvery, call, StrictEffect} from 'redux-saga/effects';
import {authorized} from '@store/slices';
import {AUTH_SIGN_IN, AUTH_SIGN_UP} from './actions';
import {SignInData, SignUpData, SingInWorker, SingUpWorker} from './interfaces';

function* signUpWorker({
  payload,
}: SingUpWorker): Generator<StrictEffect, void, string> {
  try {
    const response = yield call(() => fetchSignUp(payload));
    console.log(response);

    if (response.name === 'QueryFailedError') {
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
    if (response.name === 'EntityNotFound') {
      Alert.alert('The email or password is incorrect');
    } else {
      yield put(authorized({status: true}));
    }
  } catch (e) {
    console.error(e);
  }
}

async function fetchSignUp(user: SignUpData) {
  return await fetch('https://prayer.herokuapp.com/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(responseJson => responseJson);
}

async function fetchSignIn(user: SignInData) {
  return await fetch('https://prayer.herokuapp.com/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(responseJson => responseJson);
}

export function* watchSignUp() {
  yield takeEvery(AUTH_SIGN_UP, signUpWorker);
}

export function* watchSignIn() {
  yield takeEvery(AUTH_SIGN_IN, signInWorker);
}
