import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.plankton-defi.com/comics';

export const fetchFeaturedComics = async () => {
  try {
    const response = await axios.get(`${API_URL}/featured`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured comics:', error);
    return [];
  }
};

export const fetchComicDetails = async (comicId) => {
  try {
    const response = await axios.get(`${API_URL}/${comicId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comic details:', error);
    return null;
  }
};

export const uploadComicMetadata = async (metadata, authToken) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, metadata, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading comic metadata:', error);
    throw error;
  }
};