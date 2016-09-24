import {createSelector} from 'reselect';

const messagesSelector = state => state.messages;
export const getMessages = createSelector(
  messagesSelector,
  messages => messages.ids.map(id => messages.byId[id])
);
