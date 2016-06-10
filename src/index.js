import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import withScroll from 'scroll-behavior';
import {createHashHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';
import {loadSettings, cleanMessage} from './actions';
import App from './components/app';
import Welcome from './components/welcome';
import Campaign from './components/campaign';
import Settings from './components/settings';
import reducers from './reducers';

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
const history = syncHistoryWithStore(withScroll(appHistory), store);
store.dispatch(loadSettings());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} onUpdate={() => store.dispatch(cleanMessage())}>
      <Route path="/" component={App}>
        <Route path="settings" component={Settings} />
        <Route path="campaign" component={Campaign} />
        <IndexRoute component={Welcome} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container')
);
