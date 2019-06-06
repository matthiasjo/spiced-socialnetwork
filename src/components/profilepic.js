import React from "react";
import { StyledProfilePic } from "./profilepicStyle";

export default function profilePic(props) {
    const user = props.username || "default username";
    return (
        <StyledProfilePic
            src={props.avatar}
            alt={user}
            onClick={props.clickHandler}
        />
    );
}
