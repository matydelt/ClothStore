import axios from "axios";
import { Dispatch } from "react";
import { ActionTypes } from "./actionTypes";
import { User } from "../reducer/stateTypes";

export type Action = {
  type: ActionTypes;
  payload?: { success?: User; error?: string };
};

export const registerUser =
  (user: { email: string; password: string }) =>
  async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    try {
      const response = await axios.post("http://localhost:3001/auth/new", user);
      console.log(response);

      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: { success: response.data },
      });
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const signinUser = (user: any) => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "USER_SIGNIN_REQUEST" });
  try {
    const response = await axios.get("http://localhost:3001/auth", {
      params: { email: user.email, password: user.password },
    });
    console.log(response);

    dispatch({
      type: "USER_SIGNIN_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    dispatch({
      type: "USER_SIGNIN_FAIL",
      payload: { error: (error as Error).message },
    });
  }
};

export const logoutUser = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: "USER_LOGOUT" });
};
