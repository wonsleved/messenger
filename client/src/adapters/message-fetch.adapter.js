import {FetchServerJson} from './fetch-server-json.js';
const authApiMessagePath = '/api/message';

const fetchServerJson = new FetchServerJson();

export class  MessageFetchAdapter {
  static async getChatMessages(token, chatId) {
    return await fetchServerJson.get(`${authApiMessagePath}/${chatId}`,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async sendChatMessage(token, chatId, content) {
    const messageInfo = JSON.stringify({content});

    return await fetchServerJson.post(`${authApiMessagePath}/new/${chatId}`, messageInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

}

