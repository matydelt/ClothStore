import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./actionTypes";
import { User } from "../reducer/stateTypes";

export type Action = {
  type: ActionTypes;
  payload?: { success?: User[]; error?: string };
};

export const getallMarks = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "ALL_MARKS_REQUEST" });
  try {
    const response = await axios.get("/publications/marks");
    dispatch({
      type: "ALL_MARKS_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    dispatch({
      type: "ALL_MARKS_FAIL",
      payload: { error: (error as Error).message },
    });
  }
};
