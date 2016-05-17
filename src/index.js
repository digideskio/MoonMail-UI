import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { loadSettings } from './actions'


import App from './components/app';
import Welcome from './components/welcome';
import Campaign from './components/campaign';
import Settings from './components/settings';
import reducers from './reducers';

const store = createStore(reducers, {},
  window.devToolsExtension ? window.devToolsExtension() : undefined
);

store.dispatch(loadSettings());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="/settings" component={Settings}/>
        <Route path="/campaign" component={Campaign}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
