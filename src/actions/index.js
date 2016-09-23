import storage from 'store';
import cuid from 'cuid';
import * as types from './types';
import apiClient from 'lib/api';
import {addMessage} from 'modules/messages/actions';

export const saveSettings = (settings) => {
  storage.set('settings', settings);
  return dispatch => {
    dispatch({
      type: types.SAVE_SETTINGS,
      settings
    });
    dispatch(addMessage({
      text: 'Settings have been saved to localStorage',
      style: 'success'
    }));
  };
};

export const loadSettings = () => {
  const settings = storage.get('settings') || {};
  return {
    type: types.LOAD_SETTINGS,
    settings
  };
};

export const fetchLists = () => {
  return async dispatch => {
    try {
      const lists = await apiClient.get('/lists');
      dispatch({
        type: types.FETCH_LISTS,
        items: lists.items
      });
    } catch (error) {
      dispatch(addMessage({
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
      dispatch(addMessage({
        text: 'Campaign have been sent!',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.SEND_CAMPAIGN_FAIL
      });
      dispatch(addMessage({
        text: error,
        style: 'error'
      }));
    }
  };
};