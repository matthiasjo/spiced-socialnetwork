import React from "react";
import axios from "./axios";
import { Button } from "../theme/welcomeStyle";

export class FriendRequest extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`/friendStatus/${this.props.requestId}`)
            .then(({ data }) => {
                this.setState({
                    buttonText: data.buttonText,
                    friendship: data.friendship
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <Button primary onClick={this.submit()}>
                {this.state.buttonText}
            </Button>
        );
    }
}
