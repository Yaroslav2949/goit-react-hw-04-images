import axios from 'axios';
const API_KEY = '38887202-a6778fad9111f44c566d860bc'; // Особистий ключ
const BASE_URL = 'https://pixabay.com/api/';
const IMG_ON_PAGE = 12;

// Функція для отримання пошуку
export const getapiService = async (query, page) => {
  const response = await axios.get(BASE_URL, {
    method: 'get',
    params: {
      q: query,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: IMG_ON_PAGE,
    },
  });

  return response.data;
};
