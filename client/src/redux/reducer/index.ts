import { combineReducers } from "redux";
import { userRegisterReducer, userSigninReducer } from "./userReducer";
import { allUsersReducer } from "./usersReducer";
import { allMarksReducer } from "./marksReducer";
import {
  publicationListReducer,
  publicationSaveReducer,
} from "./publicationReducer";

export default combineReducers({
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  publicationList: publicationListReducer,
  publicationSave: publicationSaveReducer,
  allUsers: allUsersReducer,
  allMarks: allMarksReducer,
});
