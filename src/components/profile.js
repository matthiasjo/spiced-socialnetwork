import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import { BioEditor } from "./bioEditor";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // submit(e) {
    //     e.preventDefault();
    //     const data = new FormData();
    //     data.append("file", this.state.profilePicture);
    //     axios.post("/upload", data).then(response => {
    //         console.log("new image", response.data);
    //         this.props.updatePic(response.data);
    //     });
    // }
    render() {
        return (
            <React.Fragment>
                <ProfilePic
                    avatar={this.props.avatar}
                    username={this.props.username}
                    clickHandler={this.props.clickHandler}
                />
                <BioEditor bio={this.props.bio} setBio={this.props.setBio} />
            </React.Fragment>
        );
    }
}
