import axios from "axios";
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

const getTasksRequest = () => ({
  type: GET_TASKS_REQUEST,
});

const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks,
});

const getTasksFailure = (error) => ({
  type: GET_TASKS_FAILURE,
  payload: error,
});

export const getTasks = () => {
  return (dispatch) => {
    dispatch(getTasksRequest());
    axios
      .get(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/tasks`)
      .then((response) => {
        dispatch(getTasksSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getTasksFailure(error.message));
      });
  };
};

const addTaskRequest = () => ({
  type: ADD_TASK_REQUEST,
});

const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

const addTaskFailure = (error) => ({
  type: ADD_TASK_FAILURE,
  payload: error,
});

export const addTask = (task) => {
  return (dispatch) => {
    dispatch(addTaskRequest());
    axios
      .post("/tasks", task)
      .then((response) => {
        dispatch(addTaskSuccess(response.data));
      })
      .catch((error) => {
        dispatch(addTaskFailure(error.message));
      });
  };
};

const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST,
});

const updateTaskSuccess = (task) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: task,
});

const updateTaskFailure = (error) => ({
  type: UPDATE_TASK_FAILURE,
  payload: error,
});

export const updateTask = (id, task) => {
  return (dispatch) => {
    dispatch(updateTaskRequest());
    axios
      .patch(`/tasks/${id}`, task)
      .then((response) => {
        dispatch(updateTaskSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updateTaskFailure(error.message));
      });
  };
};

const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST,
});

const deleteTaskSuccess = (id) => ({
  type: DELETE_TASK_SUCCESS,
  payload: id,
});

const deleteTaskFailure = (error) => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});

export const deleteTask = (id) => {
  return (dispatch) => {
    dispatch(deleteTaskRequest());
    axios
      .delete(`/tasks/${id}`)
      .then(() => {
        dispatch(deleteTaskSuccess(id));
      })
      .catch((error) => {
        dispatch(deleteTaskFailure(error.message));
      });
  };
};
