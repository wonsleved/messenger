import {CHAT_MESSAGE} from "./message-events";
import {ws} from "./initialization";

export function sendMessage(chatId: string, body: string) {

    if (!ws) return;

    const message = {
        event: CHAT_MESSAGE,
        payload: {
            chatId,
            body
        }
    }

    ws.send(JSON.stringify(message));
}

