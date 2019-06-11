import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import { FriendRequest } from "./friendrequest";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        axios
            .get(`/otherUser/${this.props.match.params.id}`)
            .then(({ data }) => {
                if (data.success) {
                    this.setState(data);
                    console.log("state ", this.state);
                } else {
                    this.props.history.push("/");
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>OtherProfile</h1>
                <ProfilePic
                    avatar={this.state.avatar}
                    username={this.state.username}
                />
                <FriendRequest requestId={this.props.match.params.id} />
                <p>
                    {this.state.first} {this.state.first}
                </p>
                <p>{this.state.username}</p>
                <p>{this.state.bio}</p>
            </div>
        );
    }
}
