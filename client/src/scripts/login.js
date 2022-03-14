import {AuthFetchAdapter} from "../adapters/auth-fetch.adapter.js";
import {AuthService} from "../services/auth.service.js";

// use module pattern

const submitButton = document.getElementsByClassName('submit-button')[0];

submitButton.addEventListener('click', login);

async function login(event) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  event.preventDefault();

  await AuthService.login(username, password);
}

// logout

// move token name to constant

async function logout() {
  let accessToken = localStorage.getItem('token');

  let userData = await AuthFetchAdapter.logout(accessToken);

  console.log(userData);

  localStorage.removeItem('token');
}