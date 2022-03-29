


export const signUpTemplate = (function () {
  return `
<div class="page">

        <header class="headline page__header">

            <span class="headline__logo-text">Messenger</span>

            <div class="headline__auth">
                <button class="button _auth _sign-in" onclick="{{ signIn }}">Sign In</button>
                <button class="button _out" onclick="{{ goMain }}">Go back</button>
            </div>

        </header>

        <main class="page__auth-form">

            <form class="auth-form" onsubmit="{{ submitAction }}">

                <span class="auth-form__title">Sign up</span>

                <div class="auth-form__input-field input-field">
                    <input
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
                            type="text" id="name" class="input-field__input" placeholder=" "
                            required
                            minlength="3"
                            maxlength="64"
                            pattern="^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$"
                    >
                    <label for="name" class="input-field__label">
                        Name
                    </label>
                </div>

                <div class="auth-form__input-field input-field">
                    <input
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



                <button type="submit" class="auth-form__submit button _submit">
                    Sign Up
                </button>

            </form>

        </main>
    </div>
`;
})()

