import styled, { css } from "styled-components";
import { Nav, NavLink, Navbar } from "styled-bootstrap-components";
import { Button } from "styled-bootstrap-components";

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

export {
    Header,
    Nav,
    Navbar,
    StyledNavLink,
    FriendsList,
    FriendCard,
    BButton,
    UploadButtonWrapper,
    UploadInputField
};
