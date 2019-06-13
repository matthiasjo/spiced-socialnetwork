import React from "react";
import styled, { css } from "styled-components";
import { StyledProfilePic } from "../theme/profilepicStyle";

export default function profilePic(props) {
    const user = props.username || "default username";
    const CompName = props.compName || StyledProfilePic;
    return (
        <CompName src={props.avatar} alt={user} onClick={props.clickHandler} />
    );
}

// export default function profilePic(props) {
//     const user = props.username || "default username";
//     return (
//         <StyledProfilePic
//             src={props.avatar}
//             alt={user}
//             onClick={props.clickHandler}
//         />
//     );
// }
