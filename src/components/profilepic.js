import React from "react";
import { StyledProfilePic } from "../theme/profilepicStyle";

export default function profilePic(props) {
    const user = props.username || "default username";
    const avatar = props.avatar || "/img/default.png";
    const CompName = props.compName || StyledProfilePic;
    return (
        <CompName
            onError={e => (e.target.src = "/img/default.png")}
            src={avatar}
            alt={user}
            onClick={props.clickHandler}
        />
    );
}
