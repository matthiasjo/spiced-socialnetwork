import React from "react";
import { StyledProfilePic } from "../theme/profilepicStyle";

export default function profilePic(props) {
    const user = props.username || "default username";
    const CompName = props.compName || StyledProfilePic;
    return (
        <CompName
            onError={e => (e.target.src = "/img/default.png")}
            src={props.avatar}
            alt={user}
            onClick={props.clickHandler}
        />
    );
}
