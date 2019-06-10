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
import { Input, Button, Form, Error } from "../theme/welcomeStyle";

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            profilePicture: null,
            avatar: null
        };
    }
    handleChange(e) {
        this.setState({
            profilePicture: e.target.files[0],
            loaded: 0
        });
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
                                <Button onClick={this.props.clickHandler}>
                                    <span aria-hidden="true">&times;</span>
                                </Button>
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={e => this.submit(e)}>
                                    <Input
                                        type="file"
                                        name="file"
                                        onChange={e => this.handleChange(e)}
                                    />

                                    <Button
                                        disabled={!this.state.profilePicture}
                                        primary
                                        type="submit"
                                    >
                                        Upload
                                    </Button>
                                    {this.state.error && (
                                        <Error>{this.state.error}</Error>
                                    )}
                                </Form>
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

// <ModalContainer>
//     <FormContainer>
//         <Form onSubmit={e => this.submit(e)}>
//             <Input
//                 type="file"
//                 name="file"
//                 onChange={e => this.handleChange(e)}
//             />
//
//             <Button
//                 disabled={!this.state.profilePicture}
//                 primary
//                 type="submit"
//             >
//                 Upload
//             </Button>
//             {this.state.error && <Error>{this.state.error}</Error>}
//             <Label>upload profile photo</Label>
//         </Form>
//     </FormContainer>
// </ModalContainer>
