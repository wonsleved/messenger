import {AuthService} from "../services/auth.service";

export async function responseExceptionHandler(error, callback) {

  if (error.status === 401) {
    let accessToken = await AuthService.refresh();
  }
}