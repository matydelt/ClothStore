import axios from "axios";
import { Dispatch } from "react";
import { ActionTypes } from "./actionTypes";
import { Carrito } from '../reducer/stateTypes';



export type Action = {
    type: ActionTypes;
    payload: { success?: Carrito[], error?: string};
}

export const getCarrito = (email:string) => async (dispatch: Dispatch<Action>) => {
    try {
        const response = await axios.get(`/carrito/${email}`);
        dispatch({
          type: "CARRITO_CHECKOUT_GET",
          payload: { success: response.data },
        });
      } catch (error) {
        dispatch({
          type: "CARRITO_CHECKOUT_GET_FAIL",
          payload: { error: (error as Error).message },
        });
      }
}

export const putCarrito = (email: string | null | undefined, id: string) => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await axios.put(`/carrito/${email}/${id}`);
    dispatch({
      type: "CARRITO_CHECKOUT_GET",
      payload: { success: response.data },
    });
  } catch (error) {
    console.error(error)
  }
}

export const putCarritoAmount = (email: string | null | undefined, id: string, amount: number) => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await axios.put(`/carrito/add/${email}/${id}/${amount}`);
    dispatch({
      type: "CARRITO_CHECKOUT_GET",
      payload: { success: response.data },
    });
  } catch (error) {
    console.error(error)
  }
}

export const putCarritoRemove = (email: string | null | undefined, id: string) => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await axios.put(`/carrito/remove/${email}/${id}`);
    dispatch({
      type: "CARRITO_CHECKOUT_GET",
      payload: { success: response.data },
    });
  } catch (error) {
    console.error(error)
  }
}