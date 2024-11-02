// src/services/claimService.js
import axiosInstance from '../api/FastAPI';

// Claim an asset
export const claimAsset = async (assetId, claimData) => {
  try {
    const API_TOKEN = sessionStorage.getItem('apiToken');
    if (!API_TOKEN) {
      console.error('API token is missing or not set.');
      return null;
    }

    // Use axiosInstance with dynamic Authorization header
    const response = await axiosInstance.post(`/claim_requests/assets/${assetId}/claim`, claimData, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error claiming asset:', error);
    throw error;
  }
};
