import React from "react";
import { render } from "react-dom";
import createRoutes  from "./routes";
import { createStore, applyMiddleware, compose} from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {createBrowserHistory} from "history";
import "antd/dist/antd.min.css";
window.webappStart = () => {
    const middleware = [
        thunk,
        promise
    ];

    const composedEnhancers = compose(
        applyMiddleware(...middleware)
    );
    const initialState = window.__PRELOADED_STATE__;
    const jsContent = document.querySelector(".js-content");
    const store = createStore(
        rootReducer,
        initialState,
        composedEnhancers
    );
    render(
        <Provider store={store}>
            {createRoutes(createBrowserHistory())}
        </Provider>,
        jsContent
    );
};
