import React from "react";
import { StyledProfilePic } from "./profilepicStyle";

export default function profilePic({ imageUrl, username, clickHandler }) {
    const user = username || "default username";
    return (
        <StyledProfilePic src={imageUrl} alt={user} onClick={clickHandler} />
    );
}
