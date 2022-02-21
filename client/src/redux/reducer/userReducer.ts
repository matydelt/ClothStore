import type { Reducer } from "redux";
import type { Action } from "../actions/userActions";
import type { User } from "./stateTypes";

export interface UserState {
  loading?: boolean;
  userInfo?: User;
  users?: any;
  error?: string;
}

const userRegisterReducer: Reducer<UserState, Action> = (
  state = {},
  action
) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { ...state, loading: true };
    case "USER_REGISTER_SUCCESS":
      return { ...state, loading: false, userInfo: action.payload?.success };
    case "USER_REGISTER_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

const userSigninReducer: Reducer<UserState, Action> = (state = {}, action) => {
  switch (action.type) {
    case "USER_SIGNIN_REQUEST":
      return { ...state, loading: true };
    case "USER_SIGNIN_SUCCESS":
      return { ...state, loading: false, userInfo: action.payload?.success };
    case "USER_SIGNIN_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

const getUsersReducer: Reducer<UserState, Action> = (state = {}, action) => {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return { ...state, loading: true };
    case "GET_USERS_SUCCESS":
      return { ...state, loading: false, users: action.payload?.success };
    case "GET_USERS_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    case "BANN_CONTROL":
      return state;
    case "SET_EMPLOYEE":
      return state;
    case "SET_EMPLOYEE_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export { userRegisterReducer, userSigninReducer, getUsersReducer };
