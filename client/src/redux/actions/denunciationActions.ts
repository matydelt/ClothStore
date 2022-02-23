import axios from "axios";
import { AppThunk } from "../../hooks/reduxHooks";
import { ActionTypes } from "./actionTypes";
import { DenunciationData } from "../reducer/denunciationReducers";

export type Action = {
  type: ActionTypes;
  payload?: { success?: DenunciationData[]; error?: string };
};
interface postDenunciation {
  message: string;
  authorId: string;
  publicationId: string;
}

export const getDenunciations = (): AppThunk => async (dispatch) => {
  dispatch({ type: "DENUNCIATION_GET_REQUEST" });
  try {
    const response = await axios.get("/denunciation/get");
    return dispatch({
      type: "DENUNCIATION_GET_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    return dispatch({
      type: "DENUNCIATION_GET_FAIL",
      payload: { error: (error as Error).message },
    });
  }
};

export const putDenunciations =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "DENUNCIATION_PUT_REQUEST" });
    try {
      await axios.put("/denunciation/put", { denunciationId: id });
      return dispatch({
        type: "DENUNCIATION_PUT_SUCCESS",
      });
    } catch (error) {
      return dispatch({
        type: "DENUNCIATION_PUT_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };
export const deleteDenunciations =
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "DENUNCIATION_DELETE_REQUEST" });
    try {
      await axios.delete("/denunciation/delete/" + id);
      return dispatch({
        type: "DENUNCIATION_DELETE_SUCCESS",
      });
    } catch (error) {
      return dispatch({
        type: "DENUNCIATION_DELETE_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };
export const postDenunciations =
  (denunciation: postDenunciation): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "DENUNCIATION_DELETE_REQUEST" });
    try {
      await axios.post("/denunciation/post", { denunciation });
      return dispatch({
        type: "DENUNCIATION_DELETE_SUCCESS",
      });
    } catch (error) {
      return dispatch({
        type: "DENUNCIATION_DELETE_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };
