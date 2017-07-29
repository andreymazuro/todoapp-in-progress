import TODOS from './action_types/todos';

const initialState = {
  currentTodos: [],
  todos: [],
  currentId: 7,
  loading: false,
  showDone: true,
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
        showDone: !state.showDone
      }

    default:
      return state;
  }
}

export default todosReducer;
