import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk"
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: 'persist-store',
    storage
}
const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //for basic
// to be visible in redux-devtools chrome extension
export const persistor = persistStore(store);
export default store;


// applyMiddleWare: binds store and middleware