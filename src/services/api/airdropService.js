import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.plankton-defi.com/airdrop';

export const verifyTaskCompletion = async (taskId, address, proof) => {
  try {
    const response = await axios.post(`${API_URL}/verify`, {
      taskId,
      address,
      proof
    });
    return response.data.verified;
  } catch (error) {
    console.error('Error verifying task:', error);
    return false;
  }
};

export const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/leaderboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

export const claimAirdropRewards = async (address, signature) => {
  try {
    const response = await axios.post(`${API_URL}/claim`, {
      address,
      signature
    });
    return response.data.success;
  } catch (error) {
    console.error('Error claiming airdrop:', error);
    return false;
  }
};