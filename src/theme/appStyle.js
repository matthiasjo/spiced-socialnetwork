import styled, { css } from "styled-components";
import { Nav, NavLink, Navbar } from "styled-bootstrap-components";

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

const StyledNavLink = styled(NavLink)``;

export { Header, Nav, Navbar, StyledNavLink, FriendsList, FriendCard };
