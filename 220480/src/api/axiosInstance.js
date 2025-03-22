import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/test'  // When in development, the proxy will forward these requests to http://20.244.56.144/test
    : process.env.REACT_APP_API_URL; // For production, use the value in .env

const axiosInstance = axios.create({
  baseURL, 
  timeout: 5000, // Optional: 5 seconds timeout for all requests
});

export default axiosInstance;
