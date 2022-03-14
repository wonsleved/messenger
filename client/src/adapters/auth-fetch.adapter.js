import {FetchServerJson} from './fetch-server-json.js';
const authApiPath = '/api/auth';

const fetchServerJson = new FetchServerJson();

export class  AuthFetchAdapter {
  static async register(username, name, password) {
    let credentials = {username, name, password};

    return await fetchServerJson.post(`${authApiPath}/register`, JSON.stringify(credentials));
  }

  static async login(username, password) {
    let credentials = {username, password};

    return await fetchServerJson.post(`${authApiPath}/login`, JSON.stringify(credentials));
  }

  static async logout(token) {
    return await fetchServerJson.post(`${authApiPath}/logout`, '', {
      'Authorization': `Bearer ${token}`
    });
  }

  static async refresh() {
    return await fetchServerJson.get(`${authApiPath}/refresh`);
  }
}

