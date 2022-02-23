import axios from "axios";
import { AppThunk } from "../../hooks/reduxHooks";
import { ActionTypes } from "./actionTypes";
import { User } from "../reducer/stateTypes";

export type Action = {
  type: ActionTypes;
  payload?: { success?: User[]; error?: string };
};

export const getallMarks = (): AppThunk => async (dispatch) => {
  dispatch({ type: "ALL_MARKS_REQUEST" });
  try {
    const response = await axios.get("/publications/marks");
    return dispatch({
      type: "ALL_MARKS_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    return dispatch({
      type: "ALL_MARKS_FAIL",
      payload: { error: (error as Error).message },
    });
  }
};
