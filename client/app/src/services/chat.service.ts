import {ChatFetchAdapter} from "../adapters/chat-fetch-adapter";
import {handleAuthError} from "./error-handlers";
import {getAccessToken} from "./access-token-action";
import {UserFetchAdapter} from "../adapters/user-fetch-adapter";
import IChat from "../models/IChat";
import IUser from "../models/IUser";

export class ChatService {
  static async writeUser(userId: string): Promise<IChat> {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.writeUser(accessToken, userId);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, ChatService.writeUser.bind(null, ...arguments));
    }
  }

  static async getChatInfo(chatId: string): Promise<IChat> {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.getChatInfo(accessToken, chatId);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, ChatService.getChatInfo.bind(null, ...arguments));
    }
  }

  static async getChatParticipants(chatId: string): Promise<IUser[]> {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.getChatParticipants(accessToken, chatId);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, ChatService.getChatParticipants.bind(null, ...arguments));
    }
  }

  static async newGroupChat(title: string): Promise<IChat> {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.newGroupChat(accessToken, title);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, ChatService.newGroupChat.bind(null, ...arguments));
    }
  }

  static async deleteChat(chatId: string): Promise<IChat> {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.deleteChat(accessToken, chatId);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, ChatService.deleteChat.bind(null, ...arguments));
    }
  }

  static async addToChat(chatId: string, username: string): Promise<IChat> {
    try {

      const accessToken = getAccessToken();

      const userData = await UserFetchAdapter.findByUsername(accessToken, username);
      const userId = userData.id;

      return await ChatFetchAdapter.addToChat(accessToken, chatId, userId);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, ChatService.addToChat.bind(null, ...arguments));
    }
  }

  static async removeFromChat(chatId: string, username: string): Promise<IChat> {
    try {

      const accessToken = getAccessToken();

      const userData = await UserFetchAdapter.findByUsername(accessToken, username);
      const userId = userData.id;

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId, userId);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, ChatService.removeFromChat.bind(null, ...arguments));
    }
  }

  static async leaveFromChat(chatId: string): Promise<IChat> {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.leaveFromChat(accessToken, chatId);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, ChatService.leaveFromChat.bind(null, ...arguments));
    }
  }

  static async getPrivateChatAddressee(chatId: string): Promise<IChat> {
    try {

      const accessToken = getAccessToken();

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, ChatService.getPrivateChatAddressee.bind(null, ...arguments));
    }
  }
}




