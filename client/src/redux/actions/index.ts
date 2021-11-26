import axios, { Axios, AxiosResponse } from "axios";
import { Dispatch } from "react";
import { Publications } from "../types";


export type Action = {
  type: any;
  payload?: AxiosResponse<any, any> | any;
};

export const publications = async function ()  {
    return async function (dispatch: Dispatch<Action>) {
    const data: Publications = await axios.get("localhost:3001/publications");
    return dispatch({
      type: "GET_PUBLICATIONS",
      payload: data
    })
}
}

