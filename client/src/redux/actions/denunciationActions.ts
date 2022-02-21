import axios from "axios";
import { ActionTypes } from "./actionTypes";
import { DenunciationData } from "../reducer/denunciationReducers";
import { Dispatch } from "redux";

export type Action = {
  type: ActionTypes;
  payload?: { success?: DenunciationData[]; error?: string };
};
interface postDenunciation {
  message: string;
  authorId: string;
  publicationId: string;
}

export const getDenunciations = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: "DENUNCIATION_GET_REQUEST" });
  try {
    const response = await axios.get("/denunciation/get");
    dispatch({
      type: "DENUNCIATION_GET_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    dispatch({
      type: "DENUNCIATION_GET_FAIL",
      payload: { error: (error as Error).message },
    });
  }
};

export const putDenunciations =
  (id: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "DENUNCIATION_PUT_REQUEST" });
    try {
      await axios.put("/denunciation/put", { denunciationId: id });
      dispatch({
        type: "DENUNCIATION_PUT_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "DENUNCIATION_PUT_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };
export const deleteDenunciations =
  (id: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "DENUNCIATION_DELETE_REQUEST" });
    try {
      await axios.delete("/denunciation/delete/" + id);
      dispatch({
        type: "DENUNCIATION_DELETE_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "DENUNCIATION_DELETE_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };
export const postDenunciations =
  (denunciation: postDenunciation) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "DENUNCIATION_DELETE_REQUEST" });
    try {
      await axios.post("/denunciation/post", { denunciation });
      dispatch({
        type: "DENUNCIATION_DELETE_SUCCESS",
      });
    } catch (error) {
      dispatch({
        type: "DENUNCIATION_DELETE_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };
