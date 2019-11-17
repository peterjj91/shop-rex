import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import "./main.css";
import createRootReducer from "reducers";
import Layout from "containers/layout";

// далее нужно передедать в createStore рутовый reducer
// мы хотим использовать react-router внутри redux
// для этого используем connected-react-router
// middleware - доп прослойка для redux, котороая позволяет выполнять действия между тем как мы начали диспатчить action и между как произошла обработка его в reducer
// redux-thunk - асинхронные action
// redux-devtools - позволяет легко дебажить приложение внутри chrome
// middlewares - это все функции которые будет вызывать между action и reducer
const history = createBrowserHistory();
const middlewares = [thunk, routerMiddleware(history)];
const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middlewares))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
