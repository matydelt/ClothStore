import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "../reducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// The store now has the ability to accept thunk functions in `dispatch`
const store = createStore(rootReducer, composedEnhancer);
export default store;

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
