import * as types from './../actions/types';

function messageReducer(state = {}, action) {
  switch (action.type) {
    case types.SHOW_MESSAGE:
      return action.payload;
    case types.CLEAN_MESSAGE:
      return {};
    default:
      return state;
  }
}

export default messageReducer;
