import React from "react";

export default function profilePic({ imageUrl, username, clickHandler }) {
    const user = username || "default username";
    return <img src={imageUrl} alt={user} onClick={clickHandler} />;
}
