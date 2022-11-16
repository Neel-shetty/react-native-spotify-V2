import axios from 'axios';
// import {API_KEY} from '@env';

export default axios.create({
  baseURL: 'https://api.genius.com/',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'API_KEY',
  },
});
