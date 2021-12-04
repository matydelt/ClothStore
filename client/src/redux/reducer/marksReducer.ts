import { Action } from "../actions/marksActions";
import { User } from "./stateTypes";

export interface AllMarksState {
  loading: boolean;
  marks?: Array<any>;
  error?: string;
}

const allMarksReducer = (
  state: AllMarksState = { loading: false },
  action: Action
): AllMarksState => {
  switch (action.type) {
    case "ALL_MARKS_REQUEST":
      return { ...state, loading: true };
    case "ALL_MARKS_SUCCESS":
      return { ...state, loading: false, marks: action.payload?.success };
    case "ALL_MARKS_FAIL":
      return { ...state, loading: false, error: action.payload?.error };
    default:
      return state;
  }
};

export { allMarksReducer };
