import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { socket } from "./socket";
import ProfilePic from "./profilepic";
import Moment from "react-moment";
import "moment-timezone";
import { Button } from "../theme/welcomeStyle";
import { ChatProfilePic } from "../theme/profilepicStyle";
import { Container } from "../theme/appStyle";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.elemRef = React.createRef();
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    keyPressed(event) {
        if (event.key === "Enter") {
            this.submit();
        }
    }
    submit() {
        console.log("this state", this.state.chat);
        socket.emit("chatMessage", this.state.chat);
    }

    componentDidMount() {}
    componentDidUpdate() {
        this.elemRef.current.scrollTop = this.elemRef.current.scrollHeight;
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <div>Chatbox</div>
                    <Container fluid ref={this.elemRef}>
                        {this.props.chatMessages ? (
                            this.props.chatMessages.map(chat => (
                                <div key={chat.msg_id}>
                                    <Link to={`/user/${chat.user_id}`}>
                                        <ProfilePic
                                            compName={ChatProfilePic}
                                            avatar={chat.avatar}
                                            username={chat.username}
                                        />
                                        <div>
                                            {chat.first +
                                                " " +
                                                chat.last +
                                                " at "}
                                            <Moment format="DD.MM.YY HH:mm">
                                                {chat.created_at}
                                            </Moment>
                                        </div>
                                    </Link>
                                    {chat.message}
                                </div>
                            ))
                        ) : (
                            <p>You do not have any friendships</p>
                        )}
                    </Container>
                    <textarea
                        name="chat"
                        id=""
                        cols="30"
                        rows="10"
                        onChange={e => this.handleChange(e)}
                        onKeyPress={e => this.keyPressed(e)}
                    />
                    <Button primary onClick={() => this.submit()}>
                        Submit
                    </Button>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        chatMessages: state.chatMessages
    };
};

export default connect(mapStateToProps)(Chat);
