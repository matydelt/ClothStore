import { Action } from "../actions/carritoAction";
import { Carrito } from './stateTypes';


export interface CarritoState {
    carrito?: Carrito[]
}

export const carritoReducer = (
    state: CarritoState = {}, action: Action
): CarritoState => {
    switch (action.type) {
        case 'CARRITO_CHECKOUT_GET':
            return {
                ...state, carrito: action.payload?.success
            }
        default:
            return  state

    }
}