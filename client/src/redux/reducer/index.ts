import { combineReducers } from "redux";
import { userRegisterReducer, userSigninReducer, getUSersReducer } from "./userReducer";
import {
    publicationListReducer,
    publicationSaveReducer,
} from "./publicationReducer";





export default combineReducers({
    users: getUSersReducer,
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    publicationList: publicationListReducer,
    publicationSave: publicationSaveReducer,
});
