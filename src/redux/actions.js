import axios from "./axios";

//// ALL AXIOS REQUESTS WILL GO INTO THIS FILE

export function getListOfAnimals() {
    return axios.get("/get-list-animals").then(({ data }) => {
        return {
            type: "ADD_LIST_ANIMALS",
            listAnimals: data
        };
    });
}
