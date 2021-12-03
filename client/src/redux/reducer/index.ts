import { combineReducers } from "redux";
import { userRegisterReducer, userSigninReducer } from "./userReducer";
import { allUsersReducer } from "./usersReducer";
import {
  publicationListReducer,
  publicationSaveReducer,
} from "./publicationReducer";
import { carritoReducer } from './carritoReducer'




export default combineReducers({
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    publicationList: publicationListReducer,
    publicationSave: publicationSaveReducer,
    carrito: carritoReducer,
    allUsers: allUsersReducer
});
