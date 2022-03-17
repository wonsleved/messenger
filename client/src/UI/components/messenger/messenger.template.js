


export const messengerTemplate = (function () {
  return `
<div class="page">
    
        {{ ContactModalComponent }}


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
                            <div 
                                class="tabs-list__tab _active"
                                onclick="{{ showContacts }}"
                            >
                                Contacts
                            </div>
                            <div 
                                class="tabs-list__tab"
                                onclick="{{ showChats }}"
                            >
                            Chats
                            </div>
                        </header>

                        <div class="chats-and-contacts__list list" data-list="contacts">

                        </div>
                        
                        <div class="chats-and-contacts__list list" data-list="chats" style="display: none">

                        </div>

                        <footer class="chats-and-contacts__footer">
                            <button 
                                class="add-button"
                                onclick="{{ openContactModal }}"
                                >
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

