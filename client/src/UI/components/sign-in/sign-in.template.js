


export const signInTemplate = (function () {
  return `
<div class="page">
  <header class="headline page__header">

    <span class="headline__logo-text">Messenger</span>

    <div class="headline__auth">
      <button class="auth-button _sign-up" onclick="{{ signUp }}">Sign Up</button>
      <button class="go-back-button" onclick="{{ goMain }}">Go back</button>
    </div>

  </header>

  <main class="page__auth-form">

    <form class="auth-form" onsubmit="{{ submitAction }}">

      <span class="auth-form__title">Sign in</span>

      <div class="auth-form__input-field input-field">
        <input
                name="username"
                type="text" id="username" class="input-field__input" placeholder=" "
                required
                pattern="[a-zA-Z0-9]{0,32}"
                minlength="3"
                maxlength="33"
        >
        <label for="username" class="input-field__label">
          Username
        </label>
      </div>

      <div class="auth-form__input-field input-field">
        <input
                name="password"
                type="password" id="password" class="input-field__input" placeholder=" "
                required
                minlength="8"
                maxlength="41"
                pattern=".{0,40}"
        >
        <label for="password" class="input-field__label">
          Password
        </label>
      </div>



      <button type="submit" class="auth-form__submit submit-button">
        Sign In
      </button>

    </form>

  </main>
</div>

`;
})()

