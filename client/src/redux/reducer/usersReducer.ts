import type { Reducer } from "redux";
import type { Action } from "../actions/usersActions";
// import { User } from "./stateTypes";

export interface AllUsersState {
  loading: boolean;
  users?: Array<any>;
  error?: string;
}

const allUsersReducer: Reducer<AllUsersState, Action> = (
  state = { loading: false },
  action
) => {
  switch (action.type) {
    case "ALL_USERS_REQUEST":
      return { ...state, loading: true };
    case "ALL_USERS_SUCCESS":
      return { ...state, loading: false, users: action.payload?.success };
    case "ALL_USERS_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export { allUsersReducer };
