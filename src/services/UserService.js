// src/services/UserService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8005';

// Login user and receive JWT token
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
            username: username,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const { access_token, token_type, user } = response.data;

        // Store the token in local storage for future API requests
        localStorage.setItem('access_token', `${token_type} ${access_token}`);

        // Store the access token and teamName in session storage
        sessionStorage.setItem('apiToken', access_token);
        if (user && user.team) {
            sessionStorage.setItem('teamName', user.team);
        }

        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

// Register a new user
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
