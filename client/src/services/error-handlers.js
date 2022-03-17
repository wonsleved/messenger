import {ResponseException} from "../exceptions/response.exception";
import {AuthService} from "./auth.service";

export async function handleAuthError(error, callback) {
  if (error instanceof ResponseException) {
    if (error.status === 401) {
      const accessToken = await AuthService.refresh();

      if (accessToken)
        return await callback();
    }
  }

  return handleError(error);
}

export function handleError(error) {
  if (window.getErrorEvent) {
    if (error.errors && error.errors.length)
      document.dispatchEvent(window.getErrorEvent(error.errors[0].msg));
    else
      document.dispatchEvent(window.getErrorEvent(error.message));
  }

  return null;
}