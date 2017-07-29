import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import todosReducer from './todos';

export const history = createHistory()

const middleware = applyMiddleware(thunk, routerMiddleware(history));

export default (data = {}) => {
  const rootReducer = combineReducers({
    todos: todosReducer,
    router: routerReducer
  })

  return createStore(rootReducer, data, middleware)
}
