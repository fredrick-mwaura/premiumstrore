import axios from 'axios';

// Get CSRF token from meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

axios.defaults.baseURL = 'http://localhost:8000'; // Update this with your backend URL
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
axios.defaults.headers.common['Accept'] = 'application/json';

export default axios;
