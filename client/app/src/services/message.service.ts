import {MessageFetchAdapter} from "../adapters/message-fetch.adapter";
import {handleAuthError} from "./error-handlers";
import {getAccessToken} from "./access-token-action";
import {sendMessage} from "../websockets/send-message";
import IMessage from "../models/IMessage";

export class MessageService {
  static async getChatMessages(chatId: string): Promise<IMessage[]> {
    try {

      const accessToken = getAccessToken();

      return await MessageFetchAdapter.getChatMessages(accessToken, chatId);
    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, MessageFetchAdapter.getChatMessages.bind(null, ...arguments));
    }
  }

  static async sendChatMessage(chatId: string, content: string): Promise<IMessage> {
    try {

      const accessToken = getAccessToken();

      sendMessage(chatId, content);

      return await MessageFetchAdapter.sendChatMessage(accessToken, chatId, content);
    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, MessageFetchAdapter.sendChatMessage.bind(null, ...arguments));
    }
  }

}




