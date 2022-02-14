module.exports = {
  user: {
    password: {
      minLength: 8,
      maxLength: 40,
    },
    username: {
      minLength: 3,
      maxLength: 32,
    },
    name: {
      minLength: 3,
      maxLength: 64,
    },
  },
  chat: {
    title: {
      minLength: 1,
      maxLength: 40
    }
  },
  cookieOptions: {
    refreshToken: {
      maxAge: 2592000000,
      httpOnly: true,
    },
  },
};
