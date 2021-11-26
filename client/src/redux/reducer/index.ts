import { combineReducers } from "redux";
import { userRegisterReducer, userSigninReducer } from "./userReducer";
import {
  publicationListReducer,
  publicationSaveReducer,
} from "./publicationReducer";

export default combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  publicationList: publicationListReducer,
  publicationSave: publicationSaveReducer,
});
