import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import hashHistory from 'react-router/lib/hashHistory';
import withScroll from 'scroll-behavior';
import {syncHistoryWithStore} from 'react-router-redux';
import {loadSettings} from './actions';
import App from './components/App';
import Welcome from './components/Welcome';
import Campaign from './components/Campaign';
import Settings from './components/Settings';
import reducers from './reducers';
import {addInterceptors} from 'lib/api';

const appHistory = withScroll(hashHistory);
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
const history = syncHistoryWithStore(appHistory, store);

// Load initial settings
store.dispatch(loadSettings());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="settings" component={Settings} />
        <Route path="campaign" component={Campaign} />
        <IndexRoute component={Welcome} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
