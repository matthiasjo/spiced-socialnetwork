import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    getListOfFriends,
    endFriendship,
    acceptFriendship,
    rejectFriendship
} from "../redux/actions";
import { UserProfilePic } from "../theme/profilepicStyle";
import { FriendsList, FriendCard, Badge } from "../theme/appStyle";
import { Button } from "../theme/welcomeStyle";

function Friends(props) {
    useEffect(() => {
        props.dispatch(getListOfFriends());
    }, []);

    let disconnect = async userId => {
        props.dispatch(endFriendship(userId));
    };
    let accept = async userId => {
        props.dispatch(acceptFriendship(userId));
    };
    let reject = async userId => {
        props.dispatch(rejectFriendship(userId));
    };
    return (
        <React.Fragment>
            <p>
                Current Friends
                <Badge light>{props.friends && props.friends.length}</Badge>
            </p>
            <FriendsList>
                {props.friends ? (
                    props.friends.map(friend => (
                        <FriendCard key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                <UserProfilePic
                                    avatar={friend.avatar}
                                    username={friend.username}
                                />
                                <div>{friend.first + " " + friend.last}</div>
                            </Link>
                            <Button
                                primary
                                onClick={() => disconnect(friend.id)}
                            >
                                Disconnect
                            </Button>
                        </FriendCard>
                    ))
                ) : (
                    <p>You do not have any friendships</p>
                )}
            </FriendsList>
            <p>
                Pending Friends
                <Badge light>{props.pending && props.pending.length}</Badge>
            </p>
            <FriendsList>
                {props.pending ? (
                    props.pending.map(friend => (
                        <FriendCard key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                <UserProfilePic
                                    avatar={friend.avatar}
                                    username={friend.username}
                                />
                                <div>{friend.first + " " + friend.last}</div>
                            </Link>
                            <Button primary onClick={() => accept(friend.id)}>
                                Accept
                            </Button>
                            <Button onClick={() => reject(friend.id)}>
                                Decline
                            </Button>
                        </FriendCard>
                    ))
                ) : (
                    <p>No pending friend requests</p>
                )}
            </FriendsList>
        </React.Fragment>
    );
}
const mapStateToProps = function(state) {
    return {
        friends:
            state.friends &&
            state.friends.filter(friend => friend.accepted == true),
        pending:
            state.friends &&
            state.friends.filter(pending => pending.accepted == false)
    };
};

export default connect(mapStateToProps)(Friends);
