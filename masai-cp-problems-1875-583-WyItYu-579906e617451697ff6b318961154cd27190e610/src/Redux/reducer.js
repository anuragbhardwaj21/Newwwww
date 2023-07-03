import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
} from "./actionTypes";

const initialState = {
  tasks: [],
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        isError: false,
      };
    case GET_TASKS_FAILURE:
      return {
        ...state,
        tasks: [],
        isLoading: false,
        isError: true,
      };
    case ADD_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        isLoading: false,
        isError: false,
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case UPDATE_TASK_SUCCESS:
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
      return {
        ...state,
        tasks: updatedTasks,
        isLoading: false,
        isError: false,
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case DELETE_TASK_SUCCESS:
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: filteredTasks,
        isLoading: false,
        isError: false,
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default reducer;
