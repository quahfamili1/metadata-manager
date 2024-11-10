// src/services/MetadataService.js
import axiosInstance from '../api/FastAPI';

const MetadataService = {
  // Fetch metadata suggestions by assetId
  async getMetadataSuggestions(assetId) {
    try {
      const API_TOKEN = sessionStorage.getItem('apiToken');
      if (!API_TOKEN) {
        console.error('API token is missing or not set.');
        return null;
      }

      const response = await axiosInstance.get(`/metadata/suggestions/${assetId}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching metadata suggestions:', error);
      throw error;
    }
  },

  // Regenerate metadata
  async regenerateMetadata(assetId, displayName, attributes) {
    try {
      const API_TOKEN = sessionStorage.getItem('apiToken');
      if (!API_TOKEN) {
        console.error('API token is missing or not set.');
        return null;
      }

      const response = await axiosInstance.post(
        `/metadata/regenerate`,
        { assetId, displayName, attributes },
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error regenerating metadata:', error);
      throw error;
    }
  },

  // Update metadata by assetId
  async updateMetadata(assetId, metadata) {
    try {
      const API_TOKEN = sessionStorage.getItem('apiToken');
      if (!API_TOKEN) {
        console.error('API token is missing or not set.');
        return null;
      }

      const response = await axiosInstance.patch(
        `/metadata/update/${assetId}`,
        metadata,
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating metadata:', error);
      throw error;
    }
  },
};

export default MetadataService;
