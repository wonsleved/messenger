import {UserFetchAdapter} from "../adapters/user-fetch-adapter.js";
import {handleAuthError} from "./error-handlers";
import {getAccessToken} from "./access-token-action";

export class UserService {
  static async getContacts() {
    try {

      const accessToken = getAccessToken();

      return await UserFetchAdapter.getToContacts(accessToken);

    } catch (error) {
      return await handleAuthError(error, UserService.getContacts.bind(null, ...arguments));
    }
  }

  static async addToContacts(username) {
    try {

      const accessToken = getAccessToken();
      const userData = await UserFetchAdapter.findByUsername(accessToken, username);
      const userId = userData.id;

      return await UserFetchAdapter.addToContacts(accessToken, userId);

    } catch (error) {
      return await handleAuthError(error, UserService.addToContacts.bind(null, ...arguments));
    }
  }

  static async getMyInfo() {
    try {

      const accessToken = getAccessToken();

      return await UserFetchAdapter.getMyInfo(accessToken);

    } catch (error) {
      return await handleAuthError(error, UserService.getMyInfo.bind(null, ...arguments));
    }
  }

  static async findByUsername(username) {
    try {

      const accessToken = getAccessToken();

      return await UserFetchAdapter.findByUsername(accessToken, username);

    } catch (error) {
      return await handleAuthError(error, UserService.findByUsername.bind(null, ...arguments));
    }
  }

  static async removeFromContacts(username) {
    try {

      const accessToken = getAccessToken();
      const userData = await UserFetchAdapter.findByUsername(accessToken, username);
      const userId = userData.id;

      return await UserFetchAdapter.removeFromContacts(accessToken, userId);
    } catch (error) {
      return await handleAuthError(error, UserService.removeFromContacts.bind(null, ...arguments));
    }
  }

  static async getChats() {
    try {

      const accessToken = getAccessToken();

      return await UserFetchAdapter.getChats(accessToken);

    } catch (error) {
      return await handleAuthError(error, UserService.getChats.bind(null, ...arguments));

    }
  }

}




