import styled, { css } from "styled-components";

const StyledProfilePic = styled.img`
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.4);
    -webkit-transition: -webkit-transform 0.5s, opacity 0.5s;
    transition: transform 0.5s, opacity 0.5s;
    width: 8rem;
    height: auto;
    max-height: 8rem;
    border-radius: 10%;

    :hover {
        -webkit-transform: scale(1.03);
        -ms-transform: scale(1.03);
        transform: scale(1.25);
    }
`;

export { StyledProfilePic };
