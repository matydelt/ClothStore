import { Action } from "../actions/index";

interface UserState {
  loading?: boolean;
  userInfo?: any;
  error?: any;
}

const userRegisterReducer = (
  state: UserState = {},
  action: Action
): UserState => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { ...state, loading: true };
    case "USER_REGISTER_SUCCESS":
      return { ...state, loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { ...state, loading: false, error: action.payload };
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
      return { ...state, loading: false, userInfo: action.payload };
    case "USER_SIGNIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { userRegisterReducer, userSigninReducer };
