import * as types from './../actions/types';

function settingsReducer(state = {}, action) {
  switch (action.type) {
    case types.SAVE_SETTINGS:
      return action.payload;
    case types.LOAD_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}

export default settingsReducer;
