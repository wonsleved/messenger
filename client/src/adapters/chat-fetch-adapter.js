import {FetchServerJson} from './fetch-server-json.js';
import {ResponseException} from "../exceptions/response.exception";
import {AuthService} from "../services/auth.service";
import {UserFetchAdapter} from "./user-fetch-adapter";
import {CHAT_MESSAGE,
  ERROR_OCCUR,
  CHATS_UPDATE,
  CHAT_DELETE,
  CHAT_LEAVE,
  CHAT_REMOVE_PARTICIPANT,
  CHAT_ADD_PARTICIPANT,
  CHAT_CREATED} from "../web-sockets/message-events";

const authApiChatPath = '/api/chat';

const fetchServerJson = new FetchServerJson();

export class  ChatFetchAdapter {
  static async writeUser(token, userId) {
    const chatData = await fetchServerJson.post(`${authApiChatPath}/write/${userId}`, '', {
      'Authorization': `Bearer ${token}`
    });

    window.webSocket.send(JSON.stringify({event: CHATS_UPDATE, payload: {chatId: chatData.id}}));

    return chatData;
  }

  static async getChatInfo(token, chatId) {
    return await fetchServerJson.get(`${authApiChatPath}/data/${chatId}`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async getChatParticipants(token, chatId) {
    return await fetchServerJson.get(`${authApiChatPath}/participants/${chatId}`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async newGroupChat(token, title) {
    const chatInfo = JSON.stringify({title})

    const chatData = await fetchServerJson.post(`${authApiChatPath}/new`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    window.webSocket.send(JSON.stringify({event: CHAT_CREATED, payload: {chatId: chatData.id}}));

    return chatData;
  }

  static async deleteChat(token, chatId) {
    const chatInfo = JSON.stringify({chatId})

    const chatData = await fetchServerJson.delete(`${authApiChatPath}/`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    window.webSocket.send(JSON.stringify({event: CHAT_DELETE, payload: {chatId}}));

    return chatData;
  }

  static async addToChat(token, chatId, userId) {
    const chatInfo = JSON.stringify({
      userId,
      chatId
    })

    const chatData = await fetchServerJson.post(`${authApiChatPath}/add`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    window.webSocket.send(JSON.stringify({event: CHAT_ADD_PARTICIPANT, payload: {chatId, userId}}));

    return chatData;
  }

  static async removeFromChat(token, chatId, userId) {
    const chatInfo = JSON.stringify({
      userId,
      chatId
    })

    const chatData = await fetchServerJson.delete(`${authApiChatPath}/remove`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    window.webSocket.send(JSON.stringify({event: CHAT_REMOVE_PARTICIPANT, payload: {chatId, userId}}));

    return chatData;
  }

  static async leaveFromChat(token, chatId) {
    const chatInfo = JSON.stringify({chatId})

    const chatData = await fetchServerJson.post(`${authApiChatPath}/leave`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    window.webSocket.send(JSON.stringify({event: CHAT_LEAVE, payload: {chatId}}));

    return chatData;
  }

  static async getPrivateChatAddressee(token, chatId) {
    return await fetchServerJson.get(`${authApiChatPath}/addressee/${chatId}`,{
      'Authorization': `Bearer ${token}`
    });
  }
}




