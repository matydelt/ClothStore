import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { ActionTypes } from "./actionTypes";

export type Action = {
  type: ActionTypes;
  payload?: AxiosResponse<any, any> | string;
};

export const getPublications = () => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await axios.get("http://localhost:3001/publications");
    dispatch({ type: "GET_PUBLICATIONS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const postPublications =
  (publication: any) => async (dispatch: Dispatch<Action>) => {
    try {
      await axios.post("http://localhost:3001/publications/new", publication);
      dispatch({ type: "POST_PUBLICATION" });
    } catch (error) {
      console.error(error);
    }
  };

export const registerUser = (user) => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const response = await axios.get("http://localhost:3001/auth", user);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: (error as Error).message });
  }
};

export const signinUser = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "USER_SIGNIN_REQUEST" });
  try {
    const response = await axios.post("http://localhost:3001/auth/new");
    dispatch({ type: "USER_SIGNIN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "USER_SIGNIN_FAIL", payload: (error as Error).message });
  }
};
