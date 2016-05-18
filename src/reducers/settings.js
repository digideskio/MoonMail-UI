import {
  SAVE_SETTINGS,
  LOAD_SETTINGS
} from './../actions/types'

function settingsReducer(state = {}, action) {
  switch (action.type) {
    case SAVE_SETTINGS:
      return action.payload;
    case LOAD_SETTINGS:
      return action.payload;
  }
  return state;
}

export default settingsReducer;
