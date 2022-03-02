import {AuthFetchAdapter} from "../adapters/AuthFetchAdapter.js";

// use module pattern

const submitButton = document.getElementsByClassName('submit-button')[0];

submitButton.addEventListener('click', async (event) => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  event.preventDefault();
  console.log(await AuthFetchAdapter.login(username, password));

});
