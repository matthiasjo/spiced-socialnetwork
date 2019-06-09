import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle } from "./theme/globalStyle";
import { WelcomeContainer } from "./theme/welcomeStyle";
import { Welcome } from "./components/welcome";
import { App } from "./components/app";

let elem;

if (location.pathname == "/welcome") {
    elem = (
        <React.Fragment>
            <GlobalStyle />
            <WelcomeContainer>
                <Welcome />
            </WelcomeContainer>
        </React.Fragment>
    );
} else {
    elem = (
        <React.Fragment>
            <GlobalStyle />
            <App />
        </React.Fragment>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
