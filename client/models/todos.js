import TODOS from './action_types/todos';
import { defaultTodos } from './const'

const initialState = {
  past: [],
  present: {
    currentTodos: [],
    todos: defaultTodos,
    currentTask: {},
    currentId: 7,
    showDone: true,
    filter: ''
  },
  future: []
}

const todosReducer = (state = initialState, action) => {
  switch (action.type) {

    case TODOS.FETCHING_RESOLVED:
      return {
        ...state,
        past: [...state.past, state.present],
        present: {
          ...state.present,
          todos: action.todos,
        }
      }

    case TODOS.SET_CURRENT_TODOS:
      return {
        ...state,
        present: {
          ...state.present,
          currentTodos: action.currentTodos,
        }
      }

    case TODOS.ADD_CATEGORY:
      return {
        ...state,
        past: [...state.past, state.present],
        present: {
          ...state.present,
          todos: [action.categoryInfo, ...state.present.todos ],
          currentId: state.present.currentId + 1,
        }
      }

    case TODOS.ADDING_NESTED_CATEGORY:
      return {
        ...state,
        past: [...state.past, state.present],
        present: {
          ...state.present,
          todos: action.todos,
          currentId: state.present.currentId + 1,
        }
      }

    case TODOS.SET_FILTER:
      return {
        ...state,
        present: {
          ...state.present,
          showDone: action.showDone,
          filter: action.filter,
        }
      }

    case TODOS.SET_CURRENT_TASK:
      return {
        ...state,
        present: {
          ...state.present,
          currentTask: action.task,
        }
      }

    case TODOS.PICKED_CATEGORY:
      return {
        ...state,
        present: {
          ...state.present,
          todos: action.todos,
        }
      }

    case TODOS.UNDO:
      return {
        ...action.info,
      }


    default:
      return state;
  }
}

export default todosReducer;
