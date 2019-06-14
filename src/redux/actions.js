import axios from "../components/axios";

//// ALL AXIOS REQUESTS WILL GO INTO THIS FILE

export function getListOfFriends() {
    return axios.get("/friends-list").then(({ data }) => {
        console.log(data.friends, "data");
        return {
            type: "ADD_LIST_FRIENDS",
            friends: data.friends
        };
    });
}
