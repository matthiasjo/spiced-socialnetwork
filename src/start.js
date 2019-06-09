import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { GlobalStyle } from "./theme/globalStyle";

import { Welcome } from "./components/welcome";
import { App } from "./components/app";

const WelcomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

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
