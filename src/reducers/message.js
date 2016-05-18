import {
  SHOW_MESSAGE,
  CLEAN_MESSAGE
} from './../actions/types'

function messageReducer(state = {}, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return action.payload;
    case CLEAN_MESSAGE:
      return {}
  }
  return state;
}

export default messageReducer;
