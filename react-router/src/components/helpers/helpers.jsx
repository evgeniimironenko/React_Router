import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Базова URL
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2RlM2M1YjFlNzM3MmZmMzM2YmFjN2FiNzhkY2Y2OSIsIm5iZiI6MTcyODMyNDUwNC4zODksInN1YiI6IjY3MDQyMzk4MThhOGI0OWQzMjEzYTg1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9bhlrafKhuwUvXdfe8v13s_sR4rekeF08pm87TLcp0M",
  },
});

/**
 * Універсальна функція для виконання GET-запитів до API
 * @param {string} endpoint - Ендпоінт для запиту (наприклад, '/trending/all/day')
 * @param {Object} [params={}] - Параметри запиту (query parameters)
 * @returns {Promise<Object>} - Результат запиту
 */
const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("Помилка запиту:", error);
    throw error;
  }
};
export default fetchData;
