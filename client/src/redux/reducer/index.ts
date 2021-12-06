import { combineReducers } from "redux";
// import { allUsersReducer } from "./usersReducer";
import { userRegisterReducer, userSigninReducer, getUSersReducer } from "./userReducer";
import {
  publicationListReducer,
  publicationSaveReducer,
} from "./publicationReducer";
import { carritoReducer } from './carritoReducer'




export default combineReducers({
  // allUsers: allUsersReducer,
  users: getUSersReducer,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  publicationList: publicationListReducer,
  publicationSave: publicationSaveReducer,
  carrito: carritoReducer
});
