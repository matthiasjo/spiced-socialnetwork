import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { socket } from "./socket";
import { ChatProfilePic } from "../theme/profilepicStyle";
import { ChatWrapper } from "../theme/appStyle";

class OnlineUsers extends React.Component {
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
        //this.elemRef.current.scrollTop = this.elemRef.current.scrollHeight;
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {this.props.onlineUsers &&
                        this.props.onlineUsers.map(user => (
                            <div key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <ChatProfilePic
                                        avatar={user.avatar}
                                        username={user.username}
                                    />
                                    {user.first + " " + user.last}
                                </Link>
                            </div>
                        ))}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        onlineUsers: state.onlineUsers
    };
};

export default connect(mapStateToProps)(OnlineUsers);
