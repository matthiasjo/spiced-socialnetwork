import React from "react";
import { Link } from "react-router-dom";
import { UserProfilePic } from "../theme/profilepicStyle";
import { useState, useEffect } from "react";
import { FriendRequest } from "./friendrequest";
import axios from "./axios";
import { Container, FormControl } from "styled-bootstrap-components";
import { Label, Error } from "../theme/welcomeStyle";

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
        <Container style={{ paddingTop: "3rem" }}>
            <FormControl onChange={handleChange} />
            <Label>Search by name, username or exact email</Label>
            {users.length ? (
                users.map(user => (
                    <div key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            <UserProfilePic
                                avatar={user.avatar}
                                username={user.username}
                            />
                            {user.first + " " + user.last}
                        </Link>
                        <FriendRequest requestId={user.id} />
                    </div>
                ))
            ) : (
                <Error info>No Users Found</Error>
            )}
        </Container>
    );
}
