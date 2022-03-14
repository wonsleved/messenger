


export const chatsTemplate = (function () {
  return `
<div class="page">

    <header class="headline page__header">

        <span class="headline__logo-text">Messenger</span>

        <div class="headline__auth">
            <button class="auth-button _sign-up" onclick="{{ signUp }}">Sign Up</button>
            <button class="auth-button _sign-in" onclick="{{ signIn }}">Sign In</button>
        </div>

    </header>

    <main class="page__main">

        <div class="first-look-content page__first-look-content">

            <h1 class="first-look-content__title">Messenger</h1>

            <p class="first-look-content__info">
                Communicate with your friends in real time, add them to contacts, create group chats and more.
            </p>
            <p class="first-look-content__info">
                Try it now!
            </p>

        </div>

    </main>

</div>
`;
})()

