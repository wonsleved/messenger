import {FetchServerJson} from './fetch-server-json.js';
import {ResponseException} from "../exceptions/response.exception";
import {AuthService} from "../services/auth.service";
import {UserFetchAdapter} from "./user-fetch-adapter";
const authApiChatPath = '/api/chat';

const fetchServerJson = new FetchServerJson();

export class  ChatFetchAdapter {
  static async writeUser(token, userId) {
    return await fetchServerJson.post(`${authApiChatPath}/write/${userId}`, '', {
      'Authorization': `Bearer ${token}`
    });
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

    return await fetchServerJson.post(`${authApiChatPath}/new`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async deleteChat(token, chatId) {
    const chatInfo = JSON.stringify({chatId})

    return await fetchServerJson.delete(`${authApiChatPath}/`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async addToChat(token, chatId, userId) {
    const chatInfo = JSON.stringify({
      userId,
      chatId
    })

    return await fetchServerJson.post(`${authApiChatPath}/add`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async removeFromChat(token, chatId, userId) {
    const chatInfo = JSON.stringify({
      userId,
      chatId
    })

    return await fetchServerJson.delete(`${authApiChatPath}/remove`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async leaveFromChat(token, chatId) {
    const chatInfo = JSON.stringify({chatId})

    return await fetchServerJson.post(`${authApiChatPath}/leave`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async getPrivateChatAddressee(token, chatId) {
    return await fetchServerJson.get(`${authApiChatPath}/addressee/${chatId}`,{
      'Authorization': `Bearer ${token}`
    });
  }
}




