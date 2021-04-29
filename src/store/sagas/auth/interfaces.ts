export interface SingUpWorker {
  type: string;
  payload: SignUpData;
}

export interface SingInWorker {
  type: string;
  payload: SignInData;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}
