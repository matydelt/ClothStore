import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { AppThunk } from "../../hooks/reduxHooks";
import { ActionTypes } from "./actionTypes";
import { User } from "../reducer/stateTypes";

export type Action = {
  type: ActionTypes;
  payload?: { success?: User; error?: string };
};

export const registerUser =
  (user: { email: string; password: string }): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    try {
      const response = await axios.post("/auth/new", user);
      return dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: { success: response.data },
      });
    } catch (error) {
      return dispatch({
        type: "USER_REGISTER_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const registerUserGoogle =
  (user: { email: string; password: string }): AppThunk =>
  async (dispatch) => {
    const cart = localStorage.getItem("cart");
    dispatch({ type: "USER_REGISTER_REQUEST" });
    try {
      const response = await axios.post("/auth/google", user);
      if (cart && cart.length > 0) {
        axios.post(`/carrito/${response.data._id}`, JSON.parse(cart));
      }

      localStorage.setItem("cart", "[]");

      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: { success: response.data },
      });
      return dispatch({
        type: "USER_SIGNIN_SUCCESS",
        payload: { success: response.data },
      });
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload: { error: (error as Error).message },
      });
      return dispatch({
        type: "USER_SIGNIN_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const signinUser =
  (user: any): AppThunk =>
  async (dispatch) => {
    const cart = localStorage.getItem("cart");
    dispatch({ type: "USER_SIGNIN_REQUEST" });
    try {
      const response = await axios.get("/auth", {
        params: { email: user.email, password: user.password },
      });
      if (cart && cart.length > 0) {
        axios.post(`/carrito/${response.data._id}`, JSON.parse(cart));
      }

      localStorage.setItem("cart", "[]");

      return dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: { success: response.data },
      });
    } catch (error) {
      return dispatch({
        type: "USER_REGISTER_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const getUsers = (): AppThunk => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const response = await axios.get("/users");
    console.log(response);

    return dispatch({
      type: "GET_USERS_SUCCESS",
      payload: { success: response.data },
    });
  } catch (error) {
    return dispatch({
      type: "GET_USERS_FAIL",
      payload: { error: (error as Error).message },
    });
  }
};

export const bannUser =
  (id: string, flag: boolean): AppThunk =>
  async (dispatch) => {
    try {
      await axios.put("/auth", { id: id, flag: flag });
      if (!flag) {
        alert("usuario desactivado");
      } else alert("usuario activado");
      return dispatch({
        type: "BANN_CONTROL",
      });
    } catch (error) {
      alert("hubo un problema");
      return dispatch({
        type: "GET_USERS_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };
export const setEmployee =
  (id: string, flag: boolean): AppThunk =>
  async (dispatch) => {
    try {
      await axios.put("/user/putype", { id: id, flag: flag });
      if (flag) {
        alert("usuario establecido como empleado");
      } else alert("usuario establecido como usuario normal");
      return dispatch({
        type: "SET_EMPLOYEE",
      });
    } catch (error) {
      alert("hubo un problema");
      return dispatch({
        type: "SET_EMPLOYEE_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };

export const logoutUser = () => (dispatch: Dispatch<AnyAction>) => {
  return dispatch({ type: "USER_LOGOUT" });
};

export const setSignedInUser =
  (user: any): AppThunk =>
  async (dispatch) => {
    dispatch({ type: "USER_SIGNIN_REQUEST" });
    try {
      const response = await axios.get("/auth/email/" + user.email);
      console.log(response);

      return dispatch({
        type: "USER_SIGNIN_SUCCESS",
        payload: { success: response.data },
      });
    } catch (error) {
      return dispatch({
        type: "USER_SIGNIN_FAIL",
        payload: { error: (error as Error).message },
      });
    }
  };
