import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';
import TaskEditor from './components/TaskEditor'

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
        <Route exact path="/" component={App} />
        <Route exact path="/category/:id" component={App} />
        <Route exact path="/category/:id/task/:id" component={TaskEditor} />
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('root'));
