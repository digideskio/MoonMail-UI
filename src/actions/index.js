import storage from 'store';
import cuid from 'cuid';
import * as types from './types';
import apiClient from 'lib/api';

export const saveSettings = (settings) => {
  storage.set('settings', settings);
  return {
    type: types.SAVE_SETTINGS,
    settings
  };
};

export const loadSettings = () => {
  const settings = storage.get('settings') || {};
  return {
    type: types.LOAD_SETTINGS,
    settings
  };
};

export const showMessage = ({text, style, delay = 3000}) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(cleanMessage());
    }, delay);
    dispatch({
      type: types.SHOW_MESSAGE,
      message: {text, style}
    });
  };
};

export const cleanMessage = () => ({
  type: types.CLEAN_MESSAGE
});

export const fetchLists = () => {
  return async dispatch => {
    try {
      const lists = await apiClient.get('/lists');
      dispatch({
        type: types.FETCH_LISTS,
        items: lists.items
      });
    } catch (error) {
      dispatch(showMessage({
        text: error,
        style: 'error'
      }));
    }
  };
};

export const sendCampaign = ({subject, body, listIds}) => {
  const data = {
    campaign: {id: cuid(), subject, body, listIds}
  };
  return async dispatch => {
    dispatch({
      type: types.SEND_CAMPAIGN_REQUEST
    });
    try {
      await apiClient.post('/campaigns/send', data);
      dispatch({
        type: types.SEND_CAMPAIGN_SUCCESS
      });
      dispatch(showMessage({
        text: 'Campaign have been sent!',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.SEND_CAMPAIGN_FAIL
      });
      dispatch(showMessage({
        text: error,
        style: 'error'
      }));
    }
  };
};
