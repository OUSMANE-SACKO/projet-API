import axios from 'axios';

const API_BASE_URL = 'https://api.mangadex.org';

export const searchManga = async (title) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/manga`, {
      params: {
        title,
        limit: 20,
        includes: ['cover_art']
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching manga:', error);
    throw error;
  }
};

export const getDefaultManga = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/manga`, {
      params: {
        limit: 20,
        includes: ['cover_art'],
        order: {
          followedCount: 'desc'
        }
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting default manga:', error);
    throw error;
  }
};

export const getMangaByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/manga`, {
      params: {
        limit: 20,
        includes: ['cover_art'],
        contentRating: ['safe'],
        tags: [category]
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting manga by category:', error);
    throw error;
  }
};

export const getMangaDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/manga/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting manga details:', error);
    throw error;
  }
};