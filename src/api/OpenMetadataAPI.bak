import axios from 'axios';

const API_BASE_URL = '/api/v1';

// Function to fetch both unowned searchIndexes and tables
export const fetchUnownedAssets = async () => {
  try {
    const API_TOKEN = sessionStorage.getItem('apiToken'); // Ensure token is retrieved properly

    if (!API_TOKEN) {
      console.error('API token is missing or not set.');
      return [];
    }

    const searchIndexesResponse = await axios.get(`${API_BASE_URL}/searchIndexes`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    const tablesResponse = await axios.get(`${API_BASE_URL}/tables`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    const unownedSearchIndexes = searchIndexesResponse.data.data.filter(item => !item.owners || item.owners.length === 0);
    const unownedTables = tablesResponse.data.data.filter(item => !item.owners || item.owners.length === 0);

    const searchIndexesAssets = unownedSearchIndexes.map(item => ({
      id: item.id,
      displayName: item.displayName || item.name,
      updatedAt: new Date(item.updatedAt).toLocaleString(),
      dataType: 'searchIndexes',
    }));

    const tablesAssets = unownedTables.map(item => ({
      id: item.id,
      displayName: item.displayName || item.name,
      updatedAt: new Date(item.updatedAt).toLocaleString(),
      dataType: 'tables',
    }));

    return [...searchIndexesAssets, ...tablesAssets];

  } catch (error) {
    console.error('Error fetching unowned assets:', error.message);
    return [];
  }
};

// Function to update the owner of an asset using JSON Patch (RFC 6902)
export const updateAssetOwner = async (assetId, user) => {
  try {
    const API_TOKEN = sessionStorage.getItem('apiToken');
    if (!API_TOKEN) {
      console.error('API token is missing or not set.');
      return false;
    }

    // JSON Patch payload
    const patchData = [
      {
        op: 'replace', // or 'add' depending on whether the field already exists
        path: '/data/owners', // Path to the owners field
        value: [
          {
            name: user.name,
            fullyQualifiedName: user.fullyQualifiedName
          }
        ]
      }
    ];

    const response = await axios.patch(
      `${API_BASE_URL}/tables/${assetId}`,
      patchData,
      {
        headers: {
          'Content-Type': 'application/json-patch+json', // Use the correct MIME type for JSON Patch
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error updating asset owner:', error.message);
    return false;
  }
};
