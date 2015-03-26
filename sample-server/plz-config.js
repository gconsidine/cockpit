var PlzConfig = {
  modules: {
    admin: true
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
    collection: 'admin',
    roles: {
      admin: true,
      user: true
    },
    required: {
      name: 'string',
      email: 'email'
    }
  }
};

module.exports = PlzConfig;
