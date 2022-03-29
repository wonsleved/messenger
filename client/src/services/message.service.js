import {UserFetchAdapter} from "../adapters/user-fetch-adapter.js";
import {MessageFetchAdapter} from "../adapters/message-fetch.adapter";
import {handleAuthError} from "./error-handlers";
import {getAccessToken} from "./access-token-action";
import {CONTACTS_UPDATE, CHATS_UPDATE} from "../store/actions";

export class MessageService {
  static async getChatMessages(chatId) {
    try {

      const accessToken = getAccessToken();

      return await MessageFetchAdapter.getChatMessages(accessToken, chatId);
    } catch (error) {
      return await handleAuthError(error, MessageFetchAdapter.getChatMessages.bind(null, ...arguments));
    }
  }

  static async sendChatMessage(chatId, content) {
    try {

      const accessToken = getAccessToken();

      return await MessageFetchAdapter.sendChatMessage(accessToken, chatId, content);
    } catch (error) {
      return await handleAuthError(error, MessageFetchAdapter.sendChatMessage.bind(null, ...arguments));
    }
  }

}




