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

export const getMangaDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/manga/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting manga details:', error);
    throw error;
  }
};

export const getPopularMangas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/manga`, {
      params: {
        order: { followedCount: 'desc' }, // Classement par popularité
        limit: 20,
        includes: ['cover_art']
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular mangas:', error);
    throw error;
  }
};

export const getRecentMangas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/manga`, {
      params: {
        order: { latestUploadedChapter: 'desc' }, // Tri par dernier chapitre ajouté
        limit: 20,
        includes: ['cover_art']
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent mangas:', error);
    throw error;
  }
};
// Récupérer le dernier chapitre (ou tome) d'un manga
export const getLastChapterForManga = async (mangaId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/manga/${mangaId}/chapters`, {
      params: {
        order: { chapter: 'desc' }, // Trier par le dernier chapitre
        limit: 1 // Ne récupérer que le dernier chapitre
      }
    });
    return response.data.data[0]; // Retourne le dernier chapitre
  } catch (error) {
    console.error("Error fetching last chapter:", error);
    throw error;
  }
};