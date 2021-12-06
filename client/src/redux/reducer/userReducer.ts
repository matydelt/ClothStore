import { Action } from "../actions/userActions";
import { User } from "./stateTypes";

export interface UserState {
  loading?: boolean;
  userInfo?: User;
  users?: any;
  error?: string;
}

const userRegisterReducer = (
  state: UserState = {},
  action: Action
): UserState => {
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

const userSigninReducer = (
  state: UserState = {},
  action: Action
): UserState => {
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

const getUSersReducer = (
  state: UserState = {},
  action: Action
): UserState => {
  switch (action.type) {
    case "GET_USERS_REQUEST":
      return { ...state, loading: true };
    case "GET_USERS_SUCCESS":
      return { ...state, loading: false, users: action.payload?.success };
    case "GET_USERS_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    case "BANN_CONTROL":
      return state
    case "SET_EMPLOYEE":
      return state
    case "SET_EMPLOYEE_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export { userRegisterReducer, userSigninReducer, getUSersReducer };
