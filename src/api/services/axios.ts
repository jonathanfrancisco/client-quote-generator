import axios from 'axios';

// TODO: Move base url value to a environment variable
const axiosInstance = axios.create({
  baseURL: 'http://192.168.254.135:3000',
  headers: {
    'Content-type': 'application/json',
  },
});

export default axiosInstance;
