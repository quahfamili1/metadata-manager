// src/services/AssetService.js
import axiosInstance from '../api/FastAPI';

// Fetch assets for a team
export const getTeamAssets = async (teamName) => {
  try {
    const API_TOKEN = sessionStorage.getItem('apiToken');
    if (!API_TOKEN) {
      console.error('API token is missing or not set.');
      return [];
    }

    // Use the axios instance with the correct endpoint and Authorization header
    const response = await axiosInstance.get(`/assets/teams/${teamName}`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching team assets:', error);
    throw error;
  }
};

// Update asset ownership in OpenMetadata
export const updateAssetOwner = async (assetId, teamName) => {
  try {
    const API_TOKEN = sessionStorage.getItem('apiToken');
    if (!API_TOKEN) {
      console.error('API token is missing or not set.');
      return { success: false };
    }

    const response = await axiosInstance.patch(
      `/assets/tables/${assetId}/owner`,
      { team: teamName }, // Payload specifying the team ownership
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json-patch+json',
        },
      }
    );

    if (response.status === 200) {
      console.log(`Asset ${assetId} ownership updated successfully.`);
      return { success: true };
    } else {
      console.error('Failed to update asset ownership.');
      return { success: false };
    }
  } catch (error) {
    console.error('Error updating asset ownership:', error);
    return { success: false };
  }
};
