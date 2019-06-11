import React from "react";
import axios from "./axios";
import { Button } from "../theme/welcomeStyle";

export class FriendRequest extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    submit() {
        axios
            .post(`/friendStatus/${this.props.requestId}`, {
                friendship: this.state.friendship
            })
            .then(({ data }) => {
                this.setState({
                    buttonText: data.buttonText,
                    friendship: data.friendship
                });
            })
            .catch(err => console.log(err));
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
            <Button primary onClick={this.submit}>
                {this.state.buttonText}
            </Button>
        );
    }
}
