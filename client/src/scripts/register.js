import {AuthFetchAdapter} from "../adapters/AuthFetchAdapter.js";
import {AuthService} from "../services/auth.service.js";


// use module pattern

const submitButton = document.getElementsByClassName('submit-button')[0];

submitButton.addEventListener('click', async (event) => {
  const username = document.getElementById('username').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  event.preventDefault();
  await AuthService.register(username, name, password);
});
