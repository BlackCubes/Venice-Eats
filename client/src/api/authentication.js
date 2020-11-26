import axios from 'axios';
import { resolve } from './../utils/resolve';

const apiUrl = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  responseType: 'json'
});

export const loginApi = async data => {
  return await resolve(
    apiUrl.post('/admins/login', data).then(res => res.data)
  );
};
