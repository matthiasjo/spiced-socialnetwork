import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import { Uploader } from "./uploader";
import { Logo } from "./logo";
import { Header } from "./appStyle";
import { Profile } from "./profile";

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
            console.log(data);
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
                    <div>
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
                    </div>
                </div>
            );
        }
    }
}
