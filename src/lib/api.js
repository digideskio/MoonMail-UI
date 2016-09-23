import axios from 'axios';
import storage from 'store';
import join from 'url-join';

const apiClient = axios.create();

apiClient.interceptors.request.use(config => {
  const settings = storage.get('settings') || {};
  if (settings.token) {
    config.headers['Authorization'] = `Bearer ${settings.token}`;
  }
  if (!settings.baseUrl) {
    config.adapter = (resolve, reject) => reject('Please provide api base url');
  }
  config.url = join(settings.baseUrl, config.url);
  return config;
}, error => {
  return Promise.reject(error.data);
});

apiClient.interceptors.response.use(response => {
  return response.data;
}, error => {
  const errorMessage = (error.data && error.data.message) || error;
  return Promise.reject(errorMessage);
});

export const createCampaign = (campaign) =>
  apiClient.post('campaigns', campaign);

export const sendCampaign = (campaignId, campaign) =>
  apiClient.post(`campaigns/${campaignId}/send`, campaign);

export const fetchLists = (params = {}) =>
  apiClient.get('lists', {params});

export default apiClient;
