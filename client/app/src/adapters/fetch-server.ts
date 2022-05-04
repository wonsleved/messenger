import {ResponseException} from "../exceptions/response.exception";
import 'regenerator-runtime/runtime'; // ???
import {HOST_NAME} from "../config";


let defaultServerAddress: string;

if (window.location.protocol === 'https:')
  defaultServerAddress = `https://${HOST_NAME}`;
else
  defaultServerAddress = `http://${HOST_NAME}`;

export class FetchServer {

  private readonly serverAddress: string;

  GET = 'GET';
  POST = 'POST';
  PUT = 'PUT';
  DELETE = 'DELETE';

  constructor(serverAddress?: string) {
    this.serverAddress = serverAddress ?? defaultServerAddress;
    console.log(this.serverAddress);
  }

  public async get(path: string, headers?: HeadersInit): Promise<object> {
    let url = this.serverAddress + path;

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

  public async post(path: string, body: BodyInit | null, headers?: HeadersInit): Promise<object> {
    let url = this.serverAddress + path;

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

  public async delete(path: string, body: BodyInit, headers?: HeadersInit): Promise<object> {
    let url = this.serverAddress + path;

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

  public async put(path: string, body: BodyInit, headers: HeadersInit): Promise<object> {
    let url = this.serverAddress + path;

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
