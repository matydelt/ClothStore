import axios from "axios";
import { AppThunk } from "../../hooks/reduxHooks";
import { ActionTypes } from "./actionTypes";
import { Carrito } from "../reducer/stateTypes";

export type Action = {
  type: ActionTypes;
  payload: { success?: Carrito[]; error?: string };
};

export const getCarrito =
  (email: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.get(`/carrito/${email}`);
      return dispatch({
        type: "CARRITO_CHECKOUT_GET",
        payload: { success: response.data },
      });
    } catch (error) {
      return dispatch({
        type: "CARRITO_CHECKOUT_GET_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const putCarrito =
  (email: string | null | undefined, id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.put(`/carrito/${email}/${id}`);
      return dispatch({
        type: "CARRITO_CHECKOUT_GET",
        payload: { success: response.data },
      });
    } catch (error) {
      console.error(error);
      return dispatch({ type: "error" });
    }
  };

export const putCarritoAmount =
  (email: string | null | undefined, id: string, amount: number): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.put(`/carrito/add/${email}/${id}/${amount}`);
      return dispatch({
        type: "CARRITO_CHECKOUT_GET",
        payload: { success: response.data },
      });
    } catch (error) {
      console.error(error);
      return dispatch({ type: "error" });
    }
  };

export const putCarritoRemove =
  (email: string | null | undefined, id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await axios.put(`/carrito/remove/${email}/${id}`);
      return dispatch({
        type: "CARRITO_CHECKOUT_GET",
        payload: { success: response.data },
      });
    } catch (error) {
      console.error(error);
      return dispatch({ type: "error" });
    }
  };
