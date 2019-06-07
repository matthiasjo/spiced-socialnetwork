import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import { Uploader } from "./uploader";
import { Logo } from "./logo";
import { Header } from "./appStyle";
import { Profile } from "./profile";
import { OtherProfile } from "./otherprofile";
import { BrowserRouter, Route, Link } from "react-router-dom";

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
        this.updatePic = this.updatePic.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    setBio(bio) {
        this.setState({
            bio: bio
        });
    }
    updatePic(url) {
        this.setState({
            avatar: url,
            uploaderVisible: false
        });
    }
    clickHandler() {
        this.setState(
            this.state.uploaderVisible
                ? { uploaderVisible: false }
                : { uploaderVisible: true }
        );
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data);
        });
    }
    render() {
        if (!this.state.id) {
            return <p>loading</p>;
        } else {
            return (
                <div>
                    <Header>
                        <React.Fragment>
                            <Logo />
                        </React.Fragment>
                        <ProfilePic
                            avatar={this.state.avatar}
                            username={this.state.username}
                        />
                        {this.state.uploaderVisible && (
                            <Uploader
                                updatePic={this.updatePic}
                                clickHandler={this.clickHandler}
                            />
                        )}
                    </Header>
                    <BrowserRouter>
                        <div>
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        avatar={this.state.avatar}
                                        username={this.state.username}
                                        clickHandler={this.clickHandler}
                                        bio={this.state.bio}
                                        setBio={this.setBio}
                                    />
                                )}
                            />
                            <Route
                                path="/user/:id"
                                render={props => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                        </div>
                    </BrowserRouter>
                </div>
            );
        }
    }
}
