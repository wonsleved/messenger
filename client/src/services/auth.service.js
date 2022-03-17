import {AuthFetchAdapter} from "../adapters/auth-fetch.adapter.js";
import {handleError} from "./error-handlers";
import { setAccessToken, removeAccessToken, getAccessToken } from "./access-token-action";

export class AuthService {

  static async register(username, name, password) {
    try {

      const {user, accessToken} = await AuthFetchAdapter.register(username, name, password);
      setAccessToken(accessToken);

      return user;

    } catch (error) {
      return handleError(error);
    }
  }

  static async login(username, password) {
    try {

      const {user, accessToken} = await AuthFetchAdapter.login(username, password);
      setAccessToken(accessToken);

      return user;

    } catch (error) {
      return handleError(error);
    }
  }

  static async logout() {
    try {

      let accessToken = getAccessToken();
      let userData = await AuthFetchAdapter.logout(accessToken);
      removeAccessToken();

      return userData;

    } catch (error) {
      return handleError(error);

    }
  }

  static async refresh() {
    try {

      let {accessToken} = await AuthFetchAdapter.refresh();
      setAccessToken(accessToken);

      return accessToken;
    } catch (error) {
      // if (window.getErrorEvent)
      //   document.dispatchEvent(window.getErrorEvent(e.message));

      // ???? Ошибка должна прокидываться дальше

      return null;
    }
  }
}



