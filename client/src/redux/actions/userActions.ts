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

export const registerUserGoogle =
  (user: { email: string; password: string }) =>
    async (dispatch: Dispatch<Action>) => {
      dispatch({ type: "USER_REGISTER_REQUEST" });
        try {
          const response = await axios.post("http://localhost:3001/auth/google", user);
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

export const signinUser =

  (user: any) => async (dispatch: Dispatch<Action>) => {
    const cart = localStorage.getItem("cart")
    dispatch({ type: "USER_SIGNIN_REQUEST" });
    try {
      const response = await axios.get("http://localhost:3001/auth", { params: { email: user.email, password: user.password } });
      if (cart && cart.length > 0) {
        axios.post(`http://localhost:3001/carrito/${response.data._id}`, JSON.parse(cart))
      }

      localStorage.setItem('cart', '[]');

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

/* export const signinUser = (user: any) => async (dispatch: Dispatch<Action>) => {
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
}; */
export const getUsers =

  () => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "GET_USERS_REQUEST" });
    try {
      const response = await axios.get("http://localhost:3001/users");
      console.log(response);

      dispatch({
        type: "GET_USERS_SUCCESS",
        payload: { success: response.data },
      });
    } catch (error) {

      dispatch({
        type: "GET_USERS_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const bannUser = (id: string, flag: boolean) => async (dispatch: Dispatch<Action>) => {
  try {
    await axios.put("http://localhost:3001/auth", { id: id, flag: flag });
    if (!flag) {
      alert("usuario desactivado")
    } else alert("usuario activado")
    dispatch({
      type: "BANN_CONTROL",
    });
  } catch (error) {
    alert("hubo un problema")
    dispatch({
      type: "GET_USERS_FAIL",
      payload: { error: (error as Error).message },
    });
  }
}
export const setEmployee = (id: string, flag: boolean) => async (dispatch: Dispatch<Action>) => {
  try {
    await axios.put("http://localhost:3001/user/putype", { id: id, flag: flag });
    if (flag) {
      alert("usuario establecido como empleado")
    } else alert("usuario establecido como usuario normal")
    dispatch({
      type: "SET_EMPLOYEE",
    });
  } catch (error) {
    alert("hubo un problema")
    dispatch({
      type: "SET_EMPLOYEE_FAIL",
      payload: { error: (error as Error).message },
    });
  }
}

export const logoutUser = () => (dispatch: Dispatch<Action>) => {
  dispatch({ type: "USER_LOGOUT" });
};

export const setSignedInUser =

  (user: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: "USER_SIGNIN_REQUEST" });
    try {
      const response = await axios.get("http://localhost:3001/auth/email/" + user.email);
      // const response = await axios.get("http://localhost:3001/auth", { params: { email: user.email } });
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

