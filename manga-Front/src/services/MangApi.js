import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

export const getUserCollection = async () => {
  try {
    const response = await axios.get(`${API_URL}/manga/collections`);
    return response.data.collection;
  } catch (error) {
    console.error('Error fetching user collection:', error);
    throw error;
  }
};

export const addToCollection = async (mangaId) => {
  try {
    const response = await axios.post(`${API_URL}/manga/collections`, { manga_id: mangaId });
    return response.data;
  } catch (error) {
    console.error('Error adding to collection:', error);
    throw error;
  }
};

export const removeFromCollection = async (mangaId) => {
  try {
    const response = await axios.delete(`${API_URL}/manga/collections/${mangaId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from collection:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, { username, email, password });
    return response.data.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};


export const searchManga = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/manga/mangas?search=${query}`);
    return response.data.mangas;
  } catch (error) {
    console.error('Error searching mangas:', error);
    throw error;
  }
};

export const getPopularMangas = async () => {
  try {
    const response = await axios.get(`${API_URL}/manga/mangas?sort=popularity`);
    return response.data.mangas;
  } catch (error) {
    console.error('Error fetching popular mangas:', error);
    throw error;
  }
};

export const getRecentMangas = async () => {
  try {
    const response = await axios.get(`${API_URL}/manga/mangas?sort=recent`);
    return response.data.mangas;
  } catch (error) {
    console.error('Error fetching recent mangas:', error);
    throw error;
  }
};

export const getMangaDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/manga/mangas/${id}`);
    return response.data.manga;
  } catch (error) {
    console.error('Error fetching manga details:', error);
    throw error;
  }
};

// src/services/MangApi.js
// Ajoutez cette fonction pour gérer les images
export const getMangaCoverUrl = async (mangaId) => {
  try {
    const response = await axios.get(`${API_URL}/manga/${mangaId}/aggregate`);
    const coverArt = response.data.data.relationships.find(rel => rel.type === 'cover_art');
    if (coverArt) {
      const coverResponse = await axios.get(`${API_URL}/cover/${coverArt.id}`);
      const fileName = coverResponse.data.data.attributes.fileName;
      return `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
    }
    return null;
  } catch (error) {
    console.error('Error fetching manga cover:', error);
    return null;
  }
};