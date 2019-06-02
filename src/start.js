import React from "react";
import ReactDOM from "react-dom";
import logo from "../public/img/logo.svg";
import styled from "styled-components";
import "./styles/normalize.css";
import "./styles/style.css";

import { Welcome } from "./components/welcome";

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
    elem = <img src={logo} />;
}

ReactDOM.render(elem, document.querySelector("main"));
