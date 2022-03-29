import {FetchServer} from './fetch-server.js';

export class FetchServerJson {

  _fetchServer;

  constructor(serverAddress) {
    this._fetchServer = new FetchServer(serverAddress);
  }

  async get(path, headers = {}) {

    return await this._fetchServer.get(path, {
      'Content-Type': 'application/json',
      ...headers
    });
  }

  async post(path, body, headers = {}) {
    return await this._fetchServer.post(path, body, {
      'Content-Type': 'application/json',
      ...headers
    });
  }

  async delete(path, body, headers = {}) {
    return await this._fetchServer.delete(path, body, {
      'Content-Type': 'application/json',
      ...headers
    });
  }

  async put(path, body, headers = {}) {
    return await this._fetchServer.put(path, body, {
      'Content-Type': 'application/json',
      ...headers
    });
  }
}