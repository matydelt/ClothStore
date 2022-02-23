import axios from "axios";
import { AppThunk } from "../../hooks/reduxHooks";
import { ActionTypes } from "./actionTypes";
import { Publication } from "../reducer/stateTypes";
import { AnyAction } from "redux";

export type Action = {
  type: ActionTypes;
  payload?: { success?: Publication[]; error?: string };
  cartPayload?: any;
  countPayload?: number;
};

export const putPublications =
  ({
    name = "",
    order = "",
    page = "1",
    mark = "",
    category = "",
    gender = "",
    price = "",
    author = "",
  }: {
    name?: string;
    order?: string;
    page?: string;
    mark?: string;
    category?: string;
    gender?: string;
    price?: string;
    author?: string;
  }): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "PUBLICATION_LIST_REQUEST" });
    try {
      let filter = { mark, category, gender, price, author };
      const response = await axios.put(
        `/publications?order=${order}&name=${name}&page=${page}`,
        { mark, category, gender, price, author }
      );
      return dispatch({
        type: "PUBLICATION_LIST_SUCCESS",
        payload: { success: response.data.result },
        cartPayload: filter,
        countPayload: response.data.count,
      });
    } catch (error) {
      return dispatch({
        type: "PUBLICATION_LIST_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const getNamePublications =
  (name: string): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "PUBLICATION_NAME_REQUEST" });
    try {
      const response = await axios.get("/publications?name=" + name);
      return dispatch({
        type: "PUBLICATION_NAME_SUCCESS",
        payload: { success: response.data },
      });
    } catch (error) {
      return dispatch({
        type: "PUBLICATION_NAME_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const postPublications =
  (publication: any): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "PUBLICATION_SAVE_REQUEST" });
    try {
      await axios.post("/publications/new", publication);
      return dispatch({ type: "PUBLICATION_SAVE_SUCCESS" });
    } catch (error) {
      return dispatch({
        type: "PUBLICATION_SAVE_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const cartLength = (): AppThunk => async (dispatch) => {
  let cart = localStorage.getItem("cart");
  if (typeof cart === "string") cart = JSON.parse(cart);
  const length = cart?.length;
  return dispatch({
    type: "CART_LENGTH",
    cartPayload: length,
  });
};

export const activatePublication =
  (id: string, flag: boolean): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "ACTIVATE_PUBLICATION_REQUEST" });
    try {
      await axios.put("/publications/state", { id: id, flag });
      return dispatch({ type: "ACTIVATE_PUBLICATION_SUCCESS" });
    } catch (e) {
      console.log(e);
      return dispatch({ type: "ACTIVATE_PUBLICATION_FAIL" });
    }
  };

export const publicationMessage =
  (id: string, message: string): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "MESSAGE_PUBLICATION_REQUEST" });
    try {
      await axios.post("/publication/message", { id, message });
      alert("mensaje enviado");
      return dispatch({ type: "MESSAGE_PUBLICATION_SUCCESS" });
    } catch (e) {
      console.log(e);
      return dispatch({ type: "MESSAGE_PUBLICATION_FAIL" });
    }
  };
export const getAllPublications = (): AppThunk => async (dispatch) => {
  dispatch({ type: "GET_PUBLICATIONS_REQUEST" });
  try {
    const response = await axios.get("/publications/all");
    return dispatch({
      type: "GET_PUBLICATIONS_SUCCESS",
      payload: { success: response.data },
    });
  } catch (e) {
    console.log(e);
    return dispatch({ type: "GET_PUBLICATIONS_FAIL" });
  }
};
