import {FetchServerJson} from './fetch-server-json';
import IMessage from "../models/IMessage";
const authApiMessagePath = '/api/message';

const fetchServerJson = new FetchServerJson();

export class  MessageFetchAdapter {
  static async getChatMessages(token: string, chatId: string): Promise<IMessage[]> {
    return await fetchServerJson.get(`${authApiMessagePath}/${chatId}`,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async sendChatMessage(token: string, chatId: string, content: string): Promise<IMessage> {
    const messageInfo = JSON.stringify({content});

    return await fetchServerJson.post(`${authApiMessagePath}/new/${chatId}`, messageInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

}

