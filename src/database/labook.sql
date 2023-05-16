-- Active: 1683672410395@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);
CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT  DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);
CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER DEFAULT(0) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES users(id)
);

INSERT INTO users(id, name, email, password, role)
VALUES
    ("u001", "Everton", "everton@gmail.com", "12345", "ADMIN"),
    ("u002", "Melani", "melani@gmail.com", "12345", "NORMAL"),
    ("u003", "Jefferson", "jefferson@gmail.com", "12345", "NORMAL");

INSERT INTO posts(id, creator_id, content)
VALUES
    ("p001", "u001", "Mais vale um pássaro na mão, do que  perder a vida!"),
    ("p002", "u003", "Quem com ferro fere, tanto bate até que fura!"),
    ("p003", "u002", "Quem não tem cão, se lava em casa!");

INSERT INTO likes_dislikes(user_id, post_id)
VALUES
    ("u001", "p001"),
    ("u001", "p002"),
    ("u002", "p003"),
    ("u002", "p001"),
    ("u003", "p002"),
    ("u001", "p003"),
    ("u003", "p001");