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
    config.adapter = (resolve, reject) => reject('Please provide all required settings');
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

export const sendCampaign = (canonicalMessage) =>
  apiClient.post(`campaigns/test`, canonicalMessage);

export const fetchLists = (params = {}) =>
  apiClient.get('lists', {params});

export default apiClient;
