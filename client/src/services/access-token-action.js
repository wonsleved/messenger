export const TOKEN_NAME = 'messenger-token';

export function setAccessToken(token) {
  localStorage.setItem(TOKEN_NAME, token);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function removeAccessToken() {
  localStorage.removeItem(TOKEN_NAME);
}