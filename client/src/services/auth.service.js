import {AuthFetchAdapter} from "../adapters/AuthFetchAdapter.js";

export class AuthService {

  static async register(username, name, password) {
    try {
      const {user, accessToken} = await AuthFetchAdapter.register(username, name, password);

      localStorage.setItem('messenger-token', accessToken);

      console.log(user);

    } catch (e) {
      console.log(e);
    }
  }

  static async login(username, password) {
    try {
      const {user, accessToken} = await AuthFetchAdapter.login(username, password);

      localStorage.setItem('messenger-token', accessToken);

      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }

  static async logout() {
    try {
      let accessToken = localStorage.getItem('token');

      let userData = await AuthFetchAdapter.logout(accessToken);

      localStorage.removeItem('messenger-token');

      console.log(userData);
    } catch (e) {
      console.log(e);
    }
  }

  static async refresh() {
    try {
      let {accessToken} = await AuthFetchAdapter.refresh();

      localStorage.setItem('messenger-token', accessToken);

      return accessToken;
    } catch (e) {
      console.log(e);
    }
  }

}




