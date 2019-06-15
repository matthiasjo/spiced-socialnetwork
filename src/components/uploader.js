import React from "react";
import axios from "./axios";
import {
    Modal,
    ModalDialog,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter,
    Container
} from "styled-bootstrap-components";
import { Button, Error } from "../theme/welcomeStyle";
import { UploadButtonWrapper, UploadInputField } from "../theme/appStyle";
import ProfilePic from "./profilepic";
import { UserProfilePic } from "../theme/profilepicStyle";

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            profilePicture: null,
            avatar: null
        };
    }
    async handleChange(e) {
        await this.setState({
            profilePicture: e.target.files[0],
            loaded: 0
        });
        this.submit(e);
    }
    submit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("file", this.state.profilePicture);
        axios.post("/upload", data).then(response => {
            console.log("new image", response.data);
            this.props.updatePic(response.data);
        });
    }
    render() {
        return (
            <Container>
                <Modal>
                    <ModalDialog>
                        <ModalContent>
                            <ModalHeader>
                                <ModalTitle>
                                    Upload your Profile image
                                </ModalTitle>
                                <Button
                                    primary
                                    onClick={this.props.clickHandler}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </Button>
                            </ModalHeader>
                            <ModalBody>
                                <ProfilePic
                                    compName={UserProfilePic}
                                    avatar={this.props.avatar}
                                    username={this.props.username}
                                />
                                <div>
                                    <UploadButtonWrapper>
                                        <Button primary>Upload</Button>
                                        <UploadInputField
                                            type="file"
                                            name="file"
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </UploadButtonWrapper>
                                    {this.state.error && (
                                        <Error>{this.state.error}</Error>
                                    )}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.props.clickHandler}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </ModalDialog>
                </Modal>
            </Container>
        );
    }
}
