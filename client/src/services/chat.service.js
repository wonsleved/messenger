import {ChatFetchAdapter} from "../adapters/chat-fetch-adapter";
import {handleAuthError} from "./error-handlers";
import {getAccessToken} from "./access-token-action";
import {UserFetchAdapter} from "../adapters/user-fetch-adapter";

export class ChatService {
  static async writeUser(userId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.writeUser(accessToken, userId);

    } catch (error) {
      return await handleAuthError(error, ChatService.writeUser.bind(null, ...arguments));
    }
  }

  static async getChatInfo(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.getChatInfo(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.getChatInfo.bind(null, ...arguments));
    }
  }

  static async getChatParticipants(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.getChatParticipants(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.getChatParticipants.bind(null, ...arguments));
    }
  }

  static async newGroupChat(title) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.newGroupChat(accessToken, title);

    } catch (error) {
      return await handleAuthError(error, ChatService.newGroupChat.bind(null, ...arguments));
    }
  }

  static async deleteChat(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.deleteChat(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.deleteChat.bind(null, ...arguments));
    }
  }

  static async addToChat(chatId, username) {
    try {

      const accessToken = getAccessToken();

      const userData = await UserFetchAdapter.findByUsername(accessToken, username);
      const userId = userData.id;

      return await ChatFetchAdapter.addToChat(accessToken, chatId, userId);

    } catch (error) {
      return await handleAuthError(error, ChatService.addToChat.bind(null, ...arguments));
    }
  }

  static async removeFromChat(chatId, username) {
    try {

      const accessToken = getAccessToken();

      const userData = await UserFetchAdapter.findByUsername(accessToken, username);
      const userId = userData.id;

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId, userId);

    } catch (error) {
      return await handleAuthError(error, ChatService.removeFromChat.bind(null, ...arguments));
    }
  }

  static async leaveFromChat(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.leaveFromChat(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.leaveFromChat.bind(null, ...arguments));
    }
  }

  static async getPrivateChatAddressee(chatId) {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId);

    } catch (error) {
      return await handleAuthError(error, ChatService.getPrivateChatAddressee.bind(null, ...arguments));
    }
  }
}




