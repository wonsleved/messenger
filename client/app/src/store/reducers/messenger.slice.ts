import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../../models/IUser";
import IChat from "../../models/IChat";
import IMessage from "../../models/IMessage";

type SliceState = {
    contacts: IUser[],
    chats: IChat[],
    currentChat: IChat | null,
    currentMessages: IMessage[]
}


const initialState: SliceState = {
    contacts: [],
    chats: [],
    currentChat: null,
    currentMessages: []
}

const chatsLoadedA: CaseReducer<SliceState, PayloadAction<IChat[]>>
    = (state, action) => {
    state.chats = action.payload;
}

const contactsLoadedA: CaseReducer<SliceState, PayloadAction<IUser[]>>
    = (state, action) => {
    state.contacts = action.payload;
}

const addContactA: CaseReducer<SliceState, PayloadAction<IUser>>
    = (state, action) => {
    state.contacts = [...state.contacts, action.payload];
}

const removeContactA: CaseReducer<SliceState, PayloadAction<IUser>>
    = (state, action) => {
    state.contacts = state.contacts.filter(user => user.id !== action.payload.id);
}

const addChatA: CaseReducer<SliceState, PayloadAction<IChat>>
    = (state, action) => {
    state.chats = [...state.chats, action.payload];
}

const removeChatA: CaseReducer<SliceState, PayloadAction<IChat>>
    = (state, action) => {
    state.chats = state.chats.filter(chat => chat.id !== action.payload.id);
}

const chatChangeA: CaseReducer<SliceState, PayloadAction<IChat | null>>
    = (state, action) => {
    state.currentChat = action.payload;
}

const messagesLoadedA: CaseReducer<SliceState, PayloadAction<IMessage[]>>
    = (state, action) => {
    state.currentMessages = action.payload;
}

const addMessageA: CaseReducer<SliceState, PayloadAction<IMessage>>
    = (state, action) => {
    state.currentMessages = [...state.currentMessages, action.payload];
}


const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        chatsLoaded: chatsLoadedA,
        contactsLoaded: contactsLoadedA,
        chatChange: chatChangeA,
        addChat: addChatA,
        removeChat: removeChatA,
        addContact: addContactA,
        removeContact: removeContactA,
        messagesLoaded: messagesLoadedA,
        addMessage: addMessageA
    },
})

export const {
    messagesLoaded,
    addMessage,
    chatsLoaded,
    contactsLoaded,
    addChat,
    removeChat,
    addContact,
    removeContact,
    chatChange
} = messengerSlice.actions;
export default messengerSlice.reducer;



