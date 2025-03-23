// src/services/newsService.js
import axios from 'axios';

const API_KEY = 'c2622a8492aa446aaaf2812e43c0fe55'; 
const BASE_URL = 'https://newsapi.org/v2';

export const fetchTopHeadlines = async (country = 'us') => {
  try {
    // Log the request for debugging
    console.log('Fetching top headlines with parameters:', { country, apiKey: API_KEY });
    
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: { country, apiKey: API_KEY },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
