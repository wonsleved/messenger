import {ResponseException} from "../exceptions/response.exception.js";
import 'regenerator-runtime/runtime'; // ???

const defaultServerAddress = 'http://192.168.43.201';

export class FetchServer {

  _serverAddress = null;

  constructor(serverAddress) {
    this._serverAddress = serverAddress ?? defaultServerAddress;
  }

  GET = 'GET';
  POST = 'POST';
  PUT = 'PUT';
  DELETE = 'DELETE';

  async get(path, headers) {
    let url = this._serverAddress + path;

    let response = await fetch(url, {
      method : this.GET,
      headers : headers,
      credentials: 'include'
    });

    let json = await response.json();

    if (!response.ok) {
      throw new ResponseException(response.status, json.message, json.errors);
    }

    return json;
  }

  async post(path, body, headers) {
    let url = this._serverAddress + path;

    let response = await fetch(url, {
      method : this.POST,
      headers : headers,
      body : body,
      credentials: 'include'
    });

    let json = await response.json();

    if (!response.ok)
      throw new ResponseException(response.status, json.message, json.errors);

    return json;
  }

  async delete(path, body, headers) {
    let url = this._serverAddress + path;

    let response = await fetch(url, {
      method : this.DELETE,
      headers : headers,
      body : body,
      credentials: 'include'
    });

    let json = await response.json();

    if (!response.ok)
      throw new ResponseException(response.status, json.message, json.errors);

    return json;
  }

  async put(path, body, headers) {
    let url = this._serverAddress + path;

    let response = await fetch(url, {
      method : this.PUT,
      headers : headers,
      body : body,
      credentials: 'include'
    });

    let json = await response.json();

    if (!response.ok)
      throw new ResponseException(response.status, json.message, json.errors);

    return json;
  }
}
