import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // ✅ this is key
});

export default api;


/*
import api from './api/axios';

api.get('/orders')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
*/