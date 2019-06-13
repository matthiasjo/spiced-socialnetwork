import React from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./profilepic";
import { useState, useEffect } from "react";
import { FriendRequest } from "./friendrequest";
import axios from "./axios";

export function UserSearch() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const handleChange = e => {
        setName(e.target.value);
    };
    useEffect(
        () => {
            var abort;
            axios
                .get("/userSearch", {
                    params: {
                        name: name
                    }
                })
                .then(response => {
                    if (!abort) {
                        setUsers(response.data.users);
                    }
                })
                .catch(err => console.log(err));
            return () => {
                abort = true;
            };
        },
        [name]
    );

    return (
        <React.Fragment>
            <input onChange={handleChange} />
            {users.length ? (
                users.map(user => (
                    <div key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            <ProfilePic
                                avatar={user.avatar}
                                username={user.username}
                            />
                            {user.first + " " + user.last}
                        </Link>
                        <FriendRequest requestId={user.id} />
                    </div>
                ))
            ) : (
                <p>No Users Found</p>
            )}
        </React.Fragment>
    );
}
