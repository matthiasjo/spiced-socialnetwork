import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles/normalize.css";
import "./styles/style.css";

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
        <WelcomeContainer>
            <Welcome />
        </WelcomeContainer>
    );
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
