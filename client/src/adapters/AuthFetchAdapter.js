import {FetchServerJson} from './FetchServerJson.js';

const fetchServerJson = new FetchServerJson();

export class  AuthFetchAdapter {

  static async register(username, name, password) {

    let credentials = {username, name, password};

    let userData = await fetchServerJson.post('/api/auth/register', JSON.stringify(credentials));

    return userData;
  }

  static async login(username, password) {

    let credentials = {username, password};

    let userData = await fetchServerJson.post('/api/auth/login', JSON.stringify(credentials));

    return userData;
  }



}

