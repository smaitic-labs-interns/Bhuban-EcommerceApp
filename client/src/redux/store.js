import { createStore, applyMiddleware, compose } from "redux";
import persistedReducer from "./reducers/index";
import thunk from "redux-thunk"
import {persistStore} from "redux-persist";



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //for basic
// to be visible in redux-devtools chrome extension
export const persistor = persistStore(store);
export default store;


// applyMiddleWare: binds store and middleware