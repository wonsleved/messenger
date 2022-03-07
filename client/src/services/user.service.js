import {UserFetchAdapter} from "../adapters/UserFetchAdapter.js";
import {AuthService} from "./auth.service.js";
import {ResponseException} from "../exceptions/response.exception.js";

export class UserService {
  static async getContacts() {
    try {
      let accessToken = localStorage.getItem('messenger-token');

      return await UserFetchAdapter.getContacts(accessToken);
    } catch (error) {
      if (error instanceof ResponseException) {
        if (error.status === 401) {
          let accessToken = await AuthService.refresh();

          if (accessToken)
            return await UserFetchAdapter.getContacts(accessToken);
        }
      }

        console.log(error.message);
    }
  }

}




