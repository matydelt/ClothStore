import axios from "axios";
import { Dispatch } from "react";
import { ActionTypes } from "./actionTypes";
import { Publication } from "../reducer/stateTypes";

export type Action = {
  type: ActionTypes;
  payload?: { success?: Publication[]; error?: string };
};

export const getPublications = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "PUBLICATION_LIST_REQUEST" });
  try {
    const response = await axios.get("/publications");
    dispatch({
      type: "PUBLICATION_LIST_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    dispatch({
      type: "PUBLICATION_LIST_FAIL",
      payload: { error: (error as Error).message },
    });
  }
};

export const postPublications =
  (publication: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "PUBLICATION_SAVE_REQUEST" });
    try {
      await axios.post("/publications/new", publication);
      dispatch({ type: "PUBLICATION_SAVE_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "PUBLICATION_SAVE_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };
