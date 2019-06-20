import axios from 'axios';

export const PAGE_URL = `https://es31-server.appspot.com/six-cities`;
const TIMEOUT = 5000;

export const configureAPI = () => {
  const api = axios.create({
    baseURL: PAGE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
  });

  return api;
};
