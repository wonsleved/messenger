import {ResponseException} from "../exceptions/response.exception";
import {AuthService} from "./auth.service";
import {dispatch} from "../store";
import {errorOccur} from "../store/reducers/error.slice";

type ErrorType = Error & { errors: {msg: string}[] }

export async function handleAuthError(error: ErrorType, callback: Function) {
  if (error instanceof ResponseException) {
    if (error.status === 401) {
      const accessToken = await AuthService.refresh();

      if (accessToken)
        return await callback();
    }
  }

  return handleError(error);
}

export function handleError(error: ErrorType) {
  let message: string;

  if (error.errors && error.errors.length)
    message = error.errors[0].msg;
  else
    message = error.message;

  dispatch(errorOccur(message));

  return null;
}
