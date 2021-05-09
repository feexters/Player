import {SignInData, SignUpData} from '@lib/interfaces';
import {instance} from '@lib/utils/instance';

export async function fetchSignIn(user: SignInData) {
  return await (await instance()).post('auth/sign-in', user).then(response => {
    return response.data;
  });
}

export async function fetchSignUp(user: SignUpData) {
  return await (await instance())
    .post('auth/sign-up', user)
    .then(response => {
      return response.data.name;
    })
    .catch(e => console.log(e));
}
