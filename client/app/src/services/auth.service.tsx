import {AuthFetchAdapter} from "../adapters/auth-fetch.adapter";
import {handleError} from "./error-handlers";
import { setAccessToken, removeAccessToken, getAccessToken } from "./access-token-action";
import {TokenType} from "../type";
import IUser from "../models/IUser";
import ICredentials from "../models/ICredentials";

export class AuthService {

  static async register(credentials: ICredentials): Promise<IUser | null> {
    try {

      const {user, accessToken} = await AuthFetchAdapter.register(credentials);

      setAccessToken(accessToken);

      return user;

    } catch (error: any) {
      return handleError(error);
    }
  }

  static async login(credentials: ICredentials): Promise<IUser | null> {
    try {

      const {user, accessToken} = await AuthFetchAdapter.login(credentials);
      setAccessToken(accessToken);

      return user;

    } catch (error: any) {
      return handleError(error);
    }
  }

  static async logout(): Promise<IUser | null> {
    try {

      let accessToken = getAccessToken();
      let userData = await AuthFetchAdapter.logout(accessToken);
      removeAccessToken();

      return userData;

    } catch (error: any) {
      return handleError(error);

    }
  }

  static async refresh(): Promise<TokenType | null> {
    try {

      let {accessToken} = await AuthFetchAdapter.refresh();
      setAccessToken(accessToken);

      return accessToken;
    } catch (error: any) {
      return null;
    }
  }
}



