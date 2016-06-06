import * as types from './../actions/types';

function listsReducer(state = [], action) {
  switch (action.type) {
    case types.FETCH_LISTS:
      return action.payload;
    default:
      return state;
  }
}

export default listsReducer;
