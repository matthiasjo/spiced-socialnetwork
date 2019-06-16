import React from "react";
import ProfilePic from "./profilepic";
import { BioEditor } from "./bioEditor";
import { UserProfilePic } from "../theme/profilepicStyle";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <ProfilePic
                    compName={UserProfilePic}
                    avatar={this.props.avatar}
                    username={this.props.username}
                    clickHandler={this.props.clickHandler}
                />
                {this.props.username}

                <div>{this.props.first + " " + this.props.last}</div>
                <BioEditor bio={this.props.bio} setBio={this.props.setBio} />
            </React.Fragment>
        );
    }
}
