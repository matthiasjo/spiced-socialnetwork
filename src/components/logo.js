import React from "react";
import logo from "../../public/img/logo.svg";
//import styled from "styled-components";

export class Logo extends React.Component {
    render() {
        return <img src={logo} height={120} width={120} />;
    }
}
