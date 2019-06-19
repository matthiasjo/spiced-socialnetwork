import styled, { css } from "styled-components";
import React from "react";
import ProfilePic from "../components/profilepic";

const ProfilePicWrapper = props => {
    return (
        <div className={props.className}>
            <ProfilePic
                avatar={props.avatar}
                username={props.username}
                clickHandler={props.clickHandler}
            />
        </div>
    );
};
const StyledProfilePic = styled(ProfilePicWrapper)`
    > img {
        width: 8rem;
        max-height: 8rem;
        border-radius: 10%;
    }
`;

const ChatProfilePic = styled(ProfilePicWrapper)`
    > img {
        width: 4rem;
        max-height: 4rem;
        border-radius: 50%;

        :hover {
        }
    }
`;

const UserProfilePic = styled(ProfilePicWrapper)`
    > img {
        width: 15rem;
        max-height: 15rem;
        border-radius: 10%;
    }
`;

export { StyledProfilePic, UserProfilePic, ChatProfilePic };
