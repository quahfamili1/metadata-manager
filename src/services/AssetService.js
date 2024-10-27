// src/services/AssetService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8005';

// Fetch asset by ID
export const getAssetById = async (assetId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/assets/${assetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching asset:', error);
    throw error;
  }
};

// Update asset
export const updateAsset = async (assetId, assetData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/assets/${assetId}`, assetData);
    return response.data;
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

// Fetch team-owned assets from OpenMetadata API
export const getTeamAssets = async (teamName) => {
  try {
    const API_TOKEN = sessionStorage.getItem('apiToken');
    if (!API_TOKEN) {
      console.error('API token is missing or not set.');
      return [];
    }

    const response = await axios.get(`${API_BASE_URL}/assets/team/${teamName}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching team assets:', error);
    throw error;
  }
};
