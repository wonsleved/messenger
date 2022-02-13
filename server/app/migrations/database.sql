create TABLE "user" (
    id uuid PRIMARY KEY,
    username varchar(32),
    name varchar(64),
    password varchar(72),
    is_online bool,
    created_at timestamp,
    last_visit_at timestamp,
    updated_at timestamp
);

create TABLE "token" (
    user_id uuid PRIMARY KEY,
    refresh_token varchar(256),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);

create TABLE "contact" (
    user_id uuid,
    contact_id uuid,
    created_at timestamp,
    PRIMARY KEY (user_id, contact_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (contact_id) REFERENCES "user" (id)
);

create TABLE "conversation" (
    id uuid PRIMARY KEY,
    is_private bool,
    title varchar(40),
    creator_id uuid,
    created_at timestamp,
    updated_at timestamp,
    FOREIGN KEY (creator_id) REFERENCES "user" (id)
);

create TABLE "participant" (
    conversation_id uuid,
    user_id UUID,
    PRIMARY KEY (conversation_id, user_id),
    FOREIGN KEY (user_id) REFERENCES "user" (id),
    FOREIGN KEY (conversation_id) REFERENCES "conversation" (id)
);