import { CHAT_MESSAGE, ERROR_OCCUR, CHATS_UPDATE } from './message-events';
import {handleError} from "../services/error-handlers";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {dispatch, getState} from "../store";
import {addMessage, chatChange, chatsLoaded, messagesLoaded} from "../store/reducers/messenger.slice";
import IMessage from "../models/IMessage";
import {UserService} from "../services/user.service";
const THROTTLE_TIME = 5000;

type MessageType = {
    event: string,
    payload: any
}

export async function dispatcher(message: MessageType) {
    switch (message.event) {
        case CHAT_MESSAGE: {
            return chatMessageEvent(message.payload);
        }
        case ERROR_OCCUR: {
            return handleError(message.payload);
        }
        case CHATS_UPDATE: {
            return updateChatsThrottled();
        }
        default: {
            console.log('Unknown type of message: ', message.event);
        }
    }

}

async function chatMessageEvent(payload: any): Promise<void> {
    if (!payload || !payload.body)
        return alert('Error with payload');

    const currentChat = getState().rootReducer.messenger.currentChat;

    if (payload.chatId !== currentChat?.id) return;

    let messageInfo: IMessage = {
        authorName: payload.authorName,
        body: payload.body,
        registry: payload.registry,
        date: payload.date,
    }

    dispatch(addMessage(messageInfo));
}

async function updateChats(): Promise<void> {
    const chats = await UserService.getChats();
    const currentChat = getState().rootReducer.messenger.currentChat;

    if (currentChat && !chats.find(chat => chat.id === currentChat.id)) {
        dispatch(chatChange(null));
        dispatch(messagesLoaded([]));
    }

    dispatch(chatsLoaded(chats));
}

const updateChatsThrottled = throttle(updateChats, THROTTLE_TIME);


export function throttle(func: Function, time: number): Function {
    let lastCall: number;
    let timer: TimeoutId | null;

    return function (args?: IArguments) {
        let now = Date.now();
        // @ts-ignore
        let bindThis: any = this;

        const funcToCall = () => {
            timer = null;
            func.call(bindThis, args);
        }

        if (!lastCall || (now - lastCall) > time) {
            lastCall = now;
            func(args);
        } else if (!timer) {
            timer = setTimeout(funcToCall, time);
        }

    }
}