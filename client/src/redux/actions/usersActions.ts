import axios from "axios";
import { Dispatch } from "react";
import { ActionTypes } from "./actionTypes";
import { User } from "../reducer/stateTypes";

export type Action = {
  type: ActionTypes;
  payload?: { success?: User[]; error?: string };
};

export const getAllUsers = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "ALL_USERS_REQUEST" });
  try {
    const response = await axios.get("/usersname");
    dispatch({
      type: "ALL_USERS_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    dispatch({
      type: "ALL_USERS_FAIL",
      payload: { error: (error as Error).message },
    });
  }
};
