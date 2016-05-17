import localStorage from 'store';
import {
  SAVE_SETTINGS,
  LOAD_SETTINGS
} from './types'


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


