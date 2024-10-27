// src/api/fastapi.js
import axios from 'axios';

// Set up the base URL for the FastAPI server
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8005';

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Fetch user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

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
