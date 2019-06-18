import { chatMessages, chatMessage } from "../redux/actions";
import * as io from "socket.io-client";

let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));
        socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
    }
};
