import {FetchServerJson} from './FetchServerJson.js';
const authApiPath = '/api/user';

const fetchServerJson = new FetchServerJson();

export class  UserFetchAdapter {
  static async getContacts(token) {
    return await fetchServerJson.get(`${authApiPath}/contacts`, {
      'Authorization': `Bearer ${token}`
    });
  }
}

