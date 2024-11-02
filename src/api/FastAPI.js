// src/api/fastAPI.js
import axios from 'axios';

// Set up the base URL for the FastAPI server
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8005/api/v1';

// Create a pre-configured axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});


// Attach token from session storage (if applicable)
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('apiToken'); // Adjust 'apiToken' to match your session storage key
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Fetch user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Fetch asset by ID and type
export const getAssetByIdAndType = async (assetId, assetType) => {
  try {
    const response = await axiosInstance.get(`/assets/${assetId}/type/${assetType}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching asset with ID ${assetId} and type ${assetType}:`, error);
    throw error;
  }
};

// Update asset
export const updateAsset = async (assetId, assetData) => {
  try {
    const response = await axiosInstance.put(`/assets/${assetId}`, assetData);
    return response.data;
  } catch (error) {
    console.error('Error updating asset:', error);
    throw error;
  }
};

// Claim an asset using the backend API, now with dynamic asset type
export const claimAsset = async (assetId, assetType) => {
  try {
    const response = await axiosInstance.patch(`/assets/${assetId}/type/${assetType}/owner`);
    return response.data.success;
  } catch (error) {
    console.error(`Error claiming asset with ID ${assetId} and type ${assetType}:`, error.message);
    return false;
  }
};

// Fetch unowned assets (all types)
export const fetchUnownedAssets = async () => {
  try {
    const response = await axiosInstance.get('/assets/unowned');
    return response.data;
  } catch (error) {
    console.error("Error fetching unowned assets:", error);
    throw error;
  }
};

// Update asset owner with dynamic asset type
export const updateAssetOwner = async (assetId, assetType) => {
  try {
    const response = await axiosInstance.patch(`/assets/${assetId}/type/${assetType}/owner`);
    return response.data.success;
  } catch (error) {
    console.error(`Error updating asset owner for asset ID ${assetId} and type ${assetType}:`, error.message);
    return false;
  }
};

export const createTemporaryAsset = async (data) => {
  try {
    const response = await axiosInstance.post('/assets/temporary', data);
    return response.data;
  } catch (error) {
    console.error("Error creating temporary asset:", error);
    throw error;
  }
};

export default axiosInstance;
