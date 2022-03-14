import {FetchServerJson} from './fetch-server-json.js';
const authApiUserPath = '/api/user';

const fetchServerJson = new FetchServerJson();

export class  UserFetchAdapter {
  static async getToContacts(token) {
    return await fetchServerJson.get(`${authApiUserPath}/contacts`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async getMyInfo(token) {
    return await fetchServerJson.get(`${authApiUserPath}/`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async findByUsername(token, username) {
    return await fetchServerJson.get(`${authApiUserPath}/find/${username}`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async findById(token, userId) { // not needed in services
    return await fetchServerJson.get(`${authApiUserPath}/data/${userId}`, {
      'Authorization': `Bearer ${token}`
    });
  }

  static async addToContacts(token, contactId) {
    const chatInfo = JSON.stringify({contactId});

    return await fetchServerJson.post(`${authApiUserPath}/contacts/add`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async removeFromContacts(token, contactId) {
    const chatInfo = JSON.stringify({contactId});

    return await fetchServerJson.post(`${authApiUserPath}/contacts/remove`, chatInfo,{
      'Authorization': `Bearer ${token}`
    });
  }

  static async getChats(token) {
    return await fetchServerJson.get(`${authApiUserPath}/chats`, {
      'Authorization': `Bearer ${token}`
    });
  }
}

