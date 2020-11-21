import axios from 'axios';
import { resolve } from './utils/resolve';

const apiUrl = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  responseType: 'json'
});

export async function getTest() {
  return await resolve(axios.get(apiUrl).then(res => res.data));
}
