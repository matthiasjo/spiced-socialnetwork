import styled, { css } from "styled-components";
//import ProfilePic from "./components/profilepic";

const StyledProfilePic = styled.img`
    width: 4rem;
    max-height: 4rem;
    border-radius: 50%;

    :hover {
    }
`;

const ChatProfilePic = styled.img`
    width: 8rem;
    max-height: 8rem;
    border-radius: 10%;

    :hover {
    }
`;

const UserProfilePic = styled.img`
    width: 15rem;
    max-height: 15rem;
    border-radius: 10%;

    :hover {
    }
`;

export { StyledProfilePic, UserProfilePic, ChatProfilePic };
