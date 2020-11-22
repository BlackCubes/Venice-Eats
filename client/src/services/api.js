import axios from 'axios';
import { resolve } from './utils/resolve.js';

const apiUrl = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  responseType: 'json'
});

export async function getTest() {
  return await resolve(apiUrl.get('/testApi').then(res => res.data));
}

export async function login(data) {
  return await resolve(apiUrl.post('/admins').then(res => res.data));
}
