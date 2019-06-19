import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { socket } from "./socket";
import Moment from "react-moment";
import "moment-timezone";
import { Button } from "../theme/welcomeStyle";
import { ChatProfilePic } from "../theme/profilepicStyle";
import {
    Chatbox,
    ChatBubble,
    ChatWrapper,
    Messagebox
} from "../theme/appStyle";

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
        socket.emit("chatMessage", this.state.chat);
        this.setState({
            chat: ""
        });
    }

    componentDidMount() {}
    componentDidUpdate() {
        this.elemRef.current.scrollTop = this.elemRef.current.scrollHeight;
    }

    render() {
        return (
            <React.Fragment>
                <ChatWrapper>
                    <div>Chatbox</div>
                    <Chatbox ref={this.elemRef}>
                        {this.props.chatMessages &&
                            this.props.chatMessages.map(chat => (
                                <ChatBubble key={chat.msg_id}>
                                    <Link to={`/user/${chat.user_id}`}>
                                        {chat.first + " " + chat.last + " at "}
                                    </Link>
                                    <Moment format="DD.MM.YY HH:mm">
                                        {chat.created_at}
                                    </Moment>
                                    <div>
                                        <ChatProfilePic
                                            avatar={chat.avatar}
                                            username={chat.username}
                                        />
                                        {chat.message}
                                    </div>
                                </ChatBubble>
                            ))}
                    </Chatbox>
                    <Messagebox
                        name="chat"
                        id=""
                        value={this.state.chat}
                        cols="30"
                        rows="10"
                        onChange={e => this.handleChange(e)}
                        onKeyPress={e => this.keyPressed(e)}
                    />
                    <Button primary onClick={() => this.submit()}>
                        Submit
                    </Button>
                </ChatWrapper>
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
