import styled, { keyframes, css } from "styled-components";
import { Nav, NavLink, Navbar } from "styled-bootstrap-components";
import { Button, Badge, Modal } from "styled-bootstrap-components";

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const FadeoutModal = styled(Modal)`
    animation: 1.5s ${fadeOut} ease-out;
`;

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
    UploadInputField,
    Badge,
    FadeoutModal
};
