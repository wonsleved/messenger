import {FetchServerJson} from './fetch-server-json';
import IUser from "../models/IUser";
import IChat from "../models/IChat";
const authApiUserPath = '/api/user';

const fetchServerJson = new FetchServerJson();

export class  UserFetchAdapter {
  static async getToContacts(token: string): Promise<IUser[]> {
    return await fetchServerJson.get(`${authApiUserPath}/contacts`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async getMyInfo(token: string): Promise<IUser> {
    return await fetchServerJson.get(`${authApiUserPath}/`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async findByUsername(token: string, username: string): Promise<IUser> {
    return await fetchServerJson.get(`${authApiUserPath}/find/${username}`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async findById(token: string, userId: string): Promise<IUser> {
    return await fetchServerJson.get(`${authApiUserPath}/data/${userId}`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async addToContacts(token: string, contactId: string): Promise<string> {
    const chatInfo = JSON.stringify({contactId});

    return await fetchServerJson.post(`${authApiUserPath}/contacts/add`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async removeFromContacts(token: string, contactId: string): Promise<string> {
    const chatInfo = JSON.stringify({contactId});

    return await fetchServerJson.post(`${authApiUserPath}/contacts/remove`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async getChats(token: string): Promise<IChat[]> {
    return await fetchServerJson.get(`${authApiUserPath}/chats`, {
      'Authorization': `Bearer ${token}`
    });
  }
}

