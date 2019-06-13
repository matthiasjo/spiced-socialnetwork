export default function reducer(state = {}, action) {
    if (action.type === "ADD_LIST_ANIMALS") {
        //add list to global state
        // use spread operator or Object.assign()
        return { ...state, listAnimals: action.listAnimals };
    }
    return state;
}
