import axios from 'axios';

const API_BASE_URL = 'https://api.assetsentry.com'; // Replace with your actual API base URL

export const fetchAssets = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/assets`);
        return response.data;
    } catch (error) {
        console.error('Error fetching assets:', error);
        throw error;
    }
};

export const createAsset = async (assetData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/assets`, assetData);
        return response.data;
    } catch (error) {
        console.error('Error creating asset:', error);
        throw error;
    }
};

export const updateAsset = async (assetId, assetData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/assets/${assetId}`, assetData);
        return response.data;
    } catch (error) {
        console.error('Error updating asset:', error);
        throw error;
    }
};

export const deleteAsset = async (assetId) => {
    try {
        await axios.delete(`${API_BASE_URL}/assets/${assetId}`);
    } catch (error) {
        console.error('Error deleting asset:', error);
        throw error;
    }
};