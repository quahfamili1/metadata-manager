// src/services/AssetService.js
import axiosInstance from '../api/FastAPI';

// Fetch assets for a team
export const getTeamAssets = async (teamName) => {
  try {
    const response = await axiosInstance.get(`/teams/${teamName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team assets:', error);
    throw error;
  }
};

// Fetch unowned assets
export const fetchUnownedAssets = async () => {
  try {
    const response = await axiosInstance.get('/unowned-assets');
    return response.data;
  } catch (error) {
    console.error("Error fetching unowned assets:", error);
    throw error;
  }
};

// Fetch a specific asset by ID and type
export const getAssetByIdAndType = async (assetId, assetType) => {
  try {
    const response = await axiosInstance.get(`/assets/${assetType}/${assetId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching asset with ID ${assetId} and type ${assetType}:`, error);
    throw error;
  }
};

// Update asset ownership
export const updateAssetOwner = async (assetId, assetType) => {
  try {
    const data = { owners: true }; // Placeholder to indicate ownership update
    const response = await axiosInstance.patch(`/assets/${assetType}/${assetId}`, data);
    return response.data.success;
  } catch (error) {
    console.error(`Error updating asset owner for asset ID ${assetId} and type ${assetType}:`, error.message);
    return false;
  }
};

// Generalized asset update function
export const updateAsset = async (type, assetId, data) => {
  try {
    const response = await axiosInstance.patch(`/assets/${type}/${assetId}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating asset with ID ${assetId} and type ${type}:`, error.message);
    throw error;
  }
};

// Create a temporary asset
export const createTemporaryAsset = async (data) => {
  try {
    const response = await axiosInstance.post('/temporary-assets', data); // Updated endpoint for temporary assets
    return response.data;
  } catch (error) {
    console.error("Error creating temporary asset:", error);
    throw error;
  }
};
