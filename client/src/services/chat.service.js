import {ChatFetchAdapter} from "../adapters/chat-fetch-adapter";
import {UserFetchAdapter} from "../adapters/user-fetch-adapter";
import {ResponseException} from "../exceptions/response.exception";
import {AuthService} from "./auth.service";

export class ChatService {
  static async newPrivateChat(username) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await ChatFetchAdapter.newPrivateChat(accessToken, username);
    } catch (error) {
      await handleError(error);
    }
  }

  static async getChatInfo(chatId) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await ChatFetchAdapter.getChatInfo(accessToken, chatId);
    } catch (error) {
      await handleError(error);
    }
  }

  static async getChatParticipants(chatId) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await ChatFetchAdapter.getChatParticipants(accessToken, chatId);
    } catch (error) {
      await handleError(error);
    }
  }

  static async newGroupChat(title) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await ChatFetchAdapter.newGroupChat(accessToken, title);
    } catch (error) {
      await handleError(error);
    }
  }

  static async deleteChat(chatId) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await ChatFetchAdapter.deleteChat(accessToken, chatId);
    } catch (error) {
      await handleError(error);
    }
  }

  static async addToChat(chatId, userId) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await ChatFetchAdapter.addToChat(accessToken, chatId, userId);
    } catch (error) {
      await handleError(error);
    }
  }

  static async removeFromChat(chatId, userId) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId, userId);
    } catch (error) {
      await handleError(error);
    }
  }

  static async leaveFromChat(chatId) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId);
    } catch (error) {
      await handleError(error);
    }
  }

  static async getPrivateChatAddressee(chatId) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await ChatFetchAdapter.removeFromChat(accessToken, chatId);
    } catch (error) {
      await handleError(error);
    }
  }
}



async function handleError(error) {
  if (error instanceof ResponseException) {
    if (error.status === 401) {
      const accessToken = await AuthService.refresh();

      if (accessToken)
        return await UserFetchAdapter.getToContacts(accessToken);
    }
  }

  console.log(error.message);
}



