import { AlignHorizontalCenter } from "@mui/icons-material";
import { Action } from "../actions";
import {DefaultRootState, Publication} from "../types"


const initialState: DefaultRootState = {
    loading: true,
    userInfo: "",
    error: "",
    publications: []
}


const reducer = (
    state: DefaultRootState = initialState,
    action: Action
  ) : DefaultRootState => {
      switch (action.type) {
        case "USER_SIGNIN_REQUEST":
            return { ...state, loading: true };
        case "USER_SIGNIN_SUCCESS":
            return { ...state, loading: false, userInfo: action.payload};
        case "USER_SIGNIN_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "USER_REGISTER_REQUEST":
            return { ...state, loading: true };
        case "USER_REGISTER_SUCCESS":
            return { ...state, loading: false, userInfo: action.payload };
        case "USER_REGISTER_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "GET_PUBLICATIONS":
            return { ...state, loading: false, publications: action.payload}
        default:
            return state;
      }
  }
export default reducer;
