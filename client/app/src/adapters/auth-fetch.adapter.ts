import {FetchServerJson} from './fetch-server-json';
import {TokenType} from "../type";
import IUser from "../models/IUser";
import ICredentials from "../models/ICredentials";
const authApiPath = '/api/auth';

const fetchServerJson = new FetchServerJson();

export class  AuthFetchAdapter {
  static async register(credentials: ICredentials)
      : Promise<{user: IUser, accessToken: TokenType}> {

    return await fetchServerJson.post(`${authApiPath}/register`, JSON.stringify(credentials));
  }

  static async login(credentials: ICredentials)
      : Promise<{user: IUser, accessToken: TokenType}> {

    return await fetchServerJson.post(`${authApiPath}/login`, JSON.stringify(credentials));
  }

  static async logout(token: TokenType) {
    return await fetchServerJson.post(`${authApiPath}/logout`, '', {
      'Authorization': `Bearer ${token}`
    });
  }

  static async refresh() {
    return await fetchServerJson.get(`${authApiPath}/refresh`);
  }
}

