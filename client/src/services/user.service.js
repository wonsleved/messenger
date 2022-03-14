import {UserFetchAdapter} from "../adapters/user-fetch-adapter.js";
import {AuthService} from "./auth.service.js";
import {ResponseException} from "../exceptions/response.exception.js";

export class UserService {
  static async getContacts() {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await UserFetchAdapter.getToContacts(accessToken);
    } catch (error) {
      await handleError(error);

      return null;
    }
  }

  static async addToContacts(username) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      const userData = await UserFetchAdapter.findByUsername(accessToken, username);

      const userId = userData.id;

      return await UserFetchAdapter.addToContacts(accessToken, userId);
    } catch (error) {
      await handleError(error);

      return null;
    }
  }

  static async getMyInfo() {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await UserFetchAdapter.getMyInfo(accessToken);
    } catch (error) {
      await handleError(error);

      return null;

    }
  }

  static async findByUsername(username) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await UserFetchAdapter.findByUsername(accessToken, username);
    } catch (error) {
      await handleError(error);

      return null;

    }
  }

  static async removeFromContacts(username) {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      const userData = await UserFetchAdapter.findByUsername(accessToken, username);

      const userId = userData.id;

      return await UserFetchAdapter.removeFromContacts(accessToken, userId);
    } catch (error) {
      await handleError(error);

      return null;

    }
  }

  static async getChats() {
    try {
      const accessToken = localStorage.getItem('messenger-token');

      return await UserFetchAdapter.getChats(accessToken);
    } catch (error) {
      await handleError(error);

      return null;

    }
  }

}






async function handleError(error) {
  if (error instanceof ResponseException) {
    if (error.status === 401) {
      const accessToken = await AuthService.refresh();

      if (accessToken)
        return await UserFetchAdapter.getToContacts(accessToken);
    }
  }

  console.log(error.message);
}



