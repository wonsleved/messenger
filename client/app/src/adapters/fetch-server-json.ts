import {FetchServer} from './fetch-server';

export class FetchServerJson {

  private readonly fetchServer: FetchServer;
  private defaultHeaders: {} = {'Content-Type': 'application/json'};

  constructor(serverAddress?: string) {
    this.fetchServer = new FetchServer(serverAddress);
  }

  async get(path: string, headers: HeadersInit = {}): Promise<any> {

    return await this.fetchServer.get(path, {
      ...this.defaultHeaders,
      ...headers
    });
  }

  async post(path: string, body: BodyInit, headers: HeadersInit = {}): Promise<any> {
    return await this.fetchServer.post(path, body, {
      ...this.defaultHeaders,
      ...headers
    });
  }

  async delete(path: string, body: BodyInit, headers: HeadersInit = {}): Promise<any> {
    return await this.fetchServer.delete(path, body, {
      ...this.defaultHeaders,
      ...headers
    });
  }

  async put(path: string, body: BodyInit, headers: HeadersInit = {}): Promise<any> {
    return await this.fetchServer.put(path, body, {
      ...this.defaultHeaders,
      ...headers
    });
  }
}