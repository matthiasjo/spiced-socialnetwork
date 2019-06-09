import { createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
${styledNormalize}
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap");

* {
    font-family: "Roboto Mono", monospace;
}

body {
    background-color: #05a19c;
}
`;
