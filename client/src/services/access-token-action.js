export const TOKEN_NAME = 'messenger-token';
import {wsInitialization} from "../web-sockets/initialization";

export function setAccessToken(token) {
  localStorage.setItem(TOKEN_NAME, token);
  wsInitialization();
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function removeAccessToken() {
  localStorage.removeItem(TOKEN_NAME);
}