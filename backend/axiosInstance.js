const axios = require("axios")

const baseURL =
  process.env.NODE_ENV === 'development'
    ? '/test'  // When in development, the proxy will forward these requests to http://20.244.56.144/test
    : process.env.SERVER_URI; // For production, use the value in .env

const axiosInstance = axios.create({
  baseURL, 
  timeout: 5000, // Optional: 5 seconds timeout for all requests
});

exports.default = axiosInstance;
