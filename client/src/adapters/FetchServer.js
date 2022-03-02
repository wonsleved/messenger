export class FetchServer {

  constructor(serverAddress) {
    this._serverAddress = serverAddress ?? 'http://localhost:5000';
  }

  _serverAddress;

  GET = 'GET';
  POST = 'POST';
  PUT = 'PUT';
  DELETE = 'DELETE';

  async get(path, headers) {
    let url = this._serverAddress + path;

    let response = await fetch(url, {
      method : this.GET,
      headers : headers
    });

    let json;

    if (response.ok) {
      json = await response.json();
    } else {
      console.log(response.error);
    }

    return json;
  }

  async post(path, body, headers) {
    let url = this._serverAddress + path;

    let response = await fetch(url, {
      method : this.POST,
      headers : headers,
      body : body
    });

    let json = await response.json();

    if (!response.ok) {
      console.log(json.message);
    }

    return json;
  }

  async delete(path, body, headers) {
    let url = this._serverAddress + path;

    let response = await fetch(url, {
      method : this.DELETE,
      headers : headers,
      body : body
    });

    let json;

    if (response.ok) {
      json = await response.json();
    } else {
      console.log(response.error);
    }

    return json;
  }

  async put(path, body, headers) {
    let url = this._serverAddress + path;

    let response = await fetch(url, {
      method : this.PUT,
      headers : headers,
      body : body
    });

    let json;

    if (response.ok) {
      json = await response.json();
    } else {
      console.log(response.error);
    }

    return json;
  }
}
