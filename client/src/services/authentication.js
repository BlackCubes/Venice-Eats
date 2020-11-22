import React, { Component } from 'react';
import axios from 'axios';
import { resolve } from './../utils/resolve';

const apiUrl = axios.create({
  baseUrl: 'http://localhost:3001/api/v1',
  responseType: 'json'
});

// export async function login(data) {
//   return await resolve(apiUrl.post('/admins', data).then(res => res.data));
// }
