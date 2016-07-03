import * as types from 'actions/types';

function isSendingReducer(state = false, action) {
  switch (action.type) {
    case types.SEND_CAMPAIGN_REQUEST:
      return true;
    case types.SEND_CAMPAIGN_SUCCESS:
    case types.SEND_CAMPAIGN_FAIL:
      return false;
    default:
      return state;
  }
}

export default isSendingReducer;
