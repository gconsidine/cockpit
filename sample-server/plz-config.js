var PlzConfig = {
  modules: {
    admin: true,
    author: true
  },
  database: {
    default: {
      uri: process.env.PLZ_DB_URI
    }
  },
  mailer: {
    default: {
      service: process.env.PLZ_MAIL_SERVICE,
      address: process.env.PLZ_MAIL_ADDRESS,
      password: process.env.PLZ_MAIL_PASSWORD
    }
  },
  admin: {
    collection: 'user',
    roles: {
      admin: true,
      user: true
    },
    required: {
      name: 'string',
      email: 'email'
    }
  },
  author: {
    page: {
      collection: 'page',
      required: {
        userName: 'string',
        title: 'string',
        visibility: 'string',
        contentType: 'string',
        content: 'string',
        status: 'string'
      }
    },
    post: {
      collection: 'post',
      required: {
        userName: 'string',
        title: 'string',
        visibility: 'string',
        contentType: 'string',
        content: 'string',
        status: 'string'
      }
    }
  }
};

module.exports = PlzConfig;
