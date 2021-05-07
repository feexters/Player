import axios from 'axios';
import Auth from './auth';

export const instance = async () => {
  const token = await Auth.getToken();
  let headers = {};
  if (token) {
    headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
  }
  const axiosCreate = axios.create({
    headers,
    baseURL: 'https://prayer.herokuapp.com/',
  });
  return axiosCreate;
};
