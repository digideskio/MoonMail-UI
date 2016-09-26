import storage from 'store';
import * as types from './types';
import * as api from '../lib/api';
import {addMessage} from '../modules/messages/actions';

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
      const lists = await api.fetchLists({
        limit: 1000,
        fields: ['id', 'name', 'subscribedCount'].join(',')
      });
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

export const createCampaign = ({subject, body, listIds}) => {
  return async dispatch => {
    dispatch({
      type: types.CREATE_CAMPAIGN_REQUEST
    });
    try {
      const campaign = await api.createCampaign({
        name: subject,
        subject,
        body,
        listIds
      });
      dispatch({
        type: types.CREATE_CAMPAIGN_SUCCESS
      });
      return campaign.id;
    } catch (error) {
      dispatch({
        type: types.CREATE_CAMPAIGN_FAIL
      });
      dispatch(addMessage({
        text: error,
        style: 'error'
      }));
    }
  };
};

export const sendCampaign = (campaign) => {
  return async dispatch => {
    dispatch({
      type: types.SEND_CAMPAIGN_REQUEST
    });
    try {
      const campaignId = await dispatch(createCampaign(campaign));
      await api.sendCampaign(campaignId);
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