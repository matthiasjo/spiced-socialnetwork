import React from "react";
import axios from "./axios";
import { Button } from "../theme/welcomeStyle";

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
    showBioEditor() {
        this.setState(
            this.state.bioEditorVisible
                ? { bioEditorVisible: false }
                : { bioEditorVisible: true }
        );
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/updateBio", { bio: this.state.textarea })
            .then(response => {
                this.props.setBio(response.data.bio);
                this.setState({
                    bioEditorVisible: false
                });
            });
    }
    render() {
        return (
            <React.Fragment>
                {!this.props.bio && (
                    <form onSubmit={e => this.submit(e)}>
                        <textarea
                            onChange={e => this.handleChange(e)}
                            name="textarea"
                            id="textarea"
                            cols="30"
                            rows="10"
                        />
                        <Button primary type="submit">
                            Add Bio
                        </Button>
                    </form>
                )}
                {this.props.bio && !this.state.bioEditorVisible && (
                    <div>
                        {this.props.bio}
                        <Button primary onClick={() => this.showBioEditor()}>
                            edit
                        </Button>
                    </div>
                )}
                {this.state.bioEditorVisible && (
                    <React.Fragment>
                        <form onSubmit={e => this.submit(e)}>
                            <textarea
                                defaultValue={this.props.bio}
                                onChange={e => this.handleChange(e)}
                                name="textarea"
                                id="textarea"
                                cols="30"
                                rows="10"
                            />
                            <Button primary type="submit">
                                Submit
                            </Button>
                        </form>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
