import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import { Uploader } from "./uploader";
import { Logo } from "./logo";
import { Nav, Navbar } from "../theme/appStyle";
import { Profile } from "./profile";
import { OtherProfile } from "./otherprofile";
import { UserSearch } from "./userSearch";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { StyledProfilePic } from "../theme/profilepicStyle";
import Friends from "./friendlist";

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
                    <BrowserRouter>
                        <React.Fragment>
                            <Navbar>
                                <React.Fragment>
                                    <Logo />
                                </React.Fragment>
                                <Nav>
                                    <Link to="/">Profile</Link>
                                </Nav>
                                <Nav>
                                    <Link to="/users">Search Users</Link>
                                </Nav>
                                <Nav>
                                    <Link to="/friends">Friends</Link>
                                </Nav>
                                <Nav>
                                    <a href="/logout">Logout</a>
                                </Nav>

                                <ProfilePic
                                    compName={StyledProfilePic}
                                    avatar={this.state.avatar}
                                    username={this.state.username}
                                />
                            </Navbar>

                            {this.state.uploaderVisible && (
                                <Uploader
                                    avatar={this.state.avatar}
                                    username={this.state.username}
                                    updatePic={this.updatePic}
                                    clickHandler={this.clickHandler}
                                />
                            )}

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
                                            updatePic={this.updatePic}
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
                                <Route
                                    path="/users"
                                    render={() => <UserSearch />}
                                />
                                <Route path="/friends" component={Friends} />
                            </div>
                        </React.Fragment>
                    </BrowserRouter>
                </div>
            );
        }
    }
}
