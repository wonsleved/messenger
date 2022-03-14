import {AuthFetchAdapter} from "../adapters/auth-fetch.adapter.js";

export class AuthService {

  static async register(username, name, password) {
    try {
      const {user, accessToken} = await AuthFetchAdapter.register(username, name, password);

      localStorage.setItem('messenger-token', accessToken);

      console.log(user);

      return user;

    } catch (e) {
      console.log(e);

      return null;
    }
  }

  static async login(username, password) {
    try {
      const {user, accessToken} = await AuthFetchAdapter.login(username, password);

      localStorage.setItem('messenger-token', accessToken);

      console.log(user);

      return user;

    } catch (e) {
      console.log(e);

      return null;

    }
  }

  static async logout() {
    try {
      let accessToken = localStorage.getItem('token');

      let userData = await AuthFetchAdapter.logout(accessToken);

      localStorage.removeItem('messenger-token');

      console.log(userData);

      return userData;


    } catch (e) {
      console.log(e);

      return null;

    }
  }

  static async refresh() {
    try {
      let {accessToken} = await AuthFetchAdapter.refresh();

      localStorage.setItem('messenger-token', accessToken);

      return accessToken;
    } catch (e) {
      console.log(e);

      return null;
    }
  }

}




