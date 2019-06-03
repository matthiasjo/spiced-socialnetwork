import React from "react";
import axios from "./axios";
import logo from "../../public/img/logoT.svg";
import {
    Input,
    Label,
    Heading1,
    Button,
    Container,
    FormContainer,
    Form,
    StyledLink,
    Logo,
    Error
} from "./registerStyle";

export class Login extends React.Component {
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
            .post("/login", {
                user: this.state.user,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else if (data.error) {
                    this.setState({
                        error: data.error
                    });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error: true
                });
            });
    }
    render() {
        return (
            <Container>
                <Logo src={logo} height={350} width={350} />
                <FormContainer>
                    <Heading1>Welcome back. Please log in!</Heading1>
                    <Form onSubmit={e => this.submit(e)}>
                        {this.state.error && <Error>{this.state.error}</Error>}
                        <Label htmlFor="first">Username or Email</Label>
                        <Input
                            name="user"
                            required
                            placeholder="Username or Email"
                            onChange={e => this.handleChange(e)}
                        />
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <Button
                            disabled={!this.state.password}
                            type="sumbit"
                            primary
                        >
                            Submit
                        </Button>
                    </Form>
                    <p>
                        You do not have an account yet?{" "}
                        <StyledLink to="/">Register</StyledLink>
                    </p>
                </FormContainer>
            </Container>
        );
    }
}
