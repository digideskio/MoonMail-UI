import axios from 'axios';
import storage from 'store';
import join from 'url-join';

const apiClient = axios.create();

apiClient.interceptors.request.use(config => {
  const settings = storage.get('settings') || {};
  if (!settings.token) {
    config.adapter = (resolve, reject) => reject('Please provide valid JWT token');
  }
  if (!settings.baseUrl) {
    config.adapter = (resolve, reject) => reject('Please provide api base url');
  }
  config.url = join(settings.baseUrl, config.url);
  config.headers['Authorization'] = `Bearer ${settings.token}`;
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

export default apiClient;
