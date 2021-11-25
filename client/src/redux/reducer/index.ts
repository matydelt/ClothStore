import { combineReducers } from "redux";
import { userRegisterReducer, userSigninReducer } from "./userReducer";

export default combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
});
