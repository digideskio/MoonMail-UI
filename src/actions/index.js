import localStorage from 'store';
import axios from 'axios';
import cuid from 'cuid';
import { SAVE_SETTINGS, LOAD_SETTINGS, SHOW_MESSAGE, CLEAN_MESSAGE, FETCH_LISTS } from './types';


export function saveSettings(settings) {
  localStorage.set('settings', settings);
  return {
    type: SAVE_SETTINGS,
    payload: settings
  }
}

export function loadSettings() {
  const settings = localStorage.get('settings');
  return {
    type: LOAD_SETTINGS,
    payload: settings
  }
}

export function showMessage({text, style, delay = 3000}) {
  return function (dispatch) {
    setTimeout(() => {
      dispatch(cleanMessage())
    }, delay);
    dispatch({
      type: SHOW_MESSAGE,
      payload: {text, style}
    })
  }
}

export function cleanMessage() {
  return {
    type: CLEAN_MESSAGE
  }
}

export function fetchLists() {
  const {baseUrl} = localStorage.get('settings');
  return function (dispatch) {
    if (!baseUrl) {
      dispatch(showMessage({
        text: 'Please provide all settings before sending a campaign',
        style: 'error'
      }));
      return;
    }
    axios.get(`${baseUrl}/lists`)
      .then((res) => {
        dispatch({
          type: FETCH_LISTS,
          payload: res.data.items
        })
      })
      .catch((err) => {
        dispatch(showMessage({
          text: err,
          style: 'error'
        }))
      })
  }
}

export function sendCampaign({subject, body, listIds}) {
  const {baseUrl, apiKey, apiSecret, region, emailAddress} = localStorage.get('settings');
  const data = {
    campaign: {
      id: cuid(),
      subject,
      body,
      listIds,
      precompiled: false
    },
    sender: {
      apiKey,
      apiSecret,
      region,
      emailAddress
    }
  };
  return function (dispatch) {
    if (!baseUrl) {
      dispatch(showMessage({
        text: 'Please provide all settings before sending a campaign',
        style: 'error'
      }));
      return;
    }
    axios.post(`${baseUrl}/campaigns/test`, data)
      .then((res) => {
        dispatch(showMessage({
          text: 'Campaign have been sent!',
          style: 'success'
        }))
      })
      .catch((err) => {
        dispatch(showMessage({
          text: err,
          style: 'error'
        }))
      })
  }
}
