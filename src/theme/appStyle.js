import styled, { keyframes, css } from "styled-components";
import { Nav, NavLink, Navbar } from "styled-bootstrap-components";
import { Button, Badge, Container } from "styled-bootstrap-components";

const Header = styled.header`
    background-color: blue;
`;

const FriendsList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const FriendCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    width: 10rem;
`;

const UploadButtonWrapper = styled.div`
    position: relative;
    overflow: hidden;
    display: inline-block;
`;

const UploadInputField = styled.input`
    font-size: 15rem;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
`;

const BButton = styled(Button)``;

const StyledNavLink = styled(NavLink)``;

const Chatbox = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    overflow: scroll;
    height: 60vh;
    width: 30vw;
    margin-bottom: 2rem;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const ChatBubble = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    background: #ffe837;
    padding: 1rem;
    margin: 0.5rem;

    :nth-child(odd) {
        background: #02576c;
        color: white;
    }
`;

const ChatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
    margin: 0 auto;
    justify-content: center;
`;

const Messagebox = styled.textarea`
    resize: none;
    outline: none;
    border-radius: 1rem;
    height: 5rem;
    width: 30vw;
`;

export {
    Header,
    Nav,
    Messagebox,
    Navbar,
    StyledNavLink,
    FriendsList,
    FriendCard,
    BButton,
    UploadButtonWrapper,
    UploadInputField,
    Badge,
    Container,
    Chatbox,
    ChatBubble,
    ChatWrapper
};
