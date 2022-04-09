import {ResponseException} from "../exceptions/response.exception.js";
import 'regenerator-runtime/runtime'; // ???
import {HOST_NAME} from "../config";


let defaultServerAddress;

if (location.protocol === 'https:')
  defaultServerAddress = `https://${HOST_NAME}`;
else
  defaultServerAddress = `http://${HOST_NAME}`;

export class FetchServer {

  _serverAddress = null;

  constructor(serverAddress) {
    this._serverAddress = serverAddress ?? defaultServerAddress;
    console.log(this._serverAddress);
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
