import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {routerReducer as routing} from 'react-router-redux';
import settings from './settings';
import message from './message';
import lists from './lists';
import isSending from './isSending';

const rootReducer = combineReducers({
  routing,
  form,
  settings,
  message,
  lists,
  isSending
});

export default rootReducer;
