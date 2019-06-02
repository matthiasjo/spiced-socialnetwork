import React from "react";
import axios from "axios";
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
    Logo
} from "./welcomeStyle";

export class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <Container>
                <Logo src={logo} height={350} width={350} />
                <FormContainer>
                    <Heading1>Join a real social network for once!</Heading1>
                    <Form>
                        {this.state.error && <div className="error">Oops!</div>}
                        <Label htmlFor="first">First Name</Label>
                        <Input
                            name="first"
                            required
                            placeholder="first name"
                            onChange={e => this.handleChange(e)}
                        />
                        <Label htmlFor="last">Last Name</Label>
                        <Input
                            name="last"
                            placeholder="last name"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <Label htmlFor="username">Username</Label>
                        <Input
                            name="username"
                            placeholder="username"
                            onChange={e => this.handleChange(e)}
                        />
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="email"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <Label htmlFor="pass">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                            onChange={e => this.handleChange(e)}
                        />
                        <Button onClick={e => this.submit()} primary>
                            Register
                        </Button>
                    </Form>
                    <p>
                        Already a member?{" "}
                        <StyledLink href="/login">Log in</StyledLink>
                    </p>
                </FormContainer>
            </Container>
        );
    }
}
