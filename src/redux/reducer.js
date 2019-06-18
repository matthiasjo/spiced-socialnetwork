export default function reducer(state = {}, action) {
    if (action.type === "ADD_LIST_FRIENDS") {
        return { ...state, friends: action.friends };
    }
    if (action.type === "DISCONNECT_FRIENDS") {
        return {
            ...state,
            friends: state.friends.filter(friend => friend.id != action.data)
        };
    }
    if (action.type === "ACCEPT_FRIEND") {
        return {
            ...state,
            friends: state.friends.map(friend => {
                if (friend.id == action.data) {
                    friend.accepted = true;
                }
                return friend;
            })
        };
    }
    if (action.type === "REJECT_FRIEND") {
        return {
            ...state,
            friends: state.friends.filter(friend => friend.id != action.data)
        };
    }
    if (action.type === "LATEST_MESSAGES") {
        return { ...state, chatMessages: action.data };
    }
    if (action.type === "NEWEST_MESSAGE") {
        return { ...state, chatMessages: [...state.chatMessages, action.data] };
    }
    return state;
}
