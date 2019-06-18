import React from "react";
import * as io from "socket.io-client";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { socket } from "./socket";
import ProfilePic from "./profilepic";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    componentDidUpdate() {}

    render() {
        return (
            <React.Fragment>
                <div>
                    <div>Chatbox</div>
                    <div>
                        {this.props.chatMessages ? (
                            this.props.chatMessages.map(chat => (
                                <div key={chat.msg_id}>
                                    <Link to={`/user/${chat.user_id}`}>
                                        <ProfilePic
                                            avatar={chat.avatar}
                                            username={chat.username}
                                        />
                                        <div>
                                            {chat.first +
                                                " " +
                                                chat.last +
                                                " at " +
                                                chat.created_at}
                                        </div>
                                    </Link>
                                    {chat.message}
                                </div>
                            ))
                        ) : (
                            <p>You do not have any friendships</p>
                        )}
                    </div>
                    <textarea name="chat" id="" cols="30" rows="10" />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        chatMessages: state.chatMessages,
        chatMessage: state.chatMessage
    };
};

export default connect(mapStateToProps)(Chat);
