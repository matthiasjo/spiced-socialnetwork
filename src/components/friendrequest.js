import React from "react";
import axios from "./axios";
import { Button, Error } from "../theme/welcomeStyle";

export class FriendRequest extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submit = this.submit.bind(this);
    }

    submit() {
        axios
            .post(`/friendStatus/${this.props.requestId}`, {
                friendship: this.state.friendship,
                rejectFlag: this.state.rejectFlag
            })
            .then(({ data }) => {
                if (data.error) {
                    this.setState({
                        buttonText: data.buttonText,
                        friendship: data.friendship,
                        error: data.error
                    });
                } else {
                    this.setState({
                        buttonText: data.buttonText,
                        friendship: data.friendship,
                        rejectText: data.rejectText,
                        rejectFlag: data.rejectFlag
                    });
                }
            })
            .catch(err => console.log(err));
        console.log("state", this.state);
    }

    componentDidMount() {
        axios
            .get(`/friendStatus/${this.props.requestId}`)
            .then(({ data }) => {
                if (data.rejectFlag) {
                    this.setState({
                        buttonText: data.buttonText,
                        friendship: data.friendship,
                        rejectText: data.rejectText,
                        rejectFlag: data.rejectFlag
                    });
                } else {
                    this.setState({
                        buttonText: data.buttonText,
                        friendship: data.friendship
                    });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                {this.state.error && <Error>{this.state.error}</Error>}
                <Button primary onClick={this.submit}>
                    {this.state.buttonText}
                </Button>
                {this.state.rejectFlag == "reject" ? (
                    <Button onClick={this.submit}>
                        {this.state.rejectText}
                    </Button>
                ) : null}
            </React.Fragment>
        );
    }
}
