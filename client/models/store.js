import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import todosReducer from './todos';

const middleware = applyMiddleware(thunk);

export default (data = {}) => {
  const rootReducer = combineReducers({
    todos: todosReducer,
  })

  return createStore(rootReducer, data, middleware)
}
