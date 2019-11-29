import React from "react";
import Users from "./routes/users/index";
import { Route, Router } from "react-router";
export default (history) => {
    return (
        <Router history={history}>
            <Route  path="/" component={Users} />
        </Router>
    );
};


