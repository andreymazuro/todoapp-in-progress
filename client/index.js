import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';

import { Provider } from 'react-redux';
import createStore from './models/store'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { history } from './models/store'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
