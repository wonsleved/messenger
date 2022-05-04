import {FetchServerJson} from './fetch-server-json';
import {
  CHATS_UPDATE,
  CHAT_DELETE,
  CHAT_LEAVE,
  CHAT_REMOVE_PARTICIPANT,
  CHAT_ADD_PARTICIPANT,
  CHAT_CREATED} from "../websockets/message-events";
import {ws} from "../websockets/initialization";
import IChat from "../models/IChat";
import IUser from "../models/IUser";

const authApiChatPath = '/api/chat';

const fetchServerJson = new FetchServerJson();

export class  ChatFetchAdapter {
  static async writeUser(token: string, userId: string): Promise<IChat> {
    const chatData = await fetchServerJson.post(`${authApiChatPath}/write/${userId}`, '', {
      'Authorization': `Bearer ${token}`
    });

    ws.send(JSON.stringify({event: CHATS_UPDATE, payload: {chatId: chatData.id}}));

    return chatData;
  }

  static async getChatInfo(token: string, chatId: string): Promise<IChat> {
    return await fetchServerJson.get(`${authApiChatPath}/data/${chatId}`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async getChatParticipants(token: string, chatId: string): Promise<IUser[]> {
    return await fetchServerJson.get(`${authApiChatPath}/participants/${chatId}`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async newGroupChat(token: string, title: string): Promise<IChat> {
    const chatInfo = JSON.stringify({title})

    const chatData = await fetchServerJson.post(`${authApiChatPath}/new`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    ws.send(JSON.stringify({event: CHAT_CREATED, payload: {chatId: chatData.id}}));

    return chatData;
  }

  static async deleteChat(token: string, chatId: string): Promise<IChat> {
    const chatInfo = JSON.stringify({chatId})

    const chatData = await fetchServerJson.delete(`${authApiChatPath}/`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    ws.send(JSON.stringify({event: CHAT_DELETE, payload: {chatId}}));

    return chatData;
  }

  static async addToChat(token: string, chatId: string, userId: string): Promise<IChat> {
    const chatInfo = JSON.stringify({
      userId,
      chatId
    })

    const chatData = await fetchServerJson.post(`${authApiChatPath}/add`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    ws.send(JSON.stringify({event: CHAT_ADD_PARTICIPANT, payload: {chatId, userId}}));

    return chatData;
  }

  static async removeFromChat(token: string, chatId: string, userId: string = ''): Promise<IChat> {
    const chatInfo = JSON.stringify({
      userId,
      chatId
    })

    const chatData = await fetchServerJson.delete(`${authApiChatPath}/remove`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    ws.send(JSON.stringify({event: CHAT_REMOVE_PARTICIPANT, payload: {chatId, userId}}));

    return chatData;
  }

  static async leaveFromChat(token: string, chatId: string): Promise<IChat> {
    const chatInfo = JSON.stringify({chatId})

    const chatData = await fetchServerJson.post(`${authApiChatPath}/leave`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });

    ws.send(JSON.stringify({event: CHAT_LEAVE, payload: {chatId}}));

    return chatData;
  }

  static async getPrivateChatAddressee(token: string, chatId: string): Promise<IUser> {
    return await fetchServerJson.get(`${authApiChatPath}/addressee/${chatId}`,{
      'Authorization': `Bearer ${token}`
    });
  }
}




