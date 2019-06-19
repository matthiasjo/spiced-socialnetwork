import React from "react";

export default function profilePic(props) {
    const user = props.username || "default username";
    const avatar = props.avatar || "/img/default.png";

    return (
        <img
            onError={e => (e.target.src = "/img/default.png")}
            src={avatar}
            alt={user}
            onClick={props.clickHandler}
        />
    );
}
