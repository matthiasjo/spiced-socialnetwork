import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./register";
import { Login } from "./login";

export class Welcome extends React.Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </React.Fragment>
            </HashRouter>
        );
    }
}
