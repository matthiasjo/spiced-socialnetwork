export default function reducer(state = {}, action) {
    if (action.type === "ADD_LIST_FRIENDS") {
        //add list to global state
        // use spread operator or Object.assign()
        return { ...state, friends: action.friends };
    }
    return state;
}
