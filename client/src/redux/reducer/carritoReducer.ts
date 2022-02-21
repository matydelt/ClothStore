import type { Reducer } from "redux";
import type { Action } from "../actions/carritoAction";
import type { Carrito } from "./stateTypes";

export interface CarritoState {
  carrito?: Carrito[];
}

const carritoReducer: Reducer<CarritoState, Action> = (state = {}, action) => {
  switch (action.type) {
    case "CARRITO_CHECKOUT_GET":
      return {
        ...state,
        carrito: action.payload?.success,
      };
    default:
      return state;
  }
};

export { carritoReducer };
