<<<<<<< HEAD
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "../reducer/index";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
=======
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducer'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(rootReducer, composedEnhancer)
export default store
export type RootState = ReturnType<typeof rootReducer>
>>>>>>> 437870f6ada55c5e57dfdb3866275b9846d9f8f3
