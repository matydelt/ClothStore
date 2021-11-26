import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { Publications } from "../types";


export type Action = {
  type: any;
  payload?: AxiosResponse<any, any> | any;
};

export const publications = function () {
  return async function (dispatch: Dispatch<Action>) {
    const data: Publications = (await axios.get("http://localhost:3001/publications")).data
    return dispatch({
      type: "GET_PUBLICATIONS",
      payload: data
    })
  }
}

