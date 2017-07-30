import TODOS from './action_types/todos';
import { defaultTodos } from './const'

const initialState = {
  currentTodos: [],
  todos: defaultTodos,
  currentTask: {},
  currentId: 7,
  loading: false,
  showDone: true,
  filter: ''
}

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODOS.FETCHING:
      return {
        ...state,
        loading: true,
      }

    case TODOS.FETCHING_RESOLVED:
      return {
        ...state,
        todos: action.todos,
        loading: false,
      }

    case TODOS.FETCHING_REJECTED:
      return {
        ...state,
        todos: [],
        loading: false,
      }

    case TODOS.SET_CURRENT_TODOS:
      return {
        ...state,
        currentTodos: action.currentTodos,
      }

    case TODOS.ADD_CATEGORY:
      return {
        ...state,
        todos: [action.categoryInfo, ...state.todos ],
        currentId: state.currentId + 1,
      }

    case TODOS.ADDING_NESTED_CATEGORY:
      return {
        ...state,
        todos: action.todos,
        currentId: state.currentId + 1,
      }

    case TODOS.SET_FILTER:
      return {
        ...state,
        showDone: action.showDone,
        filter: action.filter,
      }

    case TODOS.SET_CURRENT_TASK:
      return{
        ...state,
        currentTask: action.task
      }

    default:
      return state;
  }
}

export default todosReducer;
