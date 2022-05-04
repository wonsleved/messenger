import {UserFetchAdapter} from "../adapters/user-fetch-adapter";
import {handleAuthError} from "./error-handlers";
import {getAccessToken} from "./access-token-action";
import IUser from "../models/IUser";
import IChat from "../models/IChat";
// import {CONTACTS_UPDATE, CHATS_UPDATE} from "../store/actions";

export class UserService {
  static async getContacts(): Promise<IUser[]> {
    try {

      const accessToken = getAccessToken();

      return await UserFetchAdapter.getToContacts(accessToken);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, UserService.getContacts.bind(null, ...arguments));
    }
  }

  static async addToContacts(username: string): Promise<string> {
    try {

      const accessToken = getAccessToken();
      const userData = await UserFetchAdapter.findByUsername(accessToken, username);
      const userId = userData.id;

      return await UserFetchAdapter.addToContacts(accessToken, userId);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, UserService.addToContacts.bind(null, ...arguments));
    }
  }

  static async getMyInfo(): Promise<IUser> {
    try {

      const accessToken = getAccessToken();

      return await UserFetchAdapter.getMyInfo(accessToken);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, UserService.getMyInfo.bind(null, ...arguments));
    }
  }

  static async findByUsername(username: string): Promise<IUser> {
    try {

      const accessToken = getAccessToken();

      return await UserFetchAdapter.findByUsername(accessToken, username);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, UserService.findByUsername.bind(null, ...arguments));
    }
  }

  static async removeFromContacts(username: string): Promise<string> {
    try {

      const accessToken = getAccessToken();
      const userData = await UserFetchAdapter.findByUsername(accessToken, username);
      const userId = userData.id;

      return await UserFetchAdapter.removeFromContacts(accessToken, userId);
    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, UserService.removeFromContacts.bind(null, ...arguments));
    }
  }

  static async getChats(): Promise<IChat[]> {
    try {

      const accessToken = getAccessToken();

      return await UserFetchAdapter.getChats(accessToken);

    } catch (error: any) {
      // @ts-ignore
      return await handleAuthError(error, UserService.getChats.bind(null, ...arguments));
    }
  }

}




