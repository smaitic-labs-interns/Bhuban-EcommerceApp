import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Layout from "./components/Layout/Layout";
/* My changes */
import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware } from "@reduxjs/toolkit";
import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { ThunkMiddleware } from "redux-thunk";
import thunkMiddleware from "redux-thunk"
import rootReducer from "./services/Reducers/index";
// const store = configureStore({ reducer: rootReducer, middleware:applyMiddleware(thunk) });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


// Latest change
// import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// The store now has the ability to accept thunk functions in `dispatch`
// const store = createStore(rootReducer, composedEnhancer)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
