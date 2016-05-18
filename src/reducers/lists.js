import {
  FETCH_LISTS
} from './../actions/types'

function listsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_LISTS:
      return action.payload;
  }
  return state;
}

export default listsReducer;
