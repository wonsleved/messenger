


export const chatsTemplate = (function () {
  return `
<div class="page">

        <header class="headline page__header">

            <span class="headline__logo-text">Messenger</span>

            <div class="headline__auth">
                <span class="user-profile">{{ username }}</span>
                <button class="go-back-button" onclick="{{ logoutAction }}">Logout</button>
            </div>

        </header>

        <main class="page__messenger">

            <div class="messenger">

                <section class="messenger__menu messenger-menu">

                    <div class="messenger-menu__chats-and-contacts chats-and-contacts">

                        <header class="chats-and-contacts__header tabs-list">
                            <div class="tabs-list__tab _active">Contacts</div>
                            <div class="tabs-list__tab">Chats</div>
                        </header>

                        <div class="chats-and-contacts__list list">

                        </div>

                        <footer class="chats-and-contacts__footer">
                            <button class="add-button">
                                Add contact
                            </button>
                        </footer>

                    </div>

                </section>

                <section class="messenger__chat messenger-chat">
a


                </section>

            </div>


        </main>

    </div>
`;
})()

