import axios from "axios";
import { AppThunk } from "../../hooks/reduxHooks";
import { ActionTypes } from "./actionTypes";
import { User } from "../reducer/stateTypes";

export type Action = {
  type: ActionTypes;
  payload?: { success?: User[]; error?: string };
};

export const getAllUsers = (): AppThunk => async (dispatch) => {
  dispatch({ type: "ALL_USERS_REQUEST" });
  try {
    const response = await axios.get("/usersname");
    return dispatch({
      type: "ALL_USERS_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    return dispatch({
      type: "ALL_USERS_FAIL",
      payload: { error: (error as Error).message },
    });
  }
};
