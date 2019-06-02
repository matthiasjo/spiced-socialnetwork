import styled, { css } from "styled-components";

const Input = styled.input`
    text-align: center;
    border-radius: 1rem;
    border: 0.2rem solid;
    padding: 0.25em;
    color: #103c42;
    width: 100%;
    border-color: ${props => (props.error ? "red" : "palevioletred")};
    margin: 0.25rem;
`;

const Label = styled.label`
    display: flex;
    font-weight: 500;
    padding-top: 0.5rem;
`;

const Heading1 = styled.h1`
    text-align: center;
`;

const Button = styled.button`
    border-radius: 0.3rem;
    border: 0.2rem solid palevioletred;
    color: palevioletred;
    margin: 0.5em 1em;
    padding: 0.25em 1em;

    ${props =>
        props.primary &&
        css`
            background: palevioletred;
            color: white;
        `}
`;
const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const FormContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: center;
    width: 30%;
    flex-direction: column;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledLink = styled.a`
    text-decoration: none;
    color: palevioletred;
    font-weight: bold;
`;

const Logo = styled.img`
    display: flex;
    align-self: center;
`;

export {
    Input,
    Label,
    Heading1,
    Button,
    Container,
    FormContainer,
    Form,
    StyledLink,
    Logo
};
