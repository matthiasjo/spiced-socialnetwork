import React from "react";
import axios from "./axios";
import {
    Input,
    Label,
    Button,
    ModalContainer,
    FormContainer,
    Form,
    Error
} from "./registerStyle";

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: null,
            avatar: null
        };
    }
    handleChange(e) {
        this.setState({
            profilePicture: event.target.files[0],
            loaded: 0
        });
    }
    submit(e) {
        e.preventDefault();
        const data = new FormData();
        console.log("smthsmth", this.state.profilePicture);
        data.append("file", this.state.profilePicture);
        axios.post("/upload", data).then(response => {
            console.log("new image", response.data);
            this.props.updatePic(response.data);
        });
    }
    render() {
        return (
            <ModalContainer>
                <FormContainer>
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
                        {this.state.error && <Error>{this.state.error}</Error>}
                        <Label>upload profile photo</Label>
                    </Form>
                </FormContainer>
            </ModalContainer>
        );
    }
}
