// src/services/claimService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8005';

// Claim an asset
export const claimAsset = async (assetId, claimData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/claim_requests/assets/${assetId}/claim`, claimData);
    return response.data;
  } catch (error) {
    console.error('Error claiming asset:', error);
    throw error;
  }
};
