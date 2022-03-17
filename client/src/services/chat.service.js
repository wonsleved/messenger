import {ChatFetchAdapter} from "../adapters/chat-fetch-adapter";
import {handleAuthError} from "./error-handlers";
import {getAccessToken} from "./access-token-action";

export class ChatService {
  static async newPrivateChat(username) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.newPrivateChat(accessToken, username);

    } catch (error) {
      return await handleAuthError(error, ChatService.newPrivateChat.bind(null, arguments));
    }
  }

  static async getChatInfo(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.getChatInfo(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.getChatInfo.bind(null, arguments));
    }
  }

  static async getChatParticipants(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.getChatParticipants(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.getChatParticipants.bind(null, arguments));
    }
  }

  static async newGroupChat(title) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.newGroupChat(accessToken, title);

    } catch (error) {
      return await handleAuthError(error, ChatService.newGroupChat.bind(null, arguments));
    }
  }

  static async deleteChat(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.deleteChat(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.deleteChat.bind(null, arguments));
    }
  }

  static async addToChat(chatId, userId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.addToChat(accessToken, chatId, userId);

    } catch (error) {
      return await handleAuthError(error, ChatService.addToChat.bind(null, arguments));
    }
  }

  static async removeFromChat(chatId, userId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId, userId);

    } catch (error) {
      return await handleAuthError(error, ChatService.removeFromChat.bind(null, arguments));
    }
  }

  static async leaveFromChat(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.leaveFromChat.bind(null, arguments));
    }
  }

  static async getPrivateChatAddressee(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.getPrivateChatAddressee.bind(null, arguments));
    }
  }
}




