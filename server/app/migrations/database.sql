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

create TABLE "message" (
    id uuid PRIMARY KEY,
    conversation_id uuid,
    author_id uuid,
    created_at timestamp,
    body varchar(255),
    FOREIGN KEY (conversation_id) REFERENCES "conversation" (id),
    FOREIGN KEY (author_id) REFERENCES "user" (id)
);

create TABLE "message_registry" (
    message_id uuid,
    owner_id uuid,
    registry smallint,
    created_at timestamp,
    FOREIGN KEY (message_id) REFERENCES "message" (id),
    FOREIGN KEY (owner_id) REFERENCES "user" (id),
    PRIMARY KEY (message_id, owner_id, registry)
);

create INDEX on message_registry(owner_id, registry, created_at DESC);