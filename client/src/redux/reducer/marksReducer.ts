import type { Reducer } from "redux";
import type { Action } from "../actions/marksActions";

export interface AllMarksState {
  loading: boolean;
  marks?: Array<any>;
  error?: string;
}

const allMarksReducer: Reducer<AllMarksState, Action> = (
  state = { loading: false },
  action
) => {
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
