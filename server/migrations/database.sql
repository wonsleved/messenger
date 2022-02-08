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