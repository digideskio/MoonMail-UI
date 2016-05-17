import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import settings from './settings'

const rootReducer = combineReducers({
  form,
  settings
});

export default rootReducer;
