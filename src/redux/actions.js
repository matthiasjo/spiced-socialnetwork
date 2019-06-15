import axios from "../components/axios";

export function getListOfFriends() {
    return axios.get("/friends-list").then(({ data }) => {
        return {
            type: "ADD_LIST_FRIENDS",
            friends: data.friends
        };
    });
}

export async function endFriendship(userId) {
    let disconnect = await axios.post(`/friendStatus/${userId}`, {
        friendship: true,
        rejectFlag: false
    });
    if (disconnect.data.success) {
        return {
            type: "DISCONNECT_FRIENDS",
            data: userId
        };
    }
    return {};
}
export async function acceptFriendship(userId) {
    let disconnect = await axios.post(`/friendStatus/${userId}`, {
        friendship: "pending",
        rejectFlag: false
    });
    if (disconnect.data.success) {
        return {
            type: "ACCEPT_FRIEND",
            data: userId
        };
    }
    return {};
}

export async function rejectFriendship(userId) {
    let disconnect = await axios.post(`/friendStatus/${userId}`, {
        friendship: "pending",
        rejectFlag: true
    });
    if (disconnect.data.success) {
        return {
            type: "REJECT_FRIEND",
            data: userId
        };
    }
    return {};
}
