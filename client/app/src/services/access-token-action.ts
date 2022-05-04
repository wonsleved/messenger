import {TokenType} from "../type";
export const TOKEN_NAME = 'messenger-token';

export function setAccessToken(token: TokenType): void {
  localStorage.setItem(TOKEN_NAME, token);
}

export function getAccessToken(): TokenType {
  return localStorage.getItem(TOKEN_NAME) || '';
}

export function removeAccessToken(): void {
  localStorage.removeItem(TOKEN_NAME);
}