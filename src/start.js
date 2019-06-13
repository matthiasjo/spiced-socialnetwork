import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle } from "./theme/globalStyle";
import { WelcomeContainer } from "./theme/welcomeStyle";
import { Welcome } from "./components/welcome";
import { App } from "./components/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

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
            <Provider store={store}>
                <App />
            </Provider>
        </React.Fragment>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
