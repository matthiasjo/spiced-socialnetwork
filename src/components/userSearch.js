import React from "react";
import ReactDOM from "react-dom";
import ProfilePic from "./profilepic";
import { useState, useEffect } from "react";
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
            console.log("name", name);
            axios
                .get("/userSearch", {
                    params: {
                        name: name
                    }
                })
                .then(response => {
                    if (!abort) {
                        setUsers(response.data.users);
                        console.log("users", users);
                        return () => {
                            abort = true;
                            console.log("abort", abort);
                        };
                    }
                })
                .catch(err => console.log(err));
        },
        [name]
    );

    return (
        <React.Fragment>
            <input type="text" onChange={handleChange} />
            {users.length &&
                users.map(user => (
                    <div key={user.id}>
                        <ProfilePic
                            avatar={user.avatar}
                            username={user.username}
                        />
                        {user.first + " " + user.last}
                    </div>
                ))}
        </React.Fragment>
    );
}
