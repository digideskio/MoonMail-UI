import storage from 'store';
import axios from 'axios';
import cuid from 'cuid';
import * as types from './types';

export const saveSettings = (settings) => {
  storage.set('settings', settings);
  return {
    type: types.SAVE_SETTINGS,
    payload: settings
  };
};

export const loadSettings = () => {
  const settings = storage.get('settings') || {};
  return {
    type: types.LOAD_SETTINGS,
    payload: settings
  };
};

export const showMessage = ({text, style, delay = 3000}) => {
  return function(dispatch) {
    setTimeout(() => {
      dispatch(cleanMessage());
    }, delay);
    dispatch({
      type: types.SHOW_MESSAGE,
      payload: {text, style}
    });
  };
};

export const cleanMessage = () => ({
  type: types.CLEAN_MESSAGE
});

function noSettingsError(dispatch) {
  const error = 'Please provide all settings before sending a campaign';
  dispatch(showMessage({
    text: error,
    style: 'error'
  }));
  return Promise.reject({error});
}

export const fetchLists = () => {
  const {baseUrl} = storage.get('settings') || {};
  return function(dispatch) {
    if (!baseUrl) {
      return noSettingsError(dispatch);
    }
    return axios.get(`${baseUrl}/lists`)
      .then((res) => {
        dispatch({
          type: types.FETCH_LISTS,
          payload: res.data.items
        });
      })
      .catch((err) => {
        dispatch(showMessage({
          text: err,
          style: 'error'
        }));
      });
  };
};

export const sendCampaign = ({subject, body, listIds}) => {
  const {baseUrl, apiKey, apiSecret, region, emailAddress} = storage.get('settings') || {};
  const data = {
    campaign: {id: cuid(), subject, body, listIds, precompiled: false},
    sender: {apiKey, apiSecret, region, emailAddress}
  };
  return function(dispatch) {
    if (!baseUrl) {
      return noSettingsError(dispatch);
    }
    return axios.post(`${baseUrl}/campaigns/test`, data)
      .then(() => {
        dispatch(showMessage({
          text: 'Campaign have been sent!',
          style: 'success'
        }));
      })
      .catch((err) => {
        dispatch(showMessage({
          text: err,
          style: 'error'
        }));
      });
  };
};
