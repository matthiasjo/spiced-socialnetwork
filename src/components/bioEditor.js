import React from "react";
import axios from "./axios";

export class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/updateBio", { bio: this.state.textarea })
            .then(response => {
                this.props.setBio(response.data.bio);
            });
    }
    render() {
        return (
            <React.Fragment>
                <p>{this.props.bio}</p>
                <form onSubmit={e => this.submit(e)}>
                    <textarea
                        onChange={e => this.handleChange(e)}
                        name="textarea"
                        id="textarea"
                        cols="30"
                        rows="10"
                    />
                    <button type="submit">Update Bio</button>
                </form>
            </React.Fragment>
        );
    }
}
